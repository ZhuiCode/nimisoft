var app=getApp();
Page({
    data: { 
            age: [20,21,22,23,24,25,26,27,28, 29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70], 
            idx_age: 0, 
            sex: ['男', '女'], 
            idx_sex: 0, 
            bmi:0,
            height:'178cm',
            weight:68.0,
            bmi:0,
            modalHidden:true,
        }, 
        get_bmi: function()
        {  
            var that = this; 
            return 
        },
         onLoad: function () {
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo,
            })
        });  
        var weight_num = parseFloat(that.data.weight);
        var height_num = parseFloat(that.data.height);
        var bmi_temp =  weight_num / ((height_num /100)*(height_num /100));
        that.setData({ bmi:bmi_temp.toFixed(1) })
        
        var sys_info = wx.getSystemInfoSync();
        var context = wx.createContext();
        var opts = {
                    width: sys_info.screenWidth,    // 画布区域宽度
                    height: 320,   // 画布区域高度
                    x_categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017-01','2017-02'],
                    y_categories: ['0','20','40','60','80','100']
                }
        var x_eachSpacing_temp = Math.floor((opts.width-20) / (opts.x_categories.length-1));
        var x_eachSpacing = x_eachSpacing_temp > 50 ? 50 : x_eachSpacing_temp;
        var x_points = [];
       
        // 起始点x坐标
        var startX = 50;
        // 起始点y坐标
        var startY = 20;
        // 终点x坐标
        var endX = opts.width-25;
        // 终点y坐标
        var endY = opts.height;

        // 计算每个分类的起始点x坐标
        opts.x_categories.forEach(function(item, index) {
            x_points.push(startX + index * x_eachSpacing);
        });
        //x_points.push(endX);

        // 绘制横坐标
        context.beginPath();
        context.setStrokeStyle("#cccccc");
        context.setLineWidth(1);
        // 绘制坐标轴各区块竖线
        x_points.forEach(function(item, index) {
            context.moveTo(item, startY,);
            context.lineTo(item,endY);
        });
        context.closePath();
        context.stroke();

        var y_eachSpacing = 60;
        var y_points = [];
        opts.y_categories.forEach(function(item, index) {
            y_points.push(startY + index * y_eachSpacing);
        });
        //y_points.push(endY);

        // 绘制纵坐标
        context.beginPath();
        context.setStrokeStyle("#cccccc");
        context.setLineWidth(1);
        // 绘制坐标轴各区块竖线
        y_points.forEach(function(item, index) {
            context.moveTo(startX,item);
            context.lineTo(endX,item);
        });
        context.closePath();
        context.stroke();

        context.beginPath();
        // 设置字体大小
        context.setFontSize(12);
        // 设置字体填充颜色
        context.setFillStyle('#666666');
        opts.x_categories.forEach(function(item, index) {
           context.fillText(item, x_points[index]-20,  endY+20);
        });
        context.closePath();
        context.stroke();

          context.beginPath();
        // 设置字体大小
        context.setFontSize(12);
        // 设置字体填充颜色
        context.setFillStyle('#666666');
        opts.y_categories.forEach(function(item, index) {
           context.fillText(item, 30, y_points[5-index]+5);
        });
        context.closePath();
        context.stroke();
        
        wx.drawCanvas({ 
            canvasId: 'health-Canvas', 
            actions: context.getActions() //获取绘图动作数组 
        })
    },
        
        bindAgeChange: function(e) 
        { 
            //console.log('picker发送选择改变，携带值为', e.detail.value); 
            var that = this;
            that.setData({ idx_age: e.detail.value }) 
        }, 
         bindSexChange: function(e) 
        { 
            //console.log('picker发送选择改变，携带值为', e.detail.value); 
            var that = this;
            that.setData({ idx_sex: e.detail.value }) 
        }, 
        add_info:function()
        {
           this.setData({modalHidden: false})
        }, 
        input_health:function()
        {
             this.setData({modalHidden: false})
             wx.navigateTo({
              url: '../addinfo/addinfo'
            })
        },
        input_cancel:function()
        {
           this.setData({modalHidden: true})
             wx.redirectTo({
              url: '../health_data/health_data'
            })
        }
})
