/*
 * @描述:返回公司列表信息的路由
 */
const express = require('express')
const passport = require('passport')
const router = express.Router()
const companyHandler = require('../handler/companyHandler')


// 发送请求获得数据
// $router GET current
// @desc 验证通过,返回当前用户请求的数据
// @access private
router.get('/company',
    passport.authenticate('jwt', { session: false }), companyHandler.companyAll)

// 暴露对象
module.exports = router
