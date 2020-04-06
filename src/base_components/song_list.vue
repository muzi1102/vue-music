<template>
    <div class="song-list">
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