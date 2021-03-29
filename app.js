const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

const models = require('./models')
const { Op } = require('sequelize')
const session = require('express-session')

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

// Routes
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/listings', (req, res) => {
    res.render('listings')
})

app.get('/brewery_details', (req, res) => {
    res.render('brewery_details')
})

// Load reviews page and adds a review

// Launch Server
app.listen(3000, () => {
    console.log('Server is running...')
})