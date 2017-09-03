var util = require('utils/util.js');

App({
  onLaunch: function () 
  {
      var that = this;
      wx.login({
        success: function(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://www.seibertron.cn',
              data: {
                code:res.code
              },
               header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                that.globalData.backbase = res;
              }
            });
          } else {
            console.log('获取用户登录状态失败！' + res.errMsg);
          }
         
          wx.getUserInfo({
                  success: function (userRes)
                  {
                      that.globalData.userInfo = userRes.userInfo;
                      that.globalData.usercode = res.code;
                  }
              });
        }
      });
  },
  getUserInfo:function(cb)
  {
      var that = this;
      if(this.globalData.userInfo)
      {
        typeof cb == "function" && cb(this.globalData.userInfo)
      }
      else
      {
        //调用登录接口
        wx.login({
            success: function () 
            {
              wx.getUserInfo({
                  success: function (res)
                  {
                      that.globalData.userInfo = res.userInfo;
                      typeof cb == "function" && cb(that.globalData.userInfo)
                  }
              })
            }
        });
      }
  },
  globalData:{
    userInfo:{},
    usercode:'',
    backbase:{}
  }
})
