/**
 * Created by 陈继斌 on 2018/6/10.
 */
const user = {
    state: {
        me: null,
        others: null
    },
    getters: {
        meInfo: state => state.me
    },
    mutations: {
      setMeInfo(state, info) {
          state.me = info
      }
    }
}
export default user
