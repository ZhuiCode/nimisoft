var app=getApp();
Page({
    data: {
        remain_power: 0,
        items: [
          { fish_food: '50', value:'19.98'}, 
          { fish_food: '100', value:'99'},
          { fish_food: '200', value:'198'},
          { fish_food: '300', value:'295'},
        ],
        pick_arr: ['50颗(优惠价:19.98元)', '100颗(优惠价:19.98元)', '200颗(优惠价:19.98元)','300颗(优惠价:19.98元)'],
        index:1,
    },
    onLoad: function () {
        var that = this;
        that.setData({
            'remain_power': app.globalData.remain_power,
        });
    },
    bindPickerChange: function (e) {
      
      this.setData({ index: e.detail.value })
    },
    trans_record: function () {
        wx.navigateTo({
            url: '../trans_record/trans_record'
        })
    },
})