import { getJSON, GetQueryString } from '../common/ApiUtil';
import { requestList } from '../common/requestList';
import { message } from 'antd';
const pageSize = 20;
export default {

  namespace: 'LIST',

  state: {
    name: '测试列表页',
    couponList: [],
    total: 0,
    pageSize: pageSize,
    current: 0,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    update(state, action) {
      return Object({}, state, action.payload);
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  subscriptions: {
    setup({
      history,
      dispatch,
    }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({
        pathname,
      }) => {
        if (pathname === '/admin') {
          getJSON({
            url: `${requestList.couponList}?pageSize=${pageSize}&current=0`,
          }).then((res) => {
            dispatch({
              type: 'save',
              payload: {
                couponList: res.data.couponList,
                total: res.data.total,
              },
            });
          }).catch((err) => {
            console.log(err);
          });
        }
      });
    },
  },

};
