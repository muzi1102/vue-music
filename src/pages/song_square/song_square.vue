<template>
    <div class="square">
        <mheader title="歌单广场">
            <span slot="left"  @click="backPre">
                <i class="iconfont icon-fanhui"></i>
            </span>
        </mheader>
        <div class="nav-group">
            <hscroll>
                <li class="nav-item" @click="getList(item.name)" v-for="(item,index) in myTag" :key="index">{{item.name}}</li>
            </hscroll>
        </div>
        <span class="change" @click="selectSongTag">
            <i class="iconfont icon-gengduo"></i>
        </span>
        <transition name="right">
            <song-tag @back="back" v-if="show"></song-tag>
        </transition>
    </div>
</template>
<script>
import hscroll from '@/base_components/horizontal-scroll.vue';
import songTag from './song_tag/song_tag.vue';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            tagFlag:false,
            show:false,
        }
    },
    components:{
        hscroll,
        songTag
    },
    computed: {
        ...mapGetters([
            'myTag'
        ])
    },
    created() {
        this.getList();
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
            // /personalized
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
            console.log(reqData);
            // this.getData();
        },
        getData(){

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