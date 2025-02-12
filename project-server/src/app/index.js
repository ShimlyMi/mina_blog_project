const path = require('path');

const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');

const errorHandle = require("./errorHandle")
const router = require("../router")

const app = new Koa();

app.use(
    koaBody({
        multipart: true,
        formidable: {
            // 在配置选项option里, 不推荐使用相对路径
            // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
            uploadDir: path.join(__dirname, '../upload/static'),
            keepExtensions: true,
        },
        parsedMethods: ['POST','PUT','PATCH','DELETE']
    })
);
app.use(KoaStatic(path.join(__dirname, '../upload/static')))
app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods())


/* 监听 app.on */
app.on("error", errorHandle);
// 向外暴露 app 接口
module.exports = app;
