//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],

  },
  onLoad: function () {
    var that =this;
    	wx.getSystemInfo({
				success: function (res) {
					that.setData({
						Width: res.windowWidth,
            height:res.windowHeight
					})

				}
			})
  }
})
