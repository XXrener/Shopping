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
    totallnum:0
  },
  /* 自定义事件 */
  //收货地址
  //设想情况 1 直接授权 2 拒绝后想再次授权 {判断值：授权状态||新版授权已取消地址授权设置 默认返回true}
  //直接在获取地址前 调用获取权限让他默认返回true
  //版本更新 默认授权 测试工具没更新 真机直接调用接口
  /* 页面周期函数 */
  onShow(){
    let address = wx.getStorageSync('address');
    //购买商品存在为0情况 使用或运算符  商品为零 取空数组 确保变量类型正确
    let cart = wx.getStorageSync('cart')||[];

    //不用单独遍历 直接在计算总价格时判断 提高性能
    // let allChecked = cart.length?cart.every( i => i.checked ===true ):false;
    let allChecked = true;
    let totalling = 0;
    let totallnum = 0;
    cart.forEach(v =>{
      if(v.checked===true){
          totalling+= v.goods_price*v.num;
          totallnum +=v.num
      }else{
        allChecked=false
      }
    })
    //二次判定 购物车为零时 让全选=false
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      address,
      cart,
      allChecked,
      totalling,
      totallnum
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
 /* 商品选择框 */
 changeBox(e){
    console.log(e,"改变状态")
 },
 checkboxChange(e){
   console.log(e,"自带事件")
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