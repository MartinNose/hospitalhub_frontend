import {
  addFakeList,
  queryFakeList,
  removeFakeList,
  updateFakeList,
  registration,
} from './service';
const Model = {
  namespace: 'hospital',
  state: {
    list: [],
    hosInfo: [],
    filter: [],
    regRes: false,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      console.log(response);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *submit({ payload }, { call, put }) {
      const response = yield call(registration, payload.doctor); // post
      console.log('damn');
      yield put({
        type: 'regRes',
        payload: response,
      });
    },
  },
  reducers: {
    regRes(state, action) {
      console.log(action);
      return { ...state, regRes: action.payload.status === 'success' };
    },

    queryList(state, action) {
      return { ...state, hosInfo: action.payload };
    },

    select(state, action) {
      console.log(action.payload);
      return { ...state, filter: action.payload.category };
    },

    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload), filter: action.payload };
    },
  },
};
export default Model;
