var app=getApp();
Page({
    data: {
        remain_power: 0
    },
    onLoad: function () {
        var that = this;
        that.setData({
            'remain_power':that.globalData.remain_power       
            })

    },
})