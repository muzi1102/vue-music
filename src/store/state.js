import {loadFavorite} from '@/assets/js/cache.js';
const state = {
    count:0,
    loadig:false,//loading加载的显示   
    rankList:{},//排行榜的选择数据
    currentIndex:-1,//当前播放歌曲的index
    playlist:[],//播放的歌单
    sequenceList:[],
    playing:false,//是否在播放
    mode:0,//0表示顺序播放，1代表循环，2表示随机播放
    favoriteList:[]
}
  
export default state
  