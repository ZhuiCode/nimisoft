/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://554717772.amidenzheng.cn';

var config = {
    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,
        
        // 微信支付接口
        paymentUrl: `${host}/weapp/payment`,
        
        //店铺信息获取接口
        storeinfoUrl: `${host}/weapp/opstoreinfo`,
        //二维码扫描接口
        scanqMarkUrl:`${host}/weapp/scanqmark`,
        //获取注册用户信息
        getuserinfoUrl: `${host}/weapp/getuserinfo`,

        //设置注册用户信息
        setuserinfoUrl: `${host}/weapp/setuserinfo`,

        //获取店铺价格信息
        getstorepriUrl: `${host}/weapp/getstoreprilist`,

        //增加交易记录
        addpayrecordUrl: `${host}/weapp/addpayrecord`,

        //获取剩余能量
        getremainpowerUrl: `${host}/weapp/getremainpower`,
    }
};

module.exports = config;