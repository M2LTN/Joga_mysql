const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
});

con.connect(err => {
    if (err) throw err;
    console.log('Connection established');
});
module.exports = con;