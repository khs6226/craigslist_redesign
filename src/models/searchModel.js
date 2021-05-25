const db = require('../dbConnection');

function searchModel(queryString, cb) {
    let searchParam = `%${queryString}%`

    // returns post review data 
    let sqlQuery = `SELECT post.post_id, category, title, description, user_id, price, date, email, phone, make, model, dimensions, prod_condition, city, latitude, longitude
                        FROM post
                    LEFT JOIN contact ON post.post_id = contact.post_id
                    LEFT JOIN details ON post.post_id = details.post_id
                    LEFT JOIN location ON post.post_id = location.post_id
                    WHERE title LIKE :queryString OR description LIKE :queryString OR category LIKE :queryString OR make LIKE :queryString OR model LIKE :queryString
                    ORDER BY post.date desc;`;
    let params = { queryString: searchParam }
    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results);
        }
    })
}

function categorySearch (queryString, category, cb) {
    let searchParam = `%${queryString}%`

    let sqlQuery = `SELECT post.post_id, category, title, description, user_id, price, date, email, phone, make, model, dimensions, prod_condition, city, latitude, longitude
                        FROM post
                    LEFT JOIN contact ON post.post_id = contact.post_id
                    LEFT JOIN details ON post.post_id = details.post_id
                    LEFT JOIN location ON post.post_id = location.post_id
                    WHERE category = :category AND (title LIKE :queryString OR description LIKE :queryString OR make LIKE :queryString OR model LIKE :queryString)
                    ORDER BY post.date desc;`;
    let params = { 
        queryString: searchParam,
        category: category
    }
    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results);
        }
    })
}

module.exports = { searchModel, categorySearch };