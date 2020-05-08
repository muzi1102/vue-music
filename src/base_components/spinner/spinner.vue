

<template>
    <div>
        <component :is="spinner"></component>
    </div>
</template>
<script>
const SPINNERS = [
    'snake',
    'double-bounce',
    'triple-bounce',
    'fading-circle',
    'line-scale'
]
const parseSpinner = function(type) {
    if (Object.prototype.toString.call(type) === '[object Number]') {
        if (SPINNERS.length <= type) {
            console.warn(`'${type}' spinner not found, use the default spinner.`);
            type = 0;
        }
        return SPINNERS[type];
    }
    if (SPINNERS.indexOf(type) === -1) {
        console.warn(`'${type}' spinner not found, use the default spinner.`);
        type = SPINNERS[0];
    }
    return type;
}
import SpinnerSnake from './spinner/snake.vue';
import SpinnerDoubleBounce from './spinner/double-bounce.vue';
import SpinnerTripleBounce from './spinner/triple-bounce.vue';
import SpinnerFadingCircle from './spinner/fading-circle.vue';
import SpinnerLineScale from './spinner/line-scale.vue';
export default {
    name:'spinner',
    props:{
        type:{
            default:0
        },
        size:{
            type:Number,
            default:28
        },
        color:{
            type: String,
            default: '#ccc'
        }
    },
    computed: {
        spinner(){
            return `spinner-${parseSpinner(this.type)}`;
        }
    },
    components:{
        SpinnerSnake: SpinnerSnake,
        SpinnerDoubleBounce: SpinnerDoubleBounce,
        SpinnerTripleBounce: SpinnerTripleBounce,
        SpinnerFadingCircle: SpinnerFadingCircle,
        SpinnerLineScale:SpinnerLineScale
    },
    created() {
        console.log('我执行了');
    },
}
</script>

<style lang="scss">
    
</style>