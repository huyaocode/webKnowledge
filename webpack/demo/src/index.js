import a from './a.js'
import b from './b.js'
import girl from '../img/girl.jpg'
import './index.scss'

// 输入打包后图片是dist目录下的文件名
const img = new Image();
img.src = girl;
img.classList.add('girl')
const root = document.getElementById('root')
root.appendChild(img)

a();
b();