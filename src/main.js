import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Home from './components/Home.vue';
import Create from './components/Create.vue';
import Single from './components/Single.vue';
import VueDarkMode from "@growthbunker/vuedarkmode";

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueDarkMode)

window.eventHub = new Vue()

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/create', component: Create },
    { path: '/movie/:id', component: Single }
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
