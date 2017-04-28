Page({
  data:{
    address:null,
    allAddress:null
  },
  onLoad:function(options){
     
    //获取地址
    var that = this;
    var rd_session =options.rd_session ;
    if(rd_session == null){
        console.log("过期")
    }else{
    wx.request({
        url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=shop&m=address',
        data: {
            re_session : rd_session,
        },
        success: function(res) {
        if(res.data.status == 200){
            that.setData({ address:res.data.address});
        }else{
            
            console.log(res.data.msg);
        }
        }
    });
    }
    
  },
  address:function(e){
		var consignee = e.currentTarget.dataset.consignee;
        var mobile = e.currentTarget.dataset.mobile;
        var address = e.currentTarget.dataset.address;
		wx.navigateTo({
			url:'../address/index?consignee='+consignee + '&mobile='+ mobile + '&address='+ address
		})
	},
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
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