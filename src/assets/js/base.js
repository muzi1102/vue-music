import Vue from 'vue';
import {ajax,get} from '@/assets/js/ajax.js';
// css的重置样式
import '@/assets/css/reset.css';
import '@/assets/css/iconfont.css';
import  '@/assets/css/commom.css';

Vue.prototype.$ajax = ajax;
Vue.prototype.$get = get;

console.log(ajax);