import Vue from 'vue'
import Router from 'vue-router'

// 路由的懒加载
import recommend from '@/pages/recommend';
import rank from '@/pages/rank';
import search from '@/pages/search';
import singer from '@/pages/singer';
import rankDetail from '@/pages/rank_detail';
import squareSong from '@/pages/song_square/song_square.vue';
import artist from '@/pages/artist.vue';
import album from '@/pages/album.vue';
import test from '@/pages/test.vue';
import playlist from '@/pages/playlist';

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
                path:'id/:id',
                component:playlist
            }]
        },
        {
            path:'/playlist/:id',
            name:'playlist',
            component:playlist
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
        },
        // params和query的写法有什么区别
        {
            path: '/artist/:id',
            name: 'artist',
            component: artist
        },
        {
            path: '/album/:id',
            name: 'album',
            component: album 
        },
        {
            path:'/square',
            name:'square',
            component:squareSong,
            // children:[{
            //     // 这里需要/
            //     path:'/tag',
            //     component:tag
            // }]
        },
        {
            path:'/test',
            name:'test',
            component:test
        }
    ]
})
