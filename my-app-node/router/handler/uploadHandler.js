/**
 * @描述:文件上传的接口函数
 */

// 引入路径处理
const { extname, resolve } = require('path');
const {
    promises: {
        writeFile,
        appendFile,
    },
    existsSync,
} = require('fs');

exports.uploadFile = async (req, res) => {
    const { name, size, type, offset, hash } = req.body;
    const { file } = req.files;
    console.log(name, size, type, offset, hash);

    const ext = extname(name)
    const filename = resolve(__dirname, `../../public/${name.substr(0, name.indexOf("."))}${hash.slice(0, 8)}${ext}`);
    console.log(filename);
    // 如果是断点续传
    if (offset > 0) {
        if (!existsSync(filename)) {
            res.status(400)
                .send({
                    message: '文件不存在',
                });
            return;
        }

        await appendFile(filename, file.data);
        res.send({
            data: 'appended',
        });
        return;
    }
    // 文件输出到public静态资源目录下
    await writeFile(filename, file.data);
    res.send({
        data: 'created',
    });

}