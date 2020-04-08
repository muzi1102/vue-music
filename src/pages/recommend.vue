<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="banner" v-if="bannerList.length>0">
            <!-- <banner>
                <div v-for="(item,index) in bannerList" :key="index">
                    <a :href="item.url">
                        <img :src="item.pic" alt="">
                    </a>
                </div>
            </banner> -->
        </div>
        <ul class="nav-tab">
            <li>
                <i></i>
                <h4>每日推荐</h4>
            </li>
            <li>
                <i></i>
                <h4>歌单</h4>
            </li>
            <li>
                <i></i>
                <h4>排行榜</h4>
            </li>
            <li>
                <i></i>
                <h4>电台</h4>
            </li>
            <li>
                <i></i>
                <h4>直播</h4>
            </li>
        </ul>
        <div class="recommend-list">
            <div class="title">
                <h4>为你精挑细选</h4>
                <span @click="getMoreInfo">查看更多</span>
            </div>
            <div class="recommend-slider-group">
                <hscroll>
                    <!-- todo 歌单的播放量 -->
                    <li class="item" v-for="item in songList" :key="item.id">
                        <img :src="item.picUrl" alt="">
                        <h4>{{item.name}}</h4>
                    </li>
                </hscroll>
            </div>
        </div>
        <div class="recommend-new">
            <div class="title">
                <h4>推荐新音乐</h4>
                <span @click="getMoreInfo">查看更多</span>
            </div>
            <div class="recommend-new-group">
                <hscroll>
                    <li class="item" v-for="item in newSongList" :key="item.id">
                        <img :src="item.picUrl" alt="">
                        <h4>{{item.name}}</h4>
                    </li>
                </hscroll>
            </div>
        </div>
        <div class="recommend-dj">
            <div class="title">
                <h4>推荐电台</h4>
                <span @click="getMoreInfo">查看更多</span>
            </div>
            <div class="recommend-dj-group">
                <hscroll>
                    <li class="item" v-for="item in djData" :key="item.id">
                        <img :src="item.picUrl" alt="">
                        <h4>{{item.name}}</h4>
                    </li>
                </hscroll>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
import banner from '@/base_components/banner.vue';
import hscroll from '@/base_components/horizontal-scroll.vue';
export default {
    data() {
        return {
            bannerList:[],
            djData:[],
            songList:[],
            newSongList:[]
        }
    },
    components:{
        mheader,
        tab,
        banner,
        hscroll
    },
    created() {
        this.getBannerData();
        this.getDjData();
        this.getPersonalized();
        this.getNewSong();
    },
    methods: {
        getMoreInfo(){
            this.$router.push({
                path:'/square'
            });
        },
        getNewSong(){
            this.$get({
                url:'/api/personalized/newsong',
            }).then((res)=>{
                if (res.code === 200) {
                    this.newSongList = res.result;
                }
            })
        },
        getPersonalized(){
            this.$get({
                url:'/api/personalized',
                data:{
                    limit:6
                },
            }).then((res)=>{
                if (res.code === 200) {
                   this.songList = res.result; 
                }
            })
        },
        getBannerData(){
            this.$get({
                url:'/api/banner',
                data:{
                    type:2
                }
            }).then((res)=>{
                if (res.code === 200) {
                    this.bannerList = res.banners;
                }
            })
        },
        getDjData(){
            this.$get({
                url:'/api/personalized/djprogram',
                data:{},
            }).then((res)=>{
                if (res.code === 200) {
                   this.djData = res.result; 
                }
            })
        },
        more(id){
            this.$router.push({
                path: `/recommend/${id}`
            })
        }
    },
}
</script>
<style scoped lang="scss">
.banner{
    position: relative;
    width: 100%;
    overflow: hidden;
}
.recommend-list{
    .title{
        height: 1rem;
        line-height: 1rem;
        font-size:0.28rem;
        color: #2e3030;
        display: flex;
        padding: 0 0.2rem;
        align-items: center;
        h4{
            flex: 1;
        }
    }
    .recommend-slider-group{
        padding: 0 0.2rem;
    }
}
.recommend-new{
    .title{
        height: 1rem;
        line-height: 1rem;
        font-size:0.28rem;
        color: #2e3030;
        display: flex;
        padding: 0 0.2rem;
        align-items: center;
        h4{
            flex: 1;
        }
    }
    .recommend-new-group{
        padding: 0 0.2rem;
    }
}
.recommend-dj{
    .title{
        height: 1rem;
        line-height: 1rem;
        font-size:0.28rem;
        color: #2e3030;
        display: flex;
        padding: 0 0.2rem;
        align-items: center;
        h4{
            flex: 1;
        }
    }
    .recommend-dj-group{
        padding: 0 0.2rem;
    }
}
.nav-tab{
    margin: 0.2rem auto 0.4rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    height: 1rem;
    background-color: cyan;
    li{
        flex: 1;
        background-color: chocolate;
    }
}
</style>