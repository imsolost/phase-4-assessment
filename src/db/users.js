const db = require('./db')

const create = (username, email, password) => {
  return db.one(`
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING user_id`,
    [username, email, password])
    .catch((error) => {
      console.log('\nError in create query\n')
      throw error
    })
}

const getByUsername = (username) => {
  return db.query(`
    SELECT * FROM users
    FULL OUTER JOIN reviews USING(user_id)
    FULL OUTER JOIN albums USING(album_id)
    WHERE users.username = $1
    ORDER BY review_id DESC`,
    [username])
    .catch((error) => {
      console.log('\nError in getByUsername query\n')
      throw error
    })
}

module.exports = {
  create,
  getByUsername,
}
