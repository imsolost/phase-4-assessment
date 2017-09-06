const router = require('express').Router()

router.use((req, res, next) => {
  let loggedIn
  let username
  if (req.session.user) {
    loggedIn = true
    username = req.session.user.username
  }
  res.locals = {loggedIn, username: username || null}
  next()
})

router.use('/', require('./no-auth'))
router.use('/', require('./user'))

module.exports = router
