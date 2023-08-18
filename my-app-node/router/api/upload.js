/**
 * @描述:文件上传接口
 */
const express = require('express')
const router = express.Router()
const passport = require('passport')
// 处理文件的中间件
const uploader = require('express-fileupload');
// 引入路径处理
const { extname, resolve } = require('path');
const {
    promises: {
        writeFile,
        appendFile,
    },
    existsSync,
} = require('fs');

const uploadHandler = require('../handler/uploadHandler')

// 大文件上传
router.post('/upload',
    passport.authenticate('jwt', { session: false }),
    uploadHandler.uploadFile
)
// 小文件和多文件上传
router.post('/smallUploader',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // 还需要做点什么,保存文件
        res.json('文件上传成功')
    }

)



module.exports = router