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
    },
    mounted() {
        this.$nextTick(()=>{
            this._initScroll();
        });
    },
    methods: {
        _initScroll(){
            if (!this.$refs.wrapper) {
                return false;
            }
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click:this.click
            });
            if (this.listenScroll) {
                let me = this
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos)
                })
            }
        },
        refresh() {
            this.scroll && this.scroll.refresh()
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