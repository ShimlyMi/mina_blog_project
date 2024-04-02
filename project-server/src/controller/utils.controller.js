const path = require('path');
const { ERRORCODE, throwError, result } = require("../constant/err.type")
const errorCode = ERRORCODE.UPLOAD

class UtilsController {
    /** 图片上传 */
    async upload(ctx, next) {
        const { file } = ctx.request.files;
        // console.log(file);
        const fileTypes = ['image/jpeg', 'image/png']
        // console.log(file)
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                console.log(ctx.request.files.file.mimetype)
                return ctx.app.emit('error', throwError(errorCode, "文件格式错误"), ctx)
            }
            ctx.body = result("图片上传成功", {
                url: "http://127.0.0.1:8888/" + path.basename(file.filepath),
            })
            // console.log(file.filepath);
            console.log("图片上传成功");
        } else {
            return ctx.app.emit('error', throwError(errorCode, "图片上传失败"), ctx)
        }
    }
}

module.exports = new UtilsController();
