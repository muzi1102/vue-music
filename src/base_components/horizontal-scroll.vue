<template>
<div>
    <div class="slider" ref="hSlider">
        <ul class="slider-content" ref="hSliderContent">
            <slot></slot>
        </ul>
    </div>
</div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    data() {
        return {
            
        }
    },
    props:{
        click:{
            type:Boolean,
            default:true
        },
        scrollX:{
            type:Boolean,
            default:true
        }
    },
    mounted() {
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
            this.children = this.$refs.hSliderContent.children;
            width = this.children[0].clientWidth * this.children.length + (10*(this.children.length-1));
            this.$refs.hSliderContent.style.width = width + 'px';
        },
        _initSlider(){
            this.scroll = new BScroll(this.$refs.hSlider,{
                scrollX: this.scrollX,
                snap: {
                    threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
                    speed: 400 // 切换动画时长 400ms
                },
                click:this.click
            })
        },
    },
}
</script>
<style lang="scss" scoped>
    .slider{
        position: relative;
        width: 100%;
        overflow: hidden;
        &-content{
            .item{
                width: 2rem;
                height: 2.6rem;
                margin-bottom: 0.2rem;
                margin-right: 0.2rem;
                // background: chocolate;
                float: left;
                box-sizing: border-box;
                &:last-child{
                    margin-right: 0rem;
                }
                img{
                    width: 100%;
                    border: 1px solid #eee;
                    border-radius: 0.2rem;
                }
                h4{
                    font-size: 0.20rem;
                    color: #666;
                    overflow: hidden;//隐藏文字
                    text-overflow: ellipsis;//显示...
                    white-space: nowrap; //不换行
                }
            }
        }
    }
</style>