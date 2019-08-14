## 详解 webComponents

### 创建自定义组件

1. [标签式](./examples/demo01.html)

```
  class View extends HTMLElement {
    constructor() {
      super();
    }
  }
  customElements.define("el-view", View);
  // customElements的define方法用于注册自定义组件
   
```

2. [is 属性标记](./examples/demo01.html)

```
  class View extends HTMLDivElement {
    constructor() {
      super();
    }
  }
  customElements.define("el-view", View, { extends: "div" });
  // define 暴露三个参数入口，分别是：自定义组件名[必填]，组件功能类[必填]，和 继承自 某节点名[选填]
```

### 定义模板

1. [innerHTML 字符串拼接](./examples/demo03.html)

```
 DOM.innerHTML = `<h1>${"Hello World !"}</h1>`;
```

2. [createElement/appendChild](./examples/demo04.html)

```
DOM.appendChild(createEl);
```

3. [template](./examples/demo05.html)

```
<template>
  <h1>Hello World !</h1>
</template>
// template 标识用于定义自定义模板
// 抽离HTML模板，可复用，可拆分
```

#### template 特性
```
1. 内容在激活之前一直处于惰性状态, 这些标记就是隐藏的 DOM，它们不会被渲染
2. 处于模板中的内容不会有副作用。脚本不会运行，图片不会加载，音频不会播放，...直到模板被使用
3. 内容不在文档中。在主页面使用 document.getElementById() 或 querySelector() 不会返回模板的子节点
4. 模板能够被放置在任何位置，包括 <head>，<body>，或 frameset，并且任何能够出现在以上元素中的内容都可以放到模板中。 注意，"任何位置"意味着 <template> 能够安全的出现在 HTML 解析器不允许出现的位置...几乎可以作为任何内容模型的子节点
```
### [定义影子 DOM 模式](./examples/demo06.html)

```
let shadowRoot = this.attachShadow({ mode: 'open' });
// attachShadow用于设置当前组件的封装性
// mode接收两个参数  open / closed
```

### [使用影子 DOM](./examples/demo07.html)

```
let shadowRoot = this.attachShadow({ mode: "open" });
let template = document.querySelector("template");
let cloneTemplate = document.importNode(template, true); // true 表示深拷贝节点
shadowRoot.appendChild(cloneTemplate);
```

### 封装性

[DOM 的封装性](./examples/demo08.html)
```
组件内部的 DOM 节点无法被获取，无法在组件外部操作内部组件
```
[样式 的封装性](./examples/demo09.html)
```
组件内部的 DOM 不受外部样式污染
```
### [插槽](./examples/demo10.html)
```
插槽，学过 Vue 的朋友相信对它会非常熟悉，webComponents 同样支持插槽

插槽的好处很多，例如：

1. 样式预渲染
2. 预布局
3. 分布加载
4. 提高用户体验
5. 离线渲染
   ...
```
### 样式的封装性
```
1. :defined
2. :host
3. :host()
4. :host-context()

CSS4 有很多好用惊喜的特性，后面会更新到，待续...
```
### 生命周期
```
0. constructor

类的初始化

1. connectedCallback

   当 custom element 首次被插入文档 DOM 时，被调用

2. disconnectedCallback

   当 custom element 从文档 DOM 中删除时，被调用

3. adoptedCallback

   当 custom element 被移动到新的文档时，被调用

4. attributeChangedCallback

   当 custom element 增加、删除、修改自身属性时，被调用
```
### 实例

1. 创建一个组件

[组件一](./examples/demo11.html)
[组件二](./examples/demo12.html)

```
该DEMO实现了一个动画组件，通过控制属性来控制动画的透明度和方向

<el-transition text = 'Hello World !' opacity=".5" direction="horizontal"/>
```

### 开发一个 SPA 轮子

[动手写一个 Vue](./examples/demo13.html)

```
基于 webComponent 实现

1. data渲染 ( 已完成√ )
2. 函数绑定 ( 已完成√ )
3. 创建自定义标签DOM ( 已完成√ )
4. 设置样式 ( 已完成√ )
5. 设置模板 ( 已完成√ )
6. 双向数据绑定  ( 待完善 )
7. 虚拟DOM  ( 待完善 )
8. 插槽 ( 待完善 )
9. ...

<el-test />

<script>
  new Component("el-test", {
    data: {
      value: 'Hello World !',
    },
    props: {
      alertForm: function(){
        this.setAttribute('style', `color: green;`);
      }
    },
    style: {
      h1: {
        color: 'red',
        'font-size': 100
      }
    },
    template: ".test"
  });
</script>
```

### 和 SPA 单页应用比较

待续...
