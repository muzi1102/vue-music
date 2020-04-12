import {set_localStorage,get_localStorage} from '@/assets/js/utils.js';
const SEARCH_KEY = '__search__';

const PLAY_KEY = '__play__';

const FAVORITE_KEY = '__favorite__';

const TAG_KEY ='__tag__';


export function loadFavorite() {
    // return storage.get(FAVORITE_KEY, [])
    return [];
}
export function saveFavorite(song) {
    set_localStorage(FAVORITE_KEY,song);
    return song;
}
export function deleteFavorite(song) {
    return song
}
export function loadTag (){
    let songs = get_localStorage(TAG_KEY) || [];
    return songs;
};

export function saveTag(tag){
    // let songs =  get_localStorage(TAG_KEY) || [];
    // insertArray(songs,tag,()=>{
    //     return item === tag;
    // })
    set_localStorage(TAG_KEY,tag);
    // return songs;
};


function insertArray(arr, val, compare){
    const index = arr.findIndex(compare);
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val);
}