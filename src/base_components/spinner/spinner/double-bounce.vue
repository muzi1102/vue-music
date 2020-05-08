<template>
    <div class="spinner-double-bounce" :style="{
        width: spinnerSize,
        height: spinnerSize
    }">
        <div class="spinner-double-bounce-bounce1" :style="{ backgroundColor: spinnerColor }"></div>
        <div class="spinner-double-bounce-bounce2" :style="{ backgroundColor: spinnerColor }"></div>
    </div>
</template>
<script>
    import common from './common.vue';
    export default {
        mixins: [common]
    }
</script>

<style lang="scss">
.spinner-double-bounce{
    position: relative;
    &-bounce1,&-bounce2{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0; 
        animation: spinner-double-bounce 2.0s infinite ease-in-out;
    }
    &-bounce2{
        animation-delay: -1.0s;
    }
}
@keyframes spinner-double-bounce {
    0%, 100% {
      transform: scale(0.0);
    }

    50% {
      transform: scale(1.0);
    }  
}
</style>