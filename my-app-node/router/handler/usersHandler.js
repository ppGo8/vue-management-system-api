const db = require('../../db/index')

exports.getAllUsers = (req, res) => {
    // 获取前端返回的页数和页码
    const pages = {}
    if (req.body.pageNum) fields.pageNum = req.body.pageNum
    if (req.body.pageSize) fields.pageSize = req.body.pageSize

    // 查询用户数据总条数
    db.query(`select count(*) as total from users`, (err, results) => {
        const count = results[0].total
        console.log('数据库的总条数:', results[0].total);
    })

    // 查询全部用户数据  
    const sql = `select * from users order by id desc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('没有数据!')
        res.json(results)
    })
}

// 获取单个用户信息
exports.getOneUsers = (req, res) => {
    if (!req.params.id) return res.status(400).json('错误,请重新查询!')

    const sql = `select * from users where id = ?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('没有数据!')
        res.json(results)
    })

}

// 新增用户
exports.postUsers = (req, res) => {
    const fields = {}
    if (req.body.name) fields.name = req.body.name
    if (req.body.sex) fields.sex = req.body.sex
    if (req.body.age) fields.age = req.body.age
    if (req.body.birth) fields.birth = req.body.birth
    if (req.body.addr) fields.addr = req.body.addr

    const sql = `insert into users set ?`
    db.query(sql, fields, (err, results) => {
        if (err) return res.status(404).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('添加失败')
        res.json({
            msg: '添加用户信息成功!'
        })
    })
}

// 编辑用户信息
exports.putUsers = (req, res) => {
    const fields = {}
    if (req.body.name) fields.name = req.body.name
    if (req.body.sex) fields.sex = req.body.sex
    if (req.body.age) fields.age = req.body.age
    if (req.body.birth) fields.birth = req.body.birth
    if (req.body.addr) fields.addr = req.body.addr

    // console.log(fields);
    // console.log(req.params.id);
    const sql = `update users set ? where id = ?`
    db.query(sql, [fields, req.params.id], (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(fields)
    })

}

// 删除用户
exports.deleteUsers = (req, res) => {
    if (!req.params.id) return res.status(400).json('错误,请重新查询!')

    const sql = `delete from users where id = ?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}