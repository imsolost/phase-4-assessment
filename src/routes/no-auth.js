const users = require('../db/users.js')
const albums = require('../db/albums.js')
const reviews = require('../db/reviews.js')
const moment = require('moment')
const router = require('express').Router()

getAlbums = (req, res, next) => {
  albums.getAll()
    .then((albums) => {
      req.albums = albums
      next()
    })
}

getReviews = (req, res, next) => {
  reviews.getRecentReviews()
    .then((reviews) => {
      req.reviews = reviews
      next()
    })
}

renderIndex = (req, res) => {
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
      .then(() => {
        req.session.user = {username: req.body.username}
        req.session.save(res.redirect(`/profile/${req.body.username}`))
      })
      .catch(error => res.status(500).render('error', {error}))
  })

module.exports = router
