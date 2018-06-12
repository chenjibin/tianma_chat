/**
 * Created by 陈继斌 on 2018/6/7.
 */
import Vue from 'vue'
const current = {
    state: {
        sessionListData: [],
        sessionId: null,
        chartData: [],
        nowPage: 1,
        totalPage: 1
    },
    getters: {
        sessionListData: state => state.sessionListData,
        currentSessionId: state => state.sessionId,
        chartData: state => state.chartData,
        nowPage: state => state.nowPage,
        totalPage: state => state.totalPage
    },
    actions: {
        updateSessionList({commit, state}, data) {
            let sessionList = JSON.parse(JSON.stringify(state.sessionListData))
            let sessionIndex = sessionList.findIndex(x => +x.id === +data.id)
            if (sessionIndex > -1) {
                sessionList.splice(sessionIndex, 1)
                sessionList = [data, ...sessionList]
            } else {
                sessionList = [data, ...sessionList]
            }
            commit('updateCurrentSessionList', sessionList)
        },
        changeSession({commit}, data) {
            commit('setCurrentSessionId', +data.id)
            commit('resetUnreadNumber')
            commit('clearCurrentChatData')
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
            state.nowPage += 1
        },
        updateCurrentSessionList(state, data) { // 更新当前会话列表
            state.sessionListData = data
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
        resetUnreadNumber(state) {
            state.sessionListData.forEach((item) => {
                if (+item.id === state.sessionId) {
                    item.unread_num = 0
                    item.last_msg = []
                }
            })
        },
        clearCurrentChatData(state) {
            state.chartData = []
        },
        addCurrentChartData(state, data) {
            state.chartData = [...state.chartData, data]
        },
        updateCurrentChartData(state, data) {
            state.chartData = [...data, ...state.chartData]
        }
    }
}

export default current
