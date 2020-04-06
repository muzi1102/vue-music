<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper">
                <div class="list-header">
                    <h1 class="title">
                        <i class="iconfont" @click="changeMode"></i>
                        <span class="text">
                            模式
                        </span>
                        <span>
                            <i class="iconfont"></i>
                        </span>
                    </h1>
                </div>
                <scroll ref="listContent" class="list-content">
                    <transition-group name="list" tag="ul">
                        <li class="item" ref="listiten"
                            @click="selectItem(item, index)"
                            v-for="(item, index) in sequenceList" :key="item.id">
                            <i class="iconfont"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="delete" @click.stop="deleteOne">
                                <i class="iconfont"></i>
                            </span>
                        </li>
                    </transition-group>
                </scroll>
                <div  @click="hide" class="list-close">
                    <span>关闭</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import scroll from '@/base_components/scroll.vue';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            showFlag:false,
        }
    },
    components:{
        scroll
    },
    computed: {
        ...mapGetters([
            'sequenceList'
        ])
    },
    methods: {
        hide(){
            this.showFlag = false;
        },
        show(){
            this.showFlag = true;
        },
        selectItem(){
            console.log(1);
        },
        deleteOne(){},
        changeMode(){},
    },
}
</script>
<style lang="scss" scoped>
    .playlist{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: rgba(0,0,0,.3);
        &.list-fade-enter-active,&.list-fade-leave-active{
            transition: opacity 0.3s;
            .list-wrapper{
                transition: all 0.3s
            }
        }
        &.list-fade-enter,&.list-fade-leave{
            opacity: 0;
            .list-wrapper{
                transform: translate3d(0,100%,0);
            }
        }
        .list-wrapper{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            border-radius:0.16rem;
            background-color: pink;
            .list-header{
                position: relative;
                padding: 0.4rem 0.6rem 0.2rem 0.4rem;
            }
            .list-content{
                max-height: 4.8rem;
                overflow: hidden;
                .item{
                    display: flex;
                    align-items: center;
                    height: 0.8rem;
                    padding: 0 0.6rem 0 0.4rem;
                    overflow: hidden;
                }

            }
            .list-close{
                text-align: center;
                line-height: 1rem;
                background: #222;
                font-size: 0.32rem;
                color: #fff;
            }
        }
    }
</style>