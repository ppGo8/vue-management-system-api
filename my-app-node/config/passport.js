/**
 * @描述:定义验证token的一些操作
 */

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql = require('mysql')
const db = require('../db/index')
const keys = require('./keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtSecretKey;

// 
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // 获取用户的一些信息
        console.log('@jwt_payload:', jwt_payload); // { id: 10, name: 'ppgo', iat: 1691890049, exp: 1691976449 } 
        const sql = `select * from admin where id =?`
        db.query(sql, jwt_payload.id, (err, results) => {
            if (err) {
                return done(null, err)
            }
            // 找不到用户
            if (results.length === 0) {
                return done(null, false)
            }
            // 找到用户返回查询结果
            return done(null, results)

        })

    }))
} 