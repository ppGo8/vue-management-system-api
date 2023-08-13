/**
 * @描述:创建数据库的连接对象
 */

const mysql = require('mysql')

// // 2.创建数据库连接对象,填写配置信息
// // createPool 创建连接池,可以有多个连接
// // createConnection 只创建一个连接,有查询时后面的查询会被阻塞
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'manage', // 连接哪个数据库
})

module.exports = db