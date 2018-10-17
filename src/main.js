require('es6-promise').polyfill();
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import request from './libs/request';
import FsSocket from './ws/FsWebsocket';
import ShowNotification from './libs/notification';
// console.log(fsGlobalData)
Vue.use(iView);
Vue.prototype.$http = request;
Vue.prototype.$ws = new FsSocket(fsGlobalData.wsUrl, fsGlobalData.token);
Vue.prototype.$notification = new ShowNotification();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    mounted() {
        this.$notification.showMessage('这是通知标题', '这是通知内容', 'https://www.xyyzi.com/images/home_logo.png')
    }
});
