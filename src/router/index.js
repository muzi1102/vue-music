import Vue from 'vue'
import Router from 'vue-router'

// 路由的懒加载
import recommend from '@/pages/recommend';
import rank from '@/pages/rank';
import search from '@/pages/search';
import singer from '@/pages/singer';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/',
      name: 'singer',
      component: singer
    }
  ]
})
