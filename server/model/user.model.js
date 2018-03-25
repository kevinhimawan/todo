const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  project: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
})

const User = mongoose.model('User', userSchema)
module.exports = User