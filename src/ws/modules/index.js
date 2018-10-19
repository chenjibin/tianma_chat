/**
 * Created by 陈继斌 on 2018/6/10.
 */
import store from '../../store'
import vm from '@/main'
import emoji from '../../libs/transEmoji'
import dayjs from 'dayjs'
const needTransEmoji = emoji.needTransEmoji()
const index = {}
let oneFlag = true
index.self_info = function (data) {
    vm.$store.commit('setMeInfo', data.data)
    vm.$store.dispatch('loadSessionList')
}

index.get_message = function (data) {
    vm.$store.dispatch('enableScroll')
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
        vm.$store.commit('addCurrentChartData', obj)
    } else {
        vm.$store.dispatch('updateSessionList', nowData)
        if (store.getters.isHidden) {
            let returnContent = ''
            console.log(nowData.last_msg.content.msg)
            switch (nowData.last_msg.type) {
                case 'text':
                    returnContent = nowData.last_msg.content.msg
                    break
                case 'image':
                    returnContent = '图片'
                    break
                case 'item':
                    returnContent = '链接'
                    break
            }
            vm.$notification.showMessage('来新消息啦！', returnContent, nowData.avatar)
        }
    }
}

index.get_friend_list = function (data) {
    let nowData = data.data
    if (nowData.current_session && oneFlag) {
        vm.$store.commit('setCurrentSessionId', +nowData.current_session)
        vm.$store.dispatch('getFootPrint', +nowData.current_session)
        let param = {}
        param.to_user_id = nowData.current_session
        param.page = 1
        param.page_size = 20
        vm.$ws.send('index', 'set_current_session', param)
        oneFlag = false
    }
    vm.$store.commit('addSessionList', nowData.list)
    vm.$store.commit('setTotalPage', nowData.paginate.total_page)
}

index.get_history_msg = function (data) {
    let nowData = data.data
    let list = nowData.list
    let cacheArr = []
    vm.$store.commit('setChatTotalPage', nowData.paginate.total_page)
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
    vm.$store.commit('updateCurrentChartData', cacheArr)
    vm.$store.commit('setToggleLoadFalse')
    vm.$store.commit('setLoading', false)
}

index.logout = function () {

}
export default index
