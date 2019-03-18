<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>题目管理</BreadcrumbItem>
                <BreadcrumbItem>录题编辑</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>录题编辑</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
        <!-- <div class="page-view allm20">
            <div class="page-view-body"> -->
                <Form :model="formItem" label-position="right" :label-width="80">
                    <div class="pagelist">
                        <h4>题目信息</h4>
                        <div class="pagelist-bd">
                            <Row>
                                <Col :xs="24" :sm="8" :md="6" :lg="6">
                                    <FormItem label="id:" prop="id">
                                        <p>{{formItem.id}}</p>
                                    </FormItem>
                                </Col>
                                <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formItem.grade">
                                    <FormItem label="年级:" prop="grade">
                                        <p>{{formItem.grade}}</p>
                                    </FormItem>
                                </Col>
                                <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formItem.course">
                                    <FormItem label="科目:" prop="course">
                                        <p>{{formItem.course}}</p>
                                    </FormItem>
                                </Col>
                                <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formItem.edition">
                                    <FormItem label="教材版本:" prop="edition">
                                        <p>{{formItem.edition}}</p>
                                    </FormItem>
                                </Col>
                                <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formItem.textbook">
                                    <FormItem label="教材:" prop="textbook">
                                        <p>{{formItem.textbook}}</p>
                                    </FormItem>
                                </Col>
                                <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formItem.type">
                                    <FormItem label="题型:" prop="type">
                                        <p>{{formItem.type}}</p>
                                    </FormItem>
                                </Col>
                                <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formItem.difficulty">
                                    <FormItem label="难度:" prop="difficulty">
                                        <p>{{formItem.difficulty}}</p>
                                    </FormItem>
                                </Col>
                                <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formItem.bookName">
                                    <FormItem label="教辅:" prop="bookName">
                                        <p>{{formItem.bookName}}</p>
                                    </FormItem>
                                </Col>
                                <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formItem.source">
                                    <FormItem label="来源:" prop="source">
                                        <p>{{formItem.source}}</p>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="18" :lg="18" v-if="formItem.chapters">
                                    <FormItem label="章节:" prop="chapters">
                                        <!-- {{formItem.knowledges}} -->
                                        <span class="span-interval">{{formItem.chapters}}</span>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="18" :lg="18" v-if="formItem.knowledgeList">
                                    <FormItem label="知识点:" prop="knowledgeList">
                                        <span v-for="item in formItem.knowledgeList" class="span-interval">{{item}}</span>
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Form>

                <div class="page-divider page-divider-horizontal "></div>
                <Form ref="formItem" :model="formItem" label-position="right" :label-width="80" :rules="ruleValidate">
                    <h4>题目信息修改</h4>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 4, offset: 0 }" :lg="{ span: 4, offset: 0 }">
                            <FormItem label="年级:" prop="grade">
                                <get-grade :importData="formItem.gradeId" @exportData="exportGradeData"></get-grade>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="4" :lg="4">
                            <FormItem label="学科:" prop="course">
                                <get-course :importData="formItem.courseId" @exportData="exportCourseData"></get-course>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="4" :lg="4">
                            <FormItem label="教材版本:" prop="textbookVersion">
                                <get-textbook-version :importData="formItem.editionId" @exportData="exportTextbookVersionData"></get-textbook-version>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="4" :lg="4">
                            <FormItem label="教材:" prop="textbook">
                                <get-textbook :importData="formItem.textbookId" @exportData="exportTextbookData"></get-textbook>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="4" :lg="4">
                            <FormItem label="难易度:" prop="difficulty">
                                <get-difficulty :importData="formItem.difficultyId" @exportData="exportDifficultyData"></get-difficulty>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                            <FormItem label="教辅:" prop="assistants">
                                <Input v-model="formItem.assistants" placeholder="教辅" @input="assistantsInput"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 12, offset: 0 }" :lg="{ span: 12, offset: 0 }">
                            <FormItem label="章节:" prop="chapterArray">
                                <get-chapter @exportData="exportChapterData"></get-chapter>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="题型:" prop="type">
                                <get-type :importData="formItem.typeId" @exportData="exportTypeData"></get-type>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 12, offset: 0 }" :lg="{ span: 12, offset: 0 }">
                            <FormItem label="知识点:" prop="knowledge">
                                <get-knowledge @exportData="exportKnowledgeData"></get-knowledge>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="来源:" prop="source">
                                <Input v-model="formItem.source" placeholder="来源" @input="sourceInput"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <div class="">
                        <Row class="search-row">
                            <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                                <FormItem label="题目:" prop="question">
                                    <vue-ueditor-wrap v-model="formItem.question" :config="myConfig" ref="ueQuestion" @ready="readyQuestion"></vue-ueditor-wrap>
                                    <!-- <vue-ueditor-wrap v-model="formItem.content" :config="myConfig" ref="ueContent"  @ready="readyContent"></vue-ueditor-wrap> -->
                                </FormItem>
                            </Col>
                        </Row>
                        <Row class="search-row">
                            <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                                <FormItem label="题干:" prop="content">
                                    <vue-ueditor-wrap v-model="formItem.content" :config="myConfig" ref="ueContent"  @ready="readyContent"></vue-ueditor-wrap>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row class="search-row" v-if="selShow">
                            <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                                <FormItem label="全部选项:" prop="selection">
                                    <div class="" style="border: 1px solid #D0D0D0;margin-top: 15px;margin-bottom: 15px;padding:15px;">
                                        <div class="">
                                            <Button type="primary" @click="addUe">增加富文本选项</Button>
                                        </div>
                                        <div v-for="(value, key, index) in selectionMsg" :key="key">
                                            <Row style="margin-bottom: 15px;margin-top: 15px;">
                                                <Col :xs="18" :sm="18" :md="8" :lg="8">
                                                    <Input v-model="key" placeholder="输入选项" @on-change="changeCon(key,index)" v-if="inputShow"/>
                                                    <h4 v-if="!inputShow">{{key}}</h4>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                    <Ueditor :writeMsg="value"  :id="changeId(key)" :config="myConfig"  ref="ueSelection" v-if="selShow"></Ueditor>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row class="search-row">
                            <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                                <FormItem label="答案:" prop="answer">
                                    <vue-ueditor-wrap v-model="formItem.answer" :config="myConfig" ref="ueAnswer" @ready="readyAnswer"></vue-ueditor-wrap>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row class="search-row">
                            <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                                <FormItem label="解析:" prop="analysis">
                                    <vue-ueditor-wrap v-model="formItem.analysis" :config="myConfig" ref="ueAnalysis" @ready="readyAnalysis"></vue-ueditor-wrap>
                                </FormItem>
                            </Col>
                        </Row>
                        <div style="text-align:center;margin-bottom:15px;">
                            <Button type="primary" size="large" @click="sure">预览</Button>
                            <Button type="default" size="large" @click="back">返回</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import SwitchTest from '@/components/common/switch.vue'
    import enterSwitch from './enterSwitch.vue'
    import getCourse from '@/components/pub/getCourse.vue'
    import getGrade from '@/components/pub/getGrade.vue'
    import getTextbook from '@/components/pub/getTextbook.vue'
    import getTextbookVersion from '@/components/pub/getTextbookVersion.vue'
    import getType from '@/components/pub/getType.vue'
    import getChapter from '@/components/pub/getChapter.vue'
    import getKnowledge from '@/components/pub/getKnowledge.vue'
    import getDifficulty from '@/components/pub/getDifficulty.vue'
    import Ueditor from '@/components/pub/Ueditor.vue';
    import VueUeditorWrap from '@/components/pub/vueUeditroWrap.vue';
    // import VueUeditorWrap from 'vue-ueditor-wrap'

    import {mapGetters} from 'vuex';

    export default {
        components:{
            SwitchTest,
            getCourse,
            getGrade,
            getTextbook,
            getTextbookVersion,
            getType,
            getChapter,
            getKnowledge,
            getDifficulty,
            Ueditor,
            VueUeditorWrap,
            enterSwitch,
        },
        data(){
            return {
                textbookShow:false,
                chapterShow:false,
                source:'',
                assistants:'',
                infoShow:false,
                formItem:{
                    course:'',
                    grade:'',
                    textbook:'',
                    textbookVersion:'',
                    type:'',
                    chapterArray:'',
                    knowledge:'',
                    difficulty:'',
                    source:'',
                    assistants:'',
                    chapterIds:'',
                    question:'',
                    content:'',
                    selection:'',
                    answer:'',
                    analysis:'',
                    selectionKey:'',
                    linkUrl:''
                },
                // 富文本编辑器数据
                inputShow:false,
                selectionMsg:'',
                contentSelection:'',
                selShow:false,
                ueContent:'',
                ueSelection:'',
                ueSelectionKey:'',
                ueQuestion:'',
                ueAnalysis:'',
                ueAnswer:'',
                ueItem:'',
                ue:'',
                // 富文本编辑器配置
                myConfig: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址
                    // serverUrl: 'http://47.98.238.6/admin/api/upload/config',
                    // serverUrl: 'http://www.xuzhistudy.com/admin/api/upload/config',
                    serverUrl: this.$api.root+'/admin/api/upload/config',
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: '/static/UEditor/',
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: true,
                    // 初始容器高度
                    initialFrameHeight: 312,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 关闭自动保存
                    enableAutoSave: false,
                    autoFloatEnabled:false//是否保持toolbar的位置不动，默认为true
                },
                ruleValidate:{

                }
            }
        },
        beforeRouteEnter(to, from, next) {
            if (from.name=='entertestPreview') {
                next((vm)=>{
                    vm.cacheInfo();
                });
            }else{
                next((vm)=>{
                    vm.getInfo();
                })
            }
        },
        computed:{
            linkBool:function(){
                return this.$store.state.entertest.linkBool
            }
        },
        watch:{
            'formItem.question':function(val){
                if(this.ueQuestion){
                    this.$store.commit("questionSelEnter",1)
                }
                // this.$store.dispatch("contentEnter",val)
            },
            'formItem.content':function(val){
                if(this.ueContent){
                    this.$store.commit("contentSelEnter",1)
                }
                // this.$store.dispatch("contentEnter",val)
            },
            'formItem.answer':function(val){
                if(this.ueAnswer){
                    var value=this.ueAnswer.getContentTxt();
                    this.$store.commit("answerSelEnter",1)
                }else{
                    var value=val;
                }
                // this.$store.dispatch("answerEnter",value)
            },
            'formItem.analysis':function(val){
                if(this.ueAnalysis){
                    this.$store.commit("analysisSelEnter",1)
                }
                // this.$store.dispatch("analysisEnter",val)
            },
        },
        created(){
            // this.formItem.course=this.$store.state.entertest.course;
        },
        mounted(){

        },
        methods:{
            cacheInfo(){
                var _this=this;
                this.formItem=this.$store.state.entertest.enter_datas;
                if (_this.formItem.scope==1 || _this.formItem.scope==2) {
                    if (_this.formItem.selection!=undefined) {
                        _this.selectionMsg=JSON.parse(this.$store.state.entertest.seletionDatas)
                        _this.resultKey = Object.keys(this.selectionMsg);
                        _this.resultKeyCopy = this.resultKey.concat();
                        _this.selShow=true;
                    }else {
                        _this.selectionMsg={}
                        // _this.formItem.selectionKey=''
                        _this.resultKey = [];
                        _this.resultKeyCopy = [];
                        _this.selShow=true;
                    }
                }else {
                    _this.selectionMsg={}
                    // _this.formItem.selectionKey=''
                    _this.resultKey = [];
                    _this.resultKeyCopy = [];
                }
                this.infoShow=true;
                this.$store.commit("enterDatasEnter",this.formItem)
                // this.chapterShow=true;
            },
            getInfo () {
                let _this = this
                _this.$Spin.show();
                let datas={
                    ids:this.$route.query.id
                }
                this.$api.get("/admin/api/input/list", datas, reset => {
                    if (reset.code === 200) {
                        _this.formItem=reset.data[0]
                        _this.$store.commit("enterDatasEnter",_this.formItem)
                        if (_this.formItem.question.indexOf('<p></p>')!=-1) {
                            _this.formItem.question=String(_this.formItem.question).replace(/<p><\/p>/g,'')
                        }else{
                            _this.formItem.question=String(_this.formItem.question)
                        }

                        if (_this.formItem.answer){
                                _this.formItem.answer=String(_this.formItem.answer)
                                // _this.answerMsg=String(_this.formItem.answer)
                        }
                        if (_this.formItem.content!=undefined){
                            if (_this.formItem.content.indexOf('<p></p>')!=-1) {
                                _this.formItem.content=String(_this.formItem.content).replace(/<p><\/p>/g,'')
                            }else{
                                _this.formItem.content=String(_this.formItem.content)
                            }
                        }
                        if (_this.formItem.analysis){
                            if (_this.formItem.analysis.indexOf('<p></p>')!=-1) {
                                _this.formItem.analysis=String(_this.formItem.analysis).replace(/<p><\/p>/g,'')
                            }else{
                                _this.formItem.analysis=String(_this.formItem.analysis)
                            }
                        }
                        if (_this.formItem.scope==1 || _this.formItem.scope==2) {
                            if (_this.formItem.selection!=undefined) {
                                _this.selectionMsg=JSON.parse(_this.formItem.selection)
                                // _this.formItem.selectionKey=_this.formItem.selectionKey ? _this.formItem.selectionKey : '';
                                _this.resultKey = Object.keys(this.selectionMsg);
                                _this.resultKeyCopy = this.resultKey.concat();
                                _this.selShow=true;
                            }else {
                                _this.selectionMsg={}
                                // _this.formItem.selectionKey=''
                                _this.resultKey = [];
                                _this.resultKeyCopy = [];
                                _this.selShow=true;
                            }
                        }else {
                            _this.selectionMsg={}
                            // _this.formItem.selectionKey=''
                            _this.resultKey = [];
                            _this.resultKeyCopy = [];
                        }
                        _this.$Spin.hide();
                        _this.infoShow=true;
                        // _this.chapterShow=true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportCourseData(e){
                this.$store.commit("courseSelEnter",1)
                this.formItem.course=e;
            },
            exportGradeData(e){
                this.$store.commit("gradeSelEnter",1)
                this.formItem.grade=e;
            },
            exportTextbookData(e){
                this.$store.commit("textbookSelEnter",1)
                this.formItem.textbook=e;
            },
            exportTextbookVersionData(e){
                this.$store.commit("textbookVersionSelEnter",1)
                this.formItem.textbookVersion=e;
            },
            exportTypeData(e){
                this.$store.commit("typeSelEnter",1)
                this.formItem.type=e;
            },
            exportChapterData(e){
                this.$store.commit("chapterSelEnter",1)
                this.formItem.chapterArray=e[e.length-1];
            },
            exportKnowledgeData(e){
                this.$store.commit("knowledgeSelEnter",1)
                this.formItem.knowledge=e;
            },
            exportDifficultyData(e){
                this.$store.commit("difficultySelEnter",1)
                this.formItem.difficulty=e;
            },
            sourceInput(){
                this.$store.commit("sourceSelEnter",1)
                // this.$store.dispatch("sourceEnter",this.formItem.source)
            },
            assistantsInput(val){
                this.$store.commit("assistantsSelEnter",1)
                // this.$store.dispatch("assistantsEnter",this.formItem.assistants)
            },
            // 选项方法
            addUe(){
                this.inputShow=true;
                Vue.set(this.selectionMsg,"选项号"+new Date().getTime(),"")
                this.resultKey = Object.keys(this.selectionMsg);
                if (this.resultKeyCopy.length==0) {
                    this.resultKeyCopy = this.resultKey.concat();
                }
            },
            getData(){
                var selectionJson={};
                if (this.$refs.ueSelection) {
                    for (var i = 0; i < this.$refs.ueSelection.length; i++) {
                        var key=this.resultKeyCopy[i]
                        selectionJson[key]=this.$refs.ueSelection[i].contentChange();
                    }
                    this.contentSelection=JSON.stringify(selectionJson);
                    return true;
                }else{
                    this.$Message.error("选项不全!")
                    return false;
                }
            },
            changeCon(key,index){
                if (key) {
                    if (this.resultKeyCopy[index]) {
                        if (this.resultKeyCopy[index]!=key) {
                            this.resultKeyCopy.splice(index,1,key)
                        }
                    }else{
                        this.resultKeyCopy.push(key)
                    }
                }
            },
            changeId(e){
                return e;
            },
            sure(){
                if (this.selShow) {
                    var selBool=this.getData();
                    if(selBool){
                        this.$store.commit("selectionSelEnter",1)
                        this.$store.commit("seletionDatasSelEnter",this.contentSelection)
                    }
                }
                this.$router.push({
                    path:"/enter/test/preview",
                    query:{
                        id:this.$route.query.id,
                        sel:this.selShow
                    }
                })
            },
            back(){
                this.$router.back(-1);
            },
            readyContent(ue){
                this.ueContent=ue;
            },
            readyQuestion(ue){
                this.ueQuestion=ue;
            },
            readyAnalysis(ue){
                this.ueAnalysis=ue;
            },
            readyAnswer(ue){
                this.ueAnswer=ue;
            },
            readySelectionKey(ue){
                this.ueSelectionKey=ue;
            },
            answerTxtChange(e){
                this.$store.commit("answerSelEnter",1)
                this.$store.dispatch("answerEnter",e)
            },
        }
    }
</script>

<style lang="css" scpoed>
    .btn-switch{
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .ivu-form-item{
        margin-bottom: 12px;
    }
</style>
