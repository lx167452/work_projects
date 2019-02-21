let App = getApp();
Page({
    // 数据 (页面所需数据均需在这里声明，可用于模板数据绑定)
    data: {
        answer: 0 // 0没有作答，1已经作答
    },
    /**
     * 表单提交，获取消息ID
     */
    formSubmit(event) {},
    /**
     * 考核分计算
     */
    calculationFn() {
        let that = this;
        wx.navigateTo({ url: '../page2/index' });
    },
    /**
     * 查看考核分数
     */
    seeScoreFn(e) {
        let that = this;
        let type = e.currentTarget.dataset.type; // 查看的类型
        if (!that.data.answer) {
            wx.showToast({ title: '请先进行考核分计算', icon: 'none', duration: 1500 });
            return false;
        }
        if (type == 'ranking') {
            // 查看考核分数排名
            wx.navigateTo({ url: '../page3/index' });
        } else if (type == 'colligate') {
            // 查看综合成绩排名
            wx.navigateTo({ url: '../page5/index' });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     * (页面加载完成时调用，一个页面只会调用一次。（在路由跳转的时候通过navigateTo跳转的话onload会重新执行，通过navigateBack跳转的话onLoad不会重新执行）)
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
        if (user_openid == '') {
            wx.redirectTo({ url: '../authorize/index' });
            return false;
        }
        App._post('api/index/index', {}, function(result) {
            if (result.code == 1) {
                console.log('success');
                that.setData({ answer: result.data.answer }); // 0 没有作答，1已经作答
            }
        }, function(result) {
            // console.log("fail");
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
    }
});