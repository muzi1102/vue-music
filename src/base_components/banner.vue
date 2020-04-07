<template>
<div class="slider" ref="slider">
    <div class="slider-content" ref="sliderContent">
        <slot></slot>
    </div>
</div>
</template>
<script>
import {addClass} from '@/assets/js/dom.js';
import BScroll from 'better-scroll'
export default {
    data() {
        return {
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
            default: 1000
        }
    },
    mounted() {
        setTimeout(() => {
            this.setSliderWidth();
            this.initSlider();
            // if (this.autoPlay) {
            //     this._play();
            // }
            this._onScrollEnd();
        }, 20);
    },
    methods: {
        _onScrollEnd(){
            let pageIndex = this.slider.getCurrentPage();
            console.log(pageIndex)
        },
        _play(){
            // let pageIndex = this.currentPageIndex + 1;
            // if (this.loop) {
            //     pageIndex += 1;
            // }
            // this.timer = setTimeout(() => {
            //     this.slider.goToPage(pageIndex, 0, 400)
            // }, this.interval);
        },
        setSliderWidth(isResize){
            this.children = this.$refs.sliderContent.children;
            console.log(this.children);
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
                momentum: false,
                snap: {
                    loop: this.loop, // 开启循环播放
                    // stepX: 200, // 每页宽度为 200px
                    // stepY: 100, // 每页高度为 100px
                    threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
                    speed: 400 // 切换动画时长 400ms
                },
                // snap: true,
                // snapLoop: true,
                // snapThreshold: 0,
                // snapSpeed: 400,
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