var app=getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({
    data: { 
            user_opendid: null,
            array: ['身份证','护照','军官证'],
            nickname:null,
            height:null,
            weight:null,
            name:null,
            id_type:0,
            id_no:null,
    }, 
    onLoad: function ()
    {
        //调用应用实例的方法获取全局数据
        var that = this;
        qcloud.request({
            url: config.service.requestUrl,
            //login:true,
            success(result) {
                //console.log(config.service.requestUrl);
                // console.log(result);
                if (result.statusCode == 200) {
                    that.setData({
                        user_opendid: result.data.data.openId
                    })
                }
                var openid = that.data.user_opendid;
                var sec_that = that;
                wx.request({
                    url: config.service.getuserinfoUrl,
                    data: {
                        openid: openid
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.data.code == 0){
                                //do nothing
                        }
                        else {
                            that.setData({
                                nickname: res.data[0].nickname,
                                height: res.data[0].height,
                                weight: res.data[0].weight,
                                name: res.data[0].truename,
                                id_type: res.data[0].id_type,
                                id_no: res.data[0].id_no,
                                
                            })
                        }
                    },
                })
            },

            fail(error) {
                //util.showModel('请求失败', error)
                console.log('request fail', error)
            }
        });
    },
    formSubmit: function (e) 
    {
        var submit_info = e.detail.value;
        //var openid = this.user_opendid
        wx.request({
            url: config.service.setuserinfoUrl,
            data: {
                openid: this.data.user_opendid,
                user_info:submit_info
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res);
            },
        })
    },      
})
