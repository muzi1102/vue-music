import * as types from './mutation-types'

export const increment = ({commit})=>{
    commit(types.INCREMENT);
}
export const incrementAsync=({commit})=>{
    setTimeout(()=>{
        commit(types.INCREMENT);
    },1000)
}
// 这里的原因  对es6的理解不够
// const actions = {
//     [types.INCREMENT]({commit}) {
//         commit(types.INCREMENT);
//     }
// }
// export default actions;