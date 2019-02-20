let App = getApp();
Page({
    data: {
        // service_length: { // 服役年限
        //     start_time: "1970-01-01", // 开始时间
        //     end_time: "2018-08-28" // 结束时间
        // },
        // post: { // 职务
        //     administration_post: ["排职", "副连职", "正连职", "副营职", "正营职", "副团职", "正团职", "副师职"], // 行政职务
        //     expertise: ["技术1级", "技术2级", "技术3级", "技术4级", "技术5级", "技术6级", "技术7级", "技术8级", "技术9级", "技术10级", "技术11级", "技术12级", "技术13级"], // 专业技术
        //     leading_post: [0, 1] // 领导职务
        // },
        // bonus_score: { // 奖励计分
        //     crack_glory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 中央军委授予荣誉称号
        //     one_glory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 大军区级荣誉称号或一等功
        //     two_glory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 二等功
        //     three_glory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // 三等功
        // },
        // penalty_deduction: { // 惩处扣分
        //     disposition_type: ["行政警告处分", "行政严重警告处分", "记过及党内警告处分", "记大过及党内严重警告处分", "降职（级）或者降衔（级）及撤销党内职务处分", "撤职处分及留党察看处分"], // 处分类型
        //     direct_entry_deduction: 0 // 直接录入扣分
        // },
        // education: { // 学历
        //     highest_education: ["高中及以下", "中专", "大专", "本科", "硕士", "博士"], // 最高学历
        //     before_enlisting_education: ["高中及以下", "中专", "大专", "本科", "硕士", "博士"] // 入伍前学历
        // },
        // remote_hardship: { // 边远艰苦地区年限
        //     three_category: ['一年', '二年', '三年', '四年', '五年', '六年'], // 三类边远艰苦地区(三类岛)
        //     four_category: ['一年', '二年', '三年', '四年', '五年', '六年'], // 四类边远艰苦地区(海拔2500米至3500米、二类岛服役)
        //     five_category: ['一年', '二年', '三年', '四年', '五年', '六年'], // 五类边远艰苦地区(海拔3500米至4500米、一类岛服役)
        //     six_category: ['一年', '二年', '三年', '四年', '五年', '六年'] // 六类边远艰苦地区(海拔4500米以上地区、特类岛)
        // },
        // special_post: { // 特殊岗位年限
        //     aircraft: ['一年', '二年', '三年', '四年', '五年', '六年'], // 飞机
        //     naval_vessels: ['一年', '二年', '三年', '四年', '五年', '六年'], // 舰艇
        //     nuclear_involvement: ['一年', '二年', '三年', '四年', '五年', '六年'] // 涉核
        // },
        // retention: ['滞留一年', '滞留二年', '滞留三年', '滞留四年', '滞留五年', '滞留六年'], // 滞留扣分数据

        service_length: { // 服役年限
            start_time: "1970-01-01", // 开始时间
            end_time: "2018-08-28" // 结束时间
        },
        post: { // 职务
            administration_post: [], // 行政职务
            expertise: [], // 专业技术
            leading_post: [] // 领导职务
        },
        bonus_score: { // 奖励计分
            crack_glory: [], // 中央军委授予荣誉称号
            one_glory: [], // 大军区级荣誉称号或一等功
            two_glory: [], // 二等功
            three_glory: [] // 三等功
        },
        penalty_deduction: { // 惩处扣分
            disposition_type: [], // 处分类型
            direct_entry_deduction: 0 // 直接录入扣分
        },
        education: { // 学历
            highest_education: [], // 最高学历
            before_enlisting_education: [] // 入伍前学历
        },
        remote_hardship: { // 边远艰苦地区年限
            three_category: [], // 三类边远艰苦地区(三类岛)
            four_category: [], // 四类边远艰苦地区(海拔2500米至3500米、二类岛服役)
            five_category: [], // 五类边远艰苦地区(海拔3500米至4500米、一类岛服役)
            six_category: [] // 六类边远艰苦地区(海拔4500米以上地区、特类岛)
        },
        special_post: { // 特殊岗位年限
            aircraft: [], // 飞机
            naval_vessels: [], // 舰艇
            nuclear_involvement: [] // 涉核
        },
        retention: [], // 滞留扣分数据

        save_data: { // 当前下拉或更改及默认值
            start_text: '1970年01月01日', // 开始时间 (服役年限)
            end_text: '2018年08月28日', // 结束时间 (服役年限)
            administration_post_index: 0, // 行政职务 (职务)
            expertise_index: 0, // 专业技术 (职务)
            leading_post_index: 0, // 领导职务 (职务)
            crack_glory_index: 0, // 中央军委授予荣誉称号 (奖励计分)
            one_glory_index: 0, // 大军区级荣誉称号或一等功 (奖励计分)
            two_glory_index: 0, // 二等功 (奖励计分)
            three_glory_index: 0, // 三等功 (奖励计分)
            disposition_type_index: 0, // 处分类型 (惩处扣分)
            direct_entry_deduction_index: 0, // 直接录入扣分 (惩处扣分)
            highest_education_index: 0, // 最高学历 (学历)
            before_enlisting_education_index: 0, // 入伍前学历 学历
            three_category_index: 0, // 三类边远艰苦地区(三类岛) (边远艰苦地区年限)
            four_category_index: 0, // 四类边远艰苦地区(海拔2500米至3500米、二类岛服役)  (边远艰苦地区年限)
            five_category_index: 0, // 五类边远艰苦地区(海拔3500米至4500米、一类岛服役)  (边远艰苦地区年限)
            six_category_index: 0, // 六类边远艰苦地区(海拔4500米以上地区、特类岛)  (边远艰苦地区年限)
            aircraft_index: 0, // 飞机 (特殊岗位年限)
            naval_vessels_index: 0, // 舰艇 (特殊岗位年限)
            nuclear_involvement_index: 0, // 涉核 (特殊岗位年限)
            retention_index: 0 // 滞留扣分数据
        }
    },
    bindPickerChange: function(e) {
        let that = this;
        console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({ index: e.detail.value });
    },
    bindDateChange: function(e) {
        let that = this;
        console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({ date: e.detail.value });
    },
    /**
     * 服役年限 - 开始时间
     */
    startTimeFn() {
        // service_length.start_time, // 开始时间
        // service_length.start_text, // 开始时间
    },
    /**
     * 服役年限 - 结束时间
     */
    endTimeFn() {
        // service_length.end_time, // 结束时间
        // service_length.end_text, // 结束时间
    },
    /**
     * 职务 - 行政职务
     */
    administrationPostFn() {
        // post.administration_post, // 行政职务
    },
    /**
     * 职务 - 专业技术
     */
    expertiseFn() {
        // post.expertise, // 专业技术
    },
    /**
     * 职务 - 领导职务
     */
    leadingPostFn() {
        // post.leading_post, // 领导职务
    },
    /**
     * 奖励计分 - 中央军委授予荣誉称号
     */
    crackGloryFn() {
        // bonus_score.crack_glory, // 中央军委授予荣誉称号
    },
    /**
     * 奖励计分 - 大军区级荣誉称号或一等功
     */
    oneGloryFn() {
        // bonus_score.one_glory, // 大军区级荣誉称号或一等功
    },
    /**
     * 奖励计分 - 二等功
     */
    twoGloryFn() {
        // bonus_score.two_glory, // 二等功
    },
    /**
     * 奖励计分 - 三等功
     */
    threeGloryFn() {
        // bonus_score.three_glory, // 三等功
    },
    /**
     * 惩处扣分 - 处分类型
     */
    dispositionTypeFn() {
        // penalty_deduction.disposition_type, // 处分类型
    },
    /**
     * 惩处扣分 - 直接录入扣分
     */
    directEntryDeductionFn() {
        // penalty_deduction.direct_entry_deduction, // 直接录入扣分
    },
    /**
     * 学历 - 最高学历
     */
    highestEducationFn() {
        // education.highest_education, // 最高学历
    },
    /**
     * 学历 - 最高学历
     */
    beforeEnlistingEducationFn() {
        // education.before_enlisting_education, // 入伍前学历
    },
    /**
     * 边远艰苦地区年限 - 三类边远艰苦地区(三类岛)
     */
    threeCategoryFn() {
        // remote_hardship.three_category, // 三类边远艰苦地区(三类岛)
    },
    /**
     * 边远艰苦地区年限 - 四类边远艰苦地区(海拔2500米至3500米、二类岛服役)
     */
    fourCategoryFn() {
        // remote_hardship.four_category, // 四类边远艰苦地区(海拔2500米至3500米、二类岛服役)
    },
    /**
     * 边远艰苦地区年限 - 五类边远艰苦地区(海拔3500米至4500米、一类岛服役)
     */
    fiveCategoryFn() {
        // remote_hardship.five_category, // 五类边远艰苦地区(海拔3500米至4500米、一类岛服役)
    },
    /**
     * 边远艰苦地区年限 - 六类边远艰苦地区(海拔4500米以上地区、特类岛)
     */
    sixCategoryFn() {
        // remote_hardship.six_category, // 六类边远艰苦地区(海拔4500米以上地区、特类岛)
    },
    /**
     * 特殊岗位年限 - 飞机
     */
    aircraftFn() {
        // special_post.aircraft, // 飞机
    },
    /**
     * 特殊岗位年限 - 舰艇
     */
    navalVesselsFn() {
        // special_post.naval_vessels, // 舰艇
    },
    /**
     * 特殊岗位年限 - 涉核
     */
    nuclearInvolvementFn() {
        // special_post.nuclear_involvement, // 涉核
    },
    /**
     * 滞留扣分数据
     */
    retentionFn() {
        // retention, // 滞留扣分数据
    },
    // 检验输入框输入的数字是否正常
    numberCheck(num) {
        let that = this;
        // let re= /^\d*\.{0,1}\d{0,3}$/;
        let re = /^\d+(\.\d+){0,1}$/;
        return re.exec(num) != null;

        // // 调用写法
        // let input_val = e.detail.value; // 输入框结果的值
        // that.setData({ "penalty_deduction.direct_entry_deduction": value }); // 直接录入扣分
        // if (!NumberCheck("10")) {
        //     console.log("false");
        // } else {
        //     console.log("true");
        // }
        // 0.0 转为 0
        // if (replaceArray.length != 0) {
        //     wx.showToast({ title: '只能输入数字，小数点和加减号', icon: 'none' });
        // }
    },
    /**
     * 右上角的用户分享
     */
    onShareAppMessage: function() {
        return {
            title: '湖北省军转安置考试分数统计系统',
            desc: '湖北省军转安置考试分数统计系统',
            path: 'pages/index/index'
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
        App._post('api/index/getList', {}, function(result) {
            console.log('success');
            console.log(result);
        }, function(result) {
            console.log("fail");
        }, function() {
            console.log("complete");
        });
    }
})