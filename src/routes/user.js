const reviews = require('../db/reviews.js')
const albums = require('../db/albums.js')
const router = require('express').Router()

router.route('/reviews/new/:title') //albums/id or title/ reviews/ new
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
    .then(() => {
      return reviews.remove(req.params.review_id)
    })
    .then(() => res.json({message: 'successful delete'}))
    .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
