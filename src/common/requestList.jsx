
/*
 系统涉及接口，改动时慎重
 */
const d = Date.parse(new Date());
const UrlTools = require('./jsx/getUrlParam');
const logTools = require('./jsx/log');

// 接口列表
const online = {

};

const mock = {

};
let requestList = {};
const test = UrlTools.GetQueryString('test');
if (!!test & test === 'true') {
  requestList = Object.assign({}, online, mock);
} else {
  requestList = online;
}

export default {
  requestList,
};
