# DOM树的深度遍历和广度遍历

```js
// 深度遍历
function interator(node) {
    console.log(node);
    if (node.children.length) {
        for (var i = 0; i < node.children.length; i++) {
            interator(node.children[i]);
        }
    }
}

// 广度遍历
function interator(node) {

    var arr = [];
    arr.push(node);
    while (arr.length > 0) {
        node = arr.shift();
        console.log(node);
        if (node.children.length) {
            for (var i = 0; i < node.children.length; i++) {
                arr.push(node.children[i]);
            }
        }
    }
}
```