const express = require('express')
const router = express.Router()
const userModel = require('../models')
var bcrypt = require('bcryptjs')







router.get('/', (req, res) => {
    res.render('login')
})




router.post('/', (req,res) => {

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
          res.redirect('login')
        }
      })
    }
  })

})

module.exports = router