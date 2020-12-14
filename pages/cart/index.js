// pages/cart/index.js
import { chooseAddress } from "../../utils/wxadds";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 购物车商品是否为空
    emptyOfCart:true,
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
    let emptyOfCart = cart.length!=0?true:false
    console.log(cart,"你获取到源数据还是空数组");
    //调用计算价格与数量
    this.onPriceAndNumber(cart)
    this.setData({
      address,
      emptyOfCart
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
   //获取本地缓存
  let cart = wx.getStorageSync('cart');
  this.setData({
    allChecked:!this.data.allChecked
  })
  if(this.data.allChecked===false){
    let totalling = 0 ;
    let totallnum = 0 ;
    this.setData({
      totalling,
      totallnum
    })
    cart.forEach( v => v.checked =false)
  }else{
    
    cart.forEach( v=> v.checked =true)   
  }
  this.onPriceAndNumber(cart)
  console.log(this.data.allChecked,"全选值")
 },
//  商品数量减
  reduce(e){
    //商品ID
    let {id} = e.currentTarget.dataset;
    //本页商品源数据
    let {cart} = this.data||[];
  
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
  /* 数量加减 */
  changeNumber(e){
    //值绑定 1 -1 同时获取商品ID和数量＋ /－
    let {id,num} = e.currentTarget.dataset;
    //获取源数组
    let {cart} = this.data;
    
    //获取源数据的id
    let index = cart.findIndex(v => v.goods_id === id);
    console.log(cart[index].num=== 1 && num === -1,"真假");
    // 设置数量为1时弹出提示  不为1时根据传来的值 直接加等于 源数据
    if(cart[index].num=== 1 && num === -1){
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index,1)
            console.log("有没有走到这里");
            this.onPriceAndNumber(cart)
          }
        },
        fail: () => {
          console.log("你点击了取消");
        },
        complete: () => {}
      });
        
    }else{
      cart[index].num+=num;
      this.onPriceAndNumber(cart)
    }
    console.log(cart,"删完之后");
    //最后调用计算总价和总数量 重新复制 源数据 本地缓存
   
  },
  //计算总价格与数量
  onPriceAndNumber(arr){
   //接受数组
    console.log(arr,"总价计算的传参");
    let cart = arr||[];
    console.log(cart,"你被赋了什么值");
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
    //数据为零 显示购物车为空
      let emptyOfCart = cart.length!=0?true:false
    // 保存更新页面数据 
    this.setData({
      cart,
      totalling,
      totallnum,
      allChecked,
      emptyOfCart
    })
    // 将新数组覆盖本地缓存
    wx.setStorageSync("cart", cart);
  },
  /* 点击商品状态栏 checked为真时：立即购买，checked为false:是否删除商品 */
  handleStatus(e){
   
    let {id} = e.currentTarget.dataset;
    console.log(id,"触发了我");
    let cart = wx.getStorageSync('cart');
    let index = cart.findIndex( v => v.goods_id === id)
    console.log(index,"返回数组");
    if(cart[index].checked === false){
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index,1)
          }
        },
        fail: () => {console.log("取消");},
        complete: () => {}
      });
        
    }else{
      wx.showModal({
        title: '提示',
        content: '是否立即购买',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            console.log("跳转到支付页")
          }
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
  }
})