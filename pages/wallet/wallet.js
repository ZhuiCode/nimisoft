var app=getApp();
Page({
    data: {
        remain_power: 0
    },
    onLoad: function () {
        var that = this;
        that.setData({
            'remain_power':app.globalData.remain_power       
            })

    },
    exchange:function()
    {
        wx.navigateTo({
          url: '../exchange/exchange'
        })
    },
})