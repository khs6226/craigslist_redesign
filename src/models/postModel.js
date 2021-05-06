const db = require('../dbConnection');

function addPost(formData, cb) {
    let sqlQuery;
    // pass in data from a controller that can call postal api and use 
    // if user is logged in 
    if (formData.user_id) {
        sqlQuery = `INSERT INTO post (user_id, category, title, price, description, make, model, dimensions, email, phone, city)
                    VALUES (:user_id, :category, :title, :price, :description, :make, :model, :dimensions, :email, :phone, :city)`;
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
        dimsnsions: formData.dimsnsions,
        email: formData.email,
        phone: formData.phone,
        city: formData.city
    }

    db.query(sqlQuery, params, (err) => {
        if (err) {
            cb(err, null);
        }
    })
}

module.exports = { addPost }

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