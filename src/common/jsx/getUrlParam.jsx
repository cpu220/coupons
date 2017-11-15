/*
 获取url参数
 */


class urlTools {
  constructor() {
    this.getHashParam = this.getHashParam.bind(this);
  }
  // 获取url指定key对应的value
  GetQueryString(name) {
    
    if (!!window.location.hash) {
      const param = window.location.href.split('?')[1];
      if(!param){
        return null;
      }
      const paramArray = param.split('&');
      // let result =[];
      for (let x in paramArray) {
        // let a ={};
        // a[paramArray[x].split('=')[0]]=paramArray[x].split('=')[1];
        // result.push(a);
        if (paramArray[x].split('=')[0] === name) {
          return paramArray[x].split('=')[1];
        }
      }

    } else {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }

  }
  updateUrlParam(obj) {
    /*待补充*/
  }
  getHashParam(name) {
    const param = window.location.href.split('?')[1];
    const paramArray = param.split('&');
    // let result =[];
    for (let x in paramArray) {
      // let a ={};
      // a[paramArray[x].split('=')[0]]=paramArray[x].split('=')[1];
      // result.push(a);
      if (paramArray[x].split('=')[0] === name) {
        return paramArray[x].split('=')[1];
      }
    }
  }

}

export default new urlTools();