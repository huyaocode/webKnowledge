function getEmpty(o) {
  if (Object.prototype.toString.call(o) === "[object Object]") {
    return {};
  }
  if (Object.prototype.toString.call(o) === "[object Array]") {
    return [];
  }
  return o;
}

function deepCopyBFS(origin) {
  let queue = [];
  let map = new Map(); // 记录出现过的对象，用于处理环

  let target = getEmpty(origin);
  if (target !== origin) {
    queue.push([origin, target]);
    map.set(origin, target);
  }

  while (queue.length) {
    let [ori, tar] = queue.shift();
    for (let key in ori) {
      // 处理环状
      if (map.get(ori[key])) {
        tar[key] = map.get(ori[key]);
        continue;
      }

      tar[key] = getEmpty(ori[key]);
      if (tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]]);
        map.set(ori[key], tar[key]);
      }
    }
  }

  return target;
}

function deepCopyDFS(origin) {
  let stack = [];
  let map = new Map(); // 记录出现过的对象，用于处理环

  let target = getEmpty(origin);
  if (target !== origin) {
    stack.push([origin, target]);
    map.set(origin, target);
  }

  while (stack.length) {
    let [ori, tar] = stack.pop();
    for (let key in ori) {
      // 处理环状
      if (map.get(ori[key])) {
        tar[key] = map.get(ori[key]);
        continue;
      }

      tar[key] = getEmpty(ori[key]);
      if (tar[key] !== ori[key]) {
        stack.push([ori[key], tar[key]]);
        map.set(ori[key], tar[key]);
      }
    }
  }

  return target;
}

// test
[deepCopyBFS, deepCopyDFS].forEach((deepCopy) => {
  console.log(deepCopy({ a: 1 }));
  console.log(deepCopy([1, 2, { a: [3, 4] }]));
  console.log(
    deepCopy(function () {
      return 1;
    })
  );
  console.log(
    deepCopy({
      x: function () {
        return "x";
      },
      val: 3,
      arr: [1, { test: 1 }],
    })
  );

  let circle = {};
  circle.child = circle;
  console.log(deepCopy(circle));
});
