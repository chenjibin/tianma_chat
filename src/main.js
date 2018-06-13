require('es6-promise').polyfill();
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import request from './libs/request';
import FsSocket from './ws/FsWebsocket'

Vue.use(iView);
Vue.prototype.$http = request;

Vue.prototype.$ws = new FsSocket('ws://192.168.199.197:9503', 'e3fca1cd259e8780e9eeefa4584dc1ff');
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
