### redux简介

redux 是一个应用数据流框架，主要是解决了组件间状态共享的问题，原理是集中式管理，主要有三个核心方法，`action，store，reducer`

工作流程是： 
 - view用actionCreator创建一个action,里面可能包含一些数据
 - 使用store的dispatch方法将acion传入store
 - store将action与旧的state转发给reducer
 - reducer深拷贝state,并返回一个新的state给store
 - store接收并更新state
 - 使用store.subscribe订阅更新,重新render组件