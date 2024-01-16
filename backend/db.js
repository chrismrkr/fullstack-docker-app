const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'chrismrkr',
    database: 'myapp',
})

exports.pool = pool;