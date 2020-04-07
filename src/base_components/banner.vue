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
            default: 3000
        }
    },
    mounted() {
        setTimeout(() => {
            this.setSliderWidth();
            this.initSlider();
            if (this.autoPlay) {
                this._play();
            }
        }, 20);
    },
    methods: {
        _play(){

        },
        setSliderWidth(){
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
            this.$refs.sliderContent.style.width = width + 'px';
        },
        initSlider(){
            this.slider = new BScroll(this.$refs.slider,{
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop:this.loop,
                    threshold: 0.3,
                    speed: 400
                },
                click:true
            });
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