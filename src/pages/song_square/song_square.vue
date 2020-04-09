<template>
    <div class="square">
        <div class="nav-group">
            <hscroll>
                <li class="nav-item" v-for="(item,index) in navbar" :key="index">{{item}}</li>
            </hscroll>
        </div>
        <span class="change" @click="selectSongTag">
            <i class="iconfont icon-caidan1"></i>
        </span>
        <router-view></router-view>
    </div>
</template>
<script>
import hscroll from '@/base_components/horizontal-scroll.vue';
export default {
    data() {
        return {
            tagFlag:false,
            navbar:['推荐','官方','精选','欧美','电子','亲亲']
        }
    },
    components:{
        hscroll
    },
    methods: {
        selectSongTag(){
            this.$router.push({
                path:'/tag'
            });
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
        top: 0;
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
</style>