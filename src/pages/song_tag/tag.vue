<template>
    <div class="tag">
        <!-- 支持slot的模式具体这里去看mntui -->
        <div class="tag-item" v-for="tagGroup in tag" :key="tagGroup.key">
            <h4 class="title">{{tagGroup.title}}</h4>
            <tag-item  :tagGroup="tagGroup.items" @toggleTag="_toggleTag"></tag-item>
        </div>
    </div>
</template>
<script>
import tagItem from './tag_item.vue';
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        tag:{
            type:Object,
            default:()=>{
                return {};
            }
        }
    },
    components:{
        tagItem
    },
    methods: {
        _toggleTag(opts){
            this.$emit('toggleTag',opts)
        }
    },
}
</script>
<style lang="scss" scoped>
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
</style>