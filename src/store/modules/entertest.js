// 题目录入数据管理
import {Message} from 'iview'
import network from '../../api/network.js'
import webapi from '../../api/webapi.js'
import http from '../../api/api.js'
import common from '../../api/common.js'
import tree from '../../script/tree.js'

export default({
    state:{
        enter_datas:{},//所有数据
        datas:[],//根据年级id获取学科 教材 版本数据
        textVersionDatas:[],//根据学科id获取教材版本数据
        typeArray:[],//根据学科id获取题型数据
        textDatas:[],//根据教材版本id获取教材数据
        chapterDatas:[],//根据教材获取章节数据
        chapterNewDatas:[],//根据教材获取章节数据
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
        chapterText:[],//章节文字
        chapterArray:[],//选择章节数据id
        knowledge:'',//知识点
        difficulty:'',//难度
        difficultyText:'',//难度
        source:'',//来源
        assistants:'',//教辅
        questionId:'',//题号
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
        linkBool:true,//是否链接导入
        // 题目编辑数据
        question:'',//题目
        selectionKey:'',//正确答案
        gradeSel:0,
        courseSel:0,
        textbookSel:0,
        textbookVersionSel:0,
        difficultySel:0,
        assistantsSel:0,
        chapterSel:0,
        typeSel:0,
        knowledgeSel:0,
        sourceSel:0,
        questionSel:0,
        contentSel:0,
        selectionSel:0,
        selectionKeySel:0,
        answerSel:0,
        analysisSel:0,
        seletionDatas:'',//选项修改数据
        // removeDatas:'',//删除编辑数据数据
        selShow:true,//判断是否显示小题
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
        chapterText :state => state.chapterText,
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
        enterDatasEnter(state,data){
            state.enter_datas=data;
        },
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
        courseDataEnter(state,data){
            state.datas=data;
        },
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
        gradeIdEnter(state,data){
            state.grade=data
        },
        gradeEnter(state,data){
            state.grade=data.value
            state.gradeText=data.label
        },
        courseIdEnter(state,data){
            state.course=data
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
            state.textbookVersionText=data.name
            state.textbookVersion=data.id
        },
        textbookVersionIdEnter(state,data){
            state.textbookVersion=data
        },
        textbookVersionDatasEnter(state,data){
            state.textVersionDatas=data
        },
        textbookEnter(state,data){
            state.textbook=data.id
            state.textbookText=data.name
        },
        textbookDataEnter(state,data){
            state.textDatas=data
        },
        textbookIdEnter(state,data){
            state.textbook=data
        },
        chapterDatasEnter(state,data){
            state.chapterArray=[];
            state.chapterDatas=data;
        },
        chapterDatasEnters(state,data){
            state.chapterArray=[];
            state.chapterNewDatas=data;
        },//新题录入章节数据
        knowledgeDatasEnter(state,data){
            state.knowledge='';
            state.knowledgeDatas=data;
            state.knowledgeDisabled=false;
        },
        knowledgeDisabledEnter(state){
            state.knowledgeDisabled=true;
        },
        typeIdEnter(state,data){
            state.type=data
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
            if(state.chapterArray.length==0){
                state.chapterText=[]
            }
        },
        // 选中难度,存储选中值
        difficultyIdEnter(state,data){
            state.difficulty=data
        },
        difficultyEnter(state,data){
            state.difficulty=data.id
            state.difficultyText=data.name
        },
        knowledgeEnter(state,data){
            state.knowledge=data
        },
        sourceEnter(state,data){
            state.source=data
        },
        assistantsEnter(state,data){
            state.assistants=data
        },
        questionIdEnter(state,data){
            state.questionId=data
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
        // 题目编辑
        questionEnter(state,data){
            // console.log(data);
            state.question=data
        },
        selectionKeyEnter(state,data){
            // console.log(data);
            state.selectionKey=data
        },
        editDataEnter(state,data){
            state.gradeSel=0,
            state.courseSel=0,
            state.textbookSel=0,
            state.textbookVersionSel=0,
            state.difficultySel=0,
            state.assistantsSel=0,
            state.chapterSel=0,
            state.typeSel=0,
            state.knowledgeSel=0,
            state.sourceSel=0,
            state.questionSel=0,
            state.contentSel=0,
            state.selectionSel=0,
            state.selectionKeySel=0,
            state.answerSel=0,
            state.analysisSel=0
        },
        gradeSelEnter(state,data){
            state.gradeSel=1
        },
        courseSelEnter(state,data){
            state.courseSel=1
        },
        textbookSelEnter(state,data){
            state.textbookSel=1
        },
        textbookVersionSelEnter(state,data){
            state.textbookVersionSel=1
        },
        difficultySelEnter(state,data){
            state.difficultySel=1
        },
        assistantsSelEnter(state,data){
            state.assistantsSel=1
        },
        chapterSelEnter(state,data){
            state.chapterSel=1
        },
        typeSelEnter(state,data){
            state.typeSel=1
        },
        knowledgeSelEnter(state,data){
            state.knowledgeSel=1
        },
        sourceSelEnter(state,data){
            state.sourceSel=1
        },
        questionSelEnter(state,data){
            state.questionSel=1
        },
        contentSelEnter(state,data){
            state.contentSel=1
        },
        selectionSelEnter(state,data){
            state.selectionSel=1
        },
        selectionKeySelEnter(state,data){
            state.selectionKeySel=1
        },
        answerSelEnter(state,data){
            state.answerSel=1
        },
        analysisSelEnter(state,data){
            state.analysisSel=1
        },
        seletionDatasSelEnter(state,data){
            state.seletionDatas=data
        },
        removeDatas(state,data){
            state.content='';//题干
            state.selection='';//选项
            state.answer='';//答案
            state.analysis='';//解析
        },
        // 判断是否显示小题
        selShowEnter(state,data){
            state.selShow=data;
        },
    },
    actions:{
        courseEnter ({ commit },data) {
            commit('courseEnter',data)
        },
        // 进入页面获取学科数据
        gradeEnter ({ commit },data) {
            const parmas={
                id:data.value
            }
            http.get('/admin/api/grade/course/list',parmas).then((res)=>{
                if (res.code === 200){
                    // _this.alldata = res.data
                    webapi.save("enterCourse",JSON.stringify(res.data));
                    commit('datasEnter',res.data)
                    commit('gradeEnter',data)
                }else{
                    network.getApiCode(res)
                }
            })

        },
        // 进入页面获取学科数据
        gradeIdEnter ({ commit },data) {
            const parmas={
                id:data
            }
            http.get('/admin/api/grade/course/list',parmas).then((res)=>{
                if (res.code === 200){
                    // _this.alldata = res.data
                    webapi.save("enterCourse",JSON.stringify(res.data));
                    commit('courseDataEnter',res.data)
                    commit('gradeIdEnter',data)
                }else{
                    network.getApiCode(res)
                }
            })

        },
        // 进入页面获取难度数据
        difficultyDatasEnter ({ commit },data) {
            http.get('/admin/api/difficulty/list',null).then((res)=>{
                if (res.code === 200){
                    webapi.save("enterDifficulty",JSON.stringify(res.data));
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
                    webapi.save("enterType",JSON.stringify(res.data));
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
                    id:data,
                    state:1
                }
                const map={
                    value:'id',
                    label:'name',
                    children:'chapters',
                }
                http.get('/admin/api/chapter/list',parmas).then((res)=>{
                    if (res.code === 200){
                        if(res.data){
                            var convert=common.convertTree(res.data,map)
                            webapi.save("enterChapters",JSON.stringify(convert));
                            commit('chapterDatasEnter',convert)
                        }else{
                            var arr=[]
                            commit('chapterDatasEnter',arr)
                        }
                    }else{
                        network.getApiCode(res)
                    }
                })
            }
        },
        chapterDatasEnters ({ commit },data) {
            if (data==undefined) {
                data=[];
                commit('chapterDatasEnters',data)
            }else{
                const parmas={
                    id:data,
                    state:1
                }
                const map={
                    id:'id',
                    pid:'pid',
                    title:'name',
                    children:'chapters',
                }
                http.get('/admin/api/chapter/list',parmas).then((res)=>{
                    if (res.code === 200){
                        if(res.data){
                            var convert=tree.treeConversion(res.data,map)
                            commit('chapterDatasEnters',convert)
                        }else{
                            var arr=[]
                            commit('chapterDatasEnters',arr)
                        }
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
        questionIdEnter ({ commit },data) {
            commit('questionIdEnter',data)
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
        // 题目编辑
        questionEnter ({ commit },data) {
            commit('questionEnter',data)
        },
        selectionKeyEnter ({ commit },data) {
            commit('selectionKeyEnter',data)
        },
        seletionDatasSelEnter ({ commit },data) {
            commit('seletionDatasSelEnter',data)
        },
    }
})
