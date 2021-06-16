## 前言

+ 前端现在的东西越来越多，基础的有 `css` `html` `javaScript`，三大框架 `vue` `react` `angular`，还有今天要讲的一个东西，小程序
+ 小程序有很多，各大平台都推出自己的小程序应用，而最被人们熟悉的是 `微信小程序` 如今也成为了前端必备技能之一，当然不必害怕这么多的API怎么办，都差不多~
+ 在我的认知里面小程序是什么？有什么用？他在现在web越来越为市场作为应用的环境里提供了一个很好的平台，还扩充了一些只有程序才有的功能，例如录音，摄像头的调用，它实现了不需要下载安装既可使用的应用
+ 都说会三大框架学小程序很简单，就能写，事实如何？这篇文章，我以一个已经熟知 `Vue` 框架的视角，去看看，小程序到底有什么不同，我们到底能不能写出小程序
+ 此文章只带大家粗略的入门，小程序的坑还是挺多的，建议开发时多查查文档~



## 预备工作

+ 我将会使用 `微信开发者工具` 和 `VsCode` 编程
+ 微信开发者工具
+ vsCode: 小程序开发助手
+ 账号的申请等官方已经为我们准备了详细的[文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html)，这里就不赘述了，当然，一开始我们也可以使用测试号尝试



## 结构目录

| 结构 |  传统web   | 微信小程序 |     Vue      |
| :--: | :--------: | :--------: | :----------: |
| 结构 |    html    |    wxml    | `<template>` |
| 样式 |    css     |    wxss    |  `<style>`   |
| 逻辑 | JavaScript | JavaScript |  `<script>`  |
| 配置 |     无     |    json    |     json     |

+ `pages` 内为页面内容，以**从上到下的整个大框为一个页面**的标准，对比 `Vue` 的目录结构一般为 `views`
+ `pages` 外的部分，为公共样式、逻辑、配置
+ `project.config.json`：项目的配置文件 appid等信息
+ `sitemap.json`：微信索引配置文件 - 配置小程序及其页面是否允许被微信索引



## 配置文件

### app.json

#### `pages`
+ 页面内容数组，我们可以把它看为是小程序 `router`，与 `Vue` 相比，`pages` 对应 `views`，而非 `components`
+ 如果我们需要新增一个页面，可在 `pages` 内增加一个 路径及页面名称信息，则微信开发者工具会自动新增该文件
+ `[0]` 下为一打开小程序进入的页面

#### `window`

+ 定义所有页面的顶部背景颜色，文字颜色定义等
+ 参数与 `pages` 目录下的页面 `json` 类似，`app.json` 为全局配置，请看 [`pages/xxx.json`](#xxx.json)

#### `tabbar`

+ 导航组件

+ `list` - 导航信息数组

```javascript
// 最少两个
{
  "list": [{
  "pagePath": "pages/index/index", // pages 内的 路径
  "text": "首页", // 文字描述
  "iconPath": "assets/index.png", // 未选中图标
  "selectedIconPath": "assets/index_select.png" // 选中后图标
  },{
  "pagePath": "pages/my/index",
  "text": "我的",
  "iconPath": "assets/my.png",
  "selectedIconPath": "assets/my_select.png"
  }]
}
```

+ 其他常用配置

|      属性       |   类型   | 必填/默认值 |                      描述                      |
| :-------------: | :------: | :---------: | :--------------------------------------------: |
|      color      | HexColor |    必填     |    tab 上的文字默认颜色，仅支持十六进制颜色    |
|  selectedColor  | HexColor |    必填     |  tab 上的文字选中时的颜色，仅支持十六进制颜色  |
| backgroundColor | HexColor |    必填     |        tab 的背景色，仅支持十六进制颜色        |
|   borderStyle   |  string  |    black    | tabbar 上边框的颜色， 仅支持 `black` | `white` |
|    position     |  string  |   bottom    |     tabBar 的位置，仅支持 `bottom` | `top`     |
|     custom      | boolean  |    false    |                 自定义 tabBar                  |




### <span id="xxx.json">page/xxx.json</span>

+ 这里仅列出常用配置，更多可看文档，或者啥时候我有空再写~


|             属性             |   类型   |  默认值  |                             描述                             |
| :--------------------------: | :------: | :------: | :----------------------------------------------------------: |
| navigationBarBackgroundColor | HexColor | \#000000 |                        导航栏背景颜色                        |
|    navigationBarTextStyle    |  string  |  white   |                   导航栏标题颜色， `black`                   |
|    navigationBarTitleText    |  string  |          |                      导航栏标题文字内容                      |
|       backgroundColor        | HexColor | \#ffffff |                         窗口的背景色                         |
|     backgroundTextStyle      |  string  |   dark   |                 下拉 loading 的样式， `dark`                 |
|    enablePullDownRefresh     | boolean  |  false   |                   是否开启当前页面下拉刷新                   |
|    onReachBottomDistance     |  number  |    50    |        页面上拉触底事件触发时距页面底部距离，单位为px        |
|        disableScroll         | boolean  |  false   | 设置为 `true` 则页面整体不能上下滚动<br />只在页面配置中有效，无法在 `app.json` 中设置 |
|       usingComponents        |  Object  |          |                           使用组件                           |



## 组件

+ 所有小程序内提供的所谓标签，我们都可以把它视为组件，他跟 `html` 的标签有很多相似之处，但实际微信也给我们提供了很多拓展，下面我们大概看一下常用的组件吧~

### <span id="text">text</span>

+ ≈ `<span>`
+ 有一点需要注意，小程序内可选区文本仅在 `text` 可用

|    属性     |  类型   | 默认值 |                             描述                             |
| :---------: | :-----: | :----: | :----------------------------------------------------------: |
| user-select | boolean | false  |     文本是否可选，该属性会使文本节点显示为 inline-block      |
|    space    | string  |        |              显示连续空格，`ensp` `emsp` `nbsp`              |
|   decode    | boolean | false  | 是否解码`&nbsp;` `&lt;` `&gt;` `&amp;` `&apos;` `&ensp;` `&emsp;` |



### <span id="view">view</span>

+ ≈ `<div>`

|          属性          |  类型   | 默认值 |                             描述                             |
| :--------------------: | :-----: | :----: | :----------------------------------------------------------: |
|      hover-class       | string  |  none  | 指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果 |
| hover-stop-propagation | boolean | false  |            指定是否阻止本节点的祖先节点出现点击态            |
|    hover-start-time    | number  |   50   |                按住后多久出现点击态，单位毫秒                |
|    hover-stay-time     | number  |  400   |              手指松开后点击态保留时间，单位毫秒              |

+ 以上其实一般可以使用 `:active` 代替，如无特殊要求，不用记



### image

+ ≈ `<img>` + `background`
+ 默认宽度320px，高度240px

|          属性          |    类型     |   默认值    |                          描述                          |
| :--------------------: | :---------: | :---------: | :----------------------------------------------------: |
|          src           |   string    |             |                      图片资源地址                      |
|          mode          |   string    | scaleToFill |                  图片裁剪、缩放的模式                  |
|          webp          |   boolean   |    false    |          默认不解析 webP 格式，只支持网络资源          |
|       lazy-load        |   boolean   |    false    | 图片懒加载，在即将进入一定范围（上下三屏）时才开始加载 |
| show-menu-by-longpress |   boolean   |    false    |            开启长按图片显示识别小程序码菜单            |
|       binderror        | eventhandle |             |       当错误发生时触发，event.detail = {errMsg}        |
|        bindload        | eventhandle |             |  当图片载入完毕时触发，event.detail = {height, width}  |

+ mode 对比 css

|      值       |             css \| 说明             |
| :-----------: | :---------------------------------: |
| `scaleToFill` |    `background-size: 100% 100%;`    |
|  `aspectFit`  |     `background-size: contain;`     |
| `aspectFill`  |      `background-size: cover;`      |
|  `widthFix`   | `height:auto;` 此时 `height` 将失效 |
|  `heightFix`  |  `width:auto;` 此时 `width` 将失效  |

+ 其余的 `top` `bottom` `center` `left` `right` 等，我个人觉得实际作用不大，都是以原图片宽高裁剪显示，真要这么做，确实用 `<view>` + `background` 比较好



### navigator

+ ≈ `<router-link>`

|    属性    |  类型  |  默认值  |                         描述                          |
| :--------: | :----: | :------: | :---------------------------------------------------: |
|   target   | string |   self   |      在哪个目标上发生跳转，默认当前小程序 `self`      |
|    url     | string |          |                当前小程序内的跳转链接                 |
| open-type  | string | navigate |                       跳转方式                        |
|   delta    | number |    1     | 当 open-type 为 'navigateBack' 时有效，表示回退的层数 |
| hover 相关 |        |          |              与 [`view`](#view) 属性一样              |

+ open-type 的值

|      值      |                             描述                             |
| :----------: | :----------------------------------------------------------: |
|   navigate   | 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。 |
|   redirect   | 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。 |
|  switchTab   |       跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面       |
|   reLaunch   |             关闭所有页面，打开到应用内的某个页面             |
| navigateBack |            关闭当前页面，返回上一页面或多级页面。            |
|     exit     |           退出小程序，`target="miniProgram"`时生效           |

+ 跳转至其他小程序，当`target="miniProgram"`时有效

|     属性     |    类型     |                             描述                             |
| :----------: | :---------: | :----------------------------------------------------------: |
|    app-id    |   string    |                     要打开的小程序 appId                     |
|     path     |   string    |              打开的页面路径，如果为空则打开首页              |
|  extra-data  |   object    | 需要传递给目标小程序的数据，目标小程序可在 `App.onLaunch()`，`App.onShow()` 中获取到这份数据 |
|   version    |   string    |                      要打开的小程序版本                      |
| bindsuccess  | eventhandle |                        跳转小程序成功                        |
|   bindfail   | eventhandle |                        跳转小程序失败                        |
| bindcomplete | eventhandle |                        跳转小程序完成                        |



### rich-text

+ 富文本
+ ≈ `v-html` ≈ `dangerouslySetInnerHTML`

+ 属性
  + `space`：与 [`text`](#text) 的 `space` 形同
  + `nodes`：节点列表/HTML String - 可为 `string` | `array`
    + string：html 字符串
    + array：类似 `vnode` 的形式书写 - 标签名 `name`; 属性 `attrs`; 子节点列表`children`;

```javascript
Page({
  data: {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'hello world'
      }]
    }]
  }
})
```



### button

|    属性    |  类型   | 默认值  |                             描述                             |
| :--------: | :-----: | :-----: | :----------------------------------------------------------: |
|    size    | string  | default |                    按钮的大小，`default`                     |
|    type    | string  | default |                 按钮的样式类型，`primary`绿                  |
|   plain    | boolean |  false  |                   按钮是否镂空，背景色透明                   |
|  disabled  | boolean |  false  |                           是否禁用                           |
|  loading   | boolean |  false  |                  名称前是否带 loading 图标                   |
| form-type  | string  |         |   用于 `form` 组件，点击分别会触发 `form` 组件的 `submit `   |
| open-type  | string  |         |                         微信开放能力                         |
|    lang    | string  |   en    | 指定返回用户信息的语言，`zh_CN` 简体中文，`zh_TW` 繁体中文，`en` 英文 |
| hover 相关 |         |         |                 与 [`view`](#view) 属性一样                  |

+ open-type 相关

> + **contact** - 打开客服会话，如果用户在会话中点击消息卡片后返回小程序，可以从 `bindcontact` 回调中获得具体信息
>
>   + `open-type="contact"` 时有效的 `button` 属性
>
>   |        属性        |    类型     |    默认值    |                             描述                             |
>   | :----------------: | :---------: | :----------: | :----------------------------------------------------------: |
>   |    session-from    |   string    |              |                           会话来源                           |
>   | send-message-title |   string    |   当前标题   |                      会话内消息卡片标题                      |
>   | send-message-path  |   string    | 当前分享路径 |               会话内消息卡片点击跳转小程序路径               |
>   |  send-message-img  |   string    |     截图     |                      会话内消息卡片图片                      |
>   | show-message-card  |   boolean   |    false     | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息 |
>   |    bindcontact     | eventhandle |              |                         客服消息回调                         |
>
> + **share** - 触发用户转发
>
> + **getPhoneNumber** - 获取用户手机号，可以从 `bindgetphonenumber ` 回调中获取到用户信息
>
>   + `open-type="getPhoneNumber"` 时有效的 `button` 属性
>
>   |        属性        |    类型     |        描述        |
>   | :----------------: | :---------: | :----------------: |
>   | bindgetphonenumber | eventhandle | 获取用户手机号回调 |
>
> + **getUserInfo** - 获取用户信息，可以从 `bindgetuserinfo` 回调中获取到用户信息
>
>   + `open-type="getUserInfo"` 时有效的 `button` 属性
> 	|      属性       |    类型     |                             描述                             |
>   | :-------------: | :---------: | :----------------------------------------------------------: |
>   | bindgetuserinfo | eventhandle | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与`wx.getUserInfo` 返回的一致 |
>
> + **launchApp** - 打开APP，可以通过 `app-parameter` 属性设定向APP传的参数
>
>   + `open-type="launchApp"` 时有效的 `button` 属性
>   |     属性      |    类型     |               描述               |
>   | :-----------: | :---------: | :------------------------------: |
>   | app-parameter |   string    |  打开 APP 时，向 APP 传递的参数  |
>   |   binderror   | eventhandle | 当使用开放能力时，发生错误的回调 |
>   | bindlaunchapp | eventhandle |       打开 APP 成功的回调        |
>
> + **openSetting** - 打开授权设置页
>
>   + `open-type="openSetting"` 时有效的 `button` 属性
>   |      属性       |    类型     |          描述          |
>   | :-------------: | :---------: | :--------------------: |
>   | bindopensetting | eventhandle | 在打开授权设置页后回调 |
>   
> + **feedback** - 打开“意见反馈”页面，用户可提交反馈内容并上传[日志](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getLogManager.html)，开发者可以登录[小程序管理后台](https://mp.weixin.qq.com/)后进入左侧菜单“客服反馈”页面获取到反馈内容






## 模板语法

+ 模板语法部分，大多与 `Vue` 的使用相同，我将会在下面简单说一下

### 数据绑定

+ 大胡子语法

```javascript
Page({
    data: {
        msg: 'hello mina',
        class
    }
})
```

```wxml
<!-- 标签中属性使用有区别 -->
<view class="{{className}}">{{msg}}</view>
```



### 循环

+ 循环与 `Vue` 不同，并非是直接由类似 js 语法的方式表达，而是把 `item` `index` 都拆出来了，像下面的例子一样，如果我们本身使用的值就是 `item` 和 `index` 可省略

```wxml
<!-- *this表示数组循环项 -->
<view wx:for="{{list}}" wx:for-item="item" wx:for-index="index" wx:key="*this">{{item}}</view>
```



### 其他

+ 简单来说呢。一般指令由 `v-` 变成了 `wx:`
+ 事件由 `@` | `v-on` 变成了 `bind`

|          语句/标签          |     Vue      |  小程序   |
| :-------------------------: | :----------: | :-------: |
|   不会真实渲染出来的标签    | `<template>` | `<block>` |
|             if              |    `v-if`    |  `wx:if`  |
|           else if           | `v-else-if`  | `wx:elif` |
|            else             |   `v-else`   | `wx:else` |
| `display: block;`，两者相反 |   `v-show`   | `hidden`  |
|          点击事件           |   `@click`   | `bindtap` |



## <span id="methods">数据赋值 & 事件使用</span>

+ 这里需要注意一下，数据的赋值、方法的传值都是不一样的
+ 简单来说，数据采用的是 `react` 的状态机模式，方法的传值使用的是 标签属性 的方式，希望可以通过下面的例子了解

```wxml
<input type="number" value="{{num}}" bindinput="handleInput"/>
<button bindtap="handleTap" data-operation="1">+1</button>
<button bindtap="handleTap" data-operation="-1">-1</button>
<view>{{num}}</view>

<!-- model:实现双绑，不过有遗憾的是，他并不支持 obj 类型 -->
<input type="number" model:value="{{num}}" bindinput="noop" />
```

+ 事件直接写在对象内

```javascript
Page({
  data: {
    num: 0
  },

  handleInput(e) {
    this.setData({
      num: e.detail.value
    });
  },

  handleTap(e) {
    const { operation } = e.currentTarget.dataset;
    this.setData({
      num: +this.data.num + +operation
    });
  }
})
```



## wxss

### 尺寸单位 rpx

+ 这是我最喜欢小程序的一点，一般来说我们做屏幕适配，会用上 `rem` `%` 等等，但小程序内置了一个单位，让我们做适配非常简单，甚至不需要做适配
+ 这边建议直接看文档~ [尺寸单位](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)



### 样式导入

+ 小程序支持样式导入
+ 通过 `@import` 引入，路径只能写相对路径



### 使用 less

+ 原生小程序并不支持 less、sass，我们只能先编译，再使用

+ 推荐 VsCode 插件 `easy less`

+ 配置为：

```json
{
    "less.compile": {
    	"outExt": ".wxss"
    }
}
```



## 自定义组件

+ 终于到我们最关心的 `Component` 了，一下写这么大一段的代码维护性确实没这么高
+ 还是那个原则，低耦合，高内聚

### 结构

+ 结构还是那个结构，由 `json` `wxml` `wxss` `js` 4个文件组成
+ 我们可以在文件夹右键 `新建Component` 快速生成4个文件
+ `.json`
  + `component`：true - 代表组件
+ `js`
  + 最外层函数名由页面的 `Page` 变为了 `Component`
  + `properties`：≈ `props`
  + 所有自定义事件需要放在 `methods` 内



### 组件间通信与事件

#### 父传子

+ ≈ `props`，名字变成了 `properties`

  ```javascript
  properties: {
    props: {
      type: Array, // 类型
      value: [] // 默认项
    }
  }
  ```



#### 子传父

+ ≈ `$emit`，名字变成了 `triggerEvent`

+ 标签用 `bind+事件名` 接收，所传值在 `e.detail` 内

+ 或者你不想记这么多，那就像 `react` 一样把方法也传进去，不过父组件的方法要写在 `data` 里面

  ```javascript
  this.triggerEvent('change', index);
  ```

  ```xxml
  <Com bindchange="handleChange"></Com>
  ```




### this.selectComponent

+ ≈ `this.$children`
+ [文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)~



### 插槽 slot

+ 与 `vue` 基本类似

```javascript
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { /* ... */ },
  methods: { /* ... */ }
})
```

```wxml
<view class="wrapper">
  <slot name="before"></slot>
  <slot name="after"></slot>
</view>
```

```wxml
<!-- 引用组件的页面模板 -->
<comp>
  <view slot="before">这里是插入到组件slot name="before"中的内容</view>
  <view slot="after">这里是插入到组件slot name="after"中的内容</view>
</comp>
```



### 数据监听器

+ ≈ `watch`，但他叫 `observers`

```javascript
Component({
  data: {
      numberA: 1,
      numberB: 2,
      sum: 3
  },
  observers: {
    'numberA, numberB': function(numberA, numberB) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      this.setData({
        sum: numberA + numberB
      })
    }
  }
})
```



### 混入

+ ≈ `mixins`，名字变成了 `behaviors`
+ [文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)~

```javascript
module.exports = Behavior({
  behaviors: [],
  properties: { },
  data: { },
  methods: { },
  // ...
})
```



### 常用生命周期

| 生命周期 |  vue 对应   |                   描述                   |
| :------: | :---------: | :--------------------------------------: |
| created  |   created   |        在组件实例刚刚被创建时执行        |
| attached | beforeMount |      在组件实例进入页面节点树时执行      |
|  ready   |   mounted   |       在组件在视图层布局完成后执行       |
|  moved   |             | 在组件实例被移动到节点树另一个位置时执行 |
| detached |  destroyed  |    在组件实例被从页面节点树移除时执行    |
|  error   |             |        每当组件方法抛出错误时执行        |



### 组件所在页面的生命周期

+ 在 `pageLifetimes` 字段定义。

| 生命周期 |    参数     |             描述             |
| :------: | :---------: | :--------------------------: |
|   show   |     无      |  组件所在的页面被展示时执行  |
|   hide   |     无      |  组件所在的页面被隐藏时执行  |
|  resize  | Object Size | 组件所在的页面尺寸变化时执行 |

```javascript
Component({
  pageLifetimes: {
    show() { },
    hide() { },
    resize() { },
  }
})
```



# WXS

+ 在上面的 [事件使用](#methods) 中，我们可以看出，小程序的事件是不可以通过 `methods()` 这样的方式调用的，他的引用数据值也不可以是一个执行函数的返回值
+ 如果我有需求，要这么做的时候怎么办？小程序给我们提供了一个叫 wxs 的东西
+ 这个东西也跟小程序的 渲染与逻辑 双线程通信有关，这个东西走渲染层的线程，所以也称为 辅助渲染，如果有拖拽之类需要频繁改变视图的时候，用它就对咯，会跟手很多

### 语法参考

+ 官方说：wxs 是小程序的一套脚本语言，与 js 是不同的语言，有自己的语法
+ 实际使用上，其实与 js 并无两样
+ 它像是一个 **完全不支持ES6** 的 js，也就是说 es5，还是个 **残血版** 的 es5
+ 模块部分，采用的是 `common.js` 的语法，即 `module.exports` 和 `require`



### wxs 标签

+ 我们只需要把 `<wxs>` 看成是 `<script>` 即可
+ 区别是，它有一个 `module` 属性，而 `module` 的值即是 *模板引入变量*



### 示例

```wxs
module.exports = {
  a: 1,
  b: function (num) { return Math.sqrt(num) }
}
```

```wxml
<!-- 引用的wxs -->
<wxs src="./tool.wxs" module="tool"></wxs>

<!-- 直接写wxs -->
<wxs module="ye">
	module.exports = {
      ye: '✌'
    }
</wxs>

<view>{{tool.a}}</view>
<view>{{tool.b(123)}}</view>
<view>{{ye.ye}}</view>
```

```javascript
// js 使用 require 导入
const tool = require('./tool.wxs');
```



