/**
 * Created by 陈继斌 on 2018/6/7.
 */
import store from '../store'
const ws = new WebSocket('ws://192.168.199.197:9503');
ws.onopen = function (e) {
    // 连接成功
    console.log('连接成功.');
    // 发送登录信息
    // let msg = {};
    // msg.cmd = 'login';
    // msg.token = '';
    // ws.send(JSON.stringify(msg));

    ws.onmessage = function (e) {
        console.log(e)
        let message = JSON.parse(e.data);
        let cmd = message.cmd;
        if (cmd === 'currentPeopleList') {
            store.commit('addPeople', [])
        }
    };
};

export default ws
