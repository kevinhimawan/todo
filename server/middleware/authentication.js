const jwt = require('jsonwebtoken')

module.exports = {
  auth (req, res, next) {
    const token = req.headers.token
    if (token) {
      try {
        var decoded = jwt.verify(token, 'secret_key');
        next ()
      } catch(err) {
        next(err)
      }
    } else {
      next (`Cannot come to this site`)
    } 
  },
  expired (req, res, next) {
    const token = req.headers.token
    if (token) {
      try {
        console.log(token)
        const {exp,email} = jwt.verify(token, 'secret_key')
        let timenow = Date.parse(new Date()) / 1000
        console.log(exp)
        console.log(timenow)
        if (exp < timenow) {
        } else {
          next ()
        }
      } catch (err) {
        next(err)
      }
    } else {
      next (`Cannot come to this site`)
    }
  }
}