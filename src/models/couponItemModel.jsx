import { getJSON, GetQueryString } from '../common/ApiUtil';
import { requestList } from '../common/requestList';
import { message } from 'antd';
const pageSize = 20;
export default {
  namespace: 'COUPONITEM',
  state: {
    coupon: {},
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
        if (pathname === '/editCoupon') {
          const id = GetQueryString('id');
          if (!!id) {
            getJSON({
              url: `${requestList.couponDetail}/${id}`,
            }).then((res) => {
              dispatch({
                type: 'save',
                payload: {
                  coupon: res.data.couponDetail || {},
                },
              });
            }).catch((err) => {
              console.log(err);
            });
          }

        }
      });
    },
  },

};
