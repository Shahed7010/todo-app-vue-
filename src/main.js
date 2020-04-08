import Vue from 'vue'
// import App from './App.vue'
import Master from './components/layouts/Master'
import {store} from './store'
import VueRouter from 'vue-router'
import Routes from "./routes";

window.eventBus = new Vue()
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes, // short for `routes: routes`
  mode: 'history'
})

new Vue({
  render: h => h(Master),
  router: router,
  store: store,
}).$mount('#app')
