var app=getApp();
Page({
    data: { 
            array: ['身份证','护照','军官证'],
            index:0
    }, 
    onLoad: function ()
    {
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo)
        {
          //更新数据
          that.setData({ userInfo:userInfo })
        });
    },
    bindPickerChange: function (e) 
    {
       this.setData({ index: e.detail.value })
    },
      
})
