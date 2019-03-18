import * as types from '../type'
import http from '../../api/api.js'

const state={
    // 分页
    pageData:{
        //分页数
        arrPageSize:[5,10,15,20],
        //分页大小
        pagesize:15,
        //总分页数
        pageCount:1,
        //当前页面
        pageCurrent:1,
        //总数
        totalCount:10
    },
    type:'',
    courseId:'',
    status:'',
    // 精选分页
    pageStar:{
        //分页数
        arrPageSize:[5,10,15,20],
        //分页大小
        pagesize:15,
        //总分页数
        pageCount:1,
        //当前页面
        pageCurrent:1,
        //总数
        totalCount:10
    },
    typeStar:'',
    courseIdStar:'',
    statusStar:'',
    // 名著阅读分页
    pageRead:{
        //分页数
        arrPageSize:[5,10,15,20],
        //分页大小
        pagesize:15,
        //总分页数
        pageCount:1,
        //当前页面
        pageCurrent:1,
        //总数
        totalCount:10
    },
}

const mutations={
    pageSearch(state,data){
        state.pageData.pageCurrent=data.pageCurrent;
        state.pageData.pagesize=data.pagesize;
        state.pageData.pageCount=data.pageCount;
        state.pageData.totalCount=data.totalCount;
    },
    typeSearch(state,data){
        state.type=data
    },
    courseIdSearch(state,data){
        state.courseId=data
    },
    statusSearch(state,data){
        state.status=data
    },
    // 精选
    pageSearchStar(state,data){
        state.pageStar.pageCurrent=data.pageCurrent;
        state.pageStar.pagesize=data.pagesize;
        state.pageStar.pageCount=data.pageCount;
        state.pageStar.totalCount=data.totalCount;
    },
    typeSearchStar(state,data){
        state.typeStar=data
    },
    courseIdSearchStar(state,data){
        state.courseIdStar=data
    },
    statusSearchStar(state,data){
        state.statusStar=data
    },
    // 名著阅读
    pageSearchRead(state,data){
        state.pageRead.pageCurrent=data.pageCurrent;
        state.pageRead.pagesize=data.pagesize;
        state.pageRead.pageCount=data.pageCount;
        state.pageRead.totalCount=data.totalCount;
    },
}

const actions={
    // 分页
    pageSearch({commit},data){
        commit('pageSearch',data)
    },
    // 精选分页
    pageSearchStar({commit},data){
        commit('pageSearchStar',data)
    },
    // 名著阅读分页
    pageSearchRead({commit},data){
        commit('pageSearchRead',data)
    },
}
export default ({
    state,
    mutations,
    actions
})
