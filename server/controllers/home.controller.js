const User = require('../model/user.model')
const Todo = require('../model/todo.model')
const Project = require('../model/project.model')
const jwt = require('jsonwebtoken')

module.exports = {
  initiateHome (req,res) {
    console.log('test')
    const token = req.headers.token
    const {exp,email} = jwt.verify(token, 'secret_key')
    User.findOne({'email': email})
    .populate('project')
    .exec()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },

  createProject (req,res) {
    const { token, projectname, description } = req.body
    const {exp, email, userid} = jwt.verify(token, 'secret_key')
    const newProject = new Project ({
      name: projectname, description, userid
    })
    newProject.save()
    .then(newProjectData => {
      User.update({'_id': userid},
        {'$push': {project: newProjectData._id}},
      function (err, result){
        if (!err) {
          User.findOne({'_id': userid})
          .populate('project')
          .exec()
          .then(userdata =>{
            res.status(200).json(userdata)
          })
          .catch(err => {
            res.status(500).json(err)
          })
        } else {
          res.status(500).json('Error')
        }
      })
    })
  },
  removeProject (req, res) {
    const projectid = req.params.projectid
    const {exp, email, userid} = jwt.verify(req.headers.token, 'secret_key')
    Project.deleteOne({'_id': projectid})
    .then(result => {
      User.update({'_id': userid},
        {'$pull': {project: projectid}},
      function (err, result){
        if (!err) {
          User.findOne({'_id': userid})
          .populate('project')
          .exec()
          .then(userData => {
            res.status(200).json(userData)
          })
          .catch(err => {
            res.status(500).json(err)
          })
        }
      })
    })
  },
  getProjectData (req, res) {
    const projectid = req.params.projectid
    Project.findOne({'_id': projectid})
    .populate('todo')
    .exec()
    .then(project => {
      res.status(200).json(project)
    })
  },
  createTodo (req, res) {
    const { todo, projectid } = req.body
    const newTodo = new Todo({
      name: todo
    })
    newTodo.save()
    .then(newTodoData => {
      Project.update({'_id': projectid},
        {'$push': {todo: newTodoData._id}},
      function (err, result){
        if (!err) {
          Project.findOne({'_id': projectid})
          .populate('todo')
          .exec()
          .then(projectData => {
            res.status(200).json(projectData)
          })
        } else {
          res.status(500).json(err)
        }
      })
    })
  },
  removeTodo (req, res) {
    const todoid = req.params.todoid
    const projectid = req.headers.projectid
    Project.update({'_id': projectid},
      {'$pull': {todo: todoid}},
    function (err, result){
      if (!err) {
        Todo.remove({'_id': todoid})
        .then(response => {
          Project.findOne({'_id': projectid})
          .populate('todo')
          .exec()
          .then(projectdata => {
            return res.status(200).json(projectData)
          })
        })
        .catch(err => {
          res.status(500).json(err)  
        })
      } else {
        res.status(500).json(err)
      }
    })
  }
}