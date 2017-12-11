var app = getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({
    data: {
        user_opendid: null,
    },
    onLoad: function () 
    {
        var that = this;
        if (that.data.user_opendid) {
            console.log('aaaaaaaaaa')
        }
        else {
            //调用登录接口
            qcloud.request({
                url: config.service.requestUrl,
                login: true,
                success(result) {
                    //console.log(config.service.requestUrl);
                    console.log(result.data.data.openId);
                    if (result.statusCode == 200) {
                        that.setData({
                            user_opendid: result.data.data.openId
                        })
                    }
                    wx.scanCode({
                        success: function (res) {
                            var openid = that.data.user_opendid;                           
                            wx.request({
                                url: config.service.scanqMarkUrl,
                                data: {
                                    code_2d: {res, openid}
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function (res) {
                                    console.log("OK");
                                },
                            })
                        }
                    })
                },

                fail(error) {
                    //util.showModel('请求失败', error)
                    console.log('request fail', error)
                }
            });
        }
        
        
    }
})