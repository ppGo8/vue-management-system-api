const db = require('../../db/index')

// 查找全部数据
exports.companyAll = (req, res) => {
    const sql = `select * from company order by id asc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('查无数据')
        res.json(results)
    })
}

