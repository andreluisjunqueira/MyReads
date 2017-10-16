const debounce = (fn, timeout)=>{
    clearTimeout(this.time);
    return (()=>this.time = setTimeout(fn,timeout))(fn, timeout)
}
export default debounce;