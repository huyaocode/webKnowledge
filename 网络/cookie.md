# cookie

服务器通过设置`set-cookie`这个响应头，将cookie信息返回给浏览器，浏览器将响应头中的cookie信息保存在本地，当下次向服务器发送HTTP请求时，浏览器会自动将保存的这些cookie信息添加到请求头中。

通过cookie，服务器就会识别出浏览器，从而保证返回的数据是这个用户的。

 - 通过`set-cookie`设置
 - 下次请求会自动带上
 - 键值对，可设置多个


### cookie属性
 - max-age
   - 过期时间有多长
   - 默认在浏览器关闭时失效
 - expires
   - 到哪个时间点过期
 - secure
   - 表示这个cookie只会在https的时候才会发送
 - HttpOnly
   - 设置后无法通过在js中使用document.cookie访问
   - 保障安全，防止攻击者盗用用户cookie
 - domain
   - 表示该cookie对于哪个域是有效的。 
