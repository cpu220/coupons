/**
 * 所有通用方法的入口函数
 * 除了使用频率高的，后续所有接口均整体暴露，不用单独暴露接口
 * 
 */
import dateTools from './jsx/dateFormat';// 日期格式化
import copyTools from './jsx/copy';// 复制
import logTools from './jsx/log';// 日志打印
import createTools from './jsx/createDOM';// 创建DOM
import randomTools from './jsx/randomString';// 随机编码
import urlTools from './jsx/getUrlParam';// 获取url参数
import requestTools from './jsx/request'; // 业务封装的fetch
import localStorageTools from './jsx/localStorageTools'; // 业务缓存操作封装 
import clone from './jsx/clone'; // 业务缓存操作封装
import ImageTools from './jsx/Image'; // 图片工具
import FontsizeTools from './jsx/FontsizeTools'; // px rem工具
import fetchJsonpTool from './jsx/fetchJsonpTool'; // 自定义jsonp请求

// 这么写的原因，仅仅是为了控制内部函数暴露

const dateFormat = dateTools.dateFormat;
const copy = copyTools.copyTextToClipboard;
const log = logTools.log;

const randomString = randomTools.randomString;
const GetQueryString = urlTools.GetQueryString;
const getHashParam = urlTools.getHashParam;
const getJSON = requestTools.getJSON;
const postJSON = requestTools.postJSON;
const asyncPost = requestTools.asyncPost;
const ajaxFormData = requestTools.ajaxFormData;
const fetchJsonp = fetchJsonpTool.fetchJsonp;

export default {
  createTools,
  randomString,
  dateFormat,
  copy,
  log,
  GetQueryString,
  getHashParam,

  getJSON,
  postJSON,
  asyncPost,
  fetchJsonp,
  ajaxFormData,
  
  localStorageTools,
  clone,
  ImageTools,
  FontsizeTools, 
  dateTools,
};
