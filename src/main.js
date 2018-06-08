require('es6-promise').polyfill();
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import request from './libs/request';
import ws from './libs/ws'

Vue.use(iView);
Vue.prototype.$http = request;
Vue.prototype.$ws = ws;
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
