const mysql = require('mysql2/promise');
const  DBConfig = require('./db.config');
require('dotenv').config;

// const poolConfig = {
//     host: 'containers-us-west-150.railway.app',
//     user: 'root',
//     password: 'OUN6iePSwOn8eHUI9OAz',
//     port: 5895,
//     database: 'railway'
// };

const db = {
    host: DBConfig.HOST,
    user: DBConfig.USER,
    password: DBConfig.PASSWORD,
    port:DBConfig.PORT,
    database: DBConfig.DB_RAILWAY_NAME
};

module.exports = mysql.createPool(db);
