Page({
    data: {
        array: ['2018年07月14日', '中国', '巴西', '日本'],
        index: 0,
        date: '2016-09-01',
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