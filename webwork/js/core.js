self.addEventListener('message', function (e) {
  console.log('core-rev12:',e.data)
  self.postMessage('Son say: fa hi');
   self.close(); // 自己关闭自己
}, false);
