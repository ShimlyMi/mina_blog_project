const { APP_PORT } = require("./config/config.default")
// 导入 app
const app = require("./app")

app.use((ctx, next) => {
    ctx.body = '请通过前端访问该地址';
})

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})