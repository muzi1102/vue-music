<template>
    <div>
        <ul class="tag-group" ref="tagGroup">
            <li class="tag-group-item"
            :class="caculateDisClass(item)"
            @click="toggleTag(item,index)" v-for="(item,index) in tagGroup" 
            :key="index"
            :id = getId(item)>
                <i
                class="iconfont" 
                :class="caculateIconClass(item)">
                </i>
                <span>{{item.name}}</span>
            </li>
        </ul>
        <transition 
            appear
            @after-appear='afterEnter'
            @before-appear="beforeEnter"
            v-for = "(item,index) in moveDot"
            :key="index"
        >
            <div class="move_dot" ref="ball" v-if="item"></div>           
        </transition>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
    data() {
        return {
            elLeft:0,
            elRight:0,
            endLoc:0,
            moveDot:[]
        }
    },
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
        drop(id,event){
            let startLoc = event.target.getBoundingClientRect()
            this.elLeft  = startLoc.left;
            this.elTop =  startLoc.top;
            this.moveDot = [...this.moveDot,true];
            this.endLoc = document.getElementById(id).getBoundingClientRect();
        },
        beforeEnter(el){
            console.log(el)
            el.style.transform = `translate3d(${this.elLeft + 30}px,${this.elTop - 30}px,0)`;
            // el.style.transition = 'transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            // el.style.transition = 'transform .88s linear';
            el.style.opacity = 0;
        },
        afterEnter(el){
            el.style.transform = `translate3d(${this.endLoc.left + 30}px,${this.endLoc.top - 30}px,0)`;
            el.style.transition = 'transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            this.moveDot = this.moveDot.map(item => false);
            el.style.opacity = 1;
        },
        getId(item){
            return  item.id ? item.id : '';
        },
        caculateDisClass(item){
            return {
                'tag-group-item-disabled':item.disabled||(item.fixed && this.editTagFlag)
            }
        },
        caculateIconClass(item){
            //为甚这个写法 不可以
            let hot = item.hot ? `icon-${item.hot}`:'';
            let add  = item.add ? `icon-${item.add}`:'';
            return{
                'icon-huore icon-red':item.hot && !this.editTagFlag,
                'icon-addApp':item.add && this.editTagFlag,
                'icon-jianshao':item.del && this.editTagFlag
            }
        },
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
    .icon-red{
        color: #d43c33;
    }
}
.move_dot{
    position: fixed;
    z-index: 100;
    top: 1rem;
    height:0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background-color: coral;
}
</style>