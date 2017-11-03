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
        user_opendid:"",
    },
    onLoad: function () {
        var that = this;
        qcloud.request({
            url: config.service.requestUrl,
            login:true,
            success(result) {
                //console.log(config.service.requestUrl);
                console.log(result);
                if (result.statusCode == 200)
                {
                    that.setData({
                        user_opendid: result.data.data.openId
                    })
                }
                
            },

            fail(error) {
                //util.showModel('请求失败', error)
                console.log('request fail', error)
            }
        });
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
        console.log(this.data.user_opendid),
        wx.request({
            /*往微信小程序支付接口发送支付信息，包括订单号，金额，鱼食数以及openid，返回结果到requestPayment中进行真实支付*/
            url: config.service.paymentUrl,
            method: 'POST',
            data: {
                book_fish_food: this.data.items[items_idx].fish_food,
                total_fee: this.data.items[items_idx].value,   /*订单金额*/
                openid: this.data.user_opendid
            },
            
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("CCCCCCCCCCCCC" + res.data);
                var str_package = 'prepay_id=' + res.data.prepay_id;

                wx.requestPayment({
                    'timeStamp': res.data.str_timeStamp,
                    'nonceStr': res.data.nonceStr,
                    'package': str_package,
                    'signType': 'MD5',
                    'paySign': res.data._paySignjs,
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
            },
        })
    },
})