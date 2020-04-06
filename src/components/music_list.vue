<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="iconfont icon-back"><</i>
        </div>
        <h4 class="title">{{title}}</h4>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
              <div ref="playBtn" class="play" @click="random">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
              </div>
            </div>
        </div>
        <scroll 
            :data="songs"
            @scroll="scroll"
            :listenScroll="true"
            :click="true"
            :probe-type="3"
            class="list"
            ref="list"
        >
            <div class="song-list-wrapper">
                <songList :songs="songs"  @select="selectItem"></songList>
            </div>
        </scroll>
    </div>
</template>
<script>
import scroll from '@/base_components/scroll.vue';
import songList from '@/base_components/song_list.vue';
import {mapActions} from 'vuex';
export default {
    data(){
        return{

        }
    },
    props:{
        title:{
            type:String,
            default:'歌单'
        },
        bgImage: {
            type: String,
            default: ''
        },
        songs: {
            type: Array,
            default: []
        },
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    components:{
        scroll,
        songList
    },
    created() {
        
    },
    mounted() {
        // why
        this.imageHeight = this.$refs.bgImage.clientHeight;
        this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
        scroll(){

        },
        back(){
            // 这2个东西的区别
            // this.$router.back()
            this.$router.go(-1);
        },
        random(){
        },
        selectItem(item, index){
            this.selectPlay({
                list: this.songs,
                index
            })
        },
        ...mapActions([
            'selectPlay'
        ])
    },
    
}
</script>
<style lang="scss" scoped>
.music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #F2F3F4;
    .title{
        position: absolute;
        top:0;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.36rem;
        width: 80%;
        text-overflow: ellipsis;
        left:10%;
        z-index:40;
        color:#fff;
    }
    .bg-image{
        padding-top: 70%;
        position: relative;
        width: 100%;
        height: 0;
        background-size: cover;
    }
    .back{
        position: absolute;
        top:0;
        left:0.18rem;
        z-index: 50;
    }
    .icon-back{
        display: block;
        padding: 0.22rem;
        font-size: 0.44rem;
        color: #ffcd32;
    }
    .play-wrapper{
        position: absolute;
        bottom: 0.4rem;
        z-index: 50;
        width: 100%;
        .play{
            box-sizing: border-box;
            width: 135px;
            padding: 7px 0;
            margin: 0 auto;
            text-align: center;
            border: 1px solid #ffcd32;
            color: #ffcd32;
            border-radius: 100px;
            font-size: 0;
        }
        .text{
            display: inline-block;
            vertical-align: middle;
            font-size: 0.24rem;
        }
    };
    .list{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
    }
}
</style>