<template>
    <div class="song-list">
        <div class="sequence-play">
            <i class="iconfont icon-bofang1"></i>
            <span>播放全部</span>
        </div>
        <ul>
            <li @click="selectItem(song, index)"  class="item" v-for="(song, index) in songs" :key="index">
                <p class="order">{{index+1}}</p>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props:{
        songs: {
            type: Array,
            default: []
        },
    },
    methods: {
        getDesc(song){
            return `${song.singer}·${song.album}`
        },
        selectItem(item, index){
            this.$emit('select',item,index);
        }
    },
}
</script>

<style lang="scss" scoped>
    .song-list{
        border-radius: .2rem;
        position: relative;
        padding-top: 0.8rem;
        background: #f2f3f4;
        top: -0.4rem;
        .sequence-play{
            position: absolute;
            top: 0;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            height: 0.8rem;
            padding-left: 0.32rem;
            border-bottom: 1px solid #e4e4e4;
        }
        .item{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 1.28rem;
            .order{
                -ms-flex: 0 0 1rem;
                flex: 0 0 1rem;
                width: 1rem;
                text-align: center;
                color: #757575;
            }
            .content{
                flex: 1;
                line-height: 0.4rem;
                overflow: hidden;
            }
        }
    }
</style>