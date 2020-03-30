<template>
<div>
    <div class="cell" 
        v-for="(cell,index) in cellData"
        :key="index"
        @click="getDetail">
        <div class="cell-hd" v-if="iconType">
            <!--插槽和默认方式 -->
            <i :class=iconClassObject></i>
        </div>
        <div class="cell-r">
            <div class="cell-bd">{{cell}}</div>
            <div class="cell-ft">
                <i :class=iconFtClassObject></i>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        // vue的这里为什么是return
        return {

        }
    },
    props:{
        cellData:{
            type:Array,
            default:()=>{
                return [];
            }
        },
        iconType:{
            type:String,
            default:''
        },
        iconFtType:{
            type:String,
            default:''
        }
    },
    computed: {
        iconClassObject(){
            return {
                'icon-history':this.iconType === 'history',
                'icon-search':this.iconType === 'search',
                'iconfont':true,
                'icon':true
            }
        },
        iconFtClassObject(){
            return {
                'icon-close':this.iconFtType === 'close',
                'icon-play':this.iconFtType === 'play',
                'iconfont':true,
                'icon':true
            }
        }
    },
    methods: {
        getDetail(){
            console.log(1);
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '@/assets/css/border.scss';
    .cell{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.9rem;
        &-r{
            flex: 1;
            position: relative;
            height: 0.9rem;
            display: flex;
            align-items: center;
            @include border-bottom(#EEEFF3);
        }
        &-bd{
            flex: 1;
        }
        &-hd{
            .icon{
                display: inline-block;
                width: 0.3rem;
                height: 0.3rem;
                background-color: pink;
                margin: 0 0.2rem;
            }
        }
        &-ft{
            .icon{
                padding-right: 0.1rem;
            }
        }
    }
</style>