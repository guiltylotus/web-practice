// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue from 'bootstrap-vue'
<<<<<<< HEAD
// import 'bootstrap-vue/dist/bootstrap-vue.css'
=======
import store from './store'
>>>>>>> origin/pre_master

Vue.use(BootstrapVue)
require('bootstrap')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
