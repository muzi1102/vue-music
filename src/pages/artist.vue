<template>
    <div class="artist">
        <div class="hd"></div>
        <h2 class="title">歌手简介</h2>
        <div class="intro" v-if="briefDesc">
            <p :class="{'thide3':moreInfoFlag}">{{briefDesc}}</p>
            <div class="full" @click="toggleMoreInfo">
                {{btnMsg}}
                <i class="iconfont icon-down2" :class="{'icon-up':moreInfoFlag}"></i>
            </div>
        </div>
        <div v-else>
            暂无信息
        </div>
        <h2 class="title mgt8">热门歌曲</h2>
        <div class="hot-song">
            <searchItem @itemEvent=itemEvent :cellData = hotSongs iconFtType="play">   
                <template v-slot:item="{ row }">
                    <div>
                        <p>{{row.name}}</p>
                        <p>
                            <span>{{row.ar[0].name}}</span>
                                -
                            <span>{{row.al.name}}</span>
                        </p>
                    </div>
                </template>
            </searchItem>
        </div>
    </div>
</template>
<script>
import searchItem from '@/components/search_item.vue';
export default {
    data() {
        return {
            id:'',
            briefDesc:'',
            btnMsg:'完整歌手介绍',
            hotSongs:[],
            moreInfoFlag:true
        }
    },
    components:{
        searchItem
    },
    created() {
        this.id = this.$route.params.id;
        this.getArtist();
        this.hotSong();
    },
    methods: {
        toggleMoreInfo(){
            this.moreInfoFlag = !this.moreInfoFlag;
            this.btnMsg = this.moreInfoFlag?'完整歌手介绍':'收起';
        },
        itemEvent(){},
        hotSong(){
            this.$ajax({
                url:'/api/artist/top/song',
                type:'get',
                data:{
                    id:this.id,
                    limit:5
                }
            }).then((res)=>{
                if (res.code === 200) {
                    this.hotSongs = res.songs.slice(0,5);
                    console.log(this.hotSongs);
                }
            })
        },
        getArtist(){
            this.$ajax({
                url:'/api/artist/desc',
                type:'get',
                data:{
                    id:this.id
                }
                }).then((res)=>{
                if (res.code === 200) {
                    this.briefDesc = res.briefDesc;
                }
            });
        }
    },
}
</script>
<style lang="scss" scoped>
.artist{
    background-color: #fcfcfd;
    .hd{
        height: 2rem;
        background-color: blue;
    }
    .intro{
        background: #fff;
        padding: 0 16px 18px;
        color: #666;
        font: 14px/1.5 Helvetica,sans-serif,STHeiTi;
        .thide3{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;    
        }
        .full{
            font-size: 14px;
            color: #666;
            text-align: center;
            margin-top: 25px;
        }
    }
    .title{
        position: relative;
        font-size: 18px;
        z-index: 2;
        margin-top: -5px;
        padding: 15px;
        background: #fff;
        font-weight: 700;
    }
}
.mgt8{
    margin-top: 0.16rem!important
}
</style>