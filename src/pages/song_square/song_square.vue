<template>
    <div class="square">
        <mheader title="歌单广场">
            <span slot="left"  @click="backPre">
                <i class="iconfont icon-fanhui"></i>
            </span>
        </mheader>
        <div class="nav-group">
            <hscroll :data="myTag">
                <li class="nav-item" @click="getList(item.name)" v-for="(item,index) in myTag" :key="index">{{item.name}}</li>
            </hscroll>
            <span class="change" @click="selectSongTag">
                <i class="iconfont icon-gengduo"></i>
            </span>
        </div>
        <div class="square-content">
            <song-item :list="songList"></song-item>
        </div>
        <transition name="right">
            <song-tag @back="back" v-if="show"></song-tag>
        </transition>
    </div>
</template>
<script>
import hscroll from '@/base_components/horizontal_scroll.vue';
import songItem from '@/base_components/song_item.vue';
import songTag from './song_tag/song_tag.vue';
import {mapGetters} from 'vuex';
// import 'swiper/css/swiper.css';
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data() {
        return {
            tagFlag:false,
            show:false,
            bannerStack:[],
            currentNav:'推荐',
            songList:[]
            // size:[
            //     {"top":60,"left":0,"width":200,"height":100,"zIndex":1,"opacity":0,"background":'red'},
            //     {"top":60,"left":0,"width":200,"height":100,"zIndex":2,"opacity":40,"background":'pink'},
            //     {"top":30,"left":150,"width":300,"height":140,"zIndex":3,"opacity":70,"background":'blue'},
            //     {"top":0,"left":300,"width":400,"height":180,"zIndex":4,"opacity":100,"background":'yellow'},
            //     {"top":30,"left":550,"width":300,"height":140,"zIndex":3,"opacity":70,"background":'green'},
            //     {"top":60,"left":800,"width":200,"height":100,"zIndex":2,"opacity":40,"background":'black'},
            //     {"top":60,"left":800,"width":200,"height":100,"zIndex":1,"opacity":0,"background":'orange'}
            // ]
        }
    },
    components:{
        hscroll,
        songTag,
        songItem
    },
    computed: {
        ...mapGetters([
            'myTag'
        ])
    },
    created() {
        this.getList('推荐');
    },
    methods: {
        selectSongTag(){
            this.show = true;
        },
        back(show){
            this.show = show;
        },
        backPre(){
            this.$router.back(-1);
            // this.$router.go(-1)
        },
        getList(cat){
            this.currentNav = cat;
            let reqData = {
                url:'/api/playlist/hot',
                data:{
                    limit:10
                }
            }
            switch(cat){
                case '推荐':
                    Object.assign(reqData,{
                        url:'/api/personalized'
                    });
                    break;
                case '精品':
                    Object.assign(reqData,{
                        url:'/top/playlist/highquality'
                    });
                    break;
                default:
                    Object.assign(reqData,{
                        data:{
                            cat:cat
                        }
                    })
                    break;
            }
            // console.log(reqData);
            this.getData(reqData).then((res)=>{
                if (res.code === 200) {
                    if (cat === '推荐') {
                        this.bannerStack = res.result.slice(0,3);
                    }
                    this.songList = res.result;
                }
            })
        },
        getData(reqData){
            return new Promise((resolve,reject)=>{
                this.$get({
                    url:reqData.url,
                    data:reqData.data
                }).then((res)=>{
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                })
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.nav-item{
    float: left;
    width: 2rem;
    padding: 0.2rem 0 ;
    background-color: cyan;
    text-align: center;
}
.square{
    position: relative;
}
span.change{
    position: absolute;
    right: 0;
    top: 0.8rem;
    i{
        font-size: 0.6rem;
        z-index: 10;
        background-color: #fff;
    }
}
.tag{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
}
.right-enter,.right-leave-to{
    transform: translate3d(100%, 0, 0);
}
.right-leave,.right-enter-to{
    transform: translate3d(0, 0, 0)
}
.right-enter-active,.right-leave-active{
    transition:all .3s;
}
</style>