let App = getApp();
Page({
    data: {
        imgUrl: App.globalData.imgUrl, // 图片的地址
        username: "啦啦啦", // 姓名
        phone: '', // 电话
        score: 42.5, // 考核分
        placeData: ["武汉地区", "省直", "武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "随州", "咸宁", "黄冈", "荆门", "荆州", "恩施自治州", "天门", "仙桃", "潜江", "神农架林区"], // 安置地点
        place_index: 0, // 安置地点选中的下标
        ranking: 35, // 排名
        total_score: 89, // 总分
        countNumn: 123, // 统计人数
        zhiwu: 0, // 职务 6副团职  7正团职
        type: 1 // 职务选中的类型 (0行政职务，1专业等级)
    },
    /**
     * 安置地点
     */
    placeSelectFn(e) {
        let that = this;
        that.setData({ place_index: e.detail.value });
        // that.requireFn();
        that.updateDataFn();
    },
    /**
     * 更新数据
     */
    updateDataFn() {
        let that = this;
        let openId = wx.getStorageSync('openid') || '';
        let data = {
            name: that.data.username, // 姓名
            phone: that.data.phone, // 电话
            anzhi: that.data.place_index, // 安置地点选中的下标
            openId: openId
        };
        App._post('api/index/confirm', { data: JSON.stringify(data) }, function(result) {
            if (result.code == 1) {
                App._post('api/index/multiple', { data: JSON.stringify(data) }, function(result) {
                    if (result.code == 1) {
                        that.setData({ username: result.data.name, phone: result.data.phone, place_index: result.data.anzhi, score: result.data.score, ranking: result.data.ranking, total_score: result.data.score_num, countNumn: result.data.count, zhiwu: parseInt(result.data.zhiwu), type: result.data.type });

                    }
                }, function(result) {

                }, function() {
                    // console.log("complete");
                });
            }
        }, function(result) {

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
        App._post('api/index/multiple', { data: JSON.stringify(data) }, function(result) {
            if (result.code == 1) {
                // console.log('success');
                console.log(result.data);
                // that.setData({ username: result.data.name, phone: result.data.phone, place_index: result.data.anzhi, score: result.data.score, ranking: result.data.ranking, total_score: result.data.score_num, countNumn: result.data.count, zhiwu: parseInt(result.data.zhiwu) });
                that.setData({ username: result.data.name, phone: result.data.phone, place_index: result.data.anzhi, score: result.data.r_score, ranking: result.data.ranking, total_score: result.data.score_num, countNumn: result.data.count, zhiwu: parseInt(result.data.zhiwu), type: result.data.type});
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