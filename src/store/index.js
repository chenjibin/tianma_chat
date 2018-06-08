import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import current from './modules/current';
import history from './modules/history';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        current,
        history
    }
});

export default store;
