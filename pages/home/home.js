
var app = getApp();
Page({
	data: {
		pn: 1,
		list: [],
		listzz: [],
		showMore: true,
		showLoading: true,
		bannerUrls: [],
		indicatorDots: true,
		autoplay: true,
		interval: 5000,
		duration: 1000,
		userInfo: null,
		wt_img: 80,
		tb_img: 50,
		requestOnOff: true


	},
	onShareAppMessage: function () {
		return {
			title: '宠物论坛',
			path: 'pages/home/home'
		}
	},
	redirect: function (e) {
		var id = e.currentTarget.dataset.id;

		wx.navigateTo({
			url: '../detail/detail?id=' + id
		})
	},
	publish: function () {
		wx.navigateTo({
			url: '../publish/index'
		})
	},
	forumNew: function (e) {
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../forumList/forumList?id=' + id
		})
	},
	redirectActivity: function (e) {
		var id = e.currentTarget.dataset.id;

		wx.navigateTo({
			url: '../activity/activity?id=' + id
		})
	},
	scrolltolower: function (e) {
		if (!this.data.showMore) return;
		this.loadData(this.data.pn);
	},
	loadData: function (pn) {
		var that = this;
		var requestOnOff = that.data.requestOnOff;
		var count = pn * 10;
		var URL_threadIntroduceForIndexV4 = 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=index&pn=' + pn;

		if (requestOnOff) {
			that.setData({
				requestOnOff: false
			})
			wx.request({
				url: URL_threadIntroduceForIndexV4,
				data: {

				},
				header: {
					'content-type': 'json'
				},
				success: function (res) {

					if (res.data.total > 0) {
						that.setData({
							listzz: that.data.listzz.concat(res.data.array),
							showLoading: false,
							pn: pn + 1
						})
					} else {
						that.setData({
							showMore: false
						})
					}
				},
				complete: function () {
					that.setData({
						requestOnOff: true,
					})
				}
			})
		} else {
			console.log("相同请求未完成，不再执行")
		}
	},
	onLoad: function (options) {
		var that = this
		app.getUserInfo(function (userInfo) {
			that.setData({
				userInfo: userInfo,
			});
		})
		this.loadData(this.data.pn)
		wx.request({
			url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=indexbanner',
			data: {

			},
			header: {
				'content-type': 'json'
			},
			success: function (res) {
				that.setData({
					bannerUrls: res.data.array,
				})
			}
		})
	},
	onReady: function () {

	},
	onShow: function () {
		var that = this
		wx.getSystemInfo({
			success: function (res) {
				var tb_img = res.windowWidth * 0.15;
				var wt_img = res.windowWidth * 0.25;
				that.setData({
					wt_img: wt_img,
					tb_img: tb_img,
				});

			}
		})
	},
	onHide: function () {

	},
	onUnload: function () {

	},
	onPullDownRefresh: function () {

	},
	onReachBottom: function () {

	}
})		