// pages/cart/index.js
import { chooseAddress } from "../../utils/wxadds";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址信息
    address:{},
    //商品详情
    cart:[],
    // 全选
    allChecked:false,
    //总价格 总数量
    totalling:0,
    totallnum:0,
    // 选择框数组
    checkedList:[]
  },
  /* 自定义事件 */
  //收货地址
  //设想情况 1 直接授权 2 拒绝后想再次授权 {判断值：授权状态||新版授权已取消地址授权设置 默认返回true}
  //直接在获取地址前 调用获取权限让他默认返回true
  //版本更新 默认授权 测试工具没更新 真机直接调用接口
  /* 页面周期函数 */
  onShow(){
    // 页面显示 渲染地址
    let address = wx.getStorageSync('address');
    //购买商品存在为0情况 使用或运算符  商品为零 取空数组 确保变量类型正确
    let cart = wx.getStorageSync('cart')||[];
    //调用计算价格与数量
    this.onPriceAndNumber(cart)
    this.setData({
      address
    })
      
  },
  /* 获取收货地址 */
  async handleAddress(){
      try{
        let address =await chooseAddress() 
         address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
         console.log(address.all,"新增属性")
        wx.setStorageSync('address', address);
          
      }catch(err){
        console.log(err,"抛出错误")
      }
  },
 /* 商品单选框 */
 changeChecked(e){
    // 1.拿到商品id 
    let {id} = e.currentTarget.dataset;
    // 2.获取页面的商品数组 本地缓存直接覆盖
    let {cart} = this.data;

    // 3.改变数组中checked值
    cart.map(v =>{
      if(v.goods_id===id){
        v.checked= !v.checked
      }
    })
    //重新算总价格 跟 总数量
    this.onPriceAndNumber(cart)
 },
 /* 商品全选框 */
 changeAllChecked(){
  let {allChecked} = this.data;
  this.setData({
    allChecked:!allChecked
  })
  if(this.data.allChecked===false){
    let totalling = 0 ;
    let totallnum = 0 ;
    this.setData({
      totalling,
      totallnum
    })
  }else{
    let cart = wx.getStorageSync('cart');
    cart.forEach( v=> v.checked =true)
    this.onPriceAndNumber(cart)
      
  }
  console.log(allChecked,"全选值")
 },
//  商品数量减
  reduce(e){
    //商品ID
    let {id} = e.currentTarget.dataset;
    //本页商品源数据
    let {cart} = this.data;
  
    cart.forEach( (v,index)=>{
      if(v.goods_id===id){
        if(v.num>1){
          v.num--
        }else{
          //删除为0 的商品
          cart.splice(index,1)
        }
      }
      return;
    })
    
    //调用重新计算价格
    this.onPriceAndNumber(cart)
  },
// 商品数量加
  augment(e){
    let {id} = e.currentTarget.dataset;
    let {cart} = this.data;
    cart.forEach( v=>{
      if(v.goods_id===id){
        v.num++
      }
      return;
    })
    this.onPriceAndNumber(cart)
  },
  //计算总价格与数量
  onPriceAndNumber(arr){
   //接受数组
   let cart = arr;
   let totalling = 0;
   let totallnum = 0;
   let allChecked =true;
   cart.forEach(v=>{
     if(v.checked===true){
       totalling += v.num * v.goods_price
       totallnum +=v.num
     }else{
       allChecked= false
     }
   })
  //  数组为 0 二次判断全选状态 
  allChecked = cart.length!=0?allChecked:false
  // 保存页面数据
  this.setData({
    cart,
    totalling,
    totallnum,
    allChecked
  })
  // 将新数组覆盖本地缓存
  wx.setStorageSync("cart", cart);
 }
  /* 消息提示
  openConfirm: function () {
    wx.showModal({
        content: '检测到您没打开地址权限，是否去设置打开？',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
            if (res.confirm) {
              console.log(res)  
              wx.openSetting({
                success: (result) => {
                  console.log(res.authSetting,"打开授权")
                },
                fail: () => {},
                complete: () => {}
              });
                
              
            } else {
                console.log('用户点击取消')
            }
        }
    }); 
},  
 */     
            

})