const db = require('../../db/index')
// 用户密码加密算法
const bcrypt = require('bcryptjs')
// 生成token的方法
const jwt = require('jsonwebtoken')
const config = require('../../config/keys')
const menu = require('./menu')

// 注册的回调函数
exports.register = (req, res) => {
    const adminInfo = req.body
    if (!adminInfo.name || !adminInfo.password) {
        return res.send({
            status: 400,
            message: '用户名或密码为空'
        })
    }

    const sql = 'select * from admin where name = ?'
    db.query(sql, adminInfo.name, (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                message: err.message
            })
        }

        if (results.length > 0) {
            return res.status(400).json('用户名已被注册,请重新输入用户名!')
        }

        // 用户密码加密,使用bcrypt;返回值是加密的字符串
        // console.log('@加密前:', adminInfo.password);
        adminInfo.password = bcrypt.hashSync(adminInfo.password, 10)
        // console.log('@加密后:', adminInfo.password);
        const sql = 'insert into admin set ?'
        db.query(sql, {
            id: 0,
            name: adminInfo.name,
            password: adminInfo.password,
            identity: adminInfo.identity
        }
        ), (err, results) => {
            // 这里的代码没有执行?
            // console.log('我是用户注册时未执行的代码');
            if (err) {
                return res.send({
                    status: 404,
                    message: err.message
                })
            }

            if (results.affectedRows !== 1) {
                return res.status(404).json('注册用户失败，请稍后再试')
            }
            // res.json({
            //     status: 200,
            //     message: '注册成功',
            //     name: adminInfo.name,
            //     identity: adminInfo.identity,
            // })

        }
        res.json({
            status: 200,
            message: '注册成功',
            name: adminInfo.name,
            identity: adminInfo.identity,
        })
    })


}

// 登录的回调函数
exports.login = (req, res) => {
    // console.log('有人想登陆!');
    // const adminInfo = req.body
    const name = req.body.name
    const password = req.body.password
    if (!name || !password) {
        return res.send({
            status: 404,
            message: '用户名或密码为空'
        })
    }

    // 查询数据库
    const sql = `select * from admin where name = ?  `
    db.query(sql, name, (err, results) => {
        if (err) {
            return res.status(404).json(err)
        }
        if (results.length !== 1) {
            return res.status(400).json('用户名不存在')
        }

        // bcrypt判断密码是否正确,返回布尔值
        const compareResult = bcrypt.compareSync(password, results[0].password)
        // console.log(password, results[0].password);
        if (!compareResult) {
            return res.status(400).json('密码输入错误 请重新输入')
        }

        // 设置token
        // jwt.sign('规则', '加密名字', '过期时间', '箭头函数')
        const token = jwt.sign(
            {
                id: results[0].id,
                name: results[0].name,
                identity: results[0].identity,
            }, config.jwtSecretKey,
            {
                expiresIn: '24h' // token有效期
            })

        res.json({
            status: 200,
            massage: '登录成功!',
            name: results[0].name,
            // 在服务器端拼接上 Bearer 的前缀,方便客户端使用
            token: 'Bearer ' + token,
            menu: results[0].identity === 'admin' ? menu.admin : menu.employ
        })
    })
}

// 验证Token的回调函数
exports.checkToken = (req, res) => {
    // res.json(req.user)  // 返回了太多信息
    res.json({
        id: req.user[0].id,
        name: req.user[0].name,
        identity: req.user[0].identity
    })
}