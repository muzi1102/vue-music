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
    favoriteList:[],
    tag:_initTag(),
    myTag:[{name:'推荐'},{name:'官方'},{name:'精品'}],
    editTagFlag:false,//标签页面的编辑状态
}
  
export default state


function _initTag() {
    let tagObjItem = {
        /*
            name:标签的名字
            icon：图标
            disabled:是否可点击
            _parent:所属种类
        */
        language:{
            title:'语种',
            items:[{name:'华语',icon:'huore'},{name:'欧美'},{name:'日语'},{name:'韩语'},{name:'粤语'}]
        },
        style:{
            title:'风格',
            items:[{name:'流行',icon:'huore'},{name:'摇滚',icon:'huore'},{name:'民谣',icon:'huore'},{name:'电子',icon:'huore'},{name:'舞曲'},
            {name:'说唱'},{name:'爵士'}]
        }
    }
    for(var key in tagObjItem){
        tagObjItem[key].items.forEach((item,index)=>{
            item.disabled = false;
            item._parent = key;
            item.index = index;
        });
    }
    return tagObjItem;
}
