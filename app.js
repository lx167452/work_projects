App({
    // 全局API地址
    // 本地测试环境
    // Domain: 'http://www.test3.com',
    // 线上环境
    Domain: 'https://www.syrccp.net',
    api_url: '',
    /**
     * 设置api地址
     */
    setApiUrl: function() {
        let that = this;
        that.api_url = that.Domain + '/';
    },
    /**
     * get请求
     */
    _get: function(url, data, success, fail, complete) {
        let that = this;
        wx.showNavigationBarLoading();
        data = data || {}; // 构造请求参数
        // 构造get请求
        let request = function() {
            wx.request({
                url: that.api_url + url,
                header: { 'content-type': 'application/json' },
                data: data,
                success: function(res) {
                    // 请求成功
                    if (res.data.code === 0) {
                        that.showError(res.data.msg);
                        return false;
                    } else {
                        success && success(res.data);
                    }
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                },
                fail: function(res) {
                    // 请求失败
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                    that.showError(res.errMsg, function() { fail && fail(res); });
                },
                complete: function(res) {
                    // 请求完成
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                    complete && complete(res);
                },
            });
        };
        request();
    },
    /**
     * post请求
     */
    _post: function(url, data, success, fail, complete) {
        let that = this;
        wx.showNavigationBarLoading(); // 设置发起请求头部的loading加载动画
        wx.request({
            url: that.api_url + url,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            data: data,
            success: function(res) {
                // 请求成功
                if (res.data.code === 0) {
                    that.showError(res.data.msg, function() { fail && fail(res); });
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                    return false;
                }
                success && success(res.data);
            },
            fail: function(res) {
                // 请求错误
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                that.showError(res.errMsg, function() { fail && fail(res); });
            },
            complete: function(res) {
                // 请求完成
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                complete && complete(res);
            }
        });
    },
    /**
     * 错误的模态弹窗的提示信息
     */
    showError: function(msg, callback) {
        wx.showModal({
            title: '温馨提示',
            content: msg,
            showCancel: false,
            success: function(res) {
                callback && callback();
            }
        });
    },
    /**
     * 小程序初始化时触发的onLaunch
     */
    onLaunch: function() {
        let that = this;
        that.setApiUrl(); // 设置接口请求的地址
    },
    /**
     * 页面显示切换的时候触发的事件
     */
    onShow: function(options) {
        let that = this;
    },
    globalData: {
        userInfo: { // 用户的信息
            openid: '',
            avatarUrl: '',
            city: '',
            country: '',
            gender: 0,
            language: '',
            nickName: '',
            province: ''
        },
        isShows: false // 初始化页面
    }
});