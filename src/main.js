import Vue from "vue";
import App from "./App.vue";
import Router from 'vue-router'
import store from "./store/index";

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import request from './request';

import * as filters from './filters'; 

// 挂载全局vue filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const strict = process.env.NODE_ENV !== 'production'

Vue.prototype.$http = request;

let routes = [];
(r => {
    r.keys().forEach(key => {
        let mod = r(key)
        let data = mod.__esModule && mod.default ? mod.default : mod
        routes.push(...data)
    })
})(require.context('./routers', false, /^\.\/.*\.js$/))

Vue.use(Router)
const router = new Router({
    strict:strict,
    routes: routes,
    mode: 'history',
    base: '/'
})

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");