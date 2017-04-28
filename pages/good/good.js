var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    widthFix:true,
    interval: 5000,
    duration: 1000,
    good:null,
    status:0,
    windowWidth:300,
  },
  	onShareAppMessage: function () {
	    return {
	      title: '乐宠商品展',
	      path: 'pages/shop/shop'
	    }
  	},
  onLoad:function(e){
    // 生命周期函数--监听页面加载
    var that = this;
    var id =e.id;
            wx.request({
            url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=shop&m=goodinfo&id='+id,
            data: {
            },
            success: function(res) {
              
              var desc = res.data.data.goods_desc
              //console.log(desc)
              that.setData({
                status:res.data.status,
                good:res.data.data,
                imgUrls:res.data.data.good_img,
               wxParseData:WxParse.wxParse('desc', 'html', desc, that, 2),
              })
            }           
        })
  },

  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
   
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    var that = this;
    try {
      var res = wx.getSystemInfoSync()
      that.setData({
        windowWidth:res.windowWidth,
      })
    } catch (e) {
      that.setData({
        windowWidth:375,
      })
    }
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
   
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  },
})