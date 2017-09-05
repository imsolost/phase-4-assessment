const db = require('./db')

getAll = () => {
  return db.query(`SELECT * FROM albums`, [])
    .catch( (error) => {
      console.log('\nError in getAll query\n')
      throw error
    })
}

getByTitle = (title) => {
  return db.query(`
    SELECT * FROM albums
    FULL OUTER JOIN reviews USING(album_id)
    FULL OUTER JOIN users USING(user_id)
    WHERE albums.title = $1
    ORDER BY review_id DESC`,
    [title])
    .catch( (error) => {
      console.log('\nError in getByTitle query\n')
      throw error
    })
}

module.exports = {
  getAll,
  getByTitle,
}
