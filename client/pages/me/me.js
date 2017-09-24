var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var app = getApp();
Page({
    data: {
        userInfo: {},
        logged:false
    },
    onLoad: function () {
            if (this.data.logged) {
                return;
            }
            qcloud.setLoginUrl(config.service.loginUrl);
            var that = this;
            qcloud.login({
                success(result) {
                    if (result) {
                        //util.showSuccess('登录成功')
                        that.setData({
                            userInfo: result,
                            logged: true
                        })
                    } else {
                        // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取

                        qcloud.request({

                            url: config.service.requestUrl,
                            login: true,
                            success(result) {
                                that.setData({
                                    userInfo: result.data.data,
                                    logged: true
                                })
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
    },
    wallet:function()
    {
        wx.navigateTo({
          url: '../wallet/wallet'
        })
    },
    person_info:function()
    {
        wx.navigateTo({
          url: '../person_info/person_info'
        })
    },
    charge_standard:function()
    {
        wx.navigateTo({
          url: '../charge_standard/charge_standard'
        })
    },
    hotline:function()
    {
        wx.navigateTo({
          url: '../hotline/hotline'
        })
    }
})