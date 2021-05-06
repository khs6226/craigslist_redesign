const db = require('../dbConnection');

function addPost(formData) {
    let sqlQuery = ``;

    db.query(sqlQuery, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results);
        }
    })
}