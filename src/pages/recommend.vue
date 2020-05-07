<template>
    <div>
        <div class="banner" v-if="bannerList.length>0">
            <!-- todo初始化的时候一闪而过 -->
            <banner>
                <div v-for="(item,index) in bannerList" :key="index">
                    <a :href="item.url">
                        <img :src="item.pic" alt="">
                    </a>
                </div>
            </banner>
        </div>
        <ul class="nav-tab">
            <li class="nav-tab-item" v-for="item in navItem" :key="item.id">
                <div class='tab-icon'>
                    <i class="iconfont" :class="[`icon-${item.icon}`]"></i>
                </div>
                <h4>{{item.name}}</h4>
            </li>
        </ul>
        <div class="recommend-list">
            <div class="title">
                <h4>为你精挑细选</h4>
                <span @click="getMoreInfo">查看更多</span>
            </div>
            <div class="recommend-slider-group">
                <hscroll @initWidth = initWidth ref="hscroll">
                    <!-- todo 歌单的播放量 -->
                    <li class="song-item" v-for="item in songList" :key="item.id"  @click="goDetail(item)">
                        <img class="song-img" :src="item.picUrl" alt="">
                        <p class="song-title">{{item.name}}</p>
                        <p class="song-play">
                            <i class="iconfont icon-bofang1 song-play-icon"></i>
                            <span class="song-play-num">{{item.playCount|chineseUnit}}</span>
                        </p>
                    </li>
                    <!-- 这里有问题 -->
                    <!-- <song-item :list="songList" ref="songItem"></song-item> -->
                </hscroll>
            </div>
        </div>
        <div class="recommend-new">
            <div class="title">
                <h4>为你精挑细选</h4>
                <span @click="getMoreInfo">查看更多</span>
            </div>
            <div class="recommend-new-group">
                <hscroll @initWidth = initWidth ref="hscroll">
                    <!-- <song-item :list="newSongList" ref="songItem"></song-item> -->
                    <li class="song-item" v-for="item in newSongList" :key="item.id" @click="goDetail(item)">
                        <img class="song-img" :src="item.picUrl" alt="">
                        <p class="song-title">{{item.name}}</p>
                        <p class="song-play">
                            <i class="iconfont icon-bofang1 song-play-icon"></i>
                            <span class="song-play-num">{{item.playCount|chineseUnit}}</span>
                        </p>
                    </li>
                </hscroll>
            </div>
        </div>
        <div class="recommend-dj">
            <div class="title">
                <h4>为你精挑细选</h4>
                <span @click="getMoreInfo">查看更多</span>
            </div>
            <div class="recommend-dj-group">
                <hscroll @initWidth = initWidth ref="hscroll"> 
                    <li class="song-item" v-for="item in djData" :key="item.id" @click="goDetail(item)">
                        <img class="song-img" :src="item.picUrl" alt="">
                        <p class="song-title">{{item.name}}</p>
                        <p class="song-play">
                            <i class="iconfont icon-bofang1 song-play-icon"></i>
                            <span class="song-play-num">{{item.playCount|chineseUnit}}</span>
                        </p>
                    </li>
                </hscroll>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import banner from '@/base_components/banner.vue';
import hscroll from '@/base_components/horizontal_scroll.vue';
import songItem from '@/base_components/song_item.vue';
export default {
    data() {
        return {
            bannerList:[],
            djData:[],
            songList:[],
            newSongList:[],
            navItem:[{
                name:'每日推荐',
                icon:'rili',
                id:'recommend'
            },{
                name:'歌单',
                icon:'yinle',
                id:'list'
            },{
                name:'排行榜',
                icon:'paihangbang',
                id:'rank'
            },{
                name:'直播',
                icon:'diantai',
                id:'video'
            }]
        }
    },
    components:{
        banner,
        hscroll,
        songItem
    },
    created() {
        this.getBannerData();
        this.getDjData();
        this.getPersonalized();
        this.getNewSong();
    },
    methods: {
        goDetail(item){
            this.$router.push({
                path: `/recommend/id/${item.id}`
            })
        },
        initWidth(){
            let width = 0;
            this.children = this.$refs.songItem.$refs.song.children;
            console.log(this.children[0].clientWidth)
            width = this.children[0].clientWidth * this.children.length + (10*(this.children.length));
            this.$refs.hscroll.$refs.hSliderContent.style.width = width + 'px';
        },
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
    filters:{
        chineseUnit(num){
            let numStr = '';
            if (num<10000) {
                numStr = num;
            }else if(num>=10000 && num < 100000000){
                numStr = (num/10000) + '万';
            }else if(num >= 100000000){
                numStr = num / 100000000 + '亿';
            }
            return numStr
        }
    }
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
    &-item{
        flex:1;
        text-align:center;
        .tab-icon{
            width: 0.8rem;
            height: 0.8rem;
            // todo渐变
            background-color:#d44439;
            // opacity: 0.8;
            border-radius: 50%;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            .iconfont{
                font-size: 0.44rem;
                color: #fff;
            }
        }
        h4{
            margin-top: 0.2rem;
        }
    }
    
    
}
.song-item{
    width: 2rem;
    height: 2.6rem;
    margin-bottom: 0.2rem;
    margin-right: 0.2rem;
    // background: chocolate;
    float: left;
    box-sizing: border-box;
    position: relative;
    &:last-child{
        margin-right: 0rem;
    }
    .song-img{
        width: 100%;
        border: 1px solid #eee;
        border-radius: 0.2rem;
    }
    .song-title{
        font-size: 0.20rem;
        color: #666;
        overflow: hidden;//隐藏文字
        text-overflow: ellipsis;//显示...
        white-space: nowrap; //不换行
    }
    .song-play{
        position: absolute;
        top:0;
        right: 0.1rem;
        color: #fff;
        &-play{
            font-size: 0.22rem;
            vertical-align: middle;
        }
        &-icon{
            font-size: 0.22rem;
            vertical-align: middle;
        }
    }
}
</style>