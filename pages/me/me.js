var app=getApp();
Page({
    data: {
        userInfo: {}
    },
    onLoad: function () {
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        })
    },
    wallet:function()
    {
        wx.navigateTo({
          url: '../wallet/wallet'
        })
    },
    health_data:function()
    {
        wx.navigateTo({
          url: '../health_data/health_data'
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