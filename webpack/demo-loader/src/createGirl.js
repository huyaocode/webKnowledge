import girl from '../img/girl.jpg'

function createGirl() {
    // 输入打包后图片是dist目录下的文件名
    const img = new Image();
    img.src = girl;
    const root = document.getElementById('root')
    root.appendChild(img)
}

export default createGirl;