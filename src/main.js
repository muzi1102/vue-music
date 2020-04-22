// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import '@/assets/js/base.js';

import vant from 'vant'
import 'vant/lib/index.css';
Vue.use(vant)

//注册全局组件
import mheader from '@/base_components/header.vue'
Vue.component('mheader',mheader);
import searchItem from '@/components/search_item.vue';
Vue.component('searchItem',searchItem);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
