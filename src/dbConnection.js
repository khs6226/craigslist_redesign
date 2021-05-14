const mysql = require('mysql2');

const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_SCHEMA,
	multipleStatements: true,
 	namedPlaceholders: true
};

let database = mysql.createPool(dbConfig).promise();

module.exports = database;
		