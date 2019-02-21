let App = getApp();
Page({
    data: {
        username: "啦啦啦", // 姓名
        placeData: ["武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "随州", "咸宁", "黄冈", "荆门", "荆州", "恩施自治州", "天门", "仙桃", "潜江", "神农架林区"], // 安置地点
        place_index: 0, // 安置地点选中的下标
        ranking: 35, // 排名
        score: 42.5, // 考核分
        countNumn: 122, // 统计人数
    },
    /**
     * 安置地点
     */
    placeSelectFn(e) {
        let that = this;
        that.setData({ place_index: e.detail.value });
    },
    /**
     * 右上角的用户分享
     */
    onShareAppMessage: function() {
        return {
            title: '湖北省军转安置考试分数统计系统',
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
        return false;
        App._post('', {}, function(result) {
            // console.log('success');
        }, function(result) {
            // console.log("fail");
        }, function() {
            // console.log("complete");
        });
    }
})