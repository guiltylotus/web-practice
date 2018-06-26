// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import jQuery from 'jquery'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
global.jQuery = jQuery
// let Bootstrap = require('bootstrap')

Vue.config.productionTip = false
// import '../node_modules/bulma/css/bulma.min.css'
// import '../node_modules/font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
