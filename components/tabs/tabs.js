// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){
      /* 获取列表id值 */
      const {index } = e.target.dataset;
      /* 定义引用组件事件 */
      this.triggerEvent('handleTabsChange',{index})
    }
  }
})
