// pages/goods_detail/index.js
import { request } from "../../requset/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[]
  },
  /* 全局变量 */
  GoodsList:{},
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
    /* 优化数据获取 省略不必要数据 提升性能 */
        this.GoodsList = detailList
    this.setData({
      detailList:{
        goods_name:detailList.goods_name,
        goods_price:detailList.goods_price,
        //前端替换webp格式 ios系统不支持 
        goods_introduce:detailList.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:detailList.pics

      }
    })
    console.log(this.data.detailList,"赋值参数")
  },
  /* 新页面预览图片 */
  handlePreview(e){ 
    console.log(e)
    let current = e.currentTarget.dataset.url
    let urls = this.GoodsList.pics.map(v=> v.pics_mid)
    wx.previewImage({
      current,
      urls
    });
      
  },
  /* 加入购物车 */
  handleCartAdd(){
    console.log("加入购物车");
    //获取缓存的页面数据 findIndex 传入要遍历的数组 返回数组中符合条件的的第一个值的索引 找到后直接返回 剩下的不在找了
    let cart = wx.getStorageSync('cart')||[];
     let index = cart.findIndex((v)=>{
       return v.goods_id === this.GoodsList.goods_id
     }) 
     if(index=== -1){
       //初始添加 给数组添加num属性
       this.GoodsList.num = 1;
       this.GoodsList.checked = true;
       cart.push(this.GoodsList)
       wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
     }else{
       if(cart.num>=this.GoodsList.goods_number){
         wx.showToast({
           title: '商品已经卖完了',
           icon: 'fail',
           duration: 1500,
           mask: true
         });
           
       }else{
        
         cart[index].num++; 
         wx.showToast({
          title: '已加入购物车',
          icon: 'success',
          duration: 1500,
          mask: true,
        });  
       }
      
     }
    //  把更新的数组存入缓存中
     wx.setStorageSync('cart',cart);
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