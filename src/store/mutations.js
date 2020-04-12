import * as types from './mutation-types';
import Vue from 'vue';
const mutations = {
    [types.INCREMENT](state) {
        state.count ++;
    },
    [types.SET_LOADING](state,loading){
        state.loading = loading;
    },
    SET_RANK_LIST(state,rankList){
        state.rankList = rankList;
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state,list){
        state.sequenceList = list;
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_PLAYING_STATE](state, flag){
        state.playing = flag;
    },
    [types.SET_PLAY_MODE](state,mode){
        state.mode = mode;
    },
    [types.SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list
    },
    [types.ADD_SONG_TAG](state,tag){
        if (tag.mode ==='del') {
            state.myTag.splice(tag.index,1);
        }else if(tag.mode ==='add'){
            state.myTag.push({
                name:tag.item.name,
                hot:tag.item.hot,
                disabled:false,
                _parent:tag.item._parent,
                index:tag.item.index,
                del:true,
                dataid:tag.item.id
            });
        }
    },
    [types.EDIT_TAG_FLAG](state,tag){
        state.editTagFlag = tag;
    },
    [types.EDIT_TAG_ITEM](state,tagObj){
        let _parent = tagObj.item._parent;
        let _index = tagObj.index;
        let disabled = ''
        if (tagObj.mode === 'add') {
            disabled = true;
        }else if(tagObj.mode === 'del'){
            disabled = false;
        }
        state.tag[_parent].items[_index].disabled = disabled;
        // 之前这么为什么不行。。。需要提前声明。这里怎么在申请？？？？
        // Vue.$set(state.tag[_parent].items[_index],'disabled',true);
        // state.tag[_parent].items[_index] = { ...state.tag[_parent].items[_index], disabled: true }
    }
};


export default mutations