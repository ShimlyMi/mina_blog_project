
const { articleFormatError } = require("../constant/err.type")

const validatorArticle = async (ctx, next) => {
    try {
        ctx.verifyParams({
            article_title: { type: 'string', required: true },
            article_content: { type: 'string', required: true },
            category_id: { type: 'integer', required: true },
            article_description: { type: 'string' },
        })

    } catch (err) {
        console.error(err);
        articleFormatError.result = err;
        return ctx.app.emit('error', articleFormatError, ctx);
    }
    await next();
}

module.exports = {
    validatorArticle,
}