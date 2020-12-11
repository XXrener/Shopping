//Page Object
//JSON文件中 usingComponent 引入自定义组件
//引入 请求文件
import { request } from "../../requset/index.js";
import { api } from "../../requset/http.js";
Page({
  data: {
    listSwiper:'',    //轮播图
    catitemslist:'',  //导航分类
    floorlist:'',     //楼层分类
    list:            //导航跳转路径 覆盖导航路径
      [
        {navigator_url: "/pages/category/main"},
        {navigator_url: "/pages/category/main"},
        {navigator_url: "/pages/category/main"},
        {navigator_url: "/pages/category/main"}
      ]
             
  }, 
  //options(Object)
  onLoad: function(options) {
    /* var reqTask = wx.request({   原生请求
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      data: {},
      // header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        // this.data.listSwiper = result.data.message 傻逼操作 不能直接赋值 小程序 只能使用 this.setdata({})
        
        this.setData({
            listSwiper: result.data.message
        })
        console.log(this.data.listSwiper)
      },
      fail: (err) => {console.log(err);},
      complete: () => {}
    }); */
    console.log(this.data.listSwiper.length,"轮播图")
    if(this.data.listSwiper.length == 0 ){
      wx.showLoading({
        title: "正在加载轮播图",
        mask: true
      });
      wx.nextTick(()=>{
        setTimeout(()=>{
          this.getSlidesShow()
        },500)
      })
      

      if(this.data.catitemslist.length== 0 ){
        wx.showLoading({
          title: "正在加载导航栏",
          mask: true
        });
        
        wx.nextTick(()=>{
          setTimeout(()=>{
            this.getNavigation()
          },500)
        })
        if(this.data.floorlist.length== 0 ){
          wx.showLoading({
            title: "正在加载楼层数据",
            mask: true
          });
          
          wx.nextTick(()=>{
            setTimeout(()=>{
              this.getFloor() 
            },500)
          })
        }
      }

    }
  
    /* 轮播图请求 */

      /* 导航数据 */
      
      /* 楼层图数据 */
      
     
  },
  /* 轮播请求 */
  async getSlidesShow(){
    let res = await request({url:"api/public/v1/home/swiperdata"})
      this.setData({
        listSwiper:res
      })
      wx.showLoading({
        title: "轮播图加载完成",
        mask: true
      });
        
  },
  /*导航请求*/
  async getNavigation(){
    let res = await request({url:'api/public/v1/home/catitems'})
    this.setData({
      catitemslist:res
    });
      wx.showLoading({
        title: "导航栏加载完成",
        mask: true
      });
        
  },
  /* 楼层请求 */
  async getFloor(){
    let res =await request({url:'api/public/v1/home/floordata'})
    this.setData({
      floorlist:res
    })
    wx.showLoading({
      title: "楼层数据加载完成",
      mask: true
    });
    wx.hideLoading()
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  