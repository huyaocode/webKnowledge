# web安全

安全性主要分为两大块。
私密性：不被非法获取和利用。 
可靠性：不丢失、不损坏、不被篡改

### 攻击类型
 - [XSS](./XSS.md)    跨站脚本攻击
 - [CSRF](./CSRF.md)  跨站请求伪造


### 核心
 - 基本概念
 - 攻击原理
 - 防御措施

### 安全问题
 - 用户身份被盗用
 - 用户密码泄露
 - 用户资料被盗取
 - 网站数据库泄露


### 同源政策及其规避方法

同源要求
 - 协议相同
 - 域名相同
 - 端口相同

限制范围
 - cookie、localstorage和 indexDB无法读取
 - DOM 无法获得
 - Ajax 请求不能发怂


参考链接： [浏览器同源政策](https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)



### CSP 内容安全策略
[CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) ( Content Security Policy ) 在http头中指定哪一些内容是可以执行的