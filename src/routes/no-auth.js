const users = require('../db/users.js')
const albums = require('../db/albums.js')
const reviews = require('../db/reviews.js')
const moment = require('moment')
const router = require('express').Router()

const getAlbums = (req, res, next) => {
  albums.getAll()
    .then((albums) => {
      req.albums = albums
      next()
    })
}

const getReviews = (req, res, next) => {
  reviews.getRecent()
    .then((reviews) => {
      req.reviews = reviews
      next()
    })
}

const renderIndex = (req, res) => {
  res.render('index', {albums: req.albums, reviews: req.reviews, moment})
}

router.get('/', getAlbums, getReviews, renderIndex)

router.get('/albums/:title', (req, res) => {
  albums.getByTitle(req.params.title)
    .then(album => res.render('album', {album, moment}))
    .catch(error => res.status(500).render('error', {error}))
})

router.route('/signup')
  .get((req, res) => res.render('signup'))
  .post((req, res) => {
    users.create(req.body.username, req.body.email, req.body.password)
      .then((user) => {
        req.session.user = {username: user.username, user_id: user.user_id}
        req.session.save(res.redirect(`/profile/${req.body.username}`))
      })
      .catch(error => res.status(500).render('error', {error}))
  })

router.route('/signin')
  .get((req, res) => res.render('signin'))
  .post((req, res) => {
    const username = req.body.username
    users.getByUsername(username)
      .then((user) => {
        if (user[0] && req.body.password === user[0].password) {
          req.session.user = {username: user[0].username, user_id: user[0].user_id}
          req.session.save(res.redirect(`/profile/${username}`))
        } else res.redirect('/signin')
      })
      .catch(error => res.status(500).render('error', {error}))
  })

router.get('/logout', (req, res) => {
  req.session.destroy(res.redirect('/'))
})

router.get('/profile/:username', (req, res) => {
  users.getByUsername(req.params.username)
    .then(reviews => res.render('profile', {reviews, moment}))
    .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
