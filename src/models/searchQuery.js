const db = require('../dbConnection');

function searchQuery(queryString, cb) {
    let sqlQuery = `SELECT post_id, title, description, price FROM post WHERE title LIKE '%${queryString}%' OR description LIKE '%${queryString}%';`;
    db.query(sqlQuery, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results);
        }
    })
}

module.exports = searchQuery;