const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
var bcrypt = require('bcryptjs')

const fetchBreweryById = require('./scripts/fetchById.js')

// const db =

// const models = require('./models')
// const { Op } = require('sequelize')
// const session = require('express-session')

// Mustache Express
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

const PORT = process.env.PORT || 8080 

// Body Parser
app.use(express.urlencoded())

// Load CSS & JS
app.use("/css",express.static('css'))
app.use("/scripts",express.static('scripts'))
app.use("/images",express.static('images'))
app.use("/fonts",express.static('fonts'))

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

app.get('/brewery/:brewery', (req, res) => {
    const breweryId = req.params.brewery
    // const brewery = fetchBreweryById(breweryId)
    // console.log(brewery.result.name)
    // console.log(fetchBreweryById(breweryId))
    // fetch brewery by id

    res.render('brewery_details')
})

// Load reviews page and adds a review

// Launch Server
app.listen(3000, () => {
    console.log('Server is running...')
})