const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: String,
  todo: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project