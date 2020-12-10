// pages/goods_list/index.js
import { request } from "../../requset/index";
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
    ],
    // 页面数据源
    goodslist:[]
  },
  /* 同级变量 get 请求参数 */
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  /* 自定义事件 e.detail 获取自定义组件的参数 点击后 更改原数组isActive值 进行切换 */
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
  /* get 请求 */
  async getGoodList(){
     let res =await request({url:"api/public/v1/goods/search",data:this.QueryParams})
     console.log(res)
     this.setData({
       goodslist:res.goods
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 传递参数的获取 */
    console.log(options,"你是我填的值吗");
    this.QueryParams.uid = options.uid;
    this.getGoodList()
    
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