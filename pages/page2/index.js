let App = getApp();
Page({
    data: {
        imgUrl: App.globalData.imgUrl, // 图片的地址
        service_length: { // 服役年限
            start_time: "1970-01-01", // 开始时间
            end_time: [], // 结束时间
            end_time_format: '', // 结束时间格式
            end_time_index: 0 // 结束时间的下标
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
        now_time: '', // 当前的时间
        post_type: 0, // 职务类型 (0行政职务，1专业等级)

        save_data: { // 当前下拉或更改及默认值
            start_text: '1970年01月01日', // 开始时间 (服役年限)
            end_text: '2019年03月31日', // 结束时间 (服役年限)
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
    /**
     * 服役年限 - 开始时间
     */
    startTimeFn(e) {
        let that = this;
        let start_arr = e.detail.value.split('-'); // 开始时间字符串分割
        let start_text = start_arr[0] + '年' + start_arr[1] + '月' + start_arr[2] + '日'; // 开始时间字符串
        that.setData({ 'save_data.start_text': start_text, 'service_length.start_time': e.detail.value });
    },
    /**
     * 服役年限 - 结束时间
     */
    endTimeFn(e) {
        let that = this;
        let end_year_index = parseInt(e.detail.value);
        let end_text = that.data.service_length.end_time[end_year_index] + '03月31日';
        let temp_year = that.data.service_length.end_time[end_year_index].substring(0, that.data.service_length.end_time[end_year_index].length - 1);
        let end_time_format = temp_year + '-03-31';
        that.setData({ 'save_data.end_text': end_text, 'service_length.end_time_index': end_year_index, 'service_length.end_time_format': end_time_format });
    },
    /**
     * 职务 - 行政职务
     */
    administrationPostFn(e) {
        let that = this;
        that.setData({ 'save_data.administration_post_index': e.detail.value, 'save_data.expertise_index': 0, post_type: 0 });
    },
    /**
     * 职务 - 专业技术
     */
    expertiseFn(e) {
        let that = this;
        that.setData({ 'save_data.expertise_index': e.detail.value, 'save_data.administration_post_index': 0, post_type: 1 });
    },
    /**
     * 职务 - 领导职务
     */
    leadingPostFn(e) {
        let that = this;
        that.setData({ 'save_data.leading_post_index': e.detail.value });
    },
    /**
     * 奖励计分 - 中央军委授予荣誉称号
     */
    crackGloryFn(e) {
        let that = this;
        that.setData({ 'save_data.crack_glory_index': e.detail.value });
    },
    /**
     * 奖励计分 - 大军区级荣誉称号或一等功
     */
    oneGloryFn(e) {
        let that = this;
        that.setData({ 'save_data.one_glory_index': e.detail.value });
    },
    /**
     * 奖励计分 - 二等功
     */
    twoGloryFn(e) {
        let that = this;
        that.setData({ 'save_data.two_glory_index': e.detail.value });
    },
    /**
     * 奖励计分 - 三等功
     */
    threeGloryFn(e) {
        let that = this;
        that.setData({ 'save_data.three_glory_index': e.detail.value });
    },
    /**
     * 惩处扣分 - 处分类型
     */
    dispositionTypeFn(e) {
        let that = this;
        that.setData({ 'save_data.disposition_type_index': e.detail.value });
    },
    /**
     * 惩处扣分 - 直接录入扣分 (输入框)
     */
    directEntryDeductionFn(e) {
        let that = this;
        that.setData({ 'save_data.direct_entry_deduction_index': e.detail.value });
    },
    /**
     * 学历 - 最高学历
     */
    highestEducationFn(e) {
        let that = this;
        that.setData({ 'save_data.highest_education_index': e.detail.value });
    },
    /**
     * 学历 - 入伍前学历
     */
    beforeEnlistingEducationFn(e) {
        let that = this;
        that.setData({ 'save_data.before_enlisting_education_index': e.detail.value });
    },
    /**
     * 边远艰苦地区年限 - 三类边远艰苦地区(三类岛)
     */
    threeCategoryFn(e) {
        let that = this;
        that.setData({ 'save_data.three_category_index': e.detail.value });
    },
    /**
     * 边远艰苦地区年限 - 四类边远艰苦地区(海拔2500米至3500米、二类岛服役)
     */
    fourCategoryFn(e) {
        let that = this;
        that.setData({ 'save_data.four_category_index': e.detail.value });
    },
    /**
     * 边远艰苦地区年限 - 五类边远艰苦地区(海拔3500米至4500米、一类岛服役)
     */
    fiveCategoryFn(e) {
        let that = this;
        that.setData({ 'save_data.five_category_index': e.detail.value });
    },
    /**
     * 边远艰苦地区年限 - 六类边远艰苦地区(海拔4500米以上地区、特类岛)
     */
    sixCategoryFn(e) {
        let that = this;
        that.setData({ 'save_data.six_category_index': e.detail.value });
    },
    /**
     * 特殊岗位年限 - 飞机
     */
    aircraftFn(e) {
        let that = this;
        that.setData({ 'save_data.aircraft_index': e.detail.value });
    },
    /**
     * 特殊岗位年限 - 舰艇
     */
    navalVesselsFn(e) {
        let that = this;
        that.setData({ 'save_data.naval_vessels_index': e.detail.value });
    },
    /**
     * 特殊岗位年限 - 涉核
     */
    nuclearInvolvementFn(e) {
        let that = this;
        that.setData({ 'save_data.nuclear_involvement_index': e.detail.value });
    },
    /**
     * 滞留扣分数据
     */
    retentionFn(e) {
        let that = this;
        that.setData({ 'save_data.retention_index': e.detail.value });
    },
    /**
     * 计算两个时间相差的年份
     */
    timeDifference(end_time, start_time) {
        let that = this;
        let start_time_diff = start_time.split('-'); // 开始时间
        let end_time_diff = end_time.split('-'); // 结束时间
        let start_year = start_time_diff[0];
        let start_month = start_time_diff[1];
        let start_day = start_time_diff[2];
        let end_year = end_time_diff[0];
        let end_month = end_time_diff[1];
        let end_day = end_time_diff[2];
        let yearNumber = 0;
        if (end_year > start_year) {
            // 年份大于
            if ((end_month > start_month) || (end_month == start_month && end_day >= start_day)) {
                yearNumber = (end_year - start_year) + 1;
                return yearNumber;
            } else {
                yearNumber = end_year - start_year;
                return yearNumber;
            }
        } else if (end_year == start_year) {
            // 年份等于
            if ((end_month > start_month) || (end_month == start_month && end_day >= start_day)) {
                yearNumber = 1;
                return yearNumber;
            } else {
                wx.showToast({ title: '服务年限结束时间不能小于开始时间', icon: 'none', duration: 1500 });
                return false;
            }
        } else {
            // 年份小于
            wx.showToast({ title: '服务年限结束时间不能小于开始时间', icon: 'none', duration: 1500 });
            return false;
        }
    },
    /**
     * 处理服役年限问题
     */
    yearsHandleFn() {
        let that = this;
        let start_time = that.data.service_length.start_time;
        let end_time = that.data.service_length.end_time_format;
        let start_time_diff = start_time.split('-'); // 开始时间
        let end_time_diff = end_time.split('-'); // 结束时间
        let start_year = start_time_diff[0];
        let start_month = start_time_diff[1];
        let start_day = start_time_diff[2];
        let end_year = end_time_diff[0];
        let end_month = end_time_diff[1];
        let end_day = end_time_diff[2];
        if (end_year == start_year && end_month == start_month && end_day == start_day) {
            wx.showToast({ title: '服务年限结束时间不能和开始时间一样', icon: 'none', duration: 1500 });
            return false;
        }
        if (end_year < start_year) {
            return false;
        } else if (end_year == start_year && end_month == start_month && end_day < start_day) {
            return false;
        } else if (end_year == start_year && end_month < start_month) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 处理计算总分数
     */
    computeSource(service_year_source) {
        let that = this;
        let post_type_score = parseFloat(that.data.post_type == 0 ? that.data.post.administration_post[that.data.save_data.administration_post_index].score : that.data.post.expertise[that.data.save_data.expertise_index].score); // 职务类型选择和分数 (0行政职务，1专业等级)
        let leading_post_score = parseFloat(that.data.post.leading_post[that.data.save_data.leading_post_index].score); // 领导职务
        let crack_glory_score = parseFloat(that.data.bonus_score.crack_glory[that.data.save_data.crack_glory_index].score); // 中央军委授予荣誉称号
        let one_glory_score = parseFloat(that.data.bonus_score.one_glory[that.data.save_data.one_glory_index].score); // 一等功
        let two_glory_score = parseFloat(that.data.bonus_score.two_glory[that.data.save_data.two_glory_index].score); // 二等功
        let three_glory_score = parseFloat(that.data.bonus_score.three_glory[that.data.save_data.three_glory_index].score); // 三等功
        // 处理计算奖励的计分
        if (parseInt(that.data.save_data.crack_glory_index) > 0) { crack_glory_score = crack_glory_score * parseInt(that.data.save_data.crack_glory_index); } // 中央荣誉称号
        if (parseInt(that.data.save_data.one_glory_index) > 0) { one_glory_score = one_glory_score * parseInt(that.data.save_data.one_glory_index); } // 一等功
        if (parseInt(that.data.save_data.two_glory_index) > 0) { two_glory_score = two_glory_score * parseInt(that.data.save_data.two_glory_index); } // 二等功
        if (parseInt(that.data.save_data.three_glory_index) > 0) { three_glory_score = three_glory_score * parseInt(that.data.save_data.three_glory_index); } // 三等功
        let disposition_type_score = parseFloat(that.data.penalty_deduction.disposition_type[that.data.save_data.disposition_type_index].score); // 处分类型 (减分)
        let direct_entry_deduction_score = parseFloat(that.data.save_data.direct_entry_deduction_index); // 直接录入扣分 (减分)
        let highest_education_score = parseFloat(that.data.education.highest_education[that.data.save_data.highest_education_index].score); // 最高学历
        let before_enlisting_education_score = parseFloat(that.data.education.before_enlisting_education[that.data.save_data.before_enlisting_education_index].score); // 入伍前学历
        let three_category_score = parseFloat(that.data.remote_hardship.three_category[that.data.save_data.three_category_index].score); // 三类边远艰苦地区(三类岛)
        let four_category_score = parseFloat(that.data.remote_hardship.four_category[that.data.save_data.four_category_index].score); // 四类边远艰苦地区(海拔2500米至3500米、二类岛服役)
        let five_category_score = parseFloat(that.data.remote_hardship.five_category[that.data.save_data.five_category_index].score); // 五类边远艰苦地区(海拔3500米至4500米、一类岛服役)
        let six_category_score = parseFloat(that.data.remote_hardship.six_category[that.data.save_data.six_category_index].score); // 六类边远艰苦地区(海拔4500米以上地区、特类岛)
        let aircraft_score = parseFloat(that.data.special_post.aircraft[that.data.save_data.aircraft_index].score); // 飞机
        let naval_vessels_score = parseFloat(that.data.special_post.naval_vessels[that.data.save_data.naval_vessels_index].score); // 舰艇
        let nuclear_involvement_score = parseFloat(that.data.special_post.nuclear_involvement[that.data.save_data.nuclear_involvement_index].score); // 涉核
        let retention_score = parseFloat(that.data.retention[that.data.save_data.retention_index].score); // 滞留扣分数据 (减分)
        let coutScore = 0; // 总分
        coutScore = (service_year_source + post_type_score + leading_post_score + crack_glory_score + one_glory_score + two_glory_score + three_glory_score + highest_education_score + before_enlisting_education_score + three_category_score + four_category_score + five_category_score + six_category_score + aircraft_score + naval_vessels_score + nuclear_involvement_score) - (disposition_type_score + direct_entry_deduction_score + retention_score);
        coutScore = parseFloat(coutScore.toFixed(2));
        return coutScore;
    },
    /**
     * 请求用户已经作答选中的答案
     */
    selectedItemFn() {
        let that = this;
        let openId = wx.getStorageSync('openid') || '';
        let data = { openId: openId };
        App._post('api/index/editList', { data: JSON.stringify(data) }, function(result) {
            if (result.code == 1) {
                // 处理用户选中的类型 (职务类型 (0行政职务，1专业等级))
                let administration_post_index = 0; // 行政职务
                let expertise_index = 0; // 专业等级
                if (result.data.type == 0) {
                    administration_post_index = parseInt(result.data.administration_post) > 0 ? result.data.administration_post : 0;
                } else {
                    expertise_index = parseInt(result.data.expertise) > 0 ? result.data.expertise : 0;
                }
                // 开始和结束时间显示处理
                let start_text = ''; // 开始时间字符串
                let start_arr = result.data.start_time.split('-'); // 开始时间字符串分割
                start_text = start_arr[0] + '年' + start_arr[1] + '月' + start_arr[2] + '日';
                let end_time_data = result.data.end_time.split('-'); // 结束时间字符串
                let end_text = '1970年03月31日'; // 结束时间字符串
                let end_time_format = '1970-03-31'; // 结束时间格式
                let temp_end_time = end_time_data[0]; // 年份
                let end_time_index = that.data.service_length.end_time.indexOf(temp_end_time + '年') > 0 ? that.data.service_length.end_time.indexOf(temp_end_time + '年') : 0; // 时间年份的索引
                if (end_time_index >= 0) {
                    that.data.service_length.end_time[end_time_index]; // 结束时间的年份
                    end_text = temp_end_time + '年03月31日';
                    end_time_format = temp_end_time + '-03-31';
                }
                let entry_score = parseInt(result.data.direct_entry_deduction) > 0 ? parseInt(result.data.direct_entry_deduction) : 0; // 直接录入分数冗余处理
                that.setData({
                    "service_length.end_time_index": end_time_index, // 结束时间年份的索引
                    "service_length.end_time_format": end_time_format, // 结束时间格式
                    // "service_length.end_time": result.data.end_time, // 结束时间 (服役年限)
                    "save_data.start_text": start_text, // 开始时间字符串 (服役年限)
                    "save_data.end_text": end_text, // 结束时间字符串 (服役年限)
                    "service_length.start_time": result.data.start_time, // 开始时间 (服役年限)
                    "save_data.administration_post_index": administration_post_index, // 行政职务 (职务)
                    "save_data.expertise": expertise_index, // 专业技术 (职务)
                    "post_type": result.data.type, // 职务选中的类型 (0行政职务，1专业等级)
                    "save_data.leading_post_index": result.data.leading_post, // 领导职务 (职务)
                    "save_data.crack_glory_index": result.data.crack_glory, // 中央军委授予荣誉称号 (奖励计分)
                    "save_data.one_glory_index": result.data.one_glory, // 一等功 (奖励计分)
                    "save_data.two_glory_index": result.data.two_glory, // 二等功 (奖励计分)
                    "save_data.three_glory_index": result.data.three_glory, // 三等功 (奖励计分)
                    "save_data.disposition_type_index": result.data.disposition_type, // 处分类型 (惩处扣分)
                    "save_data.direct_entry_deduction_index": entry_score, // 直接录入扣分 (惩处扣分)
                    "save_data.highest_education_index": result.data.highest_education, // 最高学历 (学历)
                    "save_data.before_enlisting_education_index": result.data.before_enlisting_education, // 入伍前学历 学历
                    "save_data.three_category_index": result.data.three_category, // 三类边远艰苦地区(三类岛) (边远艰苦地区年限)
                    "save_data.four_category_index": result.data.four_category, // 四类边远艰苦地区 (边远艰苦地区年限)
                    "save_data.five_category_index": result.data.five_category, // 五类边远艰苦地区 (边远艰苦地区年限)
                    "save_data.six_category_index": result.data.six_category, // 六类边远艰苦地区 (边远艰苦地区年限)
                    "save_data.aircraft_index": result.data.aircraft, // 飞机 (特殊岗位年限)
                    "save_data.naval_vessels_index": result.data.naval_vessels, // 舰艇 (特殊岗位年限)
                    "save_data.nuclear_involvement_index": result.data.nuclear_involvement, // 涉核 (特殊岗位年限)
                    "save_data.retention_index": result.data.retention // 滞留扣分数据
                });
            }
        }, function(result) {
            console.log("fail");
        }, function() {
            // console.log("complete");
        });
    },
    /**
     * 提交数据请求
     */
    subFn() {
        let that = this;
        // 微信昵称
        let userData = wx.getStorageSync('userinfo') || '';
        let nickName = '';
        if (userData != '') {
            nickName = userData.nickName;
        }
        // let nickName = App.globalData.userInfo.nickName != '' ? App.globalData.userInfo.nickName : ''; // 微信昵称
        let post_type = that.data.post_type; // 选择职务的类型
        let job_index = post_type == 0 ? that.data.save_data.administration_post_index : that.data.save_data.expertise_index; // 选中职务或等级选中的下标
        // 计算分数 (惩处和滞留-扣分) (服役年限算分: 8年以内(含8年)，每1年计0.8分；9至15年包含15，从第9年起，每1年计1分；16年以上，从第16年起，每1年计1.2分)
        // let yearNumber = that.timeDifference(that.data.service_length.end_time, that.data.service_length.start_time); // 相差的年份
        // 验证填写直接录入扣分项的内容
        // if (that.data.save_data.direct_entry_deduction_index == '') {
        //     wx.showToast({ title: '请先填写直接录入扣分项', icon: 'none', duration: 1500 });
        //     return false;
        // }
        // 处理服务年限问题
        let flagStatus = that.yearsHandleFn();
        if (!flagStatus) {
            wx.showToast({ title: '服务年限结束时间不能小于开始时间', icon: 'none', duration: 1500 });
            return false;
        }
        let yearNumber = that.timeDifference(that.data.service_length.end_time_format, that.data.service_length.start_time); // 相差的年份
        // 服役年限分数处理
        let service_length_source = 0;
        if (yearNumber >= 16) {
            service_length_source = (8 * 0.8) + (7 * 1) + ((yearNumber - 15) * 1.2);
        } else if (yearNumber >= 9 && yearNumber < 16) {
            service_length_source = (8 * 0.8) + ((yearNumber - 8) * 1);
        } else if (yearNumber <= 8) {
            service_length_source = yearNumber * 0.8
        }
        let score = that.computeSource(service_length_source); // 考核分
        // 处理考核分的 (奖励计分)
        // let crack_glory_score = parseFloat(that.data.bonus_score.crack_glory[that.data.save_data.crack_glory_index].score); // 中央军委授予荣誉称号
        // let one_glory_score = parseFloat(that.data.bonus_score.one_glory[that.data.save_data.one_glory_index].score); // 一等功
        // let two_glory_score = parseFloat(that.data.bonus_score.two_glory[that.data.save_data.two_glory_index].score); // 二等功
        // let three_glory_score = parseFloat(that.data.bonus_score.three_glory[that.data.save_data.three_glory_index].score); // 三等功
        let crack_glory_score = parseInt(that.data.save_data.crack_glory_index) >= 1 ? (parseFloat(that.data.bonus_score.crack_glory[that.data.save_data.crack_glory_index].score) * parseInt(that.data.save_data.crack_glory_index)) : parseFloat(that.data.bonus_score.crack_glory[that.data.save_data.crack_glory_index].score); // 中央军委授予荣誉称号
        let one_glory_score = parseInt(that.data.save_data.one_glory_index) >= 1 ? (parseFloat(that.data.bonus_score.one_glory[that.data.save_data.one_glory_index].score) * parseInt(that.data.save_data.one_glory_index)) : parseFloat(that.data.bonus_score.one_glory[that.data.save_data.one_glory_index].score); // 一等功
        let two_glory_score = parseInt(that.data.save_data.two_glory_index) >= 1 ? (parseFloat(that.data.bonus_score.two_glory[that.data.save_data.two_glory_index].score) * parseInt(that.data.save_data.two_glory_index)) : parseFloat(that.data.bonus_score.two_glory[that.data.save_data.two_glory_index].score); // 二等功
        let three_glory_score = parseInt(that.data.save_data.three_glory_index) >= 1 ? (parseFloat(that.data.bonus_score.three_glory[that.data.save_data.three_glory_index].score) * parseInt(that.data.save_data.three_glory_index)) : parseFloat(that.data.bonus_score.three_glory[that.data.save_data.three_glory_index].score); // 三等功
        let rewardCount = crack_glory_score + one_glory_score + two_glory_score + three_glory_score; // 奖励的总分
        let surplus_score = 0; // 多余分数计算处理
        if (parseInt(that.data.save_data.crack_glory_index) > 0) { // 中央荣誉称号 60
            if (rewardCount > 60) {
                surplus_score = rewardCount - 60;
            }
        } else if (parseInt(that.data.save_data.one_glory_index) > 0) { // 一等功 40
            if (rewardCount > 40) {
                surplus_score = rewardCount - 40;
            }
        } else if (parseInt(that.data.save_data.two_glory_index) > 0) { // 二等功 25
            if (rewardCount > 25) {
                surplus_score = rewardCount - 25;
            }
        } else if (parseInt(that.data.save_data.three_glory_index) > 0) { // 三等功 15
            if (rewardCount > 15) {
                surplus_score = rewardCount - 15;
            }
        }
        // let tempScore = parseInt(score) - parseInt(surplus_score); // 减去多余分数
        let tempScore = parseFloat(score.toFixed(2)) - parseFloat(surplus_score.toFixed(2)); // 减去多余分数
        score = parseFloat(tempScore.toFixed(2));
        if (score < 0 || !score) {
            score = 0; // 冗余处理
        }
        let openId = wx.getStorageSync('openid') || '';
        let entry_score = parseFloat(that.data.save_data.direct_entry_deduction_index) > 0 ? parseFloat(that.data.save_data.direct_entry_deduction_index) : 0;
        let data = {
            weixin: nickName, // 微信昵称
            score: score, // 考核分
            fuyi: yearNumber,
            fuyi_starttime: that.data.service_length.start_time, // 服役开始时间
            fuyi_endtime: that.data.service_length.end_time_format, // 服役结束时间
            type: post_type, // 职务选中的类型 (0行政职务，1专业等级)
            // dengji: job_index, // 职务等级
            zhiwu: job_index, // 职务等级
            zhiwu_status: that.data.save_data.leading_post_index, // 是否领导职务 1是 2否
            jiangli: that.data.save_data.crack_glory_index, // 中央军委授予荣誉称号
            yideng: that.data.save_data.one_glory_index, // 一等功
            erdeng: that.data.save_data.two_glory_index, // 二等功
            sandeng: that.data.save_data.three_glory_index, // 三等功
            chufen: that.data.save_data.disposition_type_index, // 处分类型
            // geren: parseFloat(that.data.save_data.direct_entry_deduction_index), // 直接录入扣分
            geren: entry_score, // 直接录入扣分
            zuigao: that.data.save_data.highest_education_index, // 最高学历
            ruwu: that.data.save_data.before_enlisting_education_index, // 入伍前学历
            sanlei: that.data.save_data.three_category_index, // 三类地区
            silei: that.data.save_data.four_category_index, // 四类地区
            wulei: that.data.save_data.five_category_index, // 五类地区
            liulei: that.data.save_data.six_category_index, // 六类地区
            feixing: that.data.save_data.aircraft_index, // 飞行岗
            jianting: that.data.save_data.naval_vessels_index, // 舰艇岗
            shehe: that.data.save_data.nuclear_involvement_index, // 涉核岗
            zhiliu: that.data.save_data.retention_index, // 滞留
            openId: openId
        };
        App._post('api/index/test', { data: JSON.stringify(data) }, function(result) {
            if (result.code == 1) {
                console.log("success");
                wx.navigateTo({ url: '../page3/index' });
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
        let openId = wx.getStorageSync('openid') || '';
        if (openId == '') {
            wx.redirectTo({ url: '../authorize/index' });
            return false;
        }
        let data = { openId: openId };
        // 处理选择年份的问题
        let k = 2200;
        let end_time_year = [];
        for (let n = 1970; n <= k; n++) {
            end_time_year.push(n + '年');
        }
        App._post('api/index/getList', { data: JSON.stringify(data) }, function(result) {
                if (result.code == 1) {
                    console.log('success');
                    let start_text = ''; // 开始时间字符串
                    let end_text = ''; // 结束时间字符串
                    let start_time = result.data.start_time;
                    if (result.data.start_time == '') {
                        start_time = '1970-01-01';
                    }
                    // 开始和结束时间显示处理 (服役年限)
                    let start_arr = start_time.split('-'); // 开始时间字符串分割
                    start_text = start_arr[0] + '年' + start_arr[1] + '月' + start_arr[2] + '日';
                    // let end_arr = result.data.end_time.split('-'); // 结束时间字符串分割
                    // end_text = end_arr[0] + '年' + end_arr[1] + '月' + end_arr[2] + '日';
                    // let end_time = end_arr[0] + '-03-31';
                    let end_time_format = '1970-03-31'; // 结束时间格式
                    let end_year = result.data.now_time.split('-')[0];
                    end_text = end_year + '年03月31日';
                    that.setData({
                        "service_length.end_time_format": end_time_format, // 结束时间格式
                        'service_length.start_time': start_time, // 开始时间 (服役年限)
                        'save_data.start_text': start_text, // 开始时间字符串 (服役年限)
                        'service_length.end_time': end_time_year, // 结束时间 (服役年限)
                        'save_data.end_text': end_text, // 结束时间字符串 (服役年限)

                        'post.administration_post': result.data.administration_post, // 行政职务 (职务)
                        'post.expertise': result.data.expertise, // 专业技术 (职务)
                        'post.leading_post': result.data.leading_post, // 领导职务 (职务)

                        'bonus_score.crack_glory': result.data.crack_glory, // 中央军委授予荣誉称号 (奖励计分)
                        'bonus_score.one_glory': result.data.one_glory, // 大军区级荣誉称号或一等功 (奖励计分)
                        'bonus_score.two_glory': result.data.two_glory, // 二等功 (奖励计分)
                        'bonus_score.three_glory': result.data.three_glory, // 三等功 (奖励计分)

                        'penalty_deduction.disposition_type': result.data.disposition_type, // 处分类型 (惩处扣分)
                        'penalty_deduction.direct_entry_deduction': result.data.direct_entry_deduction, // 直接录入扣分 (惩处扣分)
                        'save_data.direct_entry_deduction_index': result.data.direct_entry_deduction, // 直接录入扣分 (惩处扣分)

                        'education.highest_education': result.data.highest_education, // 最高学历 (学历)
                        'education.before_enlisting_education': result.data.before_enlisting_education, // 入伍前学历 (学历)

                        'remote_hardship.three_category': result.data.three_category, // 三类边远艰苦地区(三类岛) (边远艰苦地区年限)
                        'remote_hardship.four_category': result.data.four_category, // 四类边远艰苦地区(海拔2500米至3500米、二类岛服役) (边远艰苦地区年限)
                        'remote_hardship.five_category': result.data.five_category, // 五类边远艰苦地区(海拔3500米至4500米、一类岛服役) (边远艰苦地区年限)
                        'remote_hardship.six_category': result.data.six_category, // 六类边远艰苦地区(海拔4500米以上地区、特类岛) (边远艰苦地区年限)

                        'special_post.aircraft': result.data.aircraft, // 飞机 (特殊岗位年限)
                        'special_post.naval_vessels': result.data.naval_vessels, // 舰艇 (特殊岗位年限)
                        'special_post.nuclear_involvement': result.data.nuclear_involvement, // 涉核 (特殊岗位年限)

                        'retention': result.data.retention, // 滞留扣分数据

                        'now_time': result.data.now_time // 当前的时间
                    });
                    // 判断用户是否已经考核过
                    if (parseInt(result.data.is_post)) {
                        that.selectedItemFn(); // 请求用户已经做答的选项
                    }
                };
            },
            function(result) {
                console.log("fail");
            },
            function() {
                console.log("complete");
            })
    }
})