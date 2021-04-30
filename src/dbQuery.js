const db = require('./dbConnection');

const getPost = (cb) => {
  let sqlQuery = "SELECT post_id, title, description, price from post";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      cb(err, null);
      console.log('error', err);
    } else {
      console.log(sqlQuery);
      console.log(results);
      cb(null, results);
    }
  })
}

module.exports = { getPost };