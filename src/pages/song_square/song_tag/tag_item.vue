<template>
    <div>
        <ul class="tag-group" ref="tagGroup">
            <li class="tag-group-item" :ref="`tagItem${index}`" :class="{'tag-group-item-disabled':item.disabled}"  @click="toggleTag(item,index)" v-for="(item,index) in tagGroup" :key="index">
                <i v-if="item.icon" class="iconfont icon-color" :class="[`icon-${item.icon}`]"></i>
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
    props:{
        tagGroup:{
            type:Array,
            default:()=>{
                return [];
            }
        }
    },
    computed: {
        ...mapGetters([
            'editTagFlag'
        ])
    },
    methods: {
        ...mapActions({
            addTag:'addSongTag',
            setTag:'setTag'
        }),
        toggleTag(item,index){
            if (!this.editTagFlag) {
                return;
            }
            this.$emit('toggleTag',{
                item:item,
                index:index
            });
            // if (item.disabled||!this.editTagFlag) {
            //     return false;
            // }
            // // 区分在编辑模式下是增删标签，正常模式下是跳转去歌单页面
            // // 这里怎么防止我的歌单的元素不变化？？？？
            // this.addTag(item);
            // console.log(this.editTagFlag);
            // // 判断这个标签的状态是否为可点击
            // this.setTag({
            //     item:item,
            //     index:index
            // });
        }
    },
}
</script>
<style lang="scss" scoped>
.tag-group{
    display: flex;
    flex-wrap: wrap;
    &-item{
        width: 1.2rem;
        height: 0.56rem;
        background-color: #eee;
        border-radius: 0.26rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.2rem;
        margin-bottom: 0.3rem;
    }
    &-item-disabled{
        background-color: brown;
    }
    .icon-color{
        color: #d43c33;
    }
}
</style>