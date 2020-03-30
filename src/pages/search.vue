<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="search">
            <div class="search-form"></div>
            <div class="search-pannel">
                <!-- 热门搜索 -->
                <div class="search-pannel-hotlist">
                    <h5>热门搜索</h5>
                    <ul class="hotlist">
                        <li class="hotlist-item" @click="searchHot(hot.first)" v-for="(hot,index) in hotList" :key="index">
                            {{hot.first}}
                        </li>
                    </ul>
                </div>
                <div class="match-list">
                    <searchItem :cellData = historykwList iconType="history"></searchItem>
                </div>
                <!-- 搜索历史 -->
                <div class="search-pannel-history">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
import searchItem from '@/components/search_item.vue';
import loading from '@/components/loading';
import {mapGetters,mapActions} from 'vuex';
import {set_localStorage,get_localStorage,remove_localStorage} from '@/assets/js/utils.js';
export default {
    data() {
        return {
            hotList:[],
            matchAlbum:[],
            matchSongList:[],
            historykwList:[]
        }
    },
    computed: {
        ...mapGetters([
            'count'
        ])
    },
    components:{
        mheader,
        tab,
        loading,
        searchItem
    },
    created() {
        this.getHotList();
        this.historykwList = get_localStorage('search_history');
    },
    methods: {
        getHotList(){
            this.$ajax({
                url:'/api/search/hot',
                type:'GET',
                data:{}
            }).then((res)=>{
                if (res.code === 200) {
                    this.hotList = res.result.hots;
                }
            })
        },
        searchHot(keyword){
            // 把搜索的记录在localstorage里面，并且去重 todo这里怎么优化??
            let historyKw = get_localStorage('search_history')||[];
            let index = historyKw.indexOf(keyword);
            if (index>-1) {
                historyKw.splice(index,1);
                historyKw.unshift(keyword);
            }else{
                historyKw.unshift(keyword);
            }
            set_localStorage('search_history',historyKw);
            // 同时请求2个请求
            // this.search(keyword);
            // this.multimatch(keyword);
        },
        search(keyword){
            this.$get({
                url:'/api/search',
                loading:true,
                data:{
                    keywords:keyword
                }
            }).then((res)=>{
                this.matchSongList = res.result.songs;
                // this.matchAlbum = 
            })
        },
        multimatch(keyword){
            this.$ajax({
                url:'/api/search/multimatch',
                type:'GET',
                data:{
                    keywords:keyword
                }
            }).then((res)=>{
                if (res.code === 200) {
                    console.log(res);
                    // this.hotList = res.result;
                }
            })
        },
        ...mapActions({
            addCount:'incrementAsync'
        })
    }
}
</script>
<style  scoped lang="scss">
@import '@/assets/css/border.scss';  
.search-pannel-hotlist{
    padding: 0.3rem 0.2rem 0;
}
.hotlist{
    margin: 0.2rem 0 0.14rem;
    &-item{
        font-size: 0.28rem;
        display: inline-block;
        height: 0.64rem;
        line-height: 0.64rem;
        padding: 0 0.28rem;
        margin-right: 0.16rem;
        margin-bottom: 0.16rem;
        color: #333;
        @include border(#d3d4da,0.64rem);
    }
}
</style>