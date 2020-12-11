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
    goodslist:[],
    // 总页数
    pagetotal:3
  },
  /* page变量 get 请求参数 */
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
     let res = await request({url:"api/public/v1/goods/search",data:this.QueryParams})
     console.log(res)
    // 计算总页数 总条数 / 页面条数 向上取整 Math.ceil()
    // 接口数据太多 测试下 直接设置总页数为3
   /*  const total = res.total;
    this.pagetotal = Math.ceil(total / this.QueryParams.pagesize) */
    
    // 更新本地数据存储方法 防止覆盖参数 数组拼接
    //方法1
  
    let data = this.data.goodslist;
    data.push(...res.goods)
    this.setData({
      goodslist:data
    })
    
    /*  视频方法  
        this.setData({
          goodslist:[...this.data.goodslist,...res.goods]
       }) 
    */
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
      console.log('%c 上拉到底',' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em;')
      /* 
        1.重置列表数据
        2.重置页码
        3.重新发送请求
        4.加载完成手动关闭刷新
      */
     this.setData({
       goodslist:[]
     })
     this.QueryParams.pagenum = 1;
     this.getGoodList()
     wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.pagetotal>this.QueryParams.pagenum){
      this.QueryParams.pagenum++;
      console.log(this.QueryParams.pagenum,"自增之后的页数")
      this.getGoodList()
    }else{
      console.log('%c 没有数据了',' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em;')
      wx.showToast({
        title: '没有下一页了'
      });
        
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})