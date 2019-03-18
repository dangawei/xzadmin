//保存缓存里
function saveStorage (typeName,typedata){
    window.sessionStorage.setItem(typeName, typedata)
    return
}

//获取缓存里
function getStorage (typeName){
    return window.sessionStorage.getItem(typeName)
}
// // 保存cookie
// function saveCookie(typeName){
//     document.cookie="name="+typeName;
// }

// 保存在localstorage
function saveLocal(key,value){
    window.localStorage.setItem(key,value)
    return
}
// 得到localStorage的值
function getLocal(key){
    return window.localStorage.getItem(key)
}
// 删除localStorage的值
function removeLocal(key){
    window.localStorage.removeItem(key);
}

//时间格式转换
function gettime (type,time) {
    type = type || 'date'
    time = time ? time : null
    var result = ''
    if (time) {
        var tdate = new Date(time)
        var year = tdate.getFullYear()
        var month = tdate.getMonth() + 1
        var date = tdate.getDate()
        var hour = tdate.getHours()
        var minute = tdate.getMinutes()
        var second = tdate.getSeconds()
        month = month > 9 ? month : '0' + month
        date = date > 9 ? date : '0' + date
        hour = hour > 9 ? hour : '0' + hour
        minute = minute > 9 ? minute : '0' + minute
        second = second > 9 ? second : '0' + second
        result = [year, month, date].join('-')
        if (type == 'time') {
            result += ' ' + [hour, minute, second].join(':')
        }
        if (type == 'hour') {
            result += ' ' + hour+':00'
        }
        if (type == 'minute') {
            result += ' ' + [hour, minute].join(':')
        }
    }
    return result
}

// 对象转URL
function http_url(url, data) {
    if(typeof(url) == 'undefined' || url == null || url == '') {
        return '';
    }
    if(typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
        return '';
    }
    url += (url.indexOf("?") != -1) ? "" : "?";
    for(var k in data) {
        url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
    }
    return url;
}

// 保存缓存里
export default {
    save: function (typeName,typedata) {
      return saveStorage(typeName,typedata)
    },
    get: function (typeName) {
      return getStorage(typeName)
    },
    savelocal:function(key,name){
        return saveLocal(key,name)
    },
    getlocal:function(key){
        return getLocal(key)
    },
    removelocal:function(key){
        return removeLocal(key)
    },
    gettime: function (type,time) {
      return gettime(type,time)
    },
    http_url:function(url, data){
      return http_url(url, data)
    }
}
