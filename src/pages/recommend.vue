<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="banner">
            banner
        </div>
        <div class="recommend-list">
            <h4>推荐歌单</h4>
            <button @click="more(1)">guess</button>
        </div>
        <div class="recommend-new">
            推荐新音乐
        </div>
        <div class="recommend-dj">
            推荐电台
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
export default {
    components:{
        mheader,
        tab
    },
    methods: {
        more(id){
            this.$router.push({
                path: `/recommend/${id}`
            })
        }
    },
}
</script>
<style scoped></style>