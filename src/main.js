// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router'
import { vuex } from './vuex/vuex'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';




import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


export const server_img_url = "http://api.ergouz.net/static/file_temp/"
export const server_url = "http://api.ergouz.net/"

Vue.use(ElementUI);
Vue.use(mavonEditor)

axios.defaults.withCredentials = true
Vue.prototype.$http = axios  

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:vuex,
  components: { App },
  template: '<App/>'
})
