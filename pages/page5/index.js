let App = getApp();
Page({
    data: {
        imgUrl: App.globalData.imgUrl, // 图片的地址
        assessment_score: '', // 考核分
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
     * 考核分
     */
    assessmentScoreFn(e) {
        let that = this;
        let assessment_score = that.trimFn(e.detail.value);
        that.setData({ assessment_score: assessment_score });
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
        if (!that.data.assessment_score) {
            wx.showToast({ title: '请先填写考核分', icon: 'none', duration: 1500 });
            return false;
        } else if (!that.data.travel_test) {
            wx.showToast({ title: '请先填写行测成绩', icon: 'none', duration: 1500 });
            return false;
        } else if (!that.data.exposition) {
            wx.showToast({ title: '请先填写申论成绩', icon: 'none', duration: 1500 });
            return false;
        }
        let assessment_score = 0; // 考核分
        let travel_test = 0; // 行测成绩
        let exposition = 0; // 申论成绩

        let temp_assessment_score = parseFloat(that.data.assessment_score);
        if (isNaN(temp_assessment_score)) {
            wx.showToast({ title: '考核分数只能为整数或小数', icon: 'none', duration: 1500 });
            return false;
        } else {
            assessment_score = temp_assessment_score <= 0 ? 0 : temp_assessment_score.toFixed(2);
        }
        let temp_travel_test = parseFloat(that.data.travel_test);
        if (isNaN(temp_travel_test)) {
            wx.showToast({ title: '行测成绩只能为整数或小数', icon: 'none', duration: 1500 });
            return false;
        } else {
            travel_test = temp_travel_test <= 0 ? 0 : temp_travel_test.toFixed(2);
        }
        let temp_exposition = parseFloat(that.data.exposition);
        if (isNaN(temp_exposition)) {
            wx.showToast({ title: '申论成绩只能为整数或小数', icon: 'none', duration: 1500 });
            return false;
        } else {
            exposition = temp_exposition <= 0 ? 0 : temp_exposition.toFixed(2);
        }
        let openId = wx.getStorageSync('openid') || '';
        // let data = {
        //     r_score: that.data.assessment_score, // 官方考核分
        //     hangce: that.data.travel_test, // 行测
        //     shenlun: that.data.exposition, // 申论
        //     openId: openId
        // };
        let data = {
            r_score: assessment_score, // 官方考核分
            hangce: travel_test, // 行测
            shenlun: exposition, // 申论
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
                that.setData({ travel_test: result.data.hangce, exposition: result.data.shenlun, assessment_score: result.data.r_score });
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