<template>
    <transition name="right">
        <div class="song_tag">
            <div class="my-tag">
                <div class="my-tag-title">
                    <h4>我的歌单广场</h4>
                    <span class="tip">(长按可编辑)</span>
                    <span class="editBtn" @click="toggleBtn">{{btnMsg}}</span>
                </div>
                <tag-item :tagGroup="myTag"></tag-item>
            </div>
            <tag :tag="tag"></tag>
        </div>
    </transition>
</template>

<script>
import tag from './tag.vue';
import tagItem from './tag_item.vue';
import {mapGetters,mapActions} from 'vuex';
export default {
    data() {
        return {
            // editTagFlag:false
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
        tag,
        tagItem
    },
    methods: {
        ...mapActions({
            toggleTagFlag : 'editTagFlag'
        }),
        toggleBtn(){
            this.toggleTagFlag(!this.editTagFlag);
            // 完成把这个放在缓存中
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
    
}
.right-enter,.right-leave-to{
    transform: translate3d(0, 100%, 0);
}
.right-leave,.right-enter-to{
    transform: translate3d(0, 0, 0)
}
.right-enter-active,.right-leave-active{
    transition:all .1s;
}
</style>