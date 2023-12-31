const express = require('express')  // 导入express
const mysql = require('mysql')
const bodyParser = require('body-parser')
const db = require('./db/index')   // 导入自定义的数据库连接对象
const passport = require('passport')
const uploader = require('express-fileupload')


// 实例化
const app = express()

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 初始化passport
app.use(passport.initialize())
// 使用uploader中间件
// app.use(express.urlencoded({ urlencoded: true }));
app.use(uploader())
// 连接mysql数据库
db.connect()

require('./config/passport')(passport)

// 首页路由
app.use('/', express.static('public'));
// app.get('/', (req, res) => {
//     res.send('hello world!')
// })
// 登录和注册路由
const adminRouter = require('./router/api/admin')
app.use('/api/admin', adminRouter)
// 用户路由
const usersRouter = require('./router/api/users')
app.use('/api', usersRouter)
// 资金路由
const fundsRouter = require('./router/api/funds')
app.use('/api', fundsRouter)
// 文件上传路由
const uploadRouter = require('./router/api/upload')
app.use('/api', uploadRouter)
// excel获得公司列表信息路由
const companyRouter = require('./router/api/company')
app.use('/api', companyRouter)


const port = process.env.PORT || 5000   // process.env.PORT:读取当前目录下环境变量port的值
app.listen(port, () => {
    console.log(` 端口${port}监听中,服务已经启动... `);
})