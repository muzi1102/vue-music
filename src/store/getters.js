export const loading = state => state.loading;

export const playing = state => state.playing;

export const count = state => state.count;

export const rankList = state => state.rankList;

export const currentIndex = state => state.currentIndex;

export const playlist  = state => state.playlist;

export const sequenceList = state => state.sequenceList;

export const mode = state => state.mode;

export const favoriteList = state => state.favoriteList

export const currentSong = (state)=>{
    return state.playlist[state.currentIndex]||{};
}
export const tag = (state)=>{
    return state.tag;
}
export const myTag = (state) =>{
    return state.myTag;
}
export const editTagFlag = (state) => {
    return state.editTagFlag;
}

