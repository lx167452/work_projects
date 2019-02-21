let App = getApp();
Page({
    data: {
        username: "", // 姓名
        tel: "", // 电话
        placeData: ["武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "随州", "咸宁", "黄冈", "荆门", "荆州", "恩施自治州", "天门", "仙桃", "潜江", "神农架林区"], // 安置地点
        place_index: 0 // 安置地点选中的下标
    },
    /**
     * 去掉左右空格
     */
    trimFn(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    /**
     * 验证手机号的合法性
     */
    checkMobile(tel) {
        let regu = /^[1][3-8][0-9]{9}$/;
        let rep = new RegExp(regu);
        if (rep.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 姓名
     */
    usernameFn(e) {
        let that = this;
        let username = that.trimFn(e.detail.value);
        that.setData({ username: username });
    },
    /**
     * 电话
     */
    telFn(e) {
        let that = this;
        let tel = that.trimFn(e.detail.value);
        that.setData({ tel: tel });
    },
    /**
     * 安置地点
     */
    placeSelectFn(e) {
        let that = this;
        that.setData({ place_index: e.detail.value });
    },
    /**
     * 提交表单
     */
    submitFn(e) {
        let that = this;
        wx.navigateTo({ url: '../page4/index' });
        return false;
        // 验证填写的内容项
        if (that.data.username == '') {
            wx.showToast({ title: '请先填写姓名', icon: 'none', duration: 1500 });
            return false;
        } else if (that.data.tel == '') {
            wx.showToast({ title: '请先填写电话', icon: 'none', duration: 1500 });
            return false;
        } else {
            let checkStatus = that.checkMobile(that.data.tel); // 验证手机号的格式
            if (!checkStatus) {
                wx.showToast({ title: '手机号格式有误！', icon: 'none', duration: 1500 });
                return false;
            }
        }
        let data = {
            username: that.data.username, // 姓名
            tel: that.data.tel, // 电话
            place_text: that.data.placeData[that.data.place_index], // 安置地点 (名称)
            place_index: that.data.place_index // 安置地点选中的下标
        };
        App._post('', { data: JSON.stringify(data) }, function(result) {
            // console.log('success');
            wx.navigateTo({ url: '../page4/index' });
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
    }
});