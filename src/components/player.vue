<template>
    <div class="player" v-if="playlist.length>0">
        <transition name="mini">
            <div class="mini-player">
                <div class="icon">
                    <img :class="cdCls"  width="40" height="40" :src="currentSong.image" alt="">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control" @click.stop="togglePlaying">
                    <ProgressCircle :radius="radius" :percent="percent">
                        <i class="iconfont icon-mini" :class="miniIcon"></i>
                    </ProgressCircle>
                </div>
                <div class="control" @click.stop="showPlaylist">
                    <i class="iconfont icon-caidan1"></i>
                </div>
            </div>
        </transition>
        <playlist ref="playlist"></playlist>
        <audio ref="audio" autoplay @timeupdate="updateTime" @ended="end"></audio>
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
import ProgressCircle from '@/base_components/progress_circle';
import playlist from '@/base_components/playlist.vue';
export default {
    data() {
        return {
            duration: 0,
            url:'',
            currentTime:0,
            percent:0,
            radius: 32,
        }
    },
    created() {        
    },
    computed: {
        cdCls(){
            return this.playing ? 'play' : 'play pause';
        },
        miniIcon () {
            return this.playing ? 'icon-ziyuan' : 'icon-bofang1'
        },
        ...mapGetters([
            'currentSong',
            'playlist',
            'playing',
            'currentIndex'
        ])  
    },
    methods: {
        ...mapActions({
            setPlayingState:'SET_PLAYING_STATE',
            setCurrentIndex:'SET_CURRENT_INDEX',
        }),
        updateTime(e){
            this.currentTime = e.target.currentTime;
        },
        getMusicUrl(){
            if (!this.currentSong.id) {
                return false;
            }
            this.$get({
                url:'/api/song/url',
                data:{
                    id:this.currentSong.id
                }
            }).then((res)=>{
                if (res.code === 200) {
                    //this.$refs.audio.src =  res.data && res.data[0].url;
                    this.url = res.data && res.data[0].url;
                }
            })
        },
        togglePlaying(){
            const audio = this.$refs.audio;
            this.setPlayingState(!this.playing);
            this.playing ? audio.play() : audio.pause();
        },
        end(){
            this.next();
        },
        next(){
            console.log('end')
            let index = this.currentIndex+1;
            this.setCurrentIndex(index);
        },
        showPlaylist(){
            this.$refs.playlist.show();
        }
    },
    watch: {
        currentSong(newVal, oldVal){
            if (!newVal.id) {
                return
            }
            if (newVal.id === oldVal.id) {
                return
            }
            //this.$refs.audio.pause();
            //this.$refs.audio.currentTime = 0;  这里为什么找不到this.$refs.audio
            this.getMusicUrl();
        },
        url(newUrl){
            // 播放歌曲的url
            this.$refs.audio.src = newUrl;
            let polling = setInterval(() => {
                this.duration = this.$refs.audio.duration;
                if (this.duration) {
                    console.log(this.duration);
                    clearInterval(polling)
                }
            }, 150);
            // 改变播放的状态
            this.setPlayingState(true);
        },
        currentTime(){
            this.percent = this.currentTime / this.duration
        }
    },
    components:{
        ProgressCircle,
        playlist
    }
}
</script>
<style lang="scss" scoped>
.player{
    .mini-player{
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 1.2rem;
        background-color:#ff3a3a;
        .icon{
            flex: 0 0 0.8rem;
            padding: 0 0.2rem 0 0.4rem;
            img{
                border-radius: 50%;
                &.play{
                    animation: rotate 10s linear infinite
                }
                &.pause{
                    animation-play-state: paused
                }
            }
        };
        .text{
            flex: 1;
            flex-direction: column;
            justify-content: center;
            float: 1;
            .name{
                margin-bottom: 0.04rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 0.28rem;
                color: #fff;
            };
            .desc{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size:0.24rem;
                color: hsla(0,0%,100%,.3);
            }
        }
        .control{
            -webkit-box-flex: 0;
            -ms-flex: 0 0 0.6rem;
            flex: 0 0 0.6rem;
            padding: 0 0.2rem;
        }
    }
}
.icon-mini{
    font-size: 32px;
    position: absolute;
    left: 0;
    top: 0;
}
@keyframes rotate {
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>