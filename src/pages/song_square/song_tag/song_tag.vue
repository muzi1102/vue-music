<template>
<div class="song_tag">
    <mheader title="所有歌单">
        <span slot="left" @click="back">
            <i class="iconfont icon-fanhui"></i>
        </span>
    </mheader>
    <div class="my-tag">
        <div class="my-tag-title">
            <h4>我的歌单广场</h4>
            <span class="tip">(长按可编辑)</span>
            <span class="editBtn" @click="toggleBtn">{{btnMsg}}</span>
        </div>
        <tag-item :tagGroup="myTag" @toggleTag="toggleTagDelete"></tag-item>
    </div>
    <div class="tag">
        <div class="tag-item" v-for="tagGroup in tag" :key="tagGroup.key">
            <h4 class="title">{{tagGroup.title}}</h4>
            <tag-item ref="tagItems"  :tagGroup="tagGroup.items" @toggleTag="toggleTagAdd"></tag-item>
        </div>
    </div>
</div>
</template>

<script>
import tagItem from './tag_item.vue';
import {mapGetters,mapActions} from 'vuex';
import {saveTag} from '@/assets/js/cache.js';
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'tag',
            'myTag',
            'editTagFlag'
        ]),
        btnMsg(){
            return this.editTagFlag ? '完成' : '编辑';
        }
    },
    components:{
        tagItem
    },
    methods: {
        ...mapActions({
            toggleTagFlag : 'editTagFlag',
            addOrRemoveTag:'addOrRemoveTag',
            // deleteTag:'deleteSongTag',
            setTag:'setTag'
        }),
        back(){
            this.$emit('back',false);
        },
        toggleBtn(){
            // 区分是是完成还是编辑
            this.toggleTagFlag(!this.editTagFlag);
            // 完成把这个放在本地缓存中
            if (!this.editTagFlag) {
                saveTag(this.myTag);
            }
        },
        toggleTagDelete(opts){
            // this.$refs.tagItems[0].drop(opts.item.dataid,event);
            if (opts.item.fixed && this.editTagFlag) {
                return false;
            }
            this.setTag({
                item:opts.item,
                index:opts.item.index,
                mode:'del'
            });
            // 这里怎么做动画？？？
            this.addOrRemoveTag({
                item:opts.item,
                mode:'del',
                index:opts.index
            });
        },
        toggleTagAdd(opts){
            if (opts.item.disabled && this.editTagFlag) {
                return false;
            }
            // this.addToMyTagAnimation();
            // 
            this.addOrRemoveTag({
                item:opts.item,
                index:opts.index,
                mode:'add'
            });
            // 判断这个标签的状态是否为可点击
            this.setTag({
                item:opts.item,
                index:opts.index,
                mode:'add'
            });
        },
        addToMyTagAnimation(){
            console.log(this.$refs.tagItem.children);
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/border.scss';  
.song_tag{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
    .my-tag{
        padding: 0.4rem 0.2rem 0;
        .my-tag-title{
            display: flex;
            flex-direction: row;
            margin-bottom: 0.2rem;
            h4{
                font-size: 0.3rem;
            }
            .tip{
                font-size: 0.22rem;
            }
            .editBtn{
                text-align: center;
                margin-left: auto;
                width: 1rem;
                height: 0.4rem;
                line-height: 0.4rem;
                color: #d43c33;
                @include border(#d43c33,0.48rem);
            }
        }
    }
    .tag{
        padding: 0.8rem 0.2rem 0;
        &-item{
            margin-bottom: 0.5rem;
            .title{
                margin-bottom: 0.2rem;
                font-size: 0.3rem;
            }
        }
    }
}

</style>