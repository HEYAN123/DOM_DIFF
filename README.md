# DIFF

## 流程

1. 先定义一个虚拟dom元素的类，包含了类型，属性，子元素这些属性
2. createElement 创建虚拟dom元素，返回实例化的虚拟dom对象
3. render 将虚拟dom转化为真实的浏览器里用的真实dom，主要用到了createElement，createTextNode,appendChild,递归转化子元素
4. renderDom 将创建好的真实dom渲染挂在页面上的元素上
5. dom改变，比较两颗虚拟树的差异，得到补丁
6. 把补丁应用到真实dom上

## diff作用

- 比较两个虚拟dom的差别
- 根据两个虚拟对象，创建出补丁（描述改变的内容），并将补丁更新到dom里

## 三种优化策略

- 平级比较 type props children
- 跨级
- key 交换位置

## 差异计算

- 先序深度优先遍历