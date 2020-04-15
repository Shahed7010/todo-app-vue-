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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: 'app'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  render: h => h(Master),
  router: router,
  store: store,
}).$mount('#app')
