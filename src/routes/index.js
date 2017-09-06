const router = require('express').Router()

const setLocals = (req, res, next) => {
  let loggedIn
  let username
  if (req.session.user) {
    loggedIn = true
    username = req.session.user.username
  }
  res.locals = {loggedIn, username: username || null}
  next()
}

router.use(setLocals)
router.use('/', require('./no-auth'))

const ensureLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    res.redirect('/signin')
  }
}

router.use(ensureLoggedIn)
router.use('/', require('./user'))

module.exports = router
