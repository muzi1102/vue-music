<template>
    <div class="album">
        <section class="album-header">
            <div class="album-header-wrap">
                <div class="album-header-left"></div>
                <div class="album-header-right">
                    <h3>{{albumInfo.name}}</h3>
                    <p>歌手：{{albumInfo.artist.name}}</p>
                    <p>发行时间:{{albumInfo.publishTime}}</p>
                </div>
            </div>
        </section>
        <section class="album-intro">
            <p v-text="albumInfo.description"></p>
        </section>
        <section class="album-list">
            <h3>歌曲列表</h3>
            <searchItem @itemEvent=itemEvent :cellData = songs iconFtType="play">
                <template v-slot:item="{ row }">
                    <div>
                        <p>{{row.name}}</p>

                    </div>
                </template>
            </searchItem>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id:'',
            albumInfo:{},
            songs:[]
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getAlbum();
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
    }
}
</style>