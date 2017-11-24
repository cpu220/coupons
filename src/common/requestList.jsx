
/*
 系统涉及接口，改动时慎重
 */
const d = Date.parse(new Date());
const UrlTools = require('./jsx/getUrlParam');
const logTools = require('./jsx/log');

// 接口列表
const online = {
  login: '/login', // @param username password
  couponCreate: '/couponCreate', // 批量添加卡券 POST /couponCreate @params goodsName(商品名称) num(卡券数量)
  couponList: '/couponList', // 卡券列表 GET  @params goodsName,code(券号),trackCode(快递单号)
  couponDetail: '/couponDetail', // 卡券详情 GET /couponDetail/{couponId}
};

const mock = {

};
let requestList = online;
const test = UrlTools.GetQueryString('test');
if (!!test & test === 'true') {
  requestList = Object.assign({}, online, mock);
} else {
  requestList = online;
}

// console.log(requestList);
export default {
  requestList,
};
