import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import moment from 'vue-moment'
import smoothscroll from 'smoothscroll-polyfill';
import VueClipboard from 'vue-clipboard2'
import i18n from '@/plugins/i18n.js'
import VueChangeCase from 'vue-change-case'

Vue.use(VueChangeCase);

Vue.use(VueClipboard)

smoothscroll.polyfill();

Vue.config.productionTip = false
Vue.use(moment)
Object.defineProperty(Vue.prototype,'$casaGirelli', {value: process.env.VUE_APP_CASAGIRELLI_API})
Object.defineProperty(Vue.prototype,'$network', {value: process.env.VUE_APP_NETWORK})
//Object.defineProperty(Vue.prototype,'$snakeCase',{value:capitalCase});


new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
