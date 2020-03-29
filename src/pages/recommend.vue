<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="banner">
            banner
        </div>
        <div class="recommend-list">
            <h4>推荐歌单</h4>
        </div>
        <div class="recommend-new">
            推荐新音乐
        </div>
        <div class="recommend-dj">
            推荐电台
        </div>
    </div>
</template>
<script>
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
export default {
    components:{
        mheader,
        tab
    }
}
</script>
<style scoped></style>