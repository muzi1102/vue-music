import * as types from './mutation-types'

const mutations = {
    [types.INCREMENT](state) {
        state.count ++;
    }
};

export default mutations