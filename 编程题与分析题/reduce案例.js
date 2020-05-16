var array = [
  {
    selector: "sss",
    rules: "rrrr",
  },
  {
    selector: "sss2",
    rules: "rrr3",
  },
];

function transform(array, key, value) {
  return array.reduce((obj, item) => {
    obj[item[key]] = (obj[item[key]] || []).concat(item[value]);
    return obj;
  }, {});
}

var tree = transform(array, "selector", "rules");

console.log(tree);
