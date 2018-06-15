/**
 * Created by 陈继斌 on 2018/6/7.
 */
import Vue from 'vue'
const current = {
    state: {
        isLoading: false,
        sessionListData: [],
        sessionId: null,
        chartData: [],
        nowPage: 1,
        totalPage: 1,
        canLoadData: false,
        chatDataPage: 1,
        chatDataTotalPage: 1,
        canScroll: true
    },
    getters: {
        sessionListData: state => state.sessionListData,
        currentSessionId: state => state.sessionId,
        chartData: state => state.chartData,
        nowPage: state => state.nowPage,
        totalPage: state => state.totalPage,
        isLoading: state => state.isLoading,
        chatDataPage: state => state.chatDataPage,
        chatDataTotalPage: state => state.chatDataTotalPage,
        canScroll: state => state.canScroll
    },
    actions: {
        loadMoreChartData({commit, state}) {
            if (state.canLoadData && state.chatDataPage < state.chatDataTotalPage) {
                commit('setLoading', true)
                commit('setToggleLoadFalse')
                let param = {}
                param.to_user_id = state.sessionId
                param.page = state.chatDataPage + 1
                param.page_size = 20
                Vue.prototype.$ws.send('index', 'get_history_msg', param)
                commit('plusChatPage')
            }
        },
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
        changeSession({commit, dispatch}, data) {
            commit('setCurrentSessionId', +data.id)
            commit('setChatPage', 1)
            commit('resetUnreadNumber')
            commit('clearCurrentChatData')
            commit('setCanScroll', true)
            let param = {}
            param.to_user_id = data.id
            param.page = 1
            param.page_size = 20
            Vue.prototype.$ws.send('index', 'set_current_session', param)
        },
        loadSessionList({commit, state}) {
            let param = {}
            param.page = state.nowPage
            param.page_size = 20
            Vue.prototype.$ws.send('index', 'get_friend_list', param)
            commit('plusPage')
        },
        disableScroll({commit}) {
            commit('setCanScroll', false)
        },
        enableScroll({commit}) {
            commit('setCanScroll', true)
        }
    },
    mutations: {
        setLoading(state, data) {
            state.isLoading = data
        },
        setCanScroll(state, data) {
            state.canScroll = data
        },
        setChatPage(state, page) {
            state.chatDataPage = page
        },
        setChatTotalPage(state, page) {
            state.chatDataTotalPage = page
        },
        setToggleLoadFalse(state) {
            state.canLoadData = !state.canLoadData
        },
        plusChatPage(state) {
            state.chatDataPage += 1
        },
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
                    // item.last_msg = []
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
