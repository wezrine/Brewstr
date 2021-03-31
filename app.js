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

    let breweries = await models.Breweries.findAll({
        where: {
            username: {
                [Op.eq]: username
            }
        }
    })

    console.log(breweries)

    // run fetch brewery on each one

    res.render('home', {username: username, breweries: breweries})

})

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
    const breweryId = parseInt(req.body.breweryId)

    const username = req.session.username



    let breweries = models.Breweries.build({
        username: username,
        brewery_id: breweryId
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