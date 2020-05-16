/**
 * 广度优先遍历树
 *
 * 使用： 队列
 */
function widthTravel(tree) {
  let queue = [];
  let nodeList = [];
  tree && queue.push(tree);
  while (queue.length) {
    let node = queue.shift();
    for (let i = 0; i < node.children.length; i++) {
      queue.push(node[i]);
    }
  }
  return nodeList;
}
