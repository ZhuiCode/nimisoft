var app=getApp();
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
    },
    onLoad: function () {
        var that = this;
        that.setData({
            'remain_power': app.globalData.remain_power,
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
    buy_now: function () 
    {
        wx.request({
            url: '',
            method: 'POST',
            data: {
                bookingNo: bookingNo,  /*订单号*/
                total_fee: total_fee,   /*订单金额*/
                openid: openid
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                wx.requestPayment({
                    'timeStamp': timeStamp,
                    'nonceStr': nonceStr,
                    'package': 'prepay_id=' + res.data.prepay_id,
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
            }
        })
    },
})