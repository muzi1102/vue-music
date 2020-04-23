<template>
    <div class="album">
        <section class="album-header">
            <div class="album-header-bg">
                <div class="album-header-wrap">
                    <div class="album-header-left">
                        <img :src="albumInfo.blurPicUrl" alt="">
                    </div>
                    <div class="album-header-right">
                        <h3>{{albumInfo.name}}</h3>
                        <p>歌手：{{albumInfo.artist.name}}</p>
                        <p>发行时间:{{albumInfo.publishTime}}</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="album-intro">
            <p class="album-intro-txt" v-text="albumInfo.description"></p>
        </section>
        <section class="album-list">
            <h3 class="title">歌曲列表</h3>
            <div class="album-list-songs">
                <searchItem @itemEvent=itemEvent :cellData = songs iconFtType="play">
                    <template v-slot:item="{ row }">
                        <div>
                            <p>{{row.name}}</p>

                        </div>
                    </template>
                </searchItem>
            </div>
        </section>
        <section class="album-comments">
            <h3 class="title">精彩评论</h3>
            <comments :comments="hotComments">
                <template v-slot:hd="{ row }">
                    <div class="avatar">
                        <img :src="row.avatarUrl" alt="">
                    </div>
                </template>
                <template v-slot:bd="{ row }">
                    <div class="content">
                        <div>
                            {{row.name}}
                            {{row.user.nickname}}
                            {{row.time}}
                        </div>
                        <p>{{row.content}}</p>
                    </div>
                </template>
            </comments>
            <h3 class="title">最新评论({{comments.length}})</h3>
            <comments :comments="comments">
                <template v-slot:hd="{ row }">
                    <div class="avatar">
                        <img :src="row.avatarUrl" alt="">
                    </div>
                </template>
                <template v-slot:bd="{ row }">
                    <div class="content">
                        <div>
                            {{row.name}}
                            {{row.user.nickname}}
                            {{row.time}}
                        </div>
                        <p>{{row.content}}</p>
                    </div>
                </template>
            </comments>
        </section>
    </div>
</template>

<script>
import comments from '@/components/comments.vue';
export default {
    data() {
        return {
            id:'',
            albumInfo:{},
            songs:[],
            comments:[],
            hotComments:[]
        }
    },
    components:{
        comments
    },
    created() {
        this.id = this.$route.params.id;
        this.getAlbum();
        this.getComments();
    },
    methods: {
        itemEvent(){},
        getAlbum(){
            this.$ajax({
                url:'/api/album',
                type:'get',
                data:{
                    id:this.id
                }
            }).then((res)=>{
                if (res.code === 200) {
                    this.albumInfo = res.album;
                    this.songs = res.songs;
                    this.songs.forEach((item)=>{
                        item.artists = item.ar;
                    })
                }
            });
        },
        getComments(){
            this.$ajax({
            url:'/api/comment/album',
            type:'get',
            data:{
                id:this.id
            }
            }).then((res)=>{
                if (res.code === 200) {
                    this.comments = res.comments;
                    this.hotComments = res.hotComments;
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.album{
    background-color: #f8f8f8;
    height: 100%;
    &-header{
        position: relative;
        padding: 30px 10px 30px 15px;
        overflow: hidden;
        &-wrap{
            display: flex;
        }
        &-left{
            width: 126px;
            height: 126px;
            img{
                height: 100%;
                width: 100%;
            }
        }
        &-right{
            flex:1;
            margin-left: 26px;
            // color: hsla(0,0%,100%,.5);
        }
        // &-bg{
        //     position: absolute;
        //     left: 0;
        //     top: 0;
        //     right: 0;
        //     bottom: 0;
        //     z-index: 1;
        //     background-repeat: no-repeat;
        //     background-size: cover;
        //     background-position: 50%;
        //     -webkit-filter: blur(20px);
        //     filter: blur(20px);
        //     -webkit-transform: scale(1.5);
        //     -ms-transform: scale(1.5);
        //     transform: scale(1.5);
        // }
    }
    &-intro{
        padding: 10px 10px 0 15px;
        background-color: #fff;
        &-txt{
            position: relative;
            padding-bottom: 18px;
            line-height: 19px;
            color: #666;
        }
    }
    &-list{
        .title{
            height: 23px;
            line-height: 23px;
            padding: 0 10px;
            font-size: 12px;
            color: #666;
            background-color: #eeeff0;
        }
        &-songs{
            background-color: #fff;
        }
    }
    &-comments{
        .title{
            height: 23px;
            line-height: 23px;
            padding: 0 10px;
            font-size: 12px;
            color: #666;
            background-color: #eeeff0;
        }
        .avatar{
            margin:0 0.2rem;
            width: 0.6rem;
            height: 0.6rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .content{
            padding-top: 0.2rem;
        }
    }
}
</style>