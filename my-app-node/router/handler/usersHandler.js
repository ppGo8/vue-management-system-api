const db = require('../../db/index')

exports.getAllUsers = (req, res) => {
    // if (req.body.pageNum) fields.pageNum = req.query.pageNum
    // if (req.body.pageSize) fields.pageSize = req.query.pageSize
    // 默认的页码和页号
    let count
    const { pageNum = 1, pageSize = 10, name = '' } = req.query
    db.query('select count(*) as total from users where name like ' + `'%${name}%'`, (err, results) => {
        count = results[0].total  // 数据库的总条数

    })

    // 查询全部用户数据  
    const sql = `select * from users where name like` + `'%${name}%'` + `order by id desc limit ${(pageNum - 1) * pageSize}, ${pageSize} `
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('没有数据!')
        res.json(
            {
                code: 200,
                list: results,
                count: count
            }
        )
    })
}

// 获取单个用户信息
exports.getOneUsers = (req, res) => {
    if (!req.params.id) return res.status(400).json('错误,请重新查询!')

    const sql = `select * from users where id = ? `
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
    if (req.body.birth) fields.birth = req.body.birth.substr(0, 10)
    if (req.body.addr) fields.addr = req.body.addr

    const sql = `insert into users set ? `
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
    if (req.body.birth) fields.birth = req.body.birth.substr(0, 10)
    if (req.body.addr) fields.addr = req.body.addr
    // console.log(fields, req.params.id);
    // console.log(fields);
    // console.log(req.params.id);
    const sql = `update users set ? where id = ? `
    db.query(sql, [fields, req.params.id], (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(fields)
    })

}

// 删除用户
exports.deleteUsers = (req, res) => {
    if (!req.params.id) return res.status(400).json('错误,请重新查询!')

    const sql = `delete from users where id = ? `
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}