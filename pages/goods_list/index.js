// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* 列表按钮 */
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ]
  },
  /* 自定义事件 e.detail 获取自定义组件的参数 */
  OnHandleItemChange(e){
    console.log(e,"父组件的事件")
    /* 结构赋值 */
    const {index} = e.detail;
    const {tabs} = this.data;
    /* forEach 参数 一个是对象本身 一个对象索引值 */
    tabs.forEach((tabs , i) => {
       return i===index?tabs.isActive=true:tabs.isActive = false;
    });
    /* 源数据列表改变后 需要再次保存 */
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 传递参数的获取 */
    console.log(options,"你是我填的值吗");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})