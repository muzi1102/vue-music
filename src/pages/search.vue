<template>
    <div>
        <mheader></mheader>
        <tab></tab>
        <div class="search">
            <div class="search-form"></div>
            <div class="search-pannel">
                <div class="search-pannel-hotlist">
                    <h5>热门搜索</h5>
                    <ul class="list">
                        <li></li>
                    </ul>
                </div>
                <div class="search-pannel-history">
                    <p>{{count}}</p>
                    <button @click="addCount">按钮</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
import loading from '@/components/loading';
import {mapGetters,mapActions} from 'vuex';
export default {
    components:{
        mheader,
        tab,
        loading
    },
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions({
            addCount:'incrementAsync'
        })
    },
    computed: {
        ...mapGetters([
            'count'
        ])
    },
}
</script>
<!-- lang="scss" -->
<style  scoped>
    .search-pannel-hotlist{
        padding: 0.3rem 0.2rem 0;
    }
</style>