///////////////////////////////////////////
// 配置api接口                               //
// let root='http://192.168.0.154:8082'; //
// let root='http://www.baidu.com';      //
///////////////////////////////////////////
let root=process.env.API_ROOT;
// let root='http://47.98.238.6;'
let axios=require('axios');

let QS=require('qs');

import networkcode from './network'
import webapi from './webapi'

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

function apiAxios(method,url,params,success,failure){
	axios({
		method: method,
		url: url,
		data: method === 'POST' || method === 'PUT' ? QS.stringify(params):null,
		params:method === 'GET' || method === 'DELETE' ? params : null,
		baseURL:root,
    	withCredentials: true
	})
	.then(function (res,e) {
		if (res.status === 200) {
			success(res.data)
		} else {
			if (failure) {
				failure(res.data)
			} else {
				networkcode.getApiCode(res.msg)
			}
		}
    })
    .catch(function (err) {
		console.log(err)
		let res = err.response
		if (err) {
			networkcode.getCode(err)
			return
		}
    })
}

// 返回在vue模板中的调用接口
export default {
	get: function (url, params, success, failure) {
		return apiAxios('GET', url, params, success, failure)
	},
	post: function (url, params, success, failure) {
		return apiAxios('POST', url, params, success, failure)
	},
	put: function (url, params, success, failure) {
		return apiAxios('PUT', url, params, success, failure)
	},
	delete: function (url, params, success, failure) {
		return apiAxios('DELETE', url, params, success, failure)
	},
	root:root
}
