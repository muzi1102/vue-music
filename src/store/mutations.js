import * as types from './mutation-types'

const mutations = {
    [types.INCREMENT](state) {
        state.count ++;
    },
    [types.SET_LOADING](state,loading){
        state.loading = loading;
    },
    setRankList(state,data){
        state.rankList = rankList;
    }
};


export default mutations