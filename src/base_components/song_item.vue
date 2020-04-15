<template>
<ul class="song" ref="song">
    <li class="song-item" v-for="item in list" :key="item.id">
        <img class="song-img" :src="item.picUrl" alt="">
        <p class="song-title">{{item.name}}</p>
        <p class="song-play">
            <i class="iconfont icon-bofang1 song-play-icon"></i>
            <span class="song-play-num">{{item.playCount|chineseUnit}}</span>
        </p>
    </li>
</ul>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            default:()=>{
                return [];
            }
        }
    },
    data() {
        return {
            
        }
    },
    filters:{
        chineseUnit(num){
            let numStr = '';
            if (num<10000) {
                numStr = num;
            }else if(num>=10000 && num < 100000000){
                numStr = (num/10000) + '万';
            }else if(num >= 100000000){
                numStr = num / 100000000 + '亿';
            }
            return numStr
        }
    }
}
</script>
<style lang="scss" scoped>
.song{
    overflow: hidden;
    .song-item{
        width: 2rem;
        height: 2.6rem;
        margin-bottom: 0.2rem;
        margin-right: 0.2rem;
        // background: chocolate;
        float: left;
        box-sizing: border-box;
        position: relative;
        &:last-child{
            margin-right: 0rem;
        }
        .song-img{
            width: 100%;
            border: 1px solid #eee;
            border-radius: 0.2rem;
        }
        .song-title{
            font-size: 0.20rem;
            color: #666;
            overflow: hidden;//隐藏文字
            text-overflow: ellipsis;//显示...
            white-space: nowrap; //不换行
        }
        .song-play{
            position: absolute;
            top:0;
            right: 0.1rem;
            color: #fff;
            &-play{
                font-size: 0.22rem;
                vertical-align: middle;
            }
            &-icon{
                font-size: 0.22rem;
                vertical-align: middle;
            }
        }
    }
}

</style>