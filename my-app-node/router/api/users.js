/*
 * @描述:用于用户信息的路由,使用RESTful API 
 */
const express = require('express')
const passport = require('passport')
const router = express.Router()
const usersHandler = require('../handler/usersHandler')

// 获取所有用户信息
// $router GET users
// @desc 返回请求的json数据
// @access private
router.get('/users',
    passport.authenticate('jwt', { session: false }),
    usersHandler.getAllUsers)

// 获取单个用户信息
// $router GET users/:id
// @desc 返回请求的json数据
// @access private
router.get('/users/:id',
    passport.authenticate('jwt', { session: false }),
    usersHandler.getOneUsers)

// 增加
// $router post users
// @desc 创建用户信息接口
// @access private
router.post('/users',
    passport.authenticate('jwt', { session: false }),
    usersHandler.postUsers)

// 更新
// $router put users/:id
// @desc 编辑/更新用户信息接口
// @access private
router.put('/users/:id',
    passport.authenticate('jwt', { session: false }),
    usersHandler.putUsers)

// 删除
// $router delete users/:id
// @desc 删除用户信息接口
// @access private
router.delete('/users/:id',
    passport.authenticate('jwt', { session: false }),
    usersHandler.deleteUsers)

module.exports = router