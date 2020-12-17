// 引入mysql模块
const mysql = require('mysql');
// 创建链接池
const pool = mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'',
    database:'furniture',
    connectionLimit:'20'
});
// 导出链接池
module.exports = pool;