
let datas = []
function apis (id) {

  return new Promise((resolve, reject) => {
    // 创建 XMLHttpRequest 对象
    var request = new XMLHttpRequest();
    // 实例化请求对象
    request.open("GET", "http://127.0.0.1:5000/api/" + id);
    // 监听 readyState 的变化
    request.onreadystatechange = function() {
      // 检查请求是否成功
      if(this.readyState === 4 && this.status === 200) {
        // 将来自服务器的响应插入当前页面
        // document.getElementById("result").innerHTML = this.responseText;
        // console.log('-----ajax请求返回值-----', JSON.parse(this.responseText))
        // datas.push(JSON.parse(this.responseText).data)
        resolve(JSON.parse(this.responseText).data)
      }
    };
    // 将请求发送到服务器
    request.send();
  })
}

let arr = [1001,1002,1003,1005,1006,1007]
self.addEventListener('message', function (e) {
  console.log('子线程-rev12-读取主线程回传值:',e.data)
  let aa=[]
  for(let a of arr) {
    // apis(a).then((res) => {
    //   console.log('then-------', res)
    // })
    aa.push(apis(a))
  }
  Promise.all(aa).then(function(values) {
    console.log(values);
    self.postMessage(values)
  });
  // self.postMessage(datas);

  //self.postMessage('Son say: fa hi');
  //  self.close(); 自己关闭自己
}, false);



/*console.log('work.js is start!');
function add(a, b){
  if(a && b){
    return a + b;
  }
  return 0;
}

onmessage = function(event){
  var num = event.data;
  postMessage(num.a, num.b);
}*/


// worker.js

// settings
/*var num_workers = 2;
var items_per_worker = 3000;

// start the workers
var result = 0;
var pending_workers = num_workers;
for (var i = 0; i < num_workers; i += 1) {
  var worker = new Worker('./core.js');
  worker.postMessage(i * items_per_worker);
  worker.postMessage((i + 1) * items_per_worker);
  worker.onmessage = storeResult;
}

// handle the results
function storeResult(event) {
  console.log('---workerJs---', event.data)
  result += event.data;
  pending_workers -= 1;
  if (pending_workers <= 0)
    postMessage(result); // finished!
}*/

