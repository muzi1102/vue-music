<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="header-placeholder wrapper" ref="wrapper">
            <ul class="content">
                <p v-for="(item,index) in list" :key="index">{{item}}</p>
            </ul>
        </div>
    </div>
</template>
<script>
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
import BScroll from 'better-scroll'
const MUSIC_RANK = [0, 1, 2, 3, 4, 55, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24,24,25,26,27,28,29,30];
const count = 4
export default {
    data() {
        return {
            list:[1,23,4,5,6,7,8,9,0,8,55,6,7,8],
            scrollInstance:"",
            offset:0
            // threshold:0,
            // moreTxt:'加载更多',
            // noMoreTxt:'没有更多数据了'
        }
    },
    components:{
        mheader,
        tab
    },
    created() {
        
    },
    mounted() {
        this._initScroll();
        this.getData();
    },
    methods: {
        _initScroll(){
            this.$nextTick(()=>{
                this.scrollInstance = new BScroll(this.$refs.wrapper,{
                    fade: true,
                    probeType:3,
                    pullUpLoad: {
                        threshold: 50,
                        moreTxt:'加载更多',
                        noMoreTxt:'没有更多数据了'
                    }
                });
                this.scrollInstance.on('pullingUp',(pos) => {
                    // if (pos.y > 50) {
                    //     this.loadData()
                    // }
                    this.getData();
                    // console.log('无限架子啊');
                    this.scrollInstance.finishPullUp();
              })
            })
        },
        getData(){
            const urls = MUSIC_RANK.slice(0,count);
            console.log(urls);
            // Promise.all()
        },
        getRank(){

        }
    }
}
</script>

<style scoped lang="scss">
p{
    height: 1rem;
    line-height: 1rem;
    background-color: salmon;
}
</style>