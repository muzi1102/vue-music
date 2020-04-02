<template>
    <ul class="tab">
        <li class="tab-item tab-item-active">
            <!-- <span></span> -->
            <router-link  to="/" tag="span">推荐音乐</router-link>
        </li>
        <li class="tab-item">
            <!-- <span>歌手</span> -->
            <router-link  to="singer" tag="span">歌手</router-link>
        </li>
        <li class="tab-item">
            <!-- <span>热歌排行</span> -->
            <router-link  to="rank" tag="span">热歌排行</router-link>
        </li>
        <li class="tab-item">
            <!-- <span>搜索</span> -->
            <router-link  to="search" tag="span">搜索</router-link>
        </li>
    </ul>
</template>
<script>
export default {
    
}
</script>
<!-- lang="scss" -->
<style  scoped>
    .tab{
        width: 100%;
        height: 0.8rem;
        display: flex;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid  #eeeeee;
        /* position: fixed;
        top: 0.8rem;
        left: 0;
        right: 0;
        z-index: 100; */
        
        /* &-item{
            flex: 1;
            position: relative;
            &-active{
                color: #dd001b;
                &::after{
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
            }
        }  */
    }
    .tab-item{
        flex: 1;
        text-align: center;
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