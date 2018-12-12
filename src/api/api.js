let root=process.env.API_ROOT;
let axios=require('axios');
let qs=require('qs');

import networkcode from './network'
import webapi from './webapi'

function Axios(method,url,params){
    return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:url,
            data:method === 'POST' || method === 'PUT' ? QS.stringify(params):null,
            params:method==='GET' || method === 'DELETE' ? params:null,
            baseURL:root,
            withCredentials: true
        })
        .then(function(res){
            if (res.status==200) {
                resolve(res.data)
            }else {
                networkcode.getApiCode(res.msg)
            }
        })
    })
}

export default {
    get: function (url, params) {
		return Axios('GET', url, params)
	},
	post: function (url, params) {
		return Axios('POST', url, params)
	},
	put: function (url, params) {
		return Axios('PUT', url, params)
	},
	delete: function (url, params) {
		return Axios('DELETE', url, params)
	},
}
