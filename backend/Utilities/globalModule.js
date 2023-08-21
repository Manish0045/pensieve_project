const mysql = require('mysql');

const mm = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

mm.connect(() => {
    console.log("Connected to MySQL");
});

module.exports = mm;