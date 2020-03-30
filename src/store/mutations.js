import * as types from './mutation-types'

const mutations = {
    [types.INCREMENT](state) {
        state.count ++;
    },
    [types.SET_LOADING](state,loading){
        state.loading = loading;
    }
};


export default mutations