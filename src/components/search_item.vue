<template>
<div>
    <template v-if="cellData && cellData.length">
        <div class="cell" 
            v-for="(cell,index) in cellData"
            :key="index"
            @click="itemEvent(cell)">
            <div class="cell-hd" v-if="iconType">
                <i :class=iconClassObject></i>
            </div>
            <div class="cell-r">
                <div class="cell-bd">
                    <div>{{cell}}</div>
                    <slot name="content"></slot>
                </div>
                <div class="cell-ft" @click="bindEvent">
                    <i :class=iconFtClassObject></i>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <p v-if="noData">暂无数据</p>
    </template>
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
        // 是否需要展示暂无数据
        noData:{
            type:Boolean,
            default:false
        },
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
        bindEvent(){
            console.log(2);
        },
        itemEvent(cell){
            this.$emit('itemEvent',{
                keyword:cell
            })
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
                // background-color: pink;
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