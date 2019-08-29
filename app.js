const Koa = require('koa')
const Router = require("koa-router");
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 实例化
const app = new Koa()
const router = new Router();

// 引入模块配置上传文件信息
const koaBody = require("koa-body");
// 配置上传文件的信息
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 2000 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  })
);
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())


// api
const getAlbumInfo = require("./routes/album");
router.use("/album", getAlbumInfo);

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app
  .use(router.routes()) /*启动路由*/
  .use(router.allowedMethods()); /**可以配置也可以不配置 */

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
