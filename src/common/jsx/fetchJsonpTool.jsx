/* 基于promse实现fetch进行jsonp跨域请求
* 这恶心的东西我也不想写[摊手]
*/


class fetchJsonpTool {
  constructor() {
    this.state = {
      timeout: 5000,
      callbackName: 'callback',
    }
    this.fetchJsonp = this.fetchJsonp.bind(this);
    this.cleaRrubbish = this.cleaRrubbish.bind(this);
    this.createCallbackFunction = this.createCallbackFunction.bind(this);
    this.clearFunction = this.clearFunction.bind(this);
    this.removeScript = this.removeScript.bind(this);
    this.randomString = this.randomString.bind(this);
  }

  /**
   * 主函数,说是fetch其实就是动态创建个script标签，通过url.get请求来回调callback而已。
   * 
   * @param {any} url // 请求地址
   * @param {any} opation // 入参
   * @memberof fetchJsonpTool
   */
  fetchJsonp(opation) {
    const _this = this;
    const { timeout, callbackName } = this.state;

    let _url = opation.url;
    const _timeout = opation.timeout || timeout;// 超时
    const _jsonpCallbackName = opation.callbackName || callbackName;// jsonp的回调函数名
    let timer = null;// 设置哨兵

    return new Promise((resolve, reject) => {
      const _callbackFunction = _this.createCallbackFunction();// 默认回调的事件
      const scriptID = `${_jsonpCallbackName}_${_callbackFunction}`;// 为了保证并发时id不一样

      window[_callbackFunction] = (response) => {
        // 数据格式与fetch 保持一致
        Promise.resolve(response).then(json => {
          resolve({
            status: true,
            data: json,
          });
        }).catch(err => {
          reject(err);
        });

        _this.cleaRrubbish(scriptID, _callbackFunction, timer);

      };

      const jsonpTempScript = document.createElement('script');

      jsonpTempScript.setAttribute('src', `${_url}${_url.indexOf('?') >= 0 ? '&' : '?'}${_jsonpCallbackName}=${_callbackFunction}`)
      jsonpTempScript.id = scriptID;
      if (opation.charset) {
        jsonpTempScript.setAttribute('charset', opation.charset);
      }
      document.getElementsByTagName('head')[0].appendChild(jsonpTempScript);

      // 哨兵模式进行监听
      timer = setTimeout(() => {
        reject(`${_url} time out`);
        _this.cleaRrubbish(scriptID, _callbackFunction, false);

        window[_callbackFunction] = null;
      }, timeout);

      jsonpTempScript.onError = () => {
        reject(`${_url} time out`);
        _this.cleaRrubbish(scriptID, _callbackFunction, timer);

      }


    });
  }

  /**
   * 垃圾回收
   * 
   * @param {any} scriptID // 临时注入的script标签
   * @param {any} _callbackFunction // 临时callback标记
   * @param {any} time // 是否清除哨兵timer
   * @memberof fetchJsonpTool
   */
  cleaRrubbish(scriptID, _callbackFunction, timer) {
    this.removeScript(scriptID);
    this.clearFunction(_callbackFunction);
    if (timer) {
      clearTimeout(timer);
    }
  }
  /**
   * 创建随机回调函数名
   * 
   * @returns 
   * @memberof fetchJsonpTool
   */
  createCallbackFunction() {
    return `jsonp_${Date.now()}_${this.randomString(5)}`;
  }

  /**
   * 清除临时函数
   * 
   * @param {any} functionName 
   * @memberof fetchJsonpTool
   */
  clearFunction(functionName) {
    try {
      delete window[functionName];
    } catch (error) {
      window[functionName] = null;
    }
  }

  /**
   * 清除临时callback代码
   * 
   * @param {any} id 
   * @memberof fetchJsonpTool
   */
  removeScript(id) {
    const item = document.getElementById(id);
    if (item) {
      document.getElementsByTagName('head')[0].removeChild(item);
    }
  }
  randomString(len) {
    let str = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxy345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < str; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
}

export default new fetchJsonpTool();

