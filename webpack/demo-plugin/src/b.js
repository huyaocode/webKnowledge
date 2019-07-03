function b() {
    const root = document.getElementById('root');
    const dom = document.createElement('div')
    dom.innerHTML = 'B模块';
    root.appendChild(dom)
}

export default b;