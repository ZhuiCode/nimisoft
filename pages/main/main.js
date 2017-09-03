var app=getApp();

Page({
	data: { outer_info: {temperature:0,humidity:0,pm25:0,shop_name:0},
            inter_info:{temperature:0,humidity:0,pm25:0,cream:0},
			cur_people :0,
			today_total_people:0,
	},
	onLoad:function()
	{
		var that = this;
		that.setData({
            'outer_info.temperature':app.globalData.backbase.o_temperature,
            'outer_info.humidity':app.globalData.backbase.o_humidity,
            'outer_info.pm25':app.globalData.backbase.o_pm25,
            'outer_info.shop_name':app.globalData.backbase.store_name,
            
            'inter_info.temperature':app.globalData.backbase.i_temperature,
            'inter_info.humidity':app.globalData.backbase.i_humidity,
            'inter_info.pm25':app.globalData.backbase.i_pm25,
            'inter_info.cream':app.globalData.backbase.aroma,

            'cur_people':app.globalData.backbase.cur_people,
            'today_total_people' : app.globalData.backbase.total_people ,         
            })
		
	},

	scan_begin:function()
	{
		wx.scanCode({
			success: function(res) {
                wx.request({
                    url: 'https://www.seibertron.cn',
                    data: {
                        code_2d :res
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        console.log("OK");
                    },
			    })
		    }
        })
    }
})