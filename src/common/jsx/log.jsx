/* console 封装
  1. 默认不会打印到页面上
  2. url?console=true 开启
  3. 防代码跟踪
*/
const urlTools = require('./getUrlParam');

class log {
  constructor() { 
    this.log=this.log.bind(this);
  }
  log(text) {
    const status = urlTools.GetQueryString('console');
    if(status === 'true'){
       console.log(text)
    }else{
      return '';
    }
  }
 
}

export default new log();

