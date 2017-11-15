/* 
  创建DOM对象
*/
const randomTools = require('./randomString');
const urlTools = require('./getUrlParam');

class createTools {
  constructor() {
    this.createDOM = this.createDOM.bind(this);
    this.judgeNode = this.judgeNode.bind(this);
    this.randomString = this.randomString.bind(this);
    this.resetWriteDOM = this.resetWriteDOM.bind(this);
    this.reload = this.reload.bind(this);
    this.createScript = this.createScript.bind(this);
    this.appendScript = this.appendScript.bind(this);
    this.state = {
      iframe: function () {
        return document.getElementById('vm');
      }
    }
  }

  // 创建DOM，并插入到页面上
  createDOM(str) {
    const { iframe } = this.state;
    let div = document.createElement('div');
    div.className = `myDiv_${randomTools.randomString(8)}`;
    div.innerHTML = str;
    let content = iframe().contentDocument.documentElement;
    if (!!this.judgeNode(content, div.className)) {


      let iframeTime = setInterval(function () {
        let body = content.getElementsByTagName('body')[0];
        if (body) {
          body.appendChild(div);
          clearInterval(iframeTime);
        }
      }, 200);

    } else {
      creatDOM(str);//重新生成DOM，避免重复
    }
  }
  writeDOM(str) {
    const { iframe } = this.state;
    let content = iframe().contentDocument.write(str);
    let innerHeight = 0;
    let height = 0;
    if (!iframe().contentDocument) {
      return new Promise((resolve) => {
        resolve();
      });
    }
    let oldInnerHeight = iframe().contentDocument.body ? iframe().contentDocument.body.clientHeight : 0;
    let oldHeight = iframe().clientHeight;
    let count = 0;
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        count += 1;
        innerHeight = iframe().contentDocument.body ? iframe().contentDocument.body.clientHeight : 0;
        height = iframe().clientHeight;
        if ((innerHeight === oldInnerHeight) && height > 0 && innerHeight > 0) {
          clearInterval(timer);
          resolve();
        } else if (count > 10 || (height === 0) && (count > 3)) {
          clearInterval(timer);
          resolve();
        } else {
          oldInnerHeight = innerHeight;
          oldHeight = height;
        }
      }, 400);
    });
  }
  resetWriteDOM(str) {
    const _this = this;
    const { iframe } = this.state;
    iframe().contentWindow.location.reload();
    return new Promise((resolve) => {
      setTimeout(() => {
        _this.writeDOM(str).then(() => {
          _this.createScript();
          resolve();
        });
      }, 200);
    });
      // if (urlTools.GetQueryString('iframe') !== 'true') {
      // _this.createDOM(`<div style="width: 100%;height: 100%;position: fixed;top: 0;z-index: 999;">   </div>`);
      // }
  }
  reload() {
    const { iframe } = this.state;
    iframe().contentWindow.location.reload();
  }
  // 判断是否有重复标记
  judgeNode(content, className) {
    if (content.getElementsByClassName(className).length > 0) {
      return false;// 存在id
    } else {
      return true;// 不存在id
    }
  }
  // 生成随机指定编码
  randomString(len) {
    let str = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < str; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  createScript() {
    const { iframe } = this.state;
    const _this = this;
    let timer = null;
    _this.appendScript('http://mimg.127.net/pub/common/js/PSC_cyclopes_index.js');

    // timer = setInterval(function () {

    //   let vm = iframe();
    //   if (!!vm) {
    //     clearInterval(timer);

    //     vm.onload = function () {
    //       _this.appendScript('http://127.0.0.1:9999/static/jQuery/jquery-1.9.1.js').then(() => {
    //         _this.appendScript('http://127.0.0.1:9999/htdocs/test/index.js');
    //       });
    //     }


    //   }

    // }, 500);



  }
  appendScript(src) {
    const { iframe } = this.state;

    return new Promise((resolve, reject) => {
      let div = document.createElement('script');
      div.src = src;
      let content = iframe().contentDocument.documentElement;

      let iframeTime = setInterval(function () {
        let body = content.getElementsByTagName('body')[0];
        if (body) {
          body.appendChild(div);
          resolve();
          clearInterval(iframeTime);
        }
      }, 200);
    });

  }
}

export default new createTools();

