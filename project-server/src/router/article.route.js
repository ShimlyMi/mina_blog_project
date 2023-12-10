
const Router = require('koa-router');

const { auth } = require("../middleware/auth.middleware")
const { validatorArticle } = require("../middleware/article.middleware")
const { create, update, remove, restore, findAll } = require("../controller/article.controller")

const router = new Router({ prefix: '/article' });

router.post('/', auth, validatorArticle, create);

router.put('/', auth, validatorArticle, update);

router.post('/:id/off', auth, remove);
router.post('/:id/on', auth, restore);

// 获取文章列表
router.get('/',findAll)

module.exports = router;