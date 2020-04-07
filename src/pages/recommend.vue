<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="banner" v-if="bannerList.length>0">
            <banner>
                <div v-for="(item,index) in bannerList" :key="index">
                    <a :href="item.url">
                        <img :src="item.pic" alt="">
                    </a>
                </div>
            </banner>
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
        <router-view></router-view>
    </div>
</template>
<script>
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
import banner from '@/base_components/banner.vue';
export default {
    data() {
        return {
            bannerList:[],
        }
    },
    components:{
        mheader,
        tab,
        banner
    },
    created() {
        this.getBannerData();
    },
    methods: {
        getBannerData(){
            this.$get({
                url:'/api/banner',
                data:{
                    type:2
                }
            }).then((res)=>{
                if (res.code === 200) {
                    this.bannerList = res.banners;
                }
            })
        },
        more(id){
            this.$router.push({
                path: `/recommend/${id}`
            })
        }
    },
}
</script>
<style scoped lang="scss">
.banner{
    position: relative;
    width: 100%;
    overflow: hidden;
}
</style>