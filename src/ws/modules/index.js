/**
 * Created by 陈继斌 on 2018/6/10.
 */
import store from '../../store'
const index = {}
index.self_info = function (data) {
    store.commit('setMeInfo', data.data)
}
index.send_message = function (data) {
    let nowData = data.data
    console.log(nowData.id, store.state.current.sessionId)
    if (+nowData.id === +store.state.current.sessionId) {
        let obj = {}
        obj.avatar = nowData.avatar
        obj.to_user_id = nowData.last_msg.to_user_id
        obj.contentType = nowData.last_msg.type
        obj.content = nowData.last_msg.content.msg
        store.commit('addCurrentChartData', obj)
    }
}
export default index
