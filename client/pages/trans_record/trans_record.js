var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
 function update_timefmt(str_info)
 {
     for (var i = 0; i < str_info.length; i++)
     {
         var str_date = str_info[i].updatetime;
         var str_date_temp = str_date.split(".");
          var str_date_need = str_date_temp[0].replace(/T/, " ");
          str_info[i].updatetime = str_date_need;
     }
 }

Page({
    data:{
        trans_rec:null
    },
    onLoad: function () {
        var that = this;
        qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
                //console.log(config.service.requestUrl);
                console.log(result);
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
                            var str_info = result.data.trans_rec
                            update_timefmt(str_info);

                            that.setData({
                                trans_rec: str_info
                            })
                        }
                    },
                    fail(error) {
                        //util.showModel('请求失败', error)
                        console.log('request fail', error)
                    }
                });
            },
        })
    }
})