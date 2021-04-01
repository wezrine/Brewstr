// authentication middleware
function authenticate(req,res,next) {
  if(req.session) {
    if(req.session.username) {
      next() // proceed to original request
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
    // have popup sign-in pop up, .click()?
  }
}

module.exports = authenticate