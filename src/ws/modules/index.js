/**
 * Created by 陈继斌 on 2018/6/10.
 */
import store from '../../store'
import Vue from 'vue'
import emoji from '../../libs/transEmoji'
import dayjs from 'dayjs'
const needTransEmoji = emoji.needTransEmoji()
const index = {}
let oneFlag = true
index.self_info = function (data) {
    store.commit('setMeInfo', data.data)
    store.dispatch('loadSessionList')
}

index.get_message = function (data) {
    store.dispatch('enableScroll')
    let nowData = data.data
    if (+nowData.id === +store.state.current.sessionId || +nowData.id === +store.state.user.me.id) {
        let obj = {}
        obj.avatar = nowData.avatar
        obj.to_user_id = nowData.last_msg.to_user_id
        obj.contentType = nowData.last_msg.type
        obj.key = 'record-' + dayjs().unix() + obj.to_user_id
        switch (obj.contentType) {
            case 'text':
                obj.content = needTransEmoji ? emoji.getNeedContent(nowData.last_msg.content.msg, '/im/static/emoji/2x/', 20) : nowData.last_msg.content.msg
                break
            case 'image':
                obj.url = nowData.last_msg.content.url
                obj.thumb = nowData.last_msg.content.thumb
                break
            case 'item':
                obj.pic = nowData.last_msg.content.pic
                obj.sale_price = nowData.last_msg.content.sale_price
                obj.sold_quantity = nowData.last_msg.content.sold_quantity
                obj.title = nowData.last_msg.content.title
                obj.url = nowData.last_msg.content.url
                break
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
        store.dispatch('getFootPrint', +nowData.current_session)
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
    list.forEach((item, index) => {
        let obj = {}
        obj.to_user_id = item.to_user_id
        obj.contentType = item.type
        obj.key = 'record-' + dayjs().unix() + index
        if (obj.contentType !== 'system-msg-group') obj.avatar = nowData.users[+item.user_id].avatar
        switch (obj.contentType) {
            case 'text':
                obj.content = needTransEmoji ? emoji.getNeedContent(item.content.msg, '/im/static/emoji/2x/', 20) : item.content.msg
                break
            case 'image':
                obj.url = item.content.url
                obj.thumb = item.content.thumb
                break
            case 'system-msg-group':
                obj.time = item.msg
                break
            case 'item':
                obj.pic = item.content.pic
                obj.sale_price = item.content.sale_price
                obj.sold_quantity = item.content.sold_quantity
                obj.title = item.content.title
                obj.url = item.content.url
                break
        }
        cacheArr.push(obj)
    })
    store.commit('updateCurrentChartData', cacheArr)
    store.commit('setToggleLoadFalse')
    store.commit('setLoading', false)
}

index.logout = function () {

}
export default index
