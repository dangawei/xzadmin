import * as types from '../type'
import http from '../../api/api.js'

const state={
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

    usetest_data_datas:Object,//题目总数据
    question:'',//题目
    content:'',//题干
    selection:'',//选项
    selectionKey:'',//正确选项
    answer:'',//答案
    analysis:'',//解析

    chapter:'',
    questionId:'',
    course:'',
    type:'',
    id:'',
    uid:'',
    scope:'',
    knowledgeList:[],
    inputShow:''
}

const mutations={
    [types.usetest_data_datas](state,data){
        state.usetest_data_datas=data;
        state.chapter=data.chapter;
        state.questionId=data.questionId;
        state.course=data.course;
        state.type=data.type;
        state.id=data.id;
        if (data.uid) {
            state.uid=data.uid;
        }
        if (data.knowledgeList) {
            state.knowledgeList=data.knowledgeList;
        }
        state.scope=data.scope;
    },
    [types.usetest_data_question](state,data){
        state.question=data;
    },
    [types.usetest_data_content](state,data){
        state.content=data;
    },
    [types.usetest_data_selection](state,data){
        state.selection=data;
    },
    [types.usetest_data_selectionKey](state,data){
        state.selectionKey=data;
    },
    [types.usetest_data_answer](state,data){
        state.answer=data;
    },
    [types.usetest_data_analysis](state,data){
        state.analysis=data;
    },
    inputShowFeedback(state,data){
        state.inputShow=data
    },
    usepageSearch(state,data){
        state.pageData.pageCurrent=data.pageCurrent;
        state.pageData.pagesize=data.pagesize;
        state.pageData.pageCount=data.pageCount;
        state.pageData.totalCount=data.totalCount;
    },
}

const actions={
    // 分页
    usepageSearch({commit},data){
        commit('usepageSearch',data)
    },
    usetest_data_datas({commit},data){
        commit(types.usetest_data_datas,data);
    },
    usetest_data_question({commit},data){
        commit(types.usetest_data_question,data);
    },
    usetest_data_content({commit},data){
        commit(types.usetest_data_content,data);
    },
    usetest_data_selection({commit},data){
        commit(types.usetest_data_selection,data);
    },
    usetest_data_selectionKey({commit},data){
        commit(types.usetest_data_selectionKey,data);
    },
    usetest_data_answer({commit},data){
        commit(types.usetest_data_answer,data);
    },
    usetest_data_analysis({commit},data){
        commit(types.usetest_data_analysis,data);
    },
    inputShowFeedback({commit},data){
        commit('inputShowFeedback',data);
    },
}
export default ({
    state,
    mutations,
    actions
})
