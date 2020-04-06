import * as types from './mutation-types'

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
    }
};


export default mutations