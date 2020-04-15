<template>
    <div>
        <!-- <button @click="addCart">加入购物车</button>
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
        </transition> -->
        <!-- <ul>
            <li v-for="(item,index) in size"
                class="item"
                :class="[`item-${index}`]"
                :key="item.background"
                :style="{'top':item.top+'px','left':item.left+'px','width':item.width+'px','height':item.height+'px','zIndex':item.zIndex,'opacity':item.opacity}"
            >
            </li>
        </ul> -->
         <transition-group>
            <li v-for="(item,index) in size"
                class="item"
                :class="[`item-${index}`]"
                :key="item.background"
                :style="{'top':item.top+'px','left':item.left+'px','width':item.width+'px','height':item.height+'px','zIndex':item.zIndex,'opacity':item.opacity}"
            >
            </li>
        </transition-group>
    </div>
</template>
<script>
let count = 0;
export default {
    data() {
        return {
            myArr : [],          
            size:[
                // {"top":60,"left":0,"width":10,"height":100,"zIndex":1,"opacity":0,"background":'red'},
                // {"top":60,"left":0,"width":100,"height":100,"zIndex":2,"opacity":40,"background":'pink'},
                {"top":30,"left":20,"width":100,"height":140,"zIndex":3,"opacity":70,"background":'blue'},
                {"top":0,"left":100,"width":160,"height":200,"zIndex":4,"opacity":100,"background":'yellow'},
                {"top":30,"left":240,"width":100,"height":140,"zIndex":3,"opacity":70,"background":'green'},
                // {"top":60,"left":300,"width":100,"height":100,"zIndex":2,"opacity":40,"background":'black'},
                // {"top":60,"left":300,"width":100,"height":100,"zIndex":1,"opacity":0,"background":'orange'}
            ],
            showMoveDot:[],
            elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
            elTop: 0, //当前点击购物车按钮在网页中的绝对left值
        }
    },
    mounted() {
        this.auto();
    },
    methods: {
        // classObjc(item){
        //     return {

        //     }
        // },
        bundleClick : function () {
            this.myArr.push({
                id :  count++ ,
                content : "我有" + count + "个梦想"
            })
            
        },
        auto(){
            setInterval(() => {
                this.size.unshift(this.size.pop());
                console.log(this.size);
            }, 2000);
        },
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
.v-enter, .v-leave-to {
        opacity : 0 ;
    }
    .v-enter-active, .v-leave-active {
        transition : opacity 1s;
    }

    .item{
        position: absolute;
    }
    .item-0{
        background-color: blue;
    }
    .item-1{
        background-color: yellow;
    }
        .item-2{
        background-color: green;
    }
    .card{
        position: absolute;
        bottom: 2rem;
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