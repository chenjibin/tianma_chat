/**
 * Created by 陈继斌 on 2018/10/17.
 */
import store from '../../store'
import Vue from 'vue'
const user = {}
user.get_footprint = function (data) {
    store.commit('setFootPointList', data.data)
}
export default user
