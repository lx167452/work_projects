let App = getApp();
Page({
    data: {
        travel_test: '', // 行测
        exposition: '' // 申论
    },
    /**
     * 去掉左右空格
     */
    trimFn(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    /**
     * 行测
     */
    travelTestFn(e) {
        let that = this;
        let travel_test = that.trimFn(e.detail.value);
        that.setData({ travel_test: travel_test });
    },
    /**
     * 申论
     */
    expositionFn(e) {
        let that = this;
        let exposition = that.trimFn(e.detail.value);
        that.setData({ exposition: exposition });
    },
    /**
     * 提交表单
     */
    submitFn(e) {
        let that = this;
        // 验证填写的内容项
        if (that.data.travel_test == '') {
            wx.showToast({ title: '请先填写行测成绩', icon: 'none', duration: 1500 });
            return false;
        } else if (that.data.exposition == '') {
            wx.showToast({ title: '请先填写申论成绩', icon: 'none', duration: 1500 });
            return false;
        }
        let openId = wx.getStorageSync('openid') || '';
        let data = {
            hangce: that.data.travel_test, // 行测
            shenlun: that.data.exposition, // 申论
            openId: openId
        };
        App._post('api/index/record', { data: JSON.stringify(data) }, function(result) {
            // console.log('success');
            if (result.code == 1) {
                wx.navigateTo({ url: '../page6/index' });
            }
        }, function(result) {
            console.log("fail");
        }, function() {
            // console.log("complete");
        });
    },
    /**
     * 请求数据
     */
    requireFn() {
        let that = this;
        let openId = wx.getStorageSync('openid') || '';
        let data = { openId: openId };
        App._post('api/index/record', { data: JSON.stringify(data) }, function(result) {
            if (result.code == 1) {
                that.setData({ travel_test: result.data.hangce, exposition: result.data.shenlun });
            }
        }, function(result) {
            console.log("fail");
        }, function() {
            // console.log("complete");
        });
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
     * (页面加载完成时调用，一个页面只会调用一次。（在路由跳转的时候通过navigateTo跳转的话onload会重新执行，通过navigateBack跳转的话onLoad不会重新执行）)
     */
    onLoad: function(options) {
        wx.showShareMenu({ withShareTicket: true });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let that = this;
        let user_openid = wx.getStorageSync('openid') || '';
        if (user_openid == '') {
            wx.redirectTo({ url: '../authorize/index' });
            return false;
        }
        that.requireFn();
    }
})