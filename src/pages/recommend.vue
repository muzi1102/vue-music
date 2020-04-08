<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="banner" v-if="bannerList.length>0">
            <!-- <banner>
                <div v-for="(item,index) in bannerList" :key="index">
                    <a :href="item.url">
                        <img :src="item.pic" alt="">
                    </a>
                </div>
            </banner> -->
        </div>
        <div class="recommend-list">
            <div class="title">
                <h4>为你精挑细选</h4>
                <span>查看更多</span>
            </div>
            <div class="recommend-slider-group">
                <div class="recommend-slider" ref="recommendSlider">
                    <ul class="recommend-slider-content" ref="recommendSliderContent">
                        <li class="item">1</li>
                        <li class="item">2</li>
                        <li class="item">3</li>
                        <li class="item">4</li>
                        <li class="item">5</li>
                        <li class="item">6</li>
                    </ul>
                </div>
            </div>
            
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
import BScroll from 'better-scroll';
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
        setTimeout(() => {
            this.initScrollY();
        }, 20);
    },
    methods: {
        initScrollY(){
            this._initWidth();
            this._initSlider();
        },
        _initWidth(){
            let width = 0;
            this.children = this.$refs.recommendSliderContent.children;
            width = this.children[0].clientWidth * this.children.length + 50;
            this.$refs.recommendSliderContent.style.width = width + 'px';
        },
        _initSlider(){
            this.scroll = new BScroll(this.$refs.recommendSlider,{
                scrollX: true,
                snap: {
                    threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
                    speed: 400 // 切换动画时长 400ms
                },
                click:true
            })
        },
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
.recommend-list{
    .title{
        height: 1rem;
        line-height: 1rem;
        font-size:0.28rem;
        color: #2e3030;
        display: flex;
        padding: 0 0.2rem;
        align-items: center;
        h4{
            flex: 1;
        }
    }
    .recommend-slider-group{
        padding: 0 0.2rem;
    }
    .recommend-slider{
        position: relative;
        width: 100%;
        overflow: hidden;
        &-content{
            // display: flex;
            // flex-wrap: no-wrap;
            // width: 2000px;
            .item{
                width: 2rem;
                height: 1.5rem;
                margin-bottom: 0.2rem;
                margin-right: 0.2rem;
                background: chocolate;
                float: left;
                // box-sizing: border-box;
                &:last-child{
                    margin-right: 0rem;
                }
            }
        }
    }
}
</style>