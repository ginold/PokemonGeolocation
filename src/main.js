// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueRouter from 'vue-router'
import { router } from './router/'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#pokemon-app',
  template: '<App/>',
  components: { App },
  router
})

Vue.material.registerTheme('default', {
  primary: 'yellow',
  accent: 'red',
  warn: 'red',
  background: 'grey'
})

