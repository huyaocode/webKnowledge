# Formik

- [Formik 官网](https://formik.org/)

Formik 是 React 中构建表单时所用的库，它可以做以下 3 件事：

1. 在 Form 的内外都可获取 Form 的 State
2. 在验证表单时管理错误信息
3. 处理 Form 的提交操作

主要组件有如下：

- `<Formik />`
  - 构建整个表单的顶层组件，通过自身的 state 维护表单状态（2.0 版本采用 useReducer 维护），收集表单字段，执行校验和提交表单等操作，通过 render 函数或者 children 的方式往下传递 props，使得子组件具备完全访问和控制表单状态的能力；
- `<Form />`
  - 是对`<form />`标签的简单封装，监听了 form 的 onReset 和 onSubmit 事件；
- `<Field />`
  - 通过指定 name 属性与 formik 表单状态中具体某个字段建立「同步关系」，这个组件帮我们省去了很多对受控组件的更新操作，如 onChange、onBlur 事件的监听和回调处理。`<Field />`组件默认渲染为一个 input，同时也可以通过 render 属性或者 children 的方式渲染自己的字段组件，如 select，checkbox，textarea 等。
- `<FieldArray />`
  - 这个组件可以对一个数组字段进行维护，通过其提供的 props 方法中的 insert 或者 remove 可以方便的增删表单中的某个数组字段里的元素，在进行动态控制表单字段方面很方便，具体示例可以参考后面的多语言输入框的实现。
