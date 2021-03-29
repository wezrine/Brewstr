const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

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