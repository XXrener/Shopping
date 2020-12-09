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
    /* 浅层封装后的请求 */
    
    console.log(api+'api/public/v1/home/swiperdata',"你是什么")
      request({url:api+"api/public/v1/home/swiperdata"})
      .then(res=>{
        this.setData({
          listSwiper:res.data.message
        })
        console.log(this.data.listSwiper,"轮播图");
      })
      .catch( err => {
        console.log(err)
      });
      /* 导航数据 */
      request({url:'api/public/v1/home/catitems'})
      .then( res => {
        console.log(res,"导航")
        let data = res.data.message;
        const nav = this.data.list
        
        console.log(data)
        //给获取的数据添加跳转链接
        let datas = data.map((item) =>{
            console.log(item ,"遍历出来后是什么")
             if(!item.path){
              item.path = nav
             }
             return item
        })

        console.log(datas,"添加后的数据")

        // data.push(this.data.list)
        
        this.setData({
          catitemslist:datas
        });
        console.log(this.data.catitemslist,"赋值后的数据")
      })
      .catch( err => {
        console.log(err)
      })
      /* 楼层图数据 */
      request({url:'api/public/v1/home/floordata'})
      .then( res => {
        console.log(res.data.message,"楼层")
        this.setData({
          floorlist:res.data.message
        })
      })
      .catch( err => {
        console.log(err)
      })
     
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
  