<template>
    <div>
        <header class="m-header" :class="{ 'is-fixed': fixed }">
            <div class="is-left left-btn">
                <slot name="left"></slot>
            </div>
            <h1 class="m-header-titile">{{title}}</h1>
            <div class="is-right right-btn">
                <slot name="right"></slot>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name:'mheader',
    props:{
        fixed: Boolean,
        title: String
    }
}
</script>

<style lang="scss" scoped>
    .m-header{
        &.is-fixed{
            top: 0;
            right: 0;
            left: 0;
            position: fixed;
            z-index: 1;
        }
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #d43c33;
        box-sizing: border-box;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 0.28rem;
        height: 0.8rem;
        line-height: 1;
        padding: 0 0.2rem;
        position: relative;
        text-align: center;
        white-space: nowrap;
        &-titile{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: inherit;
            font-weight: 400;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }
        .left-btn{
            text-align: left;
        }
        .right-btn{
            text-align: right;
        }
        .left-btn,.right-btn{
            flex: 0.5;
        }
    }
</style>