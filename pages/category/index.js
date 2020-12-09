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
    rightContent:[],
    //导航按钮
    itemindex:0
  },
  /* 同层级可以定义变量 */
    cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      /* 获取数据 */
      /* 改用微信本地缓存接口数据 限定时间 */
      try{
        const cates = wx.getStorageSync('cates');
        if(!cates){
          this.getRequest()
        }else{
          /* 旧数据大于十秒重新请求数据 更新 */
          if(Date.now()-cates.time>1000*10){
            this.getRequest()
          }else{
            this.cates = cates.data;
            let leftMenuList = this.cates.map( x => x.cat_name ) 
            let rightContent = this.cates[0].children;
            this.setData({
              leftMenuList,
              rightContent
            })
          }
        }
      }catch(err){
        console.log("出了点问题")
      }
        
     this.getRequest()
  },
  /* 定义获取数据 分类渲染 */
  getRequest(){
    request({
      url:api+'api/public/v1/categories'
    })
    .then(res =>{
      this.cates = res.data.message;
      /* 本地缓存 类似浏览器的localStorage */
      wx.setStorageSync("cates", {time:Date.now(),data:this.cates});
        
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
  /* 获取左侧列表ID */
  handleItemTap(e){
    /* 解构赋值 */
    const {index} = e.target.dataset;
    console.log(e.currentTarget.dataset ,"列表ID")
    let rightContent = this.cates[index].children;
    this.setData({
      itemindex:index,
      rightContent
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