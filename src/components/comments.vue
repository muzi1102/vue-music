<template>
    <div>
        <ul class="cmt-list">
            <li class="cmt-item" v-for="item in comments" :key="item.commentId">
                <div class="cmt-item-hd">
                    <slot name="hd" :row="item.user"></slot>
                </div>
                <div class="cmt-item-bd">
                    <slot name="bd" :row="item"></slot>
                </div>
                <div class="cmt-item-ft">
                    <slot name="ft" :row="item"></slot>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props:{
        comments:{
            type:Array,
            default:()=>{
                return [];
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .cmt-item{
        position: relative;
        display: flex;
        &::after{
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid rgba(0,0,0,0.1);
            color: rgba(0,0,0,0.1);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            left: 16px;
            z-index: 2;
        }
        &-bd{
            flex:1;
        }
    }
</style>