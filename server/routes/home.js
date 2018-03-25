const express = require('express');
const routes = express.Router();
const authentication = require('../middleware/authentication')

const { initiateHome, createProject, removeProject, getProjectData, createTodo, removeTodo } = require('../controllers/home.controller')

routes.get('/', authentication.auth, authentication.expired, initiateHome)
routes.post('/createproject', createProject)
routes.delete('/removeproject/:projectid', removeProject)
routes.get('/getprojectdata/:projectid', getProjectData)
routes.post('/createtodo', createTodo)
routes.delete('/removetodo/:todoid', removeTodo)

module.exports = routes