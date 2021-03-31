const express = require('express')
const router = express.Router()
const userModel = require('../models')
var bcrypt = require('bcryptjs')
const session = require('express-session')





router.get('/', (req, res) => {
    res.render('login')
})








router.post('/', (req,res) => {
  // name of page = dwdwdwd
  userModel.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    console.log(user.username)
    req.session.username = user.username  
    if (!user) {
      res.render('register');
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {

        if (result == true) {

          res.redirect('/');
        } else {

          res.render('listings', {message: "Wrong account details"})
          let signInButton = document.getElementById("signInButton")
          signInButton.click()

        }
      })
    }
  })

})

module.exports = router