// authentication middleware
function authenticate(req,res,next) {
  if(req.session) {
    if(req.session.username) {
      next() // proceed to original request
    } else {
      res.redirect('/')
    }
  } else {
    res.redirect('/')
    // have popup sign-in pop up, .click()?
  }
}

module.exports = authenticate