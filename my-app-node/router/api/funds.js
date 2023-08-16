const express = require('express')
const passport = require('passport')
const router = express.Router()
const fundsHandler = require('../handler/fundsHandler')


// 查询全部数据
// $router GET /funds
// @desc 返回请求的json数据
// @access private
router.get('/funds',
    passport.authenticate('jwt', { session: false }),
    fundsHandler.fundsAll)

// 新增
// $router post /funds
// @desc 返回请求的json数据
// @access private
router.post('/funds',
    passport.authenticate('jwt', { session: false }),
    fundsHandler.fundsAdd)

// 编辑
// $router put funds/:id
// @desc 编辑/更新用户信息接口
// @access private
router.put('/funds/:id',
    passport.authenticate('jwt', { session: false }),
    fundsHandler.fundsEdit)

// 删除
// $router delete funds/:id
// @desc 删除用户信息接口
// @access private
router.delete('/funds/:id',
    passport.authenticate('jwt', { session: false }),
    fundsHandler.fundsDelete)

// 向外共享对象
module.exports = router