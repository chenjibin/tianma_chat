/**
 * Created by 陈继斌 on 2018/6/10.
 */
import error from './modules/error'
import index from './modules/index'
import user from './modules/user'
import Vue from 'vue';
export default class FsWebsocket {
    constructor(url, token = '') {
        this.error = {...error}
        this.index = {...index}
        this.user = {...user}
        this.ws = new WebSocket(url)
        this.ws.onopen = () => {
            console.log('连接成功!')
            let params = {
                token: token
            }
            this.send('index', 'login', params);
        }
        this.ws.onclose = (err) => {
            Vue.prototype.$Modal.warning({
                content: err.reason || '失去连接'
            });
        }
        this.ws.onerror = () => {
            Vue.prototype.$Modal.warning({
                content: '失去连接'
            });
        }
        this.ws.onmessage = (e) => {
            let afterData = JSON.parse(e.data);
            try {
                this[afterData.module][afterData.method](afterData)
            } catch (err) {
                console.log(err)
            }
        }
    }
    send(module, method, param = {}) {
        let obj = {}
        obj.module = module
        obj.method = method
        obj.param = param
        this.ws.send(JSON.stringify(obj))
    }
}
