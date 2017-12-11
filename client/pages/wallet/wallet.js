var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
function random(num) {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
        , "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var result = "";
    for (var i = 0; i < num; i++) {
        var r = Math.floor(Math.random() * 36);
        result += data[r];
    }
    return result;
}
function pad(num, n) 
{
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
} 
function creat_bookingNo()
{
    var myDate = new Date();
    var year = myDate.getFullYear().toString();    //获取完整的年份(4位,1970-????)
    var month = (myDate.getMonth()+1).toString();       //获取当前月份(0-11,0代表1月)
    var day = myDate.getDate().toString();        //获取当前日(1-31)
    var hour = myDate.getHours().toString();       //获取当前小时数(0-23)
    var minute = myDate.getMinutes().toString();     //获取当前分钟数(0-59)
    var second = myDate.getSeconds().toString();     //获取当前秒数(0-59)
    var Milsecond = myDate.getMilliseconds().toString();    //获取当前毫秒数(0-999)
    var bookingNO = year + pad(month, 2) + pad(day, 2) + pad(hour, 2) + pad(minute, 2) + pad(second, 2) + pad(Milsecond, 3) + random(15)
    return bookingNO;
}


Page({
    data: {
        remain_power: 0,
        items: null,
        picks: null,
        index:0,
        user_opendid:"",
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: config.service.getstorepriUrl,
            data: {
                store_code: 11
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res);
                var price_list = res.data[0];
                var pick_arr = new Array(price_list.price_level);
                var item_obj = new Array(price_list.price_level);
                for (var i = 0; i < price_list.price_level; i++) {
                    var cur_idx = i + 1;
                    item_obj[i]  = { power: price_list["power" + cur_idx.toString()], value: price_list["value" + cur_idx.toString()] }
                    pick_arr[i] =  price_list["power" + cur_idx.toString()] + "颗  优惠价" + price_list["value" + cur_idx.toString()] + "元";
                }
                that.setData({
                    items: item_obj,
                    picks: pick_arr,
                })
            }
        }),
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

                    wx.request({
                        url: config.service.getremainpowerUrl,
                        data: {
                            openid: result.data.data.openId
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/json'
                        },
                        success(result) {
                            //console.log(config.service.requestUrl);
                            console.log(result);
                            if (result.statusCode == 200) {
                                that.setData({
                                    remain_power: result.data.remain_power
                                })
                            }
                        },

                        fail(error) {
                            //util.showModel('请求失败', error)
                            console.log('request fail', error)
                        }
                    });
                }
            },

            fail(error) {
                //util.showModel('请求失败', error)
                console.log('request fail', error)
            }
        });
        /*剩余能量获取*/  
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
        var that = this;
        var items_idx =  e.detail.value["idx"]; 
        var cur_bookingNo = creat_bookingNo();
        wx.request({
            /*往微信小程序支付接口发送支付信息，包括订单号，金额，鱼食数以及openid，返回结果到requestPayment中进行真实支付*/
            url: config.service.paymentUrl,
            method: 'POST',
            data: {
                bookingNo: cur_bookingNo,
                total_fee: this.data.items[items_idx].value,   /*订单金额*/
                openid: this.data.user_opendid
            },
            
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                var str_package = 'prepay_id=' + res.data.prepay_id;

                wx.requestPayment({
                    'timeStamp': res.data.str_timeStamp,
                    'nonceStr': res.data.nonceStr,
                    'package': str_package,
                    'signType': 'MD5',
                    'paySign': res.data._paySignjs,
                    success: function (res) {
                        
                        var cur_time = new Date().toLocaleString();
                        wx.request({
                            url: config.service.addpayrecordUrl,
                            data: {
                                openid: that.data.user_opendid,
                                pay_sum: that.data.items[items_idx].value,
                                pay_power: that.data.items[items_idx].power,
                                bookingNo: cur_bookingNo,
                                store_code:11,
                                date: cur_time
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (res) {
                                console.log(res); 
                            },
                            fail: function (res) {
                                console.log('add pay record fail');
                            },
                        })
                    },
                    fail: function (res) {
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