<template>
    <div>
        <hscroll>
            <li class="nav-item" v-for="(item,index) in navbar" :key="index">{{item}}</li>
        </hscroll>
    </div>
</template>
<script>
import hscroll from '@/base_components/horizontal-scroll.vue';
export default {
    data() {
        return {
            navbar:['推荐','官方','精选','欧美','电子','亲亲']
        }
    },
    components:{
        hscroll
    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
    .nav-item{
        float: left;
        width: 2rem;
    }
</style>