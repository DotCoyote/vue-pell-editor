// Main JS File
import '@babel/polyfill'
import Vue from 'vue'
import App from './app'
import VuePellEditor from './vue-pell-editor'
Vue.use(VuePellEditor)

// Vue App
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App)
})
