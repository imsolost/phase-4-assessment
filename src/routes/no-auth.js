const users = require('../db/users.js')
const albums = require('../db/albums.js')
const router = require('express').Router()

router.get('/', (req, res) => {
  albums.getAll()
    .then(albums => res.render('index', {albums}))
    .catch(error => res.status(500).render('error', {error}))
})

router.get('/albums/:albumId', (req, res) => {
  albums.getById(req.params.albumId)
    .then(album => res.render('album', {album}))
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
