# react-script
使用`create-react-app`生成的React项目是使用`react-script`来运行的，其package.json如下：
```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

### 源代码
命令行相关代码入口位于：`/node_modules/react-scripts/bin/react-scripts.js`，其对应的几个脚本都在`scripts`文件夹中

### eject
将 react-script的所有封装内容释放回项目根目录