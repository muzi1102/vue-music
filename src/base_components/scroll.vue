<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    props:{
        probeType:{
            type:Number,
            default:1
        },
        click:{
            type:Boolean,
            default:true
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        scrollX: {
            type:Boolean,
            default:false
        },
        snap:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll();
        }, 20);
    },
    methods: {
        _initScroll(){
            debugger;
            if (!this.$refs.wrapper) {
                return false;
            }
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click:this.click,
                scrollX:this.scrollX,
                snap:this.snap
            });
            if (this.listenScroll) {
                let me = this
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos);
                })
            }
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo () {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement () {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
}
</script>
<style lang="scss" scoped>
    
</style>