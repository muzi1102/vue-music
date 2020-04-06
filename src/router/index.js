import Vue from 'vue'
import Router from 'vue-router'

// 路由的懒加载
import recommend from '@/pages/recommend';
import rank from '@/pages/rank';
import search from '@/pages/search';
import singer from '@/pages/singer';
import rankDetail from '@/pages/rank_detail';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children:[{
        path:':id',
        component:rankDetail
      }]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children: [
        {
          path: 'id/:id',
          component: rankDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    }
  ]
})
