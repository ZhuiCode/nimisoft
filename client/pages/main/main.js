var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var app = getApp()
Page({
	data: { 
            backbase: {},
			cur_people :0,
            shop_name:null,
			today_total_people:0  ,
            o_temperature:null,
            o_humidity:null,
            o_pm25:null,
            i_temperature:null,
            i_humidity:null,
            i_pm25:null   
    },
    onLoad: function () 
    {
        var that = this;
        qcloud.request({
            url: config.service.storeinfoUrl,
            //login:true,
            success(result) {
                //console.log(config.service.requestUrl);
               // console.log(result);
                if (result.statusCode == 200)
                {
                    console.log("aaaaaaaaaa" + result.data)
                    that.setData({
                        shop_name: result.data[0].store_name,
                        cur_people: result.data[0].cur_users,
                        today_total_people: result.data[0].today_total_users,
                        o_temperature: result.data[0].outer_temp,
                        o_humidity: result.data[0].outer_humi,
                        o_pm25: result.data[0].outer_pm,
                        i_temperature: result.data[0].inner_temp,
                        i_humidity: result.data[0].inner_humi,
                        i_pm25: result.data[0].inner_pm,
                    })
                }
            },

            fail(error) {
                //util.showModel('请求失败', error)
                console.log('request fail', error)
            }
        });
        var screen_width;
        wx.getSystemInfo({
            success: function (res) {
                screen_width = res.windowWidth
            }
        });
        var cxt_arc = wx.createContext();//创建并返回绘图上下文context对象。
        cxt_arc.beginPath();//开始一个新的路径
        cxt_arc.arc(screen_width / 2, 100, 70, 0, 2 * Math.PI, true);//设置一个原点(100,50)，半径为为50的圆的路径到当前路径
        cxt_arc.setStrokeStyle('#C0C0C0');//设置线的颜色
        cxt_arc.setLineWidth(3);
        cxt_arc.stroke();//对当前路径进行描边
        cxt_arc.closePath();//关闭当前路径
        cxt_arc.setFontSize(16);
        cxt_arc.setFillStyle('red');
        cxt_arc.fillText('calorie', screen_width / 2 - 27, 60);
        cxt_arc.setFillStyle('black');
        cxt_arc.fillText('000.00', screen_width / 2 - 27, 90);
        cxt_arc.fillText('TIME', screen_width / 2 - 20, 115);
        cxt_arc.setFontSize(12);
        cxt_arc.fillText('00:00:00', screen_width / 2 - 24, 135)
        wx.drawCanvas({
            canvasId: 'canvasArc',//画布标识，对应<canvas/>的cavas-id
            actions: cxt_arc.getActions()//导出context绘制的直线并显示到页面
        })
    },
})