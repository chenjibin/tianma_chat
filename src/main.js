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

export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    mounted() {
        document.addEventListener('visibilitychange', () => {
            const hidden = document.hidden
            this.$store.commit('setIsHidden', hidden)
        })
    }
});
