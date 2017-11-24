
export default {

  namespace: 'GUEST',

  state: {
    step: 1
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
