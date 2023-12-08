const path = require('path');

const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaStatic = require('koa-static');

const errorHandle = require("./errorHandle")
const router = require("../router")

const app = new Koa();
app.use(
    koaBody({
        multipart: true,
        formidable: {
            // 在配制选项option里, 不推荐使用相对路径
            // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
            uploadDir: path.join(__dirname, '../upload'),
            keepExtensions: true,
        },
    })
);
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(router.routes()).use(router.allowedMethods())


/* 监听 app.on */
app.on("error", errorHandle);
// 向外暴露 app 接口
module.exports = app;
