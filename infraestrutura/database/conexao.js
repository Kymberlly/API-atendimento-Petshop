const mysql = require('mysql2');
require('dotenv').config()


const conexao = mysql.createConnection({
    host: process.env.LOCALHOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

module.exports = conexao;