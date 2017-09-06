const reviews = require('../db/reviews.js')
const albums = require('../db/albums.js')
const router = require('express').Router()

router.route('/reviews/:title/new')
  .get((req, res) => {
    albums.getByTitle(req.params.title)
      .then(album => res.render('new-review', {album}))
      .catch(error => res.status(500).render('error', {error}))
  })
  .post((req, res) => {
    const user_id = req.session.user.user_id
    const content = req.body.content
    const album_id = req.body.album_id
    reviews.create(user_id, album_id, content)
      .then(res.redirect(`/albums/${req.params.title}`))
      .catch(error => res.status(500).render('error', {error}))
  })

router.delete('/delete/:review_id', (req, res) => {
  reviews.getById(req.params.review_id)
    .then((review) => {
      if (review.username === req.session.user.username) {
        reviews.remove(req.params.review_id)
      } else res.redirect('/')
    })
    .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
