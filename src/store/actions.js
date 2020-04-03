import * as types from './mutation-types'

export const increment = ({commit})=>{
    commit(types.INCREMENT);
}
export const incrementAsync=({commit})=>{
    setTimeout(()=>{
        commit(types.INCREMENT);
    },1000)
}
export const SET_LOADING = ({commit},loading)=>{
    commit(types.SET_LOADING,loading);
}
export const setRankList = ({commit},item)=>{
    commit(setRankList,item);
}

// 这里的原因  对es6的理解不够
// const actions = {
//     [types.INCREMENT]({commit}) {
//         commit(types.INCREMENT);
//     }
// }
// export default actions;