import Vue from 'vue';
import store from '../store'
import VueRouter from 'vue-router';
import {routers} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.afterEach((to) => {
    store.commit('setCurrentPage', to.name);
});
