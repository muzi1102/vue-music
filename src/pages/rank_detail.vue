<template>
    <transition name="slide">
        <musicList :title="title" :bgImage="bgImage" :songs="songs"></musicList>
    </transition>
</template>
<script>
import musicList from '@/components/music_list.vue';
import {mapGetters} from 'vuex';
import {createSong} from '@/assets/js/song';
export default {
    data() {
        return {
            songs:[]
        }
    },
    created() {
        // mapGetters和create谁先执行
        this._getMusicList()
    },
    computed: {
        title(){
            return this.rankList.name;
        },
        bgImage(){
            return this.rankList.coverImgUrl;
        },
        ...mapGetters([
            'rankList'
        ])
    },
    components:{
        musicList
    },
    methods: {
        _getMusicList(){
            if (!this.rankList.id) {
                this.$router.push('/rank');
                return;
            }
           this._normalizeSongs(this.rankList.tracks);
       },
       _normalizeSongs(list){
            let ret = []
            list.forEach((item)=>{
                ret.push(createSong(item))
            })
            this.songs = ret;
       }
    },
}
</script>
<style lang="scss" scoped>

.slide-enter-active, .slide-leave-active{
    transition: all 0.3s
}
.slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
}
    
</style>