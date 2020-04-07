<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper"  @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="iconfont" :class="iconMode" @click="changeMode"></i>
                        <span class="text">
                            {{modeText}}
                        </span>
                        <span  class="clear" @click="showConfirm">
                            <i class="iconfont icon-qingchu"></i>
                        </span>
                    </h1>
                </div>
                <scroll :data="sequenceList" ref="listContent" class="list-content" >
                    <transition-group ref="list" name="list" tag="ul">
                        <li class="item" ref="listiten"
                            @click="selectItem(item, index)"
                            v-for="(item, index) in sequenceList" :key="item.id">
                            <i class="current iconfont" :class="getCurrentIcon(item)"></i>
                            <span class="text">{{item.name}}</span>
                            <span @click.stop="toggleFavorite(item)" class="like">
                                <i class="iconfont" :class="getFavoriteIcon(item)"></i>
                            </span>
                            <span class="delete" @click.stop="deleteOne">
                                <i class="iconfont icon-qingchu"></i>
                            </span>
                        </li>
                    </transition-group>
                </scroll>
                <div  @click="hide" class="list-close">
                    <span>关闭</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import scroll from '@/base_components/scroll.vue';
import {mapGetters,mapActions,mapMutations} from 'vuex';
import {shuffle} from '@/assets/js/utils.js';
export default {
    data() {
        return {
            showFlag:false,
        }
    },
    components:{
        scroll
    },
    computed: {
        ...mapGetters([
            'sequenceList',
            'mode',
            'currentSong',
            'favoriteList'
        ]),
        iconMode(){
            return this.mode === 0 ? 'icon-sequence' : this.mode === 1 ? 'icon-icon_loop' : 'icon-random'
        },
        modeText(){
            return this.mode === 0 ? '顺序播放':this.mode === 1 ? '循环播放':'随机播放';
        }
    },
    methods: {
        ...mapActions({
            setPlayMode:'SET_PLAY_MODE',
            saveFavoriteList:'saveFavoriteList'
        }),
        ...mapMutations({
            setPlaylist:'SET_PLAYLIST'
        }),
        toggleFavorite(song){
            this.saveFavoriteList(song);
        },
        getFavoriteIcon(song){
            if (this.isFavorite(song)) {
                return 'icon-xihuanfill';
            }
            return 'icon-xihuan';
        },
        isFavorite(song){
            const index = this.favoriteList.length>0 && this.favoriteList.findIndex((item) => {
                return item.id === song.id;
            })
            return index > -1;
        },
        hide(){
            this.showFlag = false;
        },
        show(){
            this.showFlag = true;
            // 在播放的歌曲滚动到相应的位置
            // this.$nextTick(()=>{
            //     this.$refs.listContent.refresh();
            //     this.scrollToCurrent(this.currentSong);
            // });
            setTimeout(() => {
                console.log()
                // console.log(this.$refs.listContent);
                this.$refs.listContent.refresh();
                // this.scrollToCurrent(this.currentSong);
            }, 200);
        },
        selectItem(){
            console.log(1);
        },
        scrollToCurrent(current){
            const index = this.sequenceList.findIndex((song)=>{
                return current.id === song.id;
            });
            // 这里为什么报错？？？
            // this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index],300);
        },
        getCurrentIcon(item){
            if (this.currentSong.id === item.id) {
                return 'icon-bofang1'
            }
            return '';
        },
        deleteOne(){},
        changeMode(){
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            // 打乱播放顺序；
            let list = null;
            if (mode === 2) {
                list = shuffle(this.sequenceList);
            }else{
                list = this.sequenceList;
            }
            this.resetCurrentIndex(list);
            this.setPlaylist(list);
        },
        resetCurrentIndex(list){
            
        },
        showConfirm(){
            console.log(11);
        }
    },
}
</script>
<style lang="scss" scoped>
    .playlist{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: rgba(0,0,0,.3);
        &.list-fade-enter-active,&.list-fade-leave-active{
            transition: opacity 0.3s;
            .list-wrapper{
                transition: all 0.3s
            }
        }
        &.list-fade-enter,&.list-fade-leave{
            opacity: 0;
            .list-wrapper{
                transform: translate3d(0,100%,0);
            }
        }
        .list-wrapper{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            border-radius:0.16rem;
            background-color: pink;
            .list-header{
                position: relative;
                padding: 0.4rem 0.6rem 0.2rem 0.4rem;
                .title{
                    display: flex;
                    align-content: center;
                    .iconfont{
                        margin-right: 0.2rem;
                        font-size: 0.6rem;
                    }
                }
                .text{
                    flex:1;
                }
            }
            .list-content{
                max-height: 4.8rem;
                overflow: hidden;
                .item{
                    display: flex;
                    align-items: center;
                    height: 0.8rem;
                    padding: 0 0.6rem 0 0.4rem;
                    overflow: hidden;
                    .text{
                        flex: 1;
                    }
                    .like{
                        margin-right: 0.2rem;
                        font-size: 0.5rem;
                    }
                    .iconfont{
                        font-size: 0.42rem;
                    }
                }

            }
            .list-close{
                text-align: center;
                line-height: 1rem;
                background: #222;
                font-size: 0.32rem;
                color: #fff;
            }
        }
    }
</style>