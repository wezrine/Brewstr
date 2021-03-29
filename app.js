const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
var bcrypt = require('bcryptjs')
const pgp = require('pg-promise')

const db =

// const models = require('./models')
// const { Op } = require('sequelize')

// Mustache Express
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

// Body Parser
app.use(express.urlencoded())

// Load CSS & JS
app.use(express.static('css'))
app.use(express.static('scripts'))
app.use(express.static('images'))

// Setting up session
app.use(session({
    secret: 'handmeabeer',
    saveUnitialized: true
}))

// Routes
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

// user registration (we can move to route soon)
app.get('/register', (req,res) => {
    res.render('register')
})

app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt
})







app.get('/', (req, res) => {
    res.render('home')
})

app.get('/listings', (req, res) => {
    res.render('listings')
})

app.get('/brewery_details', (req, res) => {
    res.render('brewery_details')
})

// Launch Server
app.listen(3000, () => {
    console.log('Server is running...')
})