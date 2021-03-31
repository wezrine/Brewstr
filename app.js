const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
var bcrypt = require('bcryptjs')
const models = require('./models')
const { Op } = require('sequelize')
const authenticate = require('./authentication/auth')

const fetchBreweryById = require('./scripts/fetchById.js')

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
// app.use(authenticate)
// Setting up session
app.use(session({
    secret: 'handmeabeer',
    saveUnitialized: true
}))



// Routes
const loginRouter = require('./routes/login')
const pgPromise = require('pg-promise')
app.use('/login', loginRouter)



// user registration (we can move to route soon)
app.get('/register', (req,res) => {
    res.render('register')
})

// Registration & Encryption 
app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(password, salt, function (error, hash) {
            if (!error) {
                let user = models.User.build({

                    username: username,
                    password: hash

                })
                user.save().then(savedUser => {
                    // console.log(savedUser)
                    // res.json({message: 'user registered'})
                    // if user is successfully logged in, 
                    res.redirect('/login')
                }).catch(error => {
                    res.render('/register')
                })
            }
        })
    })
})

app.get('/', (req, res) => {
    // check to see if user is logged in
        // if logged in display user header
    // if not logged in show sign in header
    res.render('home')
})

app.get('/listings', (req, res) => {
    res.render('listings')
})

app.post('/listings', (req, res) => {
    const city = req.body.city
    const state = req.body.state

    res.render('listings', {city: city, state: state})
})

app.get('/brewery/:breweryId', (req, res) => {
    const breweryId = req.params.breweryId

    // models.Review.findAll({
    //     where: {
    //         ReviewBreweryId: {
    //             [Op.eq]: breweryId
    //         }
    //     }
    // }).then(reviews => {
    //     return reviews
    // })

    fetchBreweryById(breweryId, function(brewery) {
        res.render('brewery_details', {brewery: brewery})
    }) 
})

app.post('/save-brewery', (req, res) => {
    const breweryId = parseInt(req.body.breweryId)
    console.log(breweryId)
    const username = "wezrine"

    let breweries = models.Breweries.build({
        username: username,
        brewery_id: breweryId
    })
    breweries.save().then(savedBreweries => {
        console.log(savedBreweries)
        res.send('saved')
    })
})

app.get('/add-review', (req, res) => {
    models.Review.findAll({})
    .then(Reviews => {
        res.redirect('/add-review', {reviews: reviews})
    })   
})

app.post('/add-review', (req, res) => {
    const rating = req.body.rating
    const username = req.body.username
    const review = req.body.review
    brewery_id = req.body.brewery_id
    UserId = req.body.UserId

    let BreweryReviews = models.BreweryReview.build({
        username:username,
        review: review,
        brewery_id: brewery_id,
        rating: rating,
        UserId: UserId

    })
    BreweryReviews.save().then(savedBreweryReviews => {
        console.log(savedBreweryReviews)
        res.redirect(req.get('referer'))
    }).catch((error) =>{
        console.log(error)
        res.send('comment not added')
    })
    
})

app.post('/delete-review', (req, res) => {
    const ReviewsId = req.body.ReviewsId

    models.Blogs.destroy({
        where: {
            id: ReviewsId 
        }
    }).then(deletedReviews => {
        res.redirect(req.get('referer'))
    })
})

// Launch Server
app.listen(3000, () => {
    console.log('Server is running...')
})