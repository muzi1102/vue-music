<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="header-placeholder wrapper" ref="wrapper">
            <ul class="scroll-container content" >
                <li v-for="(item,index) in singer" class="singer-group" ref="singerGroup" :key="index">
                    <h3 class="singer-group-title">{{item.title}}</h3>
                    <ul>
                        <li v-for="(singer,index) in item['items']" :key="index" class="singer-group-item">
                            <img :src="singer.picUrl" alt="avata">
                            <p>{{singer.name}}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="singer-shortcut">
            <ul>
                <li :class="{'active':currentIndex===index}" @click="changeSinger(index)" v-for="(item,index) in shortCut" :key="index">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-if="fixedTitle">
            <p class="title-fixed">{{fixedTitle}}</p>
        </div>
    </div>
</template>
<script>
import pinyin from "pinyin";
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
import BScroll from 'better-scroll'
// todo 滑动shortCut改变位置 过渡状态
export default {
    data(){
        return {
            singerGroupHeight:[],
            scrollY:-1,
            scrollInstance:'',
            currentIndex:0,
            singer:[],
            shortCut:['热','A','B','C','D','E','F','G','H','I','J','K','L','M','N','Q','R','S','T','V','W','X','Y','Z']
        }
    },
    components:{
        mheader,
        tab
    },
    created() {
        this.getSinger();
    },
    mounted() {
        this._initScroll();
        
    },
    computed: {
        fixedTitle(){
            if (this.scrollY > 0) {
                return ''
            }
            return this.shortCut[this.currentIndex];
        }
    },
    watch: {
        singer(){
            // 请求回来数据
            console.log(this.$refs.singerGroup);
            // 这里Event loop
            this.$nextTick(()=>{
                this._calculateHeight();
            });
        },
        scrollY(val){
            // 顶部
            if (val > 0) {
                this.currentIndex = 0
                return
            }
            for (let index = 0; index < this.singerGroupHeight.length; index++) {
                let height1 = this.singerGroupHeight[index]
                let height2 = this.singerGroupHeight[index + 1]
                if (-val >= height1 && -val < height2) {
                    this.currentIndex = index;
                    return
                }
            }
            // 获取当前的currentIndex
            // const fontSize = document.getElementsByTagName('html')[0].style.fontSize.replace(/\px/,'');
            // 判断当前的scrollY在singerGroupHeight什么区间
            // 1.4 * fontSize
        }
    },
    methods: {
        _calculateHeight(){
            // 每次计算之前把之前数据清空
            this.singerGroupHeight = [];
            let height = 0;
            const list = this.$refs.singerGroup;
            this.singerGroupHeight.push(height);
            for (let index = 0; index < list.length; index++) {
                let item = list[index]
                height += item.clientHeight
                this.singerGroupHeight.push(height);
            }
            console.log(this.singerGroupHeight);
        },
        _initScroll(){
            this.$nextTick(()=>{
                this.scrollInstance = new BScroll(this.$refs.wrapper,{
                    probeType:3
                });
                this.scrollInstance.on('scroll',this.scroll);
            })
        },
        scroll(pos){
            this.scrollY = pos.y
        },
        getSinger(){
            this.$get({
                url:'/api/top/artists?limit=100',
                data:{
                    keywords:this.keyword
                }
            }).then((res)=>{
                if (res.code === 200) {
                    var data = res.artists;
                    data.map((item)=>{
                        const py = pinyin(item.name[0],{style: pinyin.STYLE_FIRST_LETTER})[0][0].toUpperCase();
                        item.initial = py;
                    })
                    this.singer = this.formateSingerData(data);
                }
            })
        },
        changeSinger(index){
            // 这里存在问题，经过的时候中间经过的shortCut也会高亮
            this.currentIndex = index;
            const fontSize = document.getElementsByTagName('html')[0].style.fontSize.replace(/\px/,'');
            let count = 0,H=0;
            // 获取当前点击元素的高度
            for(var i = 0;i<index;i++){
                count += (this.singer[i].items.length)*1.4*fontSize;
                count += 0.5*fontSize;
            }
            this.scrollInstance.scrollTo(0,-count,500);
        },
        formateSingerData(data){
            let map = {
                hot: {
                    title: '热门',
                    items: []
                }
            }
            // 没有的key。添加key属性
            // 存在的key。push数据去key的属性
            data.forEach((item,index)=>{
                // 热门
                if (index<10) {
                    map.hot.items.push(item);
                }
                const key = item.initial;
                if (!map[key]) {
                    map[key] = {
                        title:key,
                        items:[]
                    }
                }
                map[key].items.push(item);
            })
            // map的排序
            let hot = [];
            let ret = [];
            for(const key in map){
                let val = map[key];
                if (val.title.match(/[A-Z]/)) {
                    ret.push(val);
                } else if (val.title === '热门') {
                    hot.push(val);
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            })
            return hot.concat(ret);
        }
    },
}
</script>
<!-- -->
<style  lang="scss"  scoped>
@import '@/assets/css/border.scss'; 
.singer-shortcut{
    position: fixed;
    z-index: 30;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 0.4rem;
    margin-top: 0.8rem;
    // padding: 200px 0;
    // border-radius: 3px;
    text-align: center;
    li{
        padding: 0.1rem;
        line-height: 1;
        color: #757575;
        font-size: 0.22rem;
        font-weight: 700;
        &.active{
            color: red;
        }
    }
}
.scroll-container{
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 0ms
}
.singer{
    &-group{
        // padding: 0.1rem 0;
        &-title{
            height: 0.5rem;
            line-height: 0.5rem;
            padding-left: 0.4rem;
            font-size: 0.24rem;
            color: #333;
            // ???这里的高度是什么原因
            // margin-bottom: 0.15rem;
            background-color: violet;
        }
        &-item{
            margin: 0 0.1rem;
            padding: 0.2rem 0;
            display: flex;
            align-items: center;
            @include border-bottom(#EEEFF3);
            img{
                width: 1rem;
                height: 1rem;
                border-radius: 0.06rem
            }
            p{
                flex: 1;
                margin-left: 0.4rem;
                color: #2e3030;
                font-size: 0.28rem;
            }
        }
    }
}
.list-fixed{
    position: absolute;
    left: 0;
    width: 100%;
    top: 1.6rem;
    p{
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 0.4rem;
        font-size: 0.24rem;
        background: red;
    }
}
</style>