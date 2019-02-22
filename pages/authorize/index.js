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
        // let data = wx.getStorageSync('userinfo') || '';
        if (e.detail.userInfo) {
            App.globalData.userInfo = e.detail.userInfo; // 存储用户到全局
            wx.setStorageSync('userinfo', e.detail.userInfo); // 用户的信息存储到本地存储中
            wx.login({
                success(res) {
                    if (res.code) {
                        // 发起网络请求, 把code传给后端
                        App._post('api/index/userInfo', { code: res.code }, function(result) {
                            if (result.code == 1) {
                                // console.log('success');
                                let resp = JSON.parse(result.data.msg);
                                App.globalData.userInfo.openid = resp.openid; // 用户的openid存储到全局
                                wx.setStorageSync('openid', resp.openid); // 用户的openid存储到本地存储中
                                App.globalData.isShows = true;
                                wx.redirectTo({ url: '../page1/index' }); // 跳转到首页
                            }
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
        }
    },
    /**
     * 右上角的用户分享
     */
    onShareAppMessage: function() {
        return {
            title: '湖北退役安置分数统计',
            desc: '湖北省军转安置考试分数统计系统',
            imageUrl: "http://files.nacy.cc/retire_wechat_logo.jpg",
            path: 'pages/page1/index'
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        wx.showShareMenu({ withShareTicket: true });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let that = this;
        let user_openid = wx.getStorageSync('openid') || '';
        if (user_openid != '') {
            wx.redirectTo({ url: '../page1/index' }); // 跳转到首页
            return false;
        }
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