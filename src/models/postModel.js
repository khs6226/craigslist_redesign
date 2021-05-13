const db = require('../dbConnection');

function addPost(formData, locationData, cb) {
    let sqlQuery;
    // pass in data from a controller that can call postal api and use 
    // if user is logged in
    if (formData.user_id) {
        sqlQuery = `BEGIN;
                    INSERT INTO post (user_id, category, title, description, price)
                        VALUES (:user_id, :category, :title, :description, :price);
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

    db.query(sqlQuery, params, (err) => {
        if (err) {
            cb(err);
        }
    })
}

function getPostById(postId, cb) {
    let sqlQuery = `SELECT post_id, category, title, description, user_id, price, email, phone, make, model, dimensions, prod_condition, city, latitude, longitude
	                    FROM post
                    LEFT JOIN contact ON post.contact_id = contact.contact_id
                    LEFT JOIN details ON post.details_id = details.details_id
                    LEFT JOIN location ON post.location_id = location.location_id
                    WHERE post_id = :postId;`
    let params = { postId: postId }

    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results)
        }
    })
}

function getPostByCategory(category, cb) {
    let sqlQuery = `SELECT post_id, category, title, description, user_id, price, email, phone, make, model, dimensions, prod_condition, city, latitude, longitude
                        FROM post
                    LEFT JOIN contact ON post.contact_id = contact.contact_id
                    LEFT JOIN details ON post.details_id = details.details_id
                    LEFT JOIN location ON post.location_id = location.location_id 
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


module.exports = { addPost, getPostById, deletePost, getPostByCategory }

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
//             VALUES (:user_id, :category, :title, :price, :description, :make, :model, :dimensions, :email, :phone, :city);`