// pages/category/index.js
// 引入request 请求 和API
import { request } from "../../requset/index";
import { api } from "../../requset/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧导航栏数据
    leftMenuList:[],
    //右侧内容
    rightContent:[]
  },
  /* 同层级可以定义变量 */
    cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      request({
        url:api+'api/public/v1/categories'
      })
      .then(res =>{
        this.cates = res.data.message;
        console.log(this.cates,"分类数据")
        //  xxx.map( (x)=>{ return  x.cat_name })
         /* 传入的是使用map对象 遍历对象 
         里面可以做条件过滤 
         单一条件时可省略 {} 和return */
        let leftMenuList = this.cates.map( x => x.cat_name ) 
        let rightContent = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })
      .catch(err =>{
        console.log(err)
      })
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