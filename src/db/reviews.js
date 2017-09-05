const db = require('./db')

getRecentReviews = () => {
  return db.query(`
    SELECT * FROM reviews
    JOIN albums USING(album_id)
    JOIN users USING(user_id)
    ORDER BY review_id DESC
    LIMIT 3`,
    [])
    .catch( (error) => {
      console.log("\nError in getAll query\n")
      throw error
    })
}

createReview = (user_id, album_id, content) => {
  return db.none(`
    INSERT INTO reviews (user_id, album_id, content)
    VALUES ($1, $2, $3)`,
    [user_id, album_id, content])
    .catch((error) => {
      console.log("\nError in posts.create query\n")
      throw error
    })
}

deleteReview = (review_id) => {
  return db.none(`
    DELETE FROM reviews
    WHERE review_id = $1`,
    [review_id])
    .catch((error) => {
      console.log("\nError in posts.create query\n")
      throw error
    })
}

getReviewById = (review_id) => {
  return db.one(`
    SELECT* FROM reviews
    FULL OUTER JOIN users USING(user_id)
    WHERE review_id = $1`,
    [review_id])
    .catch((error) => {
      console.log("\nError in posts.create query\n")
      throw error
    })
}

module.exports = {
  getRecentReviews,
  createReview,
  deleteReview,
  getReviewById
}
