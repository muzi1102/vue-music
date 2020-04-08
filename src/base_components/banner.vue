<template>
<div class="slider" ref="slider">
    <div class="slider-content" ref="sliderContent">
        <slot></slot>
    </div>
    <div class="dots">
        <span class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{active: currentPageIndex === index}"></span>
   </div>
</div>
</template>
<script>
import {addClass} from '@/assets/js/dom.js';
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            dots: [],
            currentPageIndex:0
        }
    },
    props:{
        loop:{
            type: Boolean,
            default: true
        },
        autoPlay:{
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    mounted() {
        setTimeout(() => {
            this._initDots();
            this.setSliderWidth();
            this.initSlider();
            if (this.autoPlay) {
                this._play();
            }
            // this._onScrollEnd();
        }, 20);
    },
    methods: {
        _initDots() { // 初始化点的数量
            this.dots = new Array(this.children.length) // 长度根据节点length
        },
        _onScrollEnd(){
            let pageIndex = this.slider.getCurrentPage().pageX;
            this.currentPageIndex = pageIndex // 赋值给当前currentPageIndex
            if (this.autoPlay) { // 判断如果是自动轮播
                clearTimeout(this.timer)
                this._play()
            }
        },
        _play(){
            this.timer = setTimeout(() => {
                this.slider.next();
            }, this.interval);
        },
        setSliderWidth(isResize){
            this.children = this.$refs.sliderContent.children;
            let width = 0;
            // 设备屏幕的宽度
            let sliderWidth = this.$refs.slider.clientWidth;
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;
            }
            if (this.loop && !isResize) {
                width += 2 * sliderWidth;
            }
            this.$refs.sliderContent.style.width = width + 'px';
        },
        initSlider(){
            this.slider = new BScroll(this.$refs.slider,{
                scrollX: true,
                startX:0,
                momentum: false,
                snap: {
                    loop: this.loop, // 开启循环播放
                    threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
                    speed: 400 // 切换动画时长 400ms
                },
                click:true
            });
            this.slider.on('scrollEnd',this._onScrollEnd);
        }
    },
}
</script>

<style lang="scss" scoped>
.slider-content{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a{
            display: block;
            width: 100%;
            overflow: hidden;
            text-decoration: none;
            img{
                display: block;
                width: 100%;
            }
        }
    }
}
</style>