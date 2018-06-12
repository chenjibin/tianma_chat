/**
 * Created by 陈继斌 on 2018/6/10.
 */
import store from '../../store'
import Vue from 'vue';

const index = {}
let oneFlag = true
index.self_info = function (data) {
    store.commit('setMeInfo', data.data)
    store.dispatch('loadSessionList')
}

index.get_message = function (data) {
    let nowData = data.data
    if (+nowData.id === +store.state.current.sessionId) {
        let obj = {}
        obj.avatar = nowData.avatar
        obj.to_user_id = nowData.last_msg.to_user_id
        obj.contentType = nowData.last_msg.type
        obj.content = nowData.last_msg.content.msg
        store.commit('addCurrentChartData', obj)
    } else {
        store.dispatch('updateSessionList', nowData)
    }
}

index.get_friend_list = function (data) {
    let nowData = data.data
    if (nowData.current_session && oneFlag) {
        store.commit('setCurrentSessionId', +nowData.current_session)
        let param = {}
        param.to_user_id = nowData.current_session
        Vue.prototype.$ws.send('index', 'set_current_session', param)
        oneFlag = false
    }
    store.commit('addSessionList', nowData.list)
    store.commit('setTotalPage', nowData.paginate.total_page)
}

index.get_history_msg = function (data) {
    let nowData = data.data
    let list = nowData.list
    let cacheArr = []
    list.forEach((item) => {
        let obj = {}
        nowData.users[item.user_id] && (obj.avatar = nowData.users[item.user_id].avatar)
        obj.to_user_id = item.to_user_id
        obj.contentType = item.type
        obj.content = item.content.msg
        cacheArr.push(obj)
    })
    store.commit('updateCurrentChartData', cacheArr)
}
export default index
