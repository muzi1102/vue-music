<template>
    <div>
        <button @click="addCart">加入购物车</button>
        <div class="card" id="buycar">
            我是购物车
        </div>
        <transition
            appear
            @after-appear='afterEnter'
            @before-appear="beforeEnter"
            v-for="(item,index) in showMoveDot"
            :key="index"
        >
            <div class="move_dot" ref="ball" v-if="item"></div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showMoveDot:[],
            elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
            elTop: 0, //当前点击购物车按钮在网页中的绝对left值
        }
    },
    methods: {
        addCart(){
            this.elLeft = event.target.getBoundingClientRect().left;
            this.elTop = event.target.getBoundingClientRect().top;
            this.showMoveDot = [...this.showMoveDot, true];
        },
        beforeEnter(el){
            // 设置transform值
            el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop - 100}px , 0)`;
            // 设置透明度
            el.style.opacity = 0;
        },
        afterEnter(el){
            const badgePosition = document.getElementById("buycar").getBoundingClientRect();
            // 设置位移
            el.style.transform = `translate3d(${badgePosition.left + 30}px,${badgePosition.top - 30}px,0)`
            // 增加贝塞尔曲线  
            el.style.transition = 'transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            el.style.transition = 'transform .88s linear';
            this.showMoveDot = this.showMoveDot.map(item => false);
            // 设置透明度
            el.style.opacity = 1;
            // 监听小球动画结束方法
        }
    },
}
</script>
<style lang="scss" scoped>
    .card{
        position: absolute;
        bottom: 0;
        background-color: chartreuse;
        // margin-left: 30;
        width: 3rem;
        transform: translateX(50%);
        text-align: center;
    }
    .move_dot{
        position: fixed;
        z-index: 100;
        top: 1rem;
        height:1rem;
        width: 1rem;
        border-radius: 50%;
        background-color: coral;
    }
</style>