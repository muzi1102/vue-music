<template>
    <div class="tab">
        <router-link  to="/recommend" tag="div" class="tab-item">推荐音乐</router-link>
        <router-link  to="rank" tag="div" class="tab-item">热歌排行</router-link>
        <router-link  to="singer" tag="div" class="tab-item">歌手</router-link>
        <router-link  to="search" tag="div" class="tab-item">搜索</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<!-- -->
<style  lang="scss"  scoped>
    .tab{
        width: 100%;
        height: 0.8rem;
        display: flex;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid  #eeeeee;
        line-height: 0.8rem;
        &-item{
            flex: 1;
            text-align: center;
            &.router-link-active{
                color: #dd001b;
                border-bottom: 2px solid #dd001b;
            }
        }
    }
    .tab-item-active{
        color: #dd001b;
    }
    .tab-item-active span{
        position: relative;
    }
    .tab-item-active span::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: -1px;
        z-index: 3;
        width: 100%;
        height: 4px;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background: #dd001b;
    }
</style>