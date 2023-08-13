/*
 * @描述:用于注册和登录的路由 
 */

const express = require('express')
const router = express.Router()
const adminHandler = require('../handler/adminHandler')
const passport = require('passport')

// 注册
// $router POST api/admin/register
// @desc 返回请求的json数据
// @access public
router.post('/register', adminHandler.register)

// 登录
// $router POST login
// @desc 返回请求的json数据
// @access public
router.post('/login', adminHandler.login)

// 验证token测试接口
// $router GET current
// @desc 验证通过,返回当前用户请求的数据
// @access private
router.get('/current', passport.authenticate('jwt', { session: false }), adminHandler.checkToken)

// 暴露对象
module.exports = router