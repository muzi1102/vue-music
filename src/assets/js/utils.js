export const set_localStorage = (key, value)=>{
    if(!key){
        console.error('请传入localStoage的key');
        return
    }
    localStorage.setItem(key,JSON.stringify(value));
}
export const get_localStorage = (key)=>{
    if (!key) {
        return false;
    }
    return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
}
export const remove_localStorage = (key)=>{
    if (!key) {
        return false;
    }
    localStorage.removeItem(key);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export const shuffle = (arr)=>{
    let _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
      let j = getRandomInt(0, i);
      let t = _arr[i];
      _arr[i] = _arr[j];
      _arr[j] = t;
    }
    return _arr;
}

export const debounce = (fn,wait=1000)=>{
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    }
}