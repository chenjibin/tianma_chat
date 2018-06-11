/**
 * Created by 陈继斌 on 2018/6/7.
 */
import Vue from 'vue'
const current = {
    state: {
        sessionListData: [],
        sessionId: null,
        chartData: [],
        page: 1,
        totalPage: 1
    },
    getters: {
        sessionListData: state => state.sessionListData,
        currentSessionId: state => state.sessionId,
        chartData: state => state.chartData,
        page: state => state.page,
        totalPage: state => state.totalPage
    },
    actions: {
        changeSession({commit}, data) {
            commit('setCurrentSessionId', +data.id)
            let param = {}
            param.to_user_id = data.id
            Vue.prototype.$ws.send('index', 'set_current_session', param)
        },
        loadSessionList({commit, state}) {
            let param = {}
            param.page = state.page
            param.page_size = 20
            Vue.prototype.$ws.send('index', 'get_friend_list', param)
            commit('plusPage')
        }
    },
    mutations: {
        plusPage(state) {
            state.page += 1
        },
        addSessionList(state, data) {
            state.sessionListData = [...state.sessionListData, ...data]
        },
        setTotalPage(state, total) {
            state.totalPage = total
        },
        setCurrentSessionId(state, id) {
            state.sessionId = id
        },
        addCurrentChartData(state, data) {
            state.chartData = [...state.chartData, data]
        }
    }
}

export default current
