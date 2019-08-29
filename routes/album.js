const Router = require('koa-router');
const router = new Router();
const GetAlumInfo = require('../controllers/album')

router.post('/upload2', GetAlumInfo.uploadFile2)


module.exports = router.routes();