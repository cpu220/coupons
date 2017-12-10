
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
  couponEdit: 'couponEdit', // POST /couponEdit/{couponId} @params status(4停用/0未激活/1已售卖),trackName(快递公司),trackCode(快递单号),有status的时候不要有trackName和trackCode
  CouponCheck: 'CouponCheck', // 验证卡券账号密码以及验证码 POST /CouponCheck @params captcha,couponCode,couponPwd
  CouponPick: '/CouponPick', // 提货申请 POST /CouponPick @params captcha,couponCode,couponPwd,dt_pick_order(发货时间)
  CouponTrack: '/CouponTrack', // 快递单号查询  POST /CouponTrack @params captcha,couponCode,couponPwd
  changeStatus: '/changeStatus', //修改状态 POST /changeStatus @params couponId ,status
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
