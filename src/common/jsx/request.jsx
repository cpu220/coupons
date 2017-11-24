/* request 业务再封装
   
*/

import request from '../../utils/request';
const urlTools = require('./getUrlParam');
import { message } from 'antd';


class requestTools {
  constructor() {
    this.getJSON = this.getJSON.bind(this);
    this.postJSON = this.postJSON.bind(this);
    this.ajaxFormData = this.ajaxFormData.bind(this);
    this.asyncPost = this.asyncPost.bind(this);
    this.shunt = this.shunt.bind(this);
    this.state = {
      mode: 'cors',
      // credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (window.location.hostname === 'pick.mawc.top') {
      // 非本地开发，带cookie认证
      this.state.credentials = 'include';
    }

  }

  /**
   * get请求-异步
   * 
   * @param {any} obj 
   * @returns 
   * @memberof requestTools
   */
  getJSON(obj) {
    const _this = this;
    const opation = Object.assign({}, this.state, { method: 'GET' })
    return new Promise((resolve, reject) => {
      request(obj.url, opation).then(function (response) {
        // 请求当前模块数据，动态更改模块表单
        // 只有 premodal.json 因是静态json文件，没有code
        _this.shunt(response, resolve, reject);
      }).catch(function (e) {
        let msg = e;
        if (typeof e === 'object') {
          msg = e.toString();
        }
        message.error(msg || '系统异常', 2, function () {
          reject(e);
        });

      });
    });
  }

  /**
   * post请求-异步
   * 
   * @param {any} obj 
   * @returns 
   * @memberof requestTools
   */
  postJSON(obj) {
    const _this = this;
    const opation = Object.assign({}, this.state, {
      method: 'POST',
      body: JSON.stringify(obj.data)
    });

    return new Promise((resolve, reject) => {
      request(obj.url, opation).then(function (response) {
        // 请求当前模块数据，动态更改模块表单
        // 只有 premodal.json 因是静态json文件，没有code
        _this.shunt(response, resolve, reject);
      }).catch(function (e) {
        let msg = e;
        if (typeof e === 'object') {
          msg = e.toString();
        }
        message.error(msg || '系统异常', 2, function () {
          reject(e);
        });


      });
    });
  }
  /**
   * 
   *  用于集中容错处理
   * @param {any} response 
   * @memberof requestTools
   */
  shunt(response, resolve, reject) {
    if (response.data.errorCode === 200 || !response.data.hasOwnProperty('errorCode')) {
      resolve(response.data);
    }else if (response.data.errorCode === 401) {
      location.href = 'http://pick.mawc.top/#/login';
    }else {
      message.error(response.data.errMsg || response.data.content || response.data.msg || '系统错误', 2, function () {
        reject(response.data);
      });
    }
  }

  /**
   * 基于fetch的表单form提交
   * 
   * @param {any} obj 
   * @returns 
   * @memberof requestTools
   */
  ajaxFormData(obj) {
    const opation = Object.assign({}, this.state, {
      method: 'POST',
      charset: 'uft8',
      body: obj.data,
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        // 'Content-Type':'application/x-www-form-urlencoded',
        // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryWZd2h59Ev0EGi7hA',
      },
      ontentType: false,
      crossDomain: true,
      processData: false,
    });

    return new Promise((resolve, reject) => {
      request(obj.url, opation).then(function (response) {
        // 请求当前模块数据，动态更改模块表单
        // 只有 premodal.json 因是静态json文件，没有code
        if (response.data.code === 200 || !response.data.hasOwnProperty('code')) {
          resolve(response.data);
        } else if (response.data.code === 302) {
          message.error(response.data.msg || response.data.content || '系统错误', 2, function () {
            if (urlTools.GetQueryString('dev') !== 'true') {
              location.href = 'http://pub.mail.163.com/pscpub/admin/login.do';
            }
            reject(response.data);
          });

        } else {
          reject();
          message.error(response.data.errMsg || response.data.content || '系统错误', 2);
        }
      }).catch(function (e) {
        let msg = e;
        if (typeof e === 'object') {
          msg = e.toString();
        }
        message.error(msg || '系统异常', 2);

        reject(e);
      });
    });
  }
  /**
   * 同步处理post请求
   * 
   * @param {any} obj 
   * @returns 
   * @memberof requestTools
   */
  async asyncPost(obj) {
    const opation = Object.assign({}, this.state, {
      method: 'POST',
      body: JSON.stringify(obj.data)
    });

    let response = await request(obj.url, opation);
    return response;
  }
}

export default new requestTools();