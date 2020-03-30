export const set_localStorage = (key, value)=>{
    localStorage.setItem(key, JSON.stringify(value));
}
export const get_localStorage = (key, value)=>{
    return JSON.parse(localStorage.getItem(key));
}
export const remove_localStorage = (key)=>{
    localStorage.removeItem(key);
}