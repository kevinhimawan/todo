const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: String,
  created:{
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  dateline: Date
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo