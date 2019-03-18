// import * as types from '../type'
import http from '../../api/api.js'
import common from '../../api/common.js'

const state={
    togData:[],//点击章节展开时的数据存储
    selData:[],//点击章节选中章节的数据存储
    bookData:[],//教辅数据
    selState:0,//章节类型 0使用校本库章节 1使用教辅章节
    selActive:"n1",//选择的录题方式
    itemName:"n1",//选择的录题方式
    charCountObj:{
        total:0,//章节需要录入的总条数
        alreadyCount:0,//章节已经录入的总条数
    },
    chapterData:[],//待提交和待修改查询章节
}

const mutations={
    togDataEnter(state,data){
        state.togData=data
    },
    selDataEnter(state,data){
        state.selData=data
    },
    bookDataEnter(state,data){
        state.bookData=data
    },
    selStateEnter(state,data){
        state.selState=data
    },
    selActiveEnter(state,data){
        state.selActive=data
    },
    itemNameEnter(state,data){
        state.itemName=data
    },
    chapterArrayNew(state,data){
        state.chapterData=data
    },
    charCountEnter(state,data){
        state.charCountObj.total=data.total
        state.charCountObj.alreadyCount=data.alreadyCount
    },
}

const actions={
    chapterArrayNew({commit},data){
        var parmas={
            id:data,
            state: 1
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
                    commit('chapterArrayNew',convert)
                    resolve(convert);
                }else{
                    netcode.getApiCode(reset)
                    resolve();
                }
            })
        })
    },
    chapterArrayNews({commit},data){
        var parmas={
            id:data,
            state: 1
        }
        const map={
            value:'id',
            label:'title'
        }
        return new Promise((resolve,reject)=>{
            http.get('/admin/api/bookName/chapter/list',parmas).then(reset => {
                if (reset.code === 200){
                    var convert=common.convertTree(reset.data,map)
                    commit('chapterArrayNew',convert)
                    resolve(convert);
                }else{
                    netcode.getApiCode(reset)
                    resolve();
                }
            })
        })
    },
}
export default ({
    state,
    mutations,
    actions
})
