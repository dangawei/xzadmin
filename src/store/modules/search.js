// 检验管理数据管理
import {Message} from 'iview'
import network from '../../api/network.js'
import http from '../../api/api.js'
import common from '../../api/common.js'
import tree from '../../script/tree.js'

const state={
    // 公用
    search_course_array:[],//搜索学科数据
    search_textbook_array:[],//搜索版本教材数据
    // 分页
    pageData:{
        //分页数
        arrPageSize:[1,5,10,15,20],
        //分页大小
        pagesize:1,
        //总分页数
        pageCount:1,
        //当前页面
        pageCurrent:1,
        //总数
        totalCount:10
    },
    // 校本库数据
    search_course:[],//搜索学科选中id
    search_type:'',//搜索题型选中数据
    search_type_array:[],//搜索题型数据
    search_chapter_array:[],//搜索版本章节数据
    search_chapter:[],//搜索章节选中数据
    // 公共库数据
    pubsearch_type_array:[],//搜索题型数据
    pubsearch_course:[],//搜索学科选中id
    pubsearch_type:'',//搜索题型选中数据
    // 反馈数据
    backsearch_type_array:[],//搜索题型数据
    backsearch_course:[],//搜索学科选中id
    backsearch_type:'',//搜索题型选中数据
    // 正式题库数据
    usesearch_source:1,//搜索题库来源
    usesearch_state:0,//搜索状态
    usesearch_type_array:[],//搜索题型数据
    usesearch_course:[],//搜索学科选中id
    usesearch_type:'',//搜索题型选中数据
}
const mutations={
    // 公用
    courseArraySearch(state,data){
        state.search_course_array=data;
    },
    textbookArraySearch(state,data){
        state.search_textbook_array=[...data];
        state.search_chapter_array=[...data];
    },
    // 分页改变
    pageDataSearch(state,data){
        state.pageData.pageCurrent=data.pageCurrent;
        state.pageData.pagesize=data.pagesize;
        state.pageData.pageCount=data.pages;
        state.pageData.totalCount=data.total;
    },
    // 校本库
    courseSearch(state,data){
        state.search_chapter=[];//重选学科,章节置空
        state.search_type='';//重选学科,题型置空
        state.search_course=data;
    },
    typeArraySearch(state,data){
        state.search_type_array=data;
    },
    typeSearch(state,data){
        state.search_type=data;
    },
    chapterArraySearch(state,data){
        state.search_chapter_array=data;
    },
    chapterSearch(state,data){
        state.search_chapter=data;
    },
    // 公共库
    pubtypeArraySearch(state,data){
        state.pubsearch_type='';//重选学科,题型置空
        state.pubsearch_type_array=data;
    },
    pubcourseSearch(state,data){
        state.pubsearch_course=data;
    },
    pubtypeSearch(state,data){
        state.pubsearch_type=data;
    },
    // 反馈
    backtypeArraySearch(state,data){
        state.backsearch_type_array=data;
    },
    backcourseSearch(state,data){
        state.backsearch_course=data;
    },
    backtypeSearch(state,data){
        state.backsearch_type=data;
    },
    // 正式
    usetypeArraySearch(state,data){
        state.usesearch_type_array=data;
    },
    usecourseSearch(state,data){
        state.usesearch_course=data;
    },
    usetypeSearch(state,data){
        state.usesearch_type=data;
    },
    usesourceSearch(state,data){
        state.usesearch_source=data;
    },
    usestateSearch(state,data){
        state.usesearch_state=data;
    },
}

const actions={
    // 公用分页
    pageDataSearch({commit},data){
        commit('pageDataSearch',data)
    },
    // 公用学科数据
    courseArraySearch({commit},data){
        const map={
            value:'id',
            label:'name',
            children:'list',
        }
        http.get('/admin/api/grade/gradelist',null).then(reset => {
            if (reset.code === 200){
                var convert=common.convertTree(reset.data,map)
                commit('courseArraySearch',convert);
            }else{
                netcode.getApiCode(reset)
            }
        })
    },
    // 选中学科
    courseSearch({commit},data){
        commit('courseSearch',data);
        this.dispatch('typeArraySearch',data[data.length-1])
        this.dispatch('textbookArraySearch',data[data.length-1])
    },
    typeArraySearch({commit},data){
        var parmas={
            id:data
        }
        http.get('/admin/api/type/list',parmas).then(reset => {
            if (reset.code === 200){
                commit('typeArraySearch',reset.data);
            }else{
                netcode.getApiCode(reset)
            }
        })
    },
    textbookArraySearch({commit},data){
        var parmas={
            id:data
        }
        const map={
            value:'id',
            label:'name',
            loading:'loading',
            children:'list',
        }
        http.get('/admin/api/course/textbook/list',parmas).then(reset => {
            if (reset.code === 200){
                var convert=common.convertTree(reset.data,map)
                commit('textbookArraySearch',convert);
            }else{
                netcode.getApiCode(reset)
            }
        })
    },
    // 校本库选中题型
    chapterArrayChanges({commit},data){
        var parmas={
            id:data.value
        }
        const map={
            value:'id',
            label:'name',
            children:'chapters',
        }
        return new Promise((resolve,reject)=>{
            http.get('/admin/api/chapter/list',parmas).then(reset => {
                if (reset.code === 200){
                    var convert=common.convertTree(reset.data,map)
                    resolve(convert);
                }else{
                    netcode.getApiCode(reset)
                    resolve();
                }
            })
        })
    },
    chapterArraySearch({commit},data){
        commit('chapterArraySearch',data);
    },
    typeSearch({commit},data){
        commit('typeSearch',data);
    },
    // 校本库选中章节
    chapterSearch({commit},data){
        commit('chapterSearch',data);
    },
    // 公共库选中题型
    pubcourseSearch({commit},data){
        commit('pubcourseSearch',data);
        this.dispatch('pubtypeArraySearch',data[data.length-1])
    },
    pubtypeArraySearch({commit},data){
        var parmas={
            id:data
        }
        http.get('/admin/api/type/list',parmas).then(reset => {
            if (reset.code === 200){
                commit('pubtypeArraySearch',reset.data);
            }else{
                netcode.getApiCode(reset)
            }
        })
    },
    pubtypeSearch({commit},data){
        commit('pubtypeSearch',data);
    },
    // 反馈
    backcourseSearch({commit},data){
        commit('backcourseSearch',data);
        this.dispatch('backtypeArraySearch',data[data.length-1])
    },
    backtypeArraySearch({commit},data){
        var parmas={
            id:data
        }
        http.get('/admin/api/type/list',parmas).then(reset => {
            if (reset.code === 200){
                commit('backtypeArraySearch',reset.data);
            }else{
                netcode.getApiCode(reset)
            }
        })
    },
    backtypeSearch({commit},data){
        commit('backtypeSearch',data);
    },
    // 正式
    usecourseSearch({commit},data){
        commit('usecourseSearch',data);
        this.dispatch('usetypeArraySearch',data[data.length-1])
    },
    usetypeArraySearch({commit},data){
        var parmas={
            id:data
        }
        http.get('/admin/api/type/list',parmas).then(reset => {
            if (reset.code === 200){
                commit('usetypeArraySearch',reset.data);
            }else{
                netcode.getApiCode(reset)
            }
        })
    },
    usetypeSearch({commit},data){
        commit('usetypeSearch',data);
    },
    usesourceSearch({commit},data){
        commit('usesourceSearch',data);
    },
    usestateSearch({commit},data){
        commit('usestateSearch',data);
    },
}
export default ({
    state,
    mutations,
    actions
})
