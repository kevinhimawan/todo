const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 10;
var quotes = require('awesome-quotes');


module.exports = {
  signUp (req,res) {
    const { username, email, password } = req.body
    User.findOne({email: email})
    .exec()
    .then(user => {
      if(user) {
        res.status(500).json({
          message: `${email} has already been used`
        })
      }else{
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
          username, email, password: hash
        })
        newUser.save()
        .then(newUserData => {
        const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),email: newUserData.email, userid: newUserData._id}, 'secret_key');
        res.status(200).json(token)
        })
      }
    })
  },

  Login (req,res) {
    const { email, password } = req.body
    User.findOne({email: email})
    .exec()
    .then(user => {
      if (user) {
        let check = bcrypt.compareSync(password, user.password);
        if (check) {
          const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),email: user.email, userid: user._id}, 'secret_key');
          res.status(200).json(token)
        } else {
          res.status(500).json({
            message: `Password wrong`
          })
        }
      }else{
        res.status(404).json({
          message: `Email does not exist`
        })
      }
    })
  }
}
