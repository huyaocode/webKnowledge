# nginx 代理

### nginx 基本代理

```
server {
  listen        80;
  # 访问的域名
  server_name   test.com;
  # 代理请求
  location / {
    proxy_pass http://127.0.0.1:8888;
    # 设置HTTP头中修改host为test.com
    proxy_set_header Host $host;
  }
}
```

### nginx 配置缓存

```
# 写在server外
proxy_cache_path  cache levels=1:2 keys_zoom=my_cache:10m
```

- cache
  - 文件夹名
- levels=1:2
  - 设置二级文件夹来存缓存，因为随着文件的越来越多查找速度会越来越慢
- keys_zoom=my_cache:10m
  - 申请 10 兆内存来缓存内容

```
server {
  listen        80;
  server_name   test.com;
  location / {
    proxy_cache   my_cache; #在这里写缓存
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header Host $host;
  }
}
```
