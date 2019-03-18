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
					path:'/account/list',
					name:'accountList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/account/accountList'],resolve)
				},
				{
					path:'/role/list',
					name:'roleList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/role/roleList'],resolve)
				},
				{
					path:'/role/resource/:id',
					name:'roleResource',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/role/roleResource'],resolve)
				},
				// 菜单管理
				{
					path:'/menu/add',
					name:'addMenu',
					meta:{
						keepAlive: false, //此组件不需要被缓存
					},
					component:(resolve)=>require(['@/components/menu/addMenu'],resolve)
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
						keepAlive: false, //此组件不需要被缓存
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
						keepAlive: false, //此组件不需要被缓存
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
					path:'/topic/feedback/list',
					name:'topicFeedbackList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false,
					},
					component:(resolve)=>require(['@/components/test/topic/topicFeedbackList'],resolve)
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
					path:'/pubtopic/feedback/list',
					name:'pubtopicFeedbackList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/test/pubtopic/pubtopicFeedbackList'],resolve)
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
				// 班级管理
				{
					path:'/class/list',
					name:'classList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/class/classList'],resolve)
				},
				// 学校管理
				{
					path:'/school/list',
					name:'schoolList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/school/schoolList'],resolve)
				},
				//录题管理
				{
					path:'/enter/list',
					name:'enterList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/enter/enterList/enterSubmitList'],resolve)
				},
				// 录入试题
				// 老式录题
				{
					path:'/enter/test',
					name:'enterNew',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/enter/enterNew/enterNew'],resolve)
				},
				{
					path:'/enter/test/list',
					name:'enterTestList',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/enter/enterNew/enterTestList'],resolve)
				},
				// 新式录题
				{
					path:'/enter/new/test',
					name:'enterNewTest',
					component:(resolve)=>require(['@/components/enter/enterNew/enterNewTest'],resolve)
				},

				// 新闻管理
				{
					path:'/new/add',
					name:'addNew',
					component:(resolve)=>require(['@/components/new/addNew'],resolve)
				},
				{
					path:'/new/list',
					name:'newList',
					component:(resolve)=>require(['@/components/new/newList'],resolve)
				},
				{
					path:'/star/new/list',
					name:'newStarList',
					component:(resolve)=>require(['@/components/new/star/starNewList'],resolve)
				},
				{
					path:'/new/detail/:id',
					name:'detailNew',
					component:(resolve)=>require(['@/components/new/detailNew'],resolve)
				},
				{
					path:'/new/edit/:id',
					name:'editNew',
					component:(resolve)=>require(['@/components/new/editNew'],resolve)
				},
				// 名著阅读
				{
					path:'/read/add',
					name:'addRead',
					component:(resolve)=>require(['@/components/new/read/addRead'],resolve)
				},
				{
					path:'/read/list',
					name:'readList',
					component:(resolve)=>require(['@/components/new/read/readList'],resolve)
				},
				{
					path:'/read/edit/:id',
					name:'editRead',
					component:(resolve)=>require(['@/components/new/read/editRead'],resolve)
				},
				// 消息管理
				{
					path:'/message/list',
					name:'messageList',
					component:(resolve)=>require(['@/components/message/messageList'],resolve)
				},
				// ip白名单管理
				{
					path:'/ip/list',
					name:'ipList',
					component:(resolve)=>require(['@/components/ip/ipList'],resolve)
				},
				// 系统反馈管理
				{
					path:'/systemfeed/list',
					name:'systemfeedList',
					component:(resolve)=>require(['@/components/systemfeed/systemfeedList'],resolve)
				},
			]
		},
		{
			path: '/enter',
			name: 'Enter',
			component: (resolve)=>require(['@/components/enter'],resolve),
			children:[
				// 新题录入预览
				{
					path:'/enter/new/list',
					name:'enterNewList',
					component:(resolve)=>require(['@/components/enter/enterNew/enterNewList'],resolve)
				},
				// 待修改
				{
					path:'/enter/fack/list',
					name:'enterFackList',
					component:(resolve)=>require(['@/components/enter/enterList/enterFackList'],resolve)
				},
				// 待提交
				{
					path:'/enter/submit/list',
					name:'enterSubmitList',
					component:(resolve)=>require(['@/components/enter/enterList/enterSubmitList'],resolve)
				},
				// 选择教辅
				{
					path:'/enter/teach/test',
					name:'enterTeachTest',
					component:(resolve)=>require(['@/components/enter/enterNew/enterTeachTest'],resolve),
					children:[
						{
							path:'/enter/teach/link',
							name:'enterTeachLink',
							component:(resolve)=>require(['@/components/enter/enterNew/enterTeachLink'],resolve),
							meta:{
								enterBool:false
							},
						},
						{
							path:'/enter/teach/hand',
							name:'enterTeachHand',
							component:(resolve)=>require(['@/components/enter/enterNew/enterTeachHand'],resolve)
						},
						{
							path:'/enter/teach/word',
							name:'enterTeachWord',
							component:(resolve)=>require(['@/components/enter/enterNew/enterTeachWord'],resolve)
						}
					]
				},
				{
					path:'/import/test',
					name:'importTest',
					meta:{
						keepAlive: false, //此组件不需要被缓存
						boolOnloading:false
					},
					component:(resolve)=>require(['@/components/enter/enterNew/importTest'],resolve)
				},
			]
		}
	]
})
