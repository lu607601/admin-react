import { pathMatchRegexp } from 'utils'
import api from 'api'

const { queryArticle, updateArticle } = api

export default {
  namespace: 'articleDetail',

  state: {
    data: {
      data: {
        title: '',
        author: '',
        keyword: '',
        desc: '',
        imgUrl: '',
        categorys: [],
        tags: [],
        content: '',
        state: '',
        type: '',
        origin: '',
        createTime: '',
        updateTime: '',
      },
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/article/detail/:_id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { _id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryArticle, payload)
      const { success, message, status, ...other } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        throw data
      }
    },
    *update({ payload }, { select, call, put }) {
      const newArticle = { ...payload }
      const data = yield call(updateArticle, newArticle)
      if (!data.success) {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
