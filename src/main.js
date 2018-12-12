// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store/test'
import store from './store/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './css/common.css'
import api from './api/index.js'
import network from './api/network.js'
import webapi from './api/webapi.js'
import http from './api/api.js'
import common from './api/common.js'
import filter from './filter/date.js' //筛选器
import '../static/UEditor/ueditor.config.js'
import '../static/UEditor/ueditor.all.js'
import '../static/UEditor/lang/zh-cn/zh-cn'
import '../static/ueditor/kityformula-plugin/addKityFormulaDialog.js'
import '../static/ueditor/kityformula-plugin/getKfContent.js'
import '../static/ueditor/kityformula-plugin/defaultFilterFix.js'

Vue.config.productionTip = false


Vue.use(iView)

// 判断页面是否需要登录
router.beforeEach((to, from , next) => {
	// console.log(to.matched.some(record => record.meta.requireAuth));
	// console.log(to.matched);
    /*判断下一个路由是否需要登录，对其进行验证*/
    if(to.matched.some(record => record.meta.requireAuth)) {
        let hasAuth=webapi.get("account") //判断用户是否登录
        if(Boolean(hasAuth)) {
            /*如果已经登录，可以进入页面*/
            // if (from.name==='topicPreview') {
            //     console.log(1111)
            //     to.meta.keepAlive = true;  // 让 列表页 缓存，即不刷新
            // }
            next()
        }else {
            next("/login")
        }
    }else{
     	next()
    }
})

Vue.prototype.$api = api
Vue.prototype.$netcode = network
Vue.prototype.$webapi = webapi
Vue.prototype.$http = http
Vue.prototype.$common = common

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
