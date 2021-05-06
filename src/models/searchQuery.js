const db = require('../dbConnection');

function searchQuery(queryString, cb) {
    let searchParam = `%${queryString}%`

    let sqlQuery = `SELECT post_id, title, description, price FROM post WHERE title LIKE :queryString OR description LIKE :queryString OR category LIKE :queryString;;`;
    let params = { queryString: searchParam }
    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results);
        }
    })
}

module.exports = searchQuery;