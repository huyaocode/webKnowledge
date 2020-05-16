/**
 * 接受一个URL数组做参数，并行请求，尽可能块的按照顺序打印内容
 */

const urlList = [1, 2, 3, 4, 5];

loadData(urlList);

function fetchData(url, succCallback) {
  setTimeout(() => {
    succCallback("ok: " + url);
  }, (Math.random() * 5 * 1000) >> 0);
}

function loadData(urlList) {
  let resArr = [],
    doneId = 0;
  for (let i = 0; i < urlList.length; i++) {
    fetchData(urlList[i], (res) => {
      console.log(`${i + 1} has done`);
      resArr[i] = res;
      outPutRes(resArr);
    });
  }
  function outPutRes(resArr) {
    for (let i = doneId; i < resArr.length; i++) {
      if (resArr[i]) {
        console.log(resArr[i]);
        doneId++;
      } else {
        break;
      }
    }
  }
}
