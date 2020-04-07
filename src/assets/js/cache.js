import {set_localStorage,get_localStorage} from '@/assets/js/utils.js';
const SEARCH_KEY = '__search__'

const PLAY_KEY = '__play__'

const FAVORITE_KEY = '__favorite__'


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