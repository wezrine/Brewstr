const express = require('express')
const router = express.Router()

let users = [
  {username: 'johndoe', password: 'password'},
  {username: 'marydoe', password: '123456'}
]




router.get('/', (req, res) => {
    res.render('login')
})




router.post('/', (req,res) => {
  
  const username = req.body.username;
  const password = req.body.password;


})

module.exports = router