<template>
    <div class="spinner-line-scale">
        <div 
        v-for="n in 5" :key="n" 
        class="spinner-line-scale-line"
        :class="['spinner-line-scale-line'+n]"
        :style="lineStyle"></div>
    </div>
</template>
<script>
export default {
    computed: {
        spinnerWidthSize() {
            return (this.size || this.$parent.size || 3) + 'px';
        },
        spinnerHeightSize(){
            return (this.size || this.$parent.size || 35) + 'px';
        },
        lineStyle(){
            return{
                width: this.spinnerHeightSize,
                height: this.spinnerSize,
                backgroundColor: this.spinnerColor
            }
        }
    },
}
</script>

<style lang="scss">
.spinner-line-scale{
    &-line{
        display: inline-block;
        border-radius: 2px;
        margin: 2px;
    }
    &-line1{
        -webkit-animation: line-scale 1s -.4s infinite cubic-bezier(.2,.68,.18,1.08);
        animation: line-scale 1s -.4s infinite cubic-bezier(.2,.68,.18,1.08);
    }
    &-line2{
        -webkit-animation: line-scale 1s -.3s infinite cubic-bezier(.2,.68,.18,1.08);
        animation: line-scale 1s -.3s infinite cubic-bezier(.2,.68,.18,1.08);
    }
    &-line3{
        -webkit-animation: line-scale 1s -.2s infinite cubic-bezier(.2,.68,.18,1.08);
        animation: line-scale 1s -.2s infinite cubic-bezier(.2,.68,.18,1.08);
    }
    &-line4{
        -webkit-animation: line-scale 1s -.1s infinite cubic-bezier(.2,.68,.18,1.08);
        animation: line-scale 1s -.1s infinite cubic-bezier(.2,.68,.18,1.08);
    }
    &-line5{
        -webkit-animation: line-scale 1s 0s infinite cubic-bezier(.2,.68,.18,1.08);
        animation: line-scale 1s 0s infinite cubic-bezier(.2,.68,.18,1.08);
    }
}
@keyframes line-scale {
    0%,100% {
        -webkit-transform: scaley(1);
        transform: scaley(1)
    }

    50% {
        -webkit-transform: scaley(.4);
        transform: scaley(.4)
    }
}

</style>