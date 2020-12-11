// pages/goods_detail/index.js
import { request } from "../../requset/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 页面加载时获取详情 */
    const {goods_id } = options;
    this.getDdetail(goods_id)
    console.log(goods_id)

  },
  /*详情请求 get */
  async getDdetail(id){
    console.log(id,"请求内的ID")
    let detailList = await request({url:'api/public/v1/goods/detail',data:{goods_id:id}})
    this.setData({
      detailList
    })
    console.log(this.data.detailList,"赋值参数")
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