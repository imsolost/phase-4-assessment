const router = require('express').Router()
// const user = require('./user')

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
// router.use('/', user)

module.exports = router
