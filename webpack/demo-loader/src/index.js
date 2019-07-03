import a from './a.js'
import b from './b.js'
import style from './index.scss'
import createGirl from './createGirl'
import girl from '../img/girl.jpg'

const root = document.getElementById('root')

const divDom = '<div class="test">abc </div>'

root.appendChild(img)

// 图片
const img = new Image();
img.src = girl;
img.classList.add(style.girl)

root.appendChild(img)

createGirl();
a();
b();