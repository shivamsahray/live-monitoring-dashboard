const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'switchback.proxy.rlwy.net',
    user: 'root',
    password: 'lSAsasLVhaXOOCfTkSaqcHrfAwwMKGHs',
    database: 'railway'
});

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySQL");
});

module.exports  = connection;