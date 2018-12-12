import Vue from 'vue'
import Router from 'vue-router'
// import Role from '@/components/role/roleList'
// import Home from '@/components/home'

Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [
		{
			path: '/',
			name: 'Home',
			component: (resolve)=>require(['@/components/home'],resolve),
			meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	        },
		},
		{
			path: '/login',
			name: 'Login',
			component: (resolve)=>require(['@/components/login'],resolve),
		},
		{
			path: '/home',
			name: 'Home',
			component: (resolve)=>require(['@/components/home'],resolve),
			meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	        },
			// component: Home,
			children:[
				{
					path:'/role/list',
					name:'Role',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/role/roleList'],resolve)
				},
				// {
				// 	path:'/app/list',
				// 	name:'App',
				// 	// component:Role
				// 	component:(resolve)=>require(['@/components/app/appList'],resolve)
				// },
				{
					path:'/app/version/list',
					name:'versionList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/app/version/versionList'],resolve)
				},
				{
					path:'/app/desktop/list',
					name:'desktopList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/app/desktop/desktopList'],resolve)
				},
				{
					path:'/app/desktop/add',
					name:'addDesktop',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/app/desktop/addDesktop'],resolve)
				},
				{
					path:'/app/desktop/edit/:id',
					name:'editDesktop',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/app/desktop/editDesktop'],resolve)
				},
				// 题目反馈
				{
					path:'/feedback/list',
					name:'feedbackList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false,
					},
					component:(resolve)=>require(['@/components/feedback/feedbackList'],resolve)
				},
				{
					path:'/feedback/edit/:id',
					name:'feedbackEdit',
					meta:{
						keepAlive: true, //此组件不需要被缓存
						loading:false,//是否读取本地数据
					},
					component:(resolve)=>require(['@/components/feedback/feedbackEdit'],resolve)
				},
				{
					path:'/feedback/preview/:id',
					name:'feedbackPreview',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/feedback/feedbackPreview'],resolve)
				},
				// 正式试题
				{
					path:'/use/test/list',
					name:'useTestList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false,
					},
					component:(resolve)=>require(['@/components/usetest/useTestList'],resolve)
				},
				{
					path:'/use/test/edit/:uid',
					name:'useTestEdit',
					meta:{
						keepAlive: true, //此组件不需要被缓存
						loading:false,//是否读取本地数据
					},
					component:(resolve)=>require(['@/components/usetest/useTestEdit'],resolve)
				},
				{
					path:'/use/test/preview/:uid',
					name:'useTestPreview',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/usetest/useTestPreview'],resolve)
				},

				// 题目管理
				// 校本库页面路由
				{
					path:'/topic/list',
					name:'topicList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false,
					},
					component:(resolve)=>require(['@/components/test/topic/topicList'],resolve)
				},
				{
					path:'/topic/edit/:id',
					name:'topicEdit',
					meta:{
						keepAlive: true, //此组件需要被缓存
						loading:false,//是否读取本地数据
					},
					component:(resolve)=>require(['@/components/test/topic/topicEdit'],resolve)
				},
				{
					path:'/topic/preview/:id',
					name:'topicPreview',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/test/topic/topicPreview'],resolve)
				},
				/////////
				// 公共库 //
				/////////
				// 校本库页面路由
				{
					path:'/pubtopic/list',
					name:'pubtopicList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/test/pubtopic/pubtopicList'],resolve)
				},
				{
					path:'/pubtopic/edit/:id',
					name:'pubtopicEdit',
					meta:{
						keepAlive: true, //此组件需要被缓存
						loading:false,//是否读取本地数据
					},
					component:(resolve)=>require(['@/components/test/pubtopic/pubtopicEdit'],resolve)
				},
				{
					path:'/pubtopic/preview/:id',
					name:'pubtopicPreview',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/test/pubtopic/pubtopicPreview'],resolve)
				},
				// 学生管理
				{
					path:'/student/list',
					name:'studentList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/student/studentList'],resolve)
				},
				// 教师管理
				{
					path:'/teacher/list',
					name:'teacherList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/teacher/teacherList'],resolve)
				},
				// 录入试题
				{
					path:'/enter/test',
					name:'enterTest',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/test/entertest/enterTest'],resolve)
				},
				{
					path:'/enter/test/preview',
					name:'entertestPreview',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/test/entertest/entertestPreview'],resolve)
				},
				{
					path:'/analysis/enter/preview',
					name:'analysisTestPreview',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/test/entertest/analysisTestPreview'],resolve)
				},
				{
					path:'/edit/enter',
					name:'editEnter',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/test/entertest/editEnter'],resolve)
				},
				{
					path:'/import/test',
					name:'importTest',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/test/entertest/importTest'],resolve)
				},
			]
		}
	]
})
