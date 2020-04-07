import * as types from './mutation-types'

import {saveFavorite,deleteFavorite} from '@/assets/js/cache.js';

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
export const SET_RANK_LIST = ({commit},item)=>{
    commit('SET_RANK_LIST',item);
}
export const selectPlay = function ({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST,list);
    //当前的播放
    commit(types.SET_PLAYLIST,list);
    commit(types.SET_CURRENT_INDEX,index);
    //commit(types.SET_PLAYING_STATE, true);
}

export const SET_PLAYING_STATE = function({commit},flag){
    commit(types.SET_PLAYING_STATE,flag);
}
export const SET_CURRENT_INDEX = function({commit},index){
    commit(types.SET_CURRENT_INDEX,index);
}

export const SET_PLAY_MODE = function ({commit},mode) {
    commit(types.SET_PLAY_MODE,mode);
}

export const saveFavoriteList = function ({commit},song) {
    commit(types.SET_FAVORITE_LIST,saveFavorite(song));
}
export const deleteFavoriteList = function ({commit},song) {
    commit(types.SET_FAVORITE_LIST,deleteFavorite(song));
}

// 这里的原因  对es6的理解不够
// const actions = {
//     [types.INCREMENT]({commit}) {
//         commit(types.INCREMENT);
//     }
// }
// export default actions;