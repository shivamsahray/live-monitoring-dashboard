const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9540301762',
    database: 'live_monitoring'
});

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySQL");
});

module.exports  = connection;