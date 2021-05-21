const db = require('../dbConnection');
const dbPromise = require('../dbPromise');


async function addPost(formData, locationData, cb) {
    let sqlQuery;
    // pass in data from a controller that can call postal api and use 
    // if user is logged in
    if (formData.user_id) {
        sqlQuery = `BEGIN;
                    INSERT INTO post (user_id, category, title, description, price, date)
                        VALUES (:user_id, :category, :title, :description, :price, :date);
                        SET @post_id = LAST_INSERT_ID();
                    INSERT INTO contact (post_id, email, phone) 
                        VALUES (@post_id, :email, :phone);
                    INSERT INTO location (post_id, city, latitude, longitude) 
                        VALUES (@post_id, :city, :latitude, :longitude);
                    INSERT INTO details (post_id, make, model, dimensions, prod_condition) 
                        VALUES (@post_id, :make, :model, :dimensions, :condition);
                    COMMIT;`;
    }
    // include query for users not logged in? 

    let params = { 
        user_id: formData.user_id,
        category: formData.category,
        title: formData.title,
        price: formData.price,
        date: new Date(new Date().toUTCString().substr(0, 25)),
        description: formData.description,
        make: formData.make,
        model: formData.model,
        dimensions: formData.dimensions,
        condition: formData.condition,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        latitude: locationData.lat,
        longitude: locationData.lon
    }

    // db.query(sqlQuery, params, (err) => {
    //     if (err) {
    //         cb(err, null);
    //         return;
    //     }
    //     db.query(`SELECT post_id FROM post WHERE user_id = '${formData.user_id}' AND title = '${formData.title}' AND description = '${formData.description}';`, (err, result) => {
    //         if (err) {
    //             cb(err, null);
    //             return;
    //         }
    //         cb(null, result[0])
    //         return;
    //     })
    // })

    let createdPost = await dbPromise.query(sqlQuery, params);
    console.log('createdPost', createdPost[0][1].insertId);
    return createdPost[0][1].insertId;
}

function addImageKey(formData, key, postId, cb) {
  let sqlQuery = "INSERT INTO image (imageKey, post_id) VALUES (:key, :post_id);";

  let params = {
    key: key,
    post_id: postId
  }

  db.query(sqlQuery, params);
}

function getPostById(postId, cb) {
    let sqlQuery = `SELECT post.post_id, category, title, description, user_id, price, date, email, phone, make, model, dimensions, prod_condition, city, latitude, longitude, imageKey
                        FROM post
                    LEFT JOIN contact ON post.post_id = contact.post_id
                    LEFT JOIN details ON post.post_id = details.post_id
                    LEFT JOIN location ON post.post_id = location.post_id
                    LEFT JOIN image ON post.post_id = image.post_id
                    WHERE post.post_id = :postId;`
    let params = { postId: postId }

    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results)
        }
    })
}

function getPostByUserId(userId, cb) {
  let sqlQuery = `SELECT * FROM post WHERE user_id = :userId`
    let params = { userId: userId }

    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results)
        }
    })
}

function getPostByCategory(category, cb) {
    let sqlQuery = `SELECT post.post_id, category, title, description, user_id, price, date, email, phone, make, model, dimensions, prod_condition, city, latitude, longitude
                        FROM post
                    LEFT JOIN contact ON post.post_id = contact.post_id
                    LEFT JOIN details ON post.post_id = details.post_id
                    LEFT JOIN location ON post.post_id = location.post_id
                    WHERE category = :category`
    let params = { category: category }

    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results)
        }
    })
}

function deletePost(postId, cb) {
    let sqlQuery = `DELETE FROM post WHERE post_id = :postId`
    let params = { postId: postId }

    db.query(sqlQuery, params, (err, done) => {
        if (err) {
            cb(err, null);
        }
    })
}

module.exports = { addPost, getPostById, deletePost, getPostByCategory, getPostByUserId, addImageKey }


//   user_id: 'auth0|60887546e896360069a6a5b9',
//   title: '',
//   price: '',
//   description: '',
//   images: '',
//   make: '',
//   model: '',
//   dimensions: '',
//   email: '',
//   phone: '',
//   city: '',
//   postal: ''


// `INSERT INTO post (user_id, category, title, price, description, make, model, dimensions, email, phone, city)
// VALUES (:user_id, :category, :title, :price, :description, :make, :model, :dimensions, :email, :phone, :city);`  