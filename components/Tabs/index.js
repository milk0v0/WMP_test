// components/Tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    fn: {
      type: Function
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
    handleItem(e) {
      const { index } = e.currentTarget.dataset;

      this.triggerEvent('change', index);
      // const { tabs } = this.properties;
      // tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);

      // this.setData({
      //   tabs: [...tabs]
      // })
    }
  }
})
