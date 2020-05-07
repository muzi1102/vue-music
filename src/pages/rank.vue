<template>
    <div>
        <div class="header-placeholder wrapper" >
            <scroll ref="wrapper" :data="musicRankList">
                <ul class="content">
                    <li class="item" v-for="(item,index) in musicRankList" :key="index" @click="selectRank(item)">
                        <div class="item-cover">
                            <img :src="item.coverImgUrl" alt="">
                        </div>
                        <ul class="song-list">
                            <li v-for="(song,index) in item.top" :key="index">
                                {{index+1}}.{{song.name}}-{{song.ar[0] && song.ar[0].name}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </scroll>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import {mapActions} from 'vuex'
const MUSIC_RANK = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24,24,25,26,27,28,29,30];
let count = 10;
let start = 0;
export default {
    data() {
        return {
            scrollInstance:"",
            offset:0,
            musicRankList:[],
            // musicRankTopThreeList:[]
        }
    },
    components:{
    },
    created() {
        start = 0;
        this.getData();
    },
    mounted() {
        setTimeout(() => {
           this._initScroll(); 
        }, 20);
        
    },
    methods: {
        _initScroll(){
            this.$nextTick(()=>{
                this.scrollInstance = new BScroll(this.$refs.wrapper,{
                    fade: true,
                    probeType:3,
                    click:true,
                    pullUpLoad: {
                        threshold: 50,
                        moreTxt:'加载更多',
                        noMoreTxt:'没有更多数据了'
                    }
                });
                this.scrollInstance.on('pullingUp',(pos) => {
                    if (start>MUSIC_RANK.length) {
                        return false;
                    }else{
                        start += count;
                    }
                    this.getData();
                    this.scrollInstance.finishPullUp();
                })
            });
            
        },
        getData(){
            const urls = MUSIC_RANK.slice(start,count+start);
            const loads = urls.map(idx=>{
                return this.$get({
                    url:'/api/top/list',
                    data:{
                        idx:idx
                    }
                })
            })
            Promise.all(loads).then((res)=>{
                const listArr = res;
                for(var i=0;i<listArr.length;i++){
                    let list = listArr[i].playlist;
                    list.top = listArr[i].playlist.tracks.slice(0, 3);
                    this.musicRankList.push(list);
                    // console.log(listArr[i].playlist.tracks.slice(0,3))
                    // this.musicRankTopThreeList.(listArr[i].playlist.tracks.slice(0,3));
                    // this.musicRankTopThreeList.push(listArr[i].playlist.tracks && listArr[i].playlist.tracks.slice(0,3));
                }
            })
        },
        selectRank(item){
            this.$router.push({
                path: `/rank/id/${item.id}`
            });
            this.setRankList(item);
        },
        ...mapActions({
            setRankList:'SET_RANK_LIST'
        })
    }
}
</script>

<style scoped lang="scss">
.item{
    display: flex;
    margin: 0 0.2rem;
    padding: 0.06rem 0;
    height: 2rem;
    border-bottom: 1px solid #e4e4e4;
    &-cover{
        width: 1.8rem;
        height: 1.8rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .song-list{
        flex: 1;
        padding-left: 0.4rem;
        li{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            line-height: 0.6rem;
        }
    }
}
</style>