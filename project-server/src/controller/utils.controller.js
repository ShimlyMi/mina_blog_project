const path = require('path');

const { unSupportedFileType, fileUploadError} = require("../constant/err.type");

class UtilsController {
    /** 头像上传 */
    async upload(ctx, next) {
        const { file } = ctx.request.files;
        // console.log(file);
        const fileTypes = ['image/jpeg', 'image/png']
        console.log(file)
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                console.log(ctx.request.files.file.mimetype)
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    avatar: path.basename(file.filepath),
                },
            }
            console.log("头像上传成功");
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }
}

module.exports = new UtilsController();
