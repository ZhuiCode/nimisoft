var util = require('../../utils/util.js');
var app=getApp();

Page({
    data: {
        cur_date: ""
    },
    onLoad: function () {
        var that = this;
        var date_now = new Date();
        var date = util.formatTime(date_now);
        //调用应用实例的方法获取全局数据D
        that.setData({
            cur_date:date,
        })
    },

})

