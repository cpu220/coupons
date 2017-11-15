/*  
  对业务缓存处理的封装
*/
import LocalStorage from 'localStorage';
const urlTools = require('./getUrlParam');
const consoleTools = require('./log');

class localStorageTools {
  constructor() {
    this.getID = this.getID.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.resestLocalStorage = this.resestLocalStorage.bind(this);
    this.getLocalStorageList = this.getLocalStorageList.bind(this);
    this.removeLocalStorageItem = this.removeLocalStorageItem.bind(this);
  }
  // 获取id，优先取参数，其次url
  getID(param) {
    let id;
    if (!!param) {
      id = param;
    } else {
      let urlId = urlTools.GetQueryString('id');
      id = urlId ? urlId : 'temp';
    }
    return id;
  }
  // 获取缓存
  getLocalStorage(param) {
    const id = this.getID(param);
    let storage = JSON.parse(LocalStorage.getItem(`cyclopes_${id}`));
    if (!storage) {
      // 空字符串、null 强制返回空数组
      storage = [];
    }
    return storage;
  }
  // 设置缓存
  setLocalStorage(param) {
    return new Promise((resolve, reject) => {
      const id = this.getID(param.id);

      let historyList = this.getLocalStorage(param.id);// 获取当前指定缓存
      if (historyList.length > 0 && JSON.stringify(historyList[historyList.length - 1].info) === JSON.stringify(param.json.info)) {
        consoleTools.log('页面距上次操作没有任何变化');
        // reject({errorMessage:'无变化，不存储'});
        return false;
      }
      const storage = historyList.slice(1 - (param.max || 20));
      storage.push(param.json);
      LocalStorage.setItem(`cyclopes_${id}`, JSON.stringify(storage));
      resolve(storage);
    });
  }
  // 重置缓存
  resestLocalStorage(json) {
    let array = json;

    return new Promise((resolve, reject) => {
      const id = this.getID();
      LocalStorage.setItem(`cyclopes_${id}`, JSON.stringify(array));
      resolve(array);
    });
  }
  // 获取 cyclopes_* 为开头的所有list
  getLocalStorageList() {
    let array = []
    for (var i in localStorage) {
      if (/^cyclopes_/.test(i)) {
        array.push({
          key: i,
          content: localStorage[i],
        });
      }

    }
    return array;
  }

  /**
   * 
   * 删除指定目标
   * @param {any} key 
   * @memberof localStorageTools
   */
  removeLocalStorageItem(key){
    if(localStorage.hasOwnProperty(key)){
      localStorage.removeItem(key);
    }else{
      // 
      consoleTools.log(`当前没有对应的key:${key}`);
    }
    
  }

}

export default new localStorageTools();

