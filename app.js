const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
var bcrypt = require('bcryptjs')
const models = require('./models')
const { Op } = require('sequelize')
const authenticate = require('./authentication/auth')
var fetch = require('node-fetch')

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

app.get('/', async (req, res) => {

    const username = req.session.username

    let usersBreweries = await models.Brewery.findAll({
        where: {
            username: {
                [Op.eq]: username
            }
        },raw:true
    })

    // const promises = userBreweries.map((breweryId) => {
    //    return fetchBreweryByIdPromise(breweryId)
    // })

    // Promise.all(promises).then(responses => {
    //     Promise.all(responses.map(res => res.json())).then(values => res.render('home', {username: username, allUserBreweries: values}))
    // })

    res.render('home', {username: username, usersBreweries: usersBreweries})
})

// function fetchBreweryByIdPromise(id) {

//     return fetch(`https://api.openbrewerydb.org/breweries/${id}`, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-key": "fb7457a28cmsh8446e8ae6d62e1dp123bf0jsn87f55a1983ba",
//             "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com"
//         }
//     })
// }

app.get('/listings', (req, res) => {
    res.render('listings')
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
        models.BreweryReview.findAll({
            where: {
                BreweryId: brewery.id 
            }
        }).then(reviews => {
            res.render('brewery_details', {brewery: brewery, reviews: reviews})
        })

    }) 
})

app.post('/save-brewery', (req, res) => {
    const username = req.session.username
    const name = req.body.breweryName
    const street = req.body.breweryStreet
    const city = req.body.breweryCity
    const state = req.body.breweryState
    const type = req.body.breweryType
    const breweryId = parseInt(req.body.breweryId)
    
    let breweries = models.Brewery.build({
        username: username,
        name: name,
        street: street,
        city: city,
        state: state,
        type: type,
        breweryId: breweryId
    })
    breweries.save().then(savedBreweries => {
        console.log(savedBreweries)
        res.send('saved')
    })
})

app.post('/add-review', (req, res) => {
    const rating = req.body.rating
    const username = req.body.username
    const review = req.body.review
    const brewery_id = req.body.brewery_id
    const UserId = req.body.UserId

    let BreweryReview = models.BreweryReview.build({
        username:username,
        review: review,
        BreweryId: brewery_id,
        rating: rating,
        UserId: UserId

    })
    console.log(BreweryReview)
    BreweryReview.save().then(savedBreweryReview => {
        console.log(savedBreweryReview)
        res.redirect(`/brewery/${brewery_id}`)  
    }).catch((error) =>{
        console.log(error)
        res.send('comment not added')
    })
    
})

app.post('/delete-review', (req, res) => {
    const BreweryReviewId = req.body.BreweryReviewId
    models.BreweryReview.destroy({
        where: {
            id: BreweryReviewId 
        }
    }).then(deletedReview => {
        console.log(deletedReview)
        res.redirect(req.get('referer'))
    })
})// Load reviews page and adds a review

// Launch Server
app.listen(3000, () => {
    console.log('Server is running...')
})