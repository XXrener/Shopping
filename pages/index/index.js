//Page Object
//JSON文件中 usingComponent 引入自定义组件
Page({
  data: {
    
  },
  //options(Object)
  onLoad: function(options) {
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
     /*  data: {}, */
      // header: {'content-type':'application/json'},
     /*  method: 'GET',
      dataType: 'json',
      responseType: 'text', */
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {}
    });
      
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
  