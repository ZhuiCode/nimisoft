/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口--前面是路径，后面是调用的接口--callback函数
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)
//router.post('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// --- 支付接口 --- //
router.post('/payment', controllers.payment)
// POST 用来处理微信转发过来的客服消息


// --- 数据库操作接口 --- //

//--- store数据库操作接口---//
//--- store数据库店铺信息表表操作接口---//
router.get('/opstoreinfo', controllers.opstoreinfo)

//---扫描二维码操作---//
router.post('/scanqmark', controllers.scanqmark)
//--- 获取店面价格列表操作接口---//
router.post('/getstoreprilist', controllers.getstoreprilist)


//--- user数据库操作接口---//
//---user数据库个人信息表接口---//
router.post('/getuserinfo', controllers.getuserinfo)
//---user数据库个人信息表接口---//
router.post('/setuserinfo', controllers.setuserinfo)

//---user数据库个人充值记录表接口---//
router.post('/addpayrecord', controllers.addpayrecord)

// ---获取个人剩余总的能量接口-- -//
router.post('/getremainpower', controllers.getremainpower)


//---user数据库个人运动计划表接口---//
//router.post('/op_user_permp', controllers.op_user_permp)


//---user数据库个人消费记录表接口---//
//router.post('/op_user_pertrans', controllers.op_user_pertrans)


module.exports = router
