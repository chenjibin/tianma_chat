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

Vue.prototype.$ws = new FsSocket('ws://192.168.199.197:9503', '030d85b2759c6a5a6299dd90a5ce804a');
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
