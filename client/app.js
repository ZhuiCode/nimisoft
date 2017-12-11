
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
qcloud.setLoginUrl(config.service.loginUrl)
App({
    globalData: {
        userInfo: null,
        logged:false
    },
    
    onLaunch: function () {
        
        if (this.globalData.logged) {
            return;
        }
        var that = this;
        qcloud.login({
            success(result) {
                if (result) {
                    //util.showSuccess('登录成功')
                    that.globalData.user_opendid = result.data.data.openId,
                    that.globalData.logged = true

                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                        qcloud.request({
                            url: config.service.requestUrl,
                            //login: true,
                            success(result) { 
                                if (result.statusCode == 200) {
                                    that.globalData.user_opendid= result.data.data.openId,
                                    that.globalData.logged = true
                                }     
                            },
                            fail(error) {
                                //util.showModel('请求失败', error)
                                console.log('request fail', error)
                            }
                        });
                    };
                },
            fail(error) {
                //util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
    } 
})
