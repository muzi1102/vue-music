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
        },
        data:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.initScrollY();
        }, 200);
    },
    methods: {
        initScrollY(){
            // 如果存在this.$children就在应用组件的文件自行处理
            if (this.$children.length > 0) {
                this.$emit('initWidth');
            }else{
                this._initWidth();
            }
            this._initSlider();
        },
        _initWidth(){
            let width = 0;
            this.children = this.$refs.hSliderContent.children;
            width = this.children[0].clientWidth * this.children.length + (10*(this.children.length));
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
    watch: {
        data(){
            // this.initScrollY();
            console.log('data数据变化');
        }
    },
}
</script>
<style lang="scss" scoped>
    .slider{
        position: relative;
        width: 100%;
        overflow: hidden;
    }
</style>