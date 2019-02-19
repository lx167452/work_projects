Page({
    data: {
        array: ['2018年07月14日', '中国', '巴西', '日本'],
        index: 0,

        service_length: { // 服役年限
            start_time: ["2018年07月14日"], // 开始时间
            end_time: ["2018年08月28日"] // 结束时间
        },
        post: { // 职务
            administration_post: ["排职", "副连职", "正连职", "副营职", "正营职", "副团职", "正团职", "副师职"], // 行政职务
            expertise: ["技术1级", "技术2级", "技术3级", "技术4级", "技术5级", "技术6级", "技术7级", "技术8级", "技术9级", "技术10级", "技术11级", "技术12级", "技术13级"], // 专业技术
            leading_post: 1 // 领导职务
        },
        bonus_score: { // 奖励计分
            crack_glory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 中央军委授予荣誉称号
            one_glory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 大军区级荣誉称号或一等功
            two_glory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 二等功
            three_glory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // 三等功
        },
        penalty_deduction: { // 惩处扣分
            disposition_type: ["行政警告处分", "行政严重警告处分", "记过及党内警告处分", "记大过及党内严重警告处分", "降职（级）或者降衔（级）及撤销党内职务处分", "撤职处分及留党察看处分"], // 处分类型
            direct_entry_deduction: [] // 直接录入扣分
        },
        education: { // 学历
            highest_education: ["高中及以下", "中专", "大专", "本科", "硕士", "博士"], // 最高学历
            before_enlisting_education: ["高中及以下", "中专", "大专", "本科", "硕士", "博士"] // 入伍前学历
        },
        remote_hardship: { // 边远艰苦地区年限
            three_category: ['一年', '二年', '三年', '四年', '五年', '六年'], // 三类边远艰苦地区(三类岛)
            four_category: ['一年', '二年', '三年', '四年', '五年', '六年'], // 四类边远艰苦地区(海拔2500米至3500米、二类岛服役)
            five_category: ['一年', '二年', '三年', '四年', '五年', '六年'], // 五类边远艰苦地区(海拔3500米至4500米、一类岛服役)
            six_category: ['一年', '二年', '三年', '四年', '五年', '六年'] // 六类边远艰苦地区(海拔4500米以上地区、特类岛)
        },
        special_post: { // 特殊岗位年限
            aircraft: ['一年', '二年', '三年', '四年', '五年', '六年'], // 飞机
            naval_vessels: ['一年', '二年', '三年', '四年', '五年', '六年'], // 舰艇
            nuclear_involvement: ['一年', '二年', '三年', '四年', '五年', '六年'] // 涉核
        },
        retention: ['滞留一年', '滞留二年', '滞留三年', '滞留四年', '滞留五年', '滞留六年'], // 滞留扣分数据
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    }
})