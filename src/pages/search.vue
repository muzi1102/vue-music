<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="search header-placeholder">
            <form class="search-form">
                <div class="search-form-cover">
                    <i class="iconfont search icon-search"></i>
                    <input type="text" v-model="keyword" @input="suggestInfo" @keyup.enter="searchEnter">
                    <span v-show="keyword" @click="clear" class="close"><i class="iconfont icon icon-close"></i></span>
                </div>
            </form>
            <!-- 默认 -->
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
                <!-- 搜索历史 -->
                <div class="search-pannel-history">
                    <searchItem :cellData = historykwList iconType="history" iconFtType="close">
                        <template v-slot:item="{ row }">
                            <p>{{row}}</p>
                        </template>
                    </searchItem>
                </div>
            </div>
            <!-- 搜索建议 -->
            <div class="search-suggest" v-if="suggestList.length && keyword">
                <searchItem @itemEvent=itemEvent :cellData = suggestList iconType="search">
                    <template v-slot:item="{ row }">
                        <p>{{row}}</p>
                    </template>
                </searchItem>
            </div>
            <!-- 搜索匹配 -->
            <div class="searchresult">
                <div class="match-list">
                    <h3 class="title">最佳匹配</h3>
                    <ul >
                        <li class="matchitem artist" v-for="item in matchList" :key="item.name">
                            <router-link
                                v-for="list in item.lists"
                                tag="a" class="linkcover" 
                                :to="{name:'singerdetail',params:{ id: list.id }}"
                            >
                                <figure class="piccover">
                                    <img class="pic" :src="list.picUrl" :alt="list.name" srcset="">
                                </figure>
                                <article class="describe">
                                    {{item.title === 'artist'?'歌手':item.title === 'album'?'专辑':''}}
                                    :
                                    {{list.name}}
                                </article>
                                <i class="iconfont icon-bofang"></i>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <section class="songlist">
                    <searchItem @itemEvent=itemEvent :cellData = matchSongList iconFtType="play">
                        <template v-slot:item="{ row }">
                            <div>
                                <p>{{row.name}}</p>
                                <p>
                                    <span>{{row.artists[0].name}}</span>
                                    --
                                    <span>{{row.album.name}}</span>
                                </p>
                            </div>
                        </template>
                    </searchItem>
                </section>
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
import {set_localStorage,get_localStorage,remove_localStorage,debounce} from '@/assets/js/utils.js';
export default {
    data() {
        return {
            keyword:'',//搜索的关键词
            hotList:[],
            matchAlbum:[],
            matchSongList:[],
            historykwList:[],
            suggestList:[],
            matchList:[]
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
    watch: {
        'keyword'(val){
            if (!val) {
                this.suggestList = [];
            }
        }
    },
    created() {
        this.getHotList();
        this.historykwList = get_localStorage('search_history');
    },
    mounted() {
    },
    methods: {
        itemEvent(val){
            this.keyword = val.keyword;
            this.suggestList = [];
            this.search(val)
        },
        //为什么传this.aa的不行 
        // 为什么这里不能立刻获取keywords?????这里有问题
        suggestInfo:debounce(function () {
            if (!this.keyword) {
                return false;
            }
            this.$get({
                url:'/api/search/suggest?type=mobile',
                data:{
                    keywords:this.keyword
                }
            }).then((res)=>{
                this.suggestList = [];
                res.result && res.result.allMatch.map((item)=>{
                    this.suggestList.push(item.keyword)
                });
            }) 
        }),
        clear(){
            this.suggestList = [];
            this.keyword = '';
        },
        searchEnter(){
            this.suggestList = [];
            console.log("enter");
        },
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
            this.keyword = keyword;
            this.search();
        },
        search(val){
            this.get(val);
            this.multimatch(val);
        },
        get(){
            this.$get({
                url:'/api/search/get',
                loading:true,
                data:{
                    keywords:this.keyword||val.keyword,
                    limit:10
                }
            }).then((res)=>{
                this.matchSongList = res.result.songs;
            })
        },
        multimatch(){
            this.$get({
                url:'/api/search/multimatch?type=mobile',
                loading:true,
                data:{
                    keywords:this.keyword||val.keyword
                }
            }).then((res)=>{
                let result = res.result;
                let orders = result.orders;
                if(orders.length>0){
                    orders.forEach((item)=>{
                        let data = {
                            title:item,
                            lists:result[item]||[]
                        }
                        this.matchList.push(data);
                        console.log(this.matchList)
                    });
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
.search-form{
    padding: 0.3rem 0.2rem;
    @include border-bottom(#EEEFF3);
    &-cover{
        position: relative;
        width: 100%;
        height:0.6rem;
        padding: 0 0.6rem;
        box-sizing: border-box;
        background: #ebecec;
        border-radius: 0.6rem;
        i.search{
            position: absolute;
            left: 0;
            top: 0.12rem;
            margin: 0 0.16rem;
            vertical-align: middle;
        }
        input{
            border: none;
                width: 100%;
                height:0.6rem;
                line-height: 0.36rem;
                background: rgba(0,0,0,0);
                font-size: 0.28rem;
                color: #333;
                outline: none;
        }
        span.close{
            position: absolute;
            right: 0;
            top: 0;
            width: 0.6rem;
            height:  0.6rem;
            line-height: 0.56rem;
            text-align: center;
        }
    }
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
.search-suggest{
    position: absolute;
    top: 1rem;
    background: #fff;
    right: 0;
    left: 0;
}
.match-list{
    .title{
        margin-left: 0.2rem;
        font-size: 0.24rem;
        line-height: 0.32rem;
        color: #666;
    }
    .matchitem{
        position: relative;
        height: 1.32rem;
        .linkcover{
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            height: 1.32rem;
            margin-left: 0.2rem;
            padding: 8px 10px 8px 0;
            box-sizing: border-box;
            .piccover{
                position: relative;
                width: 1rem;
                height: 1rem;
                margin-right: 0.3rem;
                line-height: 0;
                .pic{
                    display: block;
                    width: 100%;
                }
            }
            .describe{
                flex: 1;
            }
        }
    }
}

</style>