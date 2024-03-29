# 项目创建详情

## 一、后端创建

### 1.  初始化项目

#### (1) 创建项目

```
// 初始化npm，生成 package.json 文件，项目依赖文件
npm init -y 

// git 初始化 生成 .git隐藏文件， git的本地仓库
git init

// 创建 README.md 文件
touch README.md

// 安装 KOA 框架
npm install koa

```

创建 `src/app/index.js`

```js
const Koa = require('koa');
const userRouter = require("../router/user.route")

const app = new Koa();

app.use(userRouter.routes())
// 向外暴露 app 接口
module.exports = app;
```



创建 `src/main.js`

```js
const { APP_PORT } = require("./website/website.default")
// 导入 app
const app = require("./app")

app.use((ctx, next) => {
    ctx.body = 'hello api';
})

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})
```

安装 自动重启服务 nodemon

```
npm i nodemon -D
```

编写  `package.json` 脚本

```json
"scripts": {
	"dev": "nodemon ./src/main.js",
	"test": "echo \"Error: no test specified\" && exit 1"
},
```

#### (2) 配置文件

安装 `dotenv`，读取根目录中的 `.env` 文件

```
npm i dotenv -S
```

创建 `.env` 文件

```
APP_PORT=8888

// 配置 mysql

MYSQL_HOST = localhost
MYSQL_POST = 3306
MYSQL_USER = root
MYSQL_PWD = root
MYSQL_DB = mgsc
```

创建 `config/config.default.js

```js
const dotenv = require("dotenv");

dotenv.config()

// console.log(process.env.APP_PORT)

module.exports = process.env
```

#### (3) 添加路由

安装koa-router

```
npm i koa-router
```

创建 `src/route`  目录，每一个功能对应着不同的路由文件

```js
const Router = require('koa-router')
// 编写一个前缀 用于区分
const router = new Router({ prefix: '/xxx' })
```

#### (4)  添加控制器

创建控制器文件  `src/controller`，每一个功能对应着不同的控制器文件

```js
/*
 * 用的是 ES6 的写法，用 类 编写 异步请求的函数 
 */
class 要实现的功能的名字 {
  aysnc 函数(ctx,next) {操作}
}

// 对外暴露
module.exports = new 要实现的功能的名字();

// 然后去路由文件引入
```

#### (5) 注册中间件

#### (5) 数据库操作

#### (6) 添加服务层
