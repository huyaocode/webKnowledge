function a() {
    const root = document.getElementById('root');
    const dom = document.createElement('div')
    dom.innerHTML = 'A模块';
    root.appendChild(dom)
}

export default a;