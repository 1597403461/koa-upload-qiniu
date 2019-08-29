const statusCode = require("../utils/statusCode");
// 为文件进行命名（唯一标识）
const uuid = require("uuid");
const fs = require("fs");
const func = require("./../utils/upload");
class GetAlbumController {
  //上传图片七牛云
  async uploadFile2(ctx) {
    try {
      // 前端必须以formData格式进行文件的传递
      const file = ctx.request.files.file; // 获取上传文件
      if (file) {
        // 命名文件
        const fileName = uuid.v1();
        // 创建文件可读流
        const reader = fs.createReadStream(file.path);
         // 获取上传文件扩展名
        const ext = file.name.split(".").pop();
        // 命名文件以及拓展名
        const fileUrl = `${fileName}.${ext}`;
        // 调用方法(封装再utils文件夹内)
        const result = await func.upToQiniu(reader, fileUrl);
        if (result) {
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS("上传成功！", result);
        } else {
          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS("上传失败！");
        }
      } else {
        ctx.response.status = 400;
        ctx.body = statusCode.ERROR_ARG("没有选择图片");
      }
    } catch (err) {
      ctx.response.status = 404;
      ctx.body = statusCode.ERROR_ARG("错误");
    }
  }
}

module.exports = new GetAlbumController();
