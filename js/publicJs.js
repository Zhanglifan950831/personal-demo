var publicJs={
    setLocalStore:function(key,val){
        return localStorage.setItem(key,encodeURIComponent(val));
    },
    getLocalStore:function(key){
        return decodeURIComponent(localStorage.getItem(key));
    },
    removeStore:function(key){
        return localStorage.removeItem(key);
    },
    isEmpty:function(val){
        if (val=='') {
            return true;
        } else{
            return /^\s+\s$/.test(val);
        };
    },
    isNumber:function(val){
        return /^\d+$/.test(val);
    }
};
export default publicJs;