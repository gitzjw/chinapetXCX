import menus from './resources/json/menus.js'
Page({
  data:{
    text:"Page main",
    background: [
      {
        color:'green',
        sort:1
      }, 
      {
        color:'red',
        sort:2
      },
      {
        color:'yellow',
        sort:3
      }
      ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    allGoods:[],
    toView: 'blue',
    menus:null,
    selectedMenuId:4,
    total:{
      count:0,
      money:0
    }
  },
  	onShareAppMessage: function () {
	    return {
	      title: '乐宠商品展',
	      path: 'pages/shop/shop'
	    }
  	},
  goodinfo:function(e){
    var id = e.currentTarget.dataset.id
     wx.navigateTo({
              url:'../good/good?id='+ id
            }) 
  },
  selectMenu:function(event){
    let data = event.currentTarget.dataset
    this.setData({
      toView: data.tag,
      selectedMenuId: data.id
    })
    // this.data.toView = 'red'
  },
  addCount:function(event){
    var that = this
    let data = event.currentTarget.dataset
    let total = this.data.total
    let menus = this.data.menus
    let menu = menus.find(function(v){
      return v.id == data.cid
    })
    let dish = menu.dishs.find(function(v){
      return v.id == data.id
    })
    dish.count += 1;
    total.count += 1
    total.money += dish.price
    this.setData({
      'menus':menus,
      'total':total
    })
    //数据存储在购物车变量or 本地缓存
    var goods = new Object();
    goods.id = data.id;
    goods.cid = data.cid;
    goods.name = data.name;
    goods.price = data.price;
    goods.buycount = 1;
    var allGoods = new Object;
    allGoods = that.data.allGoods;
    //console.log(allGoods)
    if(allGoods == ""){
       allGoods = []
    }
    //检查购物车变量是否有此商品
    var hasCount = 0;
    for(var i=0;i<allGoods.length;i++){
        var temp = allGoods[i];
        if(temp.id == goods.id){
          hasCount = temp.buycount;
          allGoods.splice(i, 1);
          break;
        }
    }
    goods.buycount =  dish.count;
    allGoods.push(goods);
    that.setData({
      allGoods:allGoods,
    })
    //wx.setStorageSync('shoppingcar', allGoods);
  },
  minusCount:function(event){
    var that = this
    let data  = event.currentTarget.dataset
    let total = this.data.total 
    let menus = this.data.menus
    let menu = menus.find(function(v){
      return v.id == data.cid
    })
    let dish = menu.dishs.find(function(v){
      return v.id == data.id
    })
    if(dish.count <= 0)
      return 
    dish.count -= 1;
    total.count -= 1
    total.money -= dish.price
    this.setData({
      'menus':menus,
      'total':total
    })
    //数据存储
    var goods = new Object();
    goods.id = data.id;
    goods.cid = data.cid;
    goods.name = data.name;
    goods.price = data.price;
    goods.buycount = 1;
    var allGoods = new Object;
    //var allGoods =wx.getStorageSync('shoppingcar')
    allGoods = that.data.allGoods;
    if(allGoods == ""){
       allGoods = []
    }
    //检查购物车是否有此商品
    var hasCount = 0;
    for(var i=0;i<allGoods.length;i++){
        var temp = allGoods[i];
        if(temp.id == goods.id){
          hasCount = temp.buycount;
          allGoods.splice(i, 1);
          break;
        }
    }
    goods.buycount =  dish.count;
    if(goods.buycount != 0){
       allGoods.push(goods);
    }
    that.setData({
      allGoods:allGoods,
    })
  },

   settlement:function (e){
    var goods = e.currentTarget.dataset.goods;
    if(goods['length'] == 0){
      var status = '1'
      wx.showModal({
      title: '提示',
      showCancel:false,
      content: '请选择商品',
    })
    }else{
      try {
            var status = '2'
            wx.setStorageSync('allGoods', goods)
            wx.navigateTo({
              url:'../settlement/index?status='+ status
            }) 
          } catch (e) { 
            var status = '3'
            wx.showModal({
              title: '提示',
              showCancel:false,
              content: '下单失败，重新操作',
            })  
          }    

    }
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
           var that = this;
            wx.request({
            url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=shop&m=goods',
            data: {
            },
            success: function(res) {
              //console.log(res)
              that.setData({
                menus:res.data,
              })
            }           
        })

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
 
})