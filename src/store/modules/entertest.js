// 题目录入数据管理
import {Message} from 'iview'
import network from '../../api/network.js'
import webapi from '../../api/webapi.js'
import http from '../../api/api.js'
import common from '../../api/common.js'
import tree from '../../script/tree.js'

export default({
    state:{
        datas:[],//根据年级id获取学科 教材 版本数据
        textVersionDatas:[],//根据学科id获取教材版本数据
        typeArray:[],//根据学科id获取题型数据
        textDatas:[],//根据教材版本id获取教材数据
        chapterDatas:[],//根据教材获取章节数据
        knowledgeDatas:[],//根据学科id获取获取知识点数据
        difficulty_datas:[],//根获取难度数据

        // datas:Number,//根据年级id获取学科 教材 版本数据
        course:'',//增加试题学科
        courseText:'',//增加试题学科
        courseData:{},//学科数据
        grade:'',//年级
        gradeText:'',//年级
        textbook:'',//教材
        textbookText:'',//教材
        textbookVersion:'',//教材版本
        textbookVersionText:'',//教材版本
        type:'',//题型
        chapterText:'',//章节id
        chapterArray:[],//选择章节数据
        knowledge:'',//知识点
        difficulty:'',//难度
        difficultyText:'',//难度
        source:'',//来源
        assistants:'',//教辅
        content:'',//题干
        contentText:'',//题干
        selection:'',//选项
        item:'',//小题
        selectionText:'',//选项
        answer:'',//答案
        answerText:'',//答案
        analysis:'',//解析
        analysisText:'',//解析
        knowledgeDisabled:true,
        handBool:true,
        linkBool:true//是否链接导入
    },
    getters:{
        doneDatas : function(state){
            return state.datas
        },
        textDatas : function(state){
            return state.textDatas
        },
        chapterDatas :state=>state.chapterDatas,
        knowledgeDatas :state=>state.knowledgeDatas,
        knowledgeDisabled :state=>state.knowledgeDisabled,
        doneCourse : state => state.course,
        courseText: state => state.courseText,
        grade : state => state.grade,
        gradeText : state => state.gradeText,
        textbook : state => state.textbook,
        textbookText : state => state.textbookText,
        textbookVersion : state => state.textbookVersion,
        textVersionDatas : state => state.textVersionDatas,
        textbookVersionText : state => state.textbookVersionText,
        type : state => state.type,
        typeArray : state => state.typeArray,
        chapterText : state => state.chapterText,
        chapterArray : state => state.chapterArray,
        knowledge : state => state.knowledge,
        knowledgeText : state => state.knowledgeText,
        difficulty : state => state.difficulty,
        difficultyText : state => state.difficultyText,
        source : state => state.source,
        sourceText : state => state.sourceText,
        assistants : state => state.assistants,
        assistantsText : state => state.assistantsText,
        content : state => state.content,
        contentText : state => state.contentText,
        selection : state => state.selection,
        item : state => state.item,
        selectionText : state => state.selectionText,
        answer : state => state.answer,
        answerText : state => state.answerText,
        analysis : state => state.analysis,
        analysisText : state => state.analysisText,
        link : state => state.link,
        handBool : state => state.handBool,
        linkBool : state => state.linkBool,
    },
    mutations:{
        datasEnter(state,data){
            state.course='';
            state.textbook='';
            // state.textDatas=[];
            // state.chapterDatas=[];
            state.textbookVersion='';
            state.chapterArray=[];
            state.datas=data;
        },
        // 进入页面获取难度数据
        difficultyDatasEnter(state,data){
            state.difficulty_datas=data;
        },
        // 选中学科,获得教材版本数据
        textVersionDatasEnter(state,data){
            state.textbook='';
            state.type='';
            state.textbookVersion='';
            // state.chapterDatas=[];
            state.chapterArray=[];
            state.textVersionDatas=data;
        },
        typeArrayEnter(state,data){
            state.typeArray=data;
        },
        courseEnter(state,data){
            if (data==undefined) {
                state.course=''
                state.courseText=''
            }else{
                state.course=data.id
                state.courseText=data.name
            }
        },
        // 选中教材版本,获得教材数据
        textDatasEnter(state,data){
            state.textbook='';
            // state.chapterDatas=[];
            state.chapterArray=[];
            state.textDatas=data;
        },
        textbookVersionEnter(state,data){
            console.log(data);
            state.textbookVersionText=data.name
            state.textbookVersion=data.id
        },
        chapterDatasEnter(state,data){
            state.chapterArray=[];
            state.chapterDatas=data;
        },
        knowledgeDatasEnter(state,data){
            state.knowledge='';
            state.knowledgeDatas=data;
            state.knowledgeDisabled=false;
        },
        knowledgeDisabledEnter(state){
            state.knowledgeDisabled=true;
        },
        gradeEnter(state,data){
            state.grade=data.value
            state.gradeText=data.label
        },
        textbookEnter(state,data){
            state.textbook=data.id
            state.textbookText=data.name
        },
        typeEnter(state,data){
            state.type=data.value
            state.typeText=data.label
        },
        // 选择完章节赋值
        chapterTextEnter(state,data){
            state.chapterText=data
        },
        chapterArrayEnter(state,data){
            state.chapterArray=data
        },
        knowledgeEnter(state,data){
            state.knowledge=data
        },
        // 选中难度,存储选中值
        difficultyEnter(state,data){
            state.difficulty=data.id
            state.difficultyText=data.name
        },
        sourceEnter(state,data){
            state.source=data
        },
        assistantsEnter(state,data){
            state.assistants=data
        },
        contentEnter(state,data){
            state.content=data
        },
        selectionEnter(state,data){
            state.selection=data
        },
        itemEnter(state,data){
            state.item=data
        },
        answerEnter(state,data){
            state.answer=data
        },
        analysisEnter(state,data){
            state.analysis=data
        },
        handBoolEnter(state,data){
            // console.log(data);
            state.handBool=data
        },
        linkBoolEnter(state,data){
            // console.log(data);
            state.linkBool=data
        },
        LinkEnter(state,data){
            // console.log(data);
            state.link=data
        },
    },
    actions:{
        courseEnter ({ commit },data) {
            commit('courseEnter',data)
        },
        // 进入页面获取年级数据
        gradeEnter ({ commit },data) {
            const parmas={
                id:data.value
            }
            http.get('/admin/api/grade/course/list',parmas).then((res)=>{
                if (res.code === 200){
                    // _this.alldata = res.data
                    commit('datasEnter',res.data)
                    commit('gradeEnter',data)
                }else{
                    network.getApiCode(res)
                }
            })

        },
        // 进入页面获取难度数据
        difficultyDatasEnter ({ commit },data) {
            http.get('/admin/api/difficulty/list',null).then((res)=>{
                if (res.code === 200){
                    commit('difficultyDatasEnter',res.data)
                }else{
                    network.getApiCode(res)
                }
            })

        },
        typeArrayEnter ({ commit },data) {
            const parmas={
                id:data
            }
            http.get('/admin/api/type/list',parmas).then((res)=>{
                if (res.code === 200){
                    // _this.alldata = res.data
                    commit('typeArrayEnter',res.data)
                }else{
                    network.getApiCode(res)
                }
            })

        },
        knowledgeDisabledEnter ({ commit }) {
            commit('knowledgeDisabledEnter')
        },
        knowledgeDatasEnter ({ commit },data) {
            // console.log(data)
            if (data==undefined) {
                data=[];
                commit('knowledgeDatasEnter',data)
            }else{
                const parmas={
                    id:data
                }
                const map={
                    id:'id',
                    title:'name',
                    children:'knowledges',
                }
                http.get('/admin/api/knowledge/list',parmas).then((res)=>{
                    if (res.code === 200){
                        if (res.data) {
                            var trees=tree.treeConversion(res.data,map)
                            commit('knowledgeDatasEnter',trees)
                        }else{
                            Message.error("暂无知识点数据!")
                        }
                    }else{
                        network.getApiCode(res)
                    }
                })
            }
        },
        chapterDatasEnter ({ commit },data) {
            if (data==undefined) {
                data=[];
                commit('chapterDatasEnter',data)
            }else{
                const parmas={
                    id:data
                }
                const map={
                    value:'id',
                    label:'name',
                    children:'chapters',
                }
                http.get('/admin/api/chapter/list',parmas).then((res)=>{
                    if (res.code === 200){
                        var convert=common.convertTree(res.data,map)
                        commit('chapterDatasEnter',convert)
                    }else{
                        network.getApiCode(res)
                    }
                })
            }
        },
        textbookEnter ({ commit },data) {
            commit('textbookEnter',data)
        },
        textVersionDatasEnter ({ commit },data) {
            if(data==undefined){
                data=null
            }
            commit('textVersionDatasEnter',data)
        },
        // 选中教材版本后
        textDatasEnter ({ commit },data) {
            if(data==undefined){
                data=null
            }
            commit('textDatasEnter',data)
        },
        textbookVersionEnter ({ commit },data) {
            if(data==undefined){
                data=null
            }
            commit('textbookVersionEnter',data)
        },

        typeEnter ({ commit },data) {
            commit('typeEnter',data)
        },
        // 选择完章节赋值
        chapterTextEnter ({ commit },data) {
            commit('chapterTextEnter',data)
        },
        chapterArrayEnter ({ commit },data) {
            commit('chapterArrayEnter',data)
        },
        knowledgeEnter ({ commit },data) {
            commit('knowledgeEnter',data)
        },
        // 选中难度
        difficultyEnter ({ commit },data) {
            commit('difficultyEnter',data)
        },
        sourceEnter ({ commit },data) {
            commit('sourceEnter',data)
        },
        assistantsEnter ({ commit },data) {
            commit('assistantsEnter',data)
        },
        contentEnter ({ commit },data) {
            commit('contentEnter',data)
        },
        selectionEnter ({ commit },data) {
            commit('selectionEnter',data)
        },
        itemEnter ({ commit },data) {
            commit('itemEnter',data)
        },
        answerEnter ({ commit },data) {
            commit('answerEnter',data)
        },
        analysisEnter ({ commit },data) {
            commit('analysisEnter',data)
        },
        handBoolEnter ({ commit },data) {
            commit('handBoolEnter',data)
        },
        linkBoolEnter ({ commit },data) {
            commit('linkBoolEnter',data)
        },
        LinkEnter ({ commit },data) {
            commit('LinkEnter',data)
        },
    }
})
