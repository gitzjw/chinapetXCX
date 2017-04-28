
//获取应用实例
var app = getApp()
Page({
  data: {
    Address: [],
    userInfo: null
  },
  formSubmit: function (e) {
    var that = this;
    var allvalue = e.detail.value;
    if (allvalue.consignee && allvalue.mobile && allvalue.address) {
      var rd_session = this.data.userInfo.rd_session;
      wx.request({
        url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=shop&m=addAddress',
        data: {
          re_session: rd_session,
          allvalue: allvalue
        },
        success: function (res) {
          // console.log(res);
          if (res.data.status == 200) {
            that.setData({ address: res.data.address });
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '地址保存成功',
              success: function (res) {
                wx.navigateBack({
                  delta: 2
                })
              }

            })
          } else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '地址保存失败！ ' + res.data.msg,
            })
          }
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写每一项信息',
      })

    }
  },
  onLoad: function (options) {
    var that = this;
    var Address = options
    if (Address.consignee == 'undefined') {
      Address.consignee = null
    }
    if (Address.mobile == 'undefined') {
      Address.mobile = null
    }
    if (Address.address == 'undefined') {
      Address.address = null
    }
    that.setData({ Address: Address });

    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
      });
    })

  },
  //   onShow:function(){
  //       sta();
  //       this.getAllAddressList();

  //   },
  //   getAllAddressList:function(){
  //         var that = this;
  //         var data = {appid:config.APPID,userid:this.data.userInfo.id};
  //         http.httpGet("?c=user&a=getAddrList" ,data,function(res){
  //             if(res.code == '200' && res.msg == 'success'){
  //                 that.setData({allAddress:res.data.list});
  //             }
  //         });
  //   },
  //   radioChange:function(e){
  //       console.log(e);
  //       var id = e.detail.value;
  //       /*var allAddress = this.data.allAddress;
  //       for(var i=0;i<allAddress.length;i++){
  //           if(id == allAddress[i].id){
  //               allAddress[i].checked = true;
  //           }else{
  //               allAddress[i].checked = false;
  //           }
  //       }*/
  //       var data = {appid:config.APPID,userid:this.data.userInfo.id,id:id,isfirst:1}
  //           http.httpGet("?c=user&a=editAddress" ,data,function(res){
  //                  if(res.code == '200' && res.msg == 'success'){
  //                         console.log("设置默认地址成功");
  //                  }else{
  //                         console.log("设置默认地址失败");
  //                  }
  //       });
  //       //this.setData({allAddress:allAddress});
  //     //return false;
  //   },
  //   addrss:function (e){
  //         wx.navigateTo({url:"/pages/address/addto/index?id="})
  //   },
  //   addto:function (e){
  //         var id = e.currentTarget.dataset.id;
  //         console.log(id);
  //         wx.navigateTo({url:"/pages/address/addto/index?id="+id})
  //   }
})
