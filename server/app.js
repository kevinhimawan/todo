var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
require('dotenv').config()

var app = express();

// Database
const mongoose = require('mongoose')
const dbURL = 'mongodb://kevinhimawan:12345@ds123259.mlab.com:23259/todolist'
mongoose.connect(dbURL,(err)=>{
  if(!err){
    console.log(`Connected to database`)
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// Routes
const Registration = require('./routes/registration');
const Home = require('./routes/home')

app.use('/registration', Registration);
app.use('/', Home)

module.exports = app;
