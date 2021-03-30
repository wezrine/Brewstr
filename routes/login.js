const express = require('express')
const router = express.Router()
const userModel = require('../models')
var bcrypt = require('bcryptjs')







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
    console.log(user)
    if (!user) {
      res.render('home');
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {

        if (result == true) {

          res.redirect('/');
        } else {

          res.render('listings', {message: "Wrong account details"})
          // on page load click sign in button
            // const signInButton = document.getElementById('signInButton')
            // signInButton.click()
        }
      })
    }
  })

})

module.exports = router