# sourcemap

Source map 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

源文件

```js
function sayHello(name) {
  if (name.length > 2) {
    name = name.substr(0, 1) + "...";
  }
  console.log("hello,", name);
}
```

压缩后

```js
function sayHello(name) {
  if (name.length > 2) {
    name = name.substr(0, 1) + "...";
  }
  console.log("hello,", name);
}
sayHello("世界");
sayHello("第三世界的人们");
```

map 文件

```js
{"version":3,"sources":["log.js","main.js"],"names":["sayHello","name","length","substr","console","log"],"mappings":"AAAA,SAASA,SAASC,MACd,GAAIA,KAAKC,OAAS,EAAG,CACjBD,KAAOA,KAAKE,OAAO,EAAG,GAAK,MAE/BC,QAAQC,IAAI,SAAUJ,MCJ1BD,SAAS,MACTA,SAAS"}
```

### sourcemap 如何映射源文件？

TODO
