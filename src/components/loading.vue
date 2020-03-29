<template>
    <div v-if="loading">
        <van-loading size="24px" vertical>{{loadingTxt}}</van-loading>
    </div>
</template>
<script>
    import  {Loading} from 'vant';
    export default{
        props:{
            loadingTxt:{
                type:String,
                default:'加载中...'
            }
        },
        components:{
            Loading
        }
    }
</script>

<style scoped>

</style>