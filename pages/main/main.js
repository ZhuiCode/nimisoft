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
  onReady: function () {
    // 页面渲染完成
    var cxt_arc = wx.createContext();//创建并返回绘图上下文context对象。
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(187, 100, 70, 0, 2 * Math.PI, true);//设置一个原点(100,50)，半径为为50的圆的路径到当前路径
    cxt_arc.setStrokeStyle('#C0C0C0');//设置线的颜色
    cxt_arc.setLineWidth(3);
    cxt_arc.stroke();//对当前路径进行描边
    cxt_arc.closePath();//关闭当前路径
    cxt_arc.setFontSize(16);
    cxt_arc.setFillStyle('red');
    cxt_arc.fillText('calorie', 160, 60);
    cxt_arc.setFillStyle('black');
    cxt_arc.fillText('000.00', 160, 90);
    cxt_arc.fillText('TIME', 167, 115);
    cxt_arc.setFontSize(12);
    cxt_arc.fillText('00:00:00', 163, 135)
    wx.drawCanvas({
      canvasId: 'canvasArc',//画布标识，对应<canvas/>的cavas-id
      actions: cxt_arc.getActions()//导出context绘制的直线并显示到页面
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