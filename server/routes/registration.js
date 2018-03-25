const express = require('express');
const router = express.Router();

const { signUp, Login } = require('../controllers/registration.controller')

/* GET users listing. */
router.post('/signup', signUp)
router.post('/login', Login)

module.exports = router
