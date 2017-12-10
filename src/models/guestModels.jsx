
export default {

  namespace: 'GUEST',

  state: {
    step: 3, // 当前流程
    goodsName: '', // 商品名称
    goodsID: '', // 商品id
    goodsPwd: '', // 商品密码
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    update(state, action) {
      return Object.assign({}, state, action.payload);
    },
  },

};
