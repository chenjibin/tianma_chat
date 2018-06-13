/**
 * Created by 陈继斌 on 2018/6/10.
 */
import store from '../../store'
import Vue from 'vue'
import emoji from '../../libs/transEmoji'
const needTransEmoji = emoji.needTransEmoji()
const index = {}
let oneFlag = true
index.self_info = function (data) {
    store.commit('setMeInfo', data.data)
    store.dispatch('loadSessionList')
}

index.get_message = function (data) {
    let nowData = data.data
    if (+nowData.id === +store.state.current.sessionId || +nowData.id === +store.state.user.me.id) {
        let obj = {}
        obj.avatar = nowData.avatar
        obj.to_user_id = nowData.last_msg.to_user_id
        obj.contentType = nowData.last_msg.type
        if (obj.contentType === 'text') {
            obj.content = needTransEmoji ? emoji.getNeedContent(nowData.last_msg.content.msg, '/static/emoji/2x/', 20) : nowData.last_msg.content.msg
        } else if (obj.contentType === 'image') {
            obj.url = nowData.last_msg.content.url
            obj.thumb = nowData.last_msg.content.thumb
        }
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
        param.page = 1
        param.page_size = 20
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
    store.commit('setChatTotalPage', nowData.paginate.total_page)
    list.forEach((item) => {
        let obj = {}
        nowData.users[item.user_id] && (obj.avatar = nowData.users[item.user_id].avatar)
        obj.to_user_id = item.to_user_id
        obj.contentType = item.type
        if (obj.contentType === 'text') {
            obj.content = needTransEmoji ? emoji.getNeedContent(item.content.msg, '/static/emoji/2x/', 20) : item.content.msg
        } else if (obj.contentType === 'image') {
            obj.url = item.content.url
            obj.thumb = item.content.thumb
        }
        cacheArr.push(obj)
    })
    store.commit('updateCurrentChartData', cacheArr)
    store.commit('setToggleLoadFalse')
    store.commit('setLoading', false)
}
export default index
