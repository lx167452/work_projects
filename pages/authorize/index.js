let App = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 授权点击按钮
     */
    getuserInfoFn(e) {
        let that = this;
        let datas = wx.getStorageSync('userinfo') || '';
        if (e.detail.userInfo) {
            App.globalData.userInfo = e.detail.userInfo; // 存储用户到全局
            wx.setStorageSync('userinfo', e.detail.userInfo); // 用户的信息存储到本地存储中
            wx.login({
                success(res) {
                    if (res.code) {
                        // 发起网络请求, 把code传给后端
                        App._post('api/index/userInfo', { code: res.code }, function(result) {
                            // console.log('success');
                        }, function(result) {
                            // console.log("fail");
                        }, function() {
                            // console.log("complete");
                        });
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            });
            // App._post('order/cart_pay', {}, function(result) {
            //     // console.log('success');
            //     // wx.setStorageSync('openid', result); // 用户的信息存储到本地存储中
            //     App.globalData.isShows = true;
            //     wx.redirectTo({ url: '../page2/index' }); // 跳转到首页
            // }, function(result) {
            //     // console.log("fail");
            // }, function() {
            //     // console.log("complete");
            // });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let that = this;
    },
    onHide: function() {
        let that = this;
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        let that = this;
    }
})