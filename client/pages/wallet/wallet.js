var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

Page({
    data: {
        remain_power: 0,
        items: [
          { fish_food: '50', value:'19.98'}, 
          { fish_food: '100', value:'99'},
          { fish_food: '200', value:'198'},
          { fish_food: '300', value:'295'},
        ],
        pick_arr: ['50颗(优惠价:19.98元)', '100颗(优惠价:19.98元)', '200颗(优惠价:19.98元)','300颗(优惠价:19.98元)'],
        index:1,
        user_opendid:{},
        logged: false,
    },
    onLoad: function () {
        if (this.data.logged) {
            return;
        }
        var that = this;
        qcloud.setLoginUrl(config.service.loginUrl);
        qcloud.login({   
            success(result) {
                if (result) {
                    that.setData({
                        user_opendid: result.openId,
                        logged: true
                    })
                } else {
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            that.setData({
                                user_opendid: result.data.data.openId,
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
    bindPickerChange: function (e) {
      
      this.setData({ index: e.detail.value })
    },
    trans_record: function () {
        wx.navigateTo({
            url: '../trans_record/trans_record'
        })
    },
    buy_now: function (e) 
    {
        //var form_val = e.detail.value.toString();
        //var items_idx = form_val.split(':')[1];
        var form_val = JSON.stringify(e.detail.value).replace(/\{/,"");
        var form_val = form_val.replace(/\}/, "");
        var items_idx = form_val.split(':')[1];
        console.log('form发生了submit事件，携带数据为：', items_idx),
        
        wx.request({
            /*往微信小程序支付接口发送支付信息，包括订单号，金额，鱼食数以及openid，返回结果到requestPayment中进行真实支付*/
            url: config.service.paymentUrl,
            method: 'POST',
            data: {
                book_fish_food: this.data.items[items_idx].fish_food,
                book_fee: this.data.items[items_idx].value,   /*订单金额*/
                openid: user_opendid
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                var myDate = new Date();
                var cur_sec = myDate.getTime() / 1000; 

                wx.requestPayment({
                    'timeStamp': cur_sec,
                    'nonceStr':'U5iQqjfV123NT5du',
                    'package': 'prepay_id=' + 'res.data.prepay_id',
                    'signType': 'MD5',
                    'paySign': 'res.data._paySignjs',
                    'success': function (res) {
                        console.log(res);
                    },
                    'fail': function (res) {
                        console.log('fail:' + JSON.stringify(res));
                    }
                })
            },
            fail: function (err) {
                console.log(err)
            }
        })
    },
})