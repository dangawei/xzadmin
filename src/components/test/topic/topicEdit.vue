<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>题目管理</BreadcrumbItem>
                <BreadcrumbItem>校本库题目列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>校本库题目列表</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">

                </div>
                <!--操作按钮-->
                <div class="tableListOperator" style="margin-bottom: 0px;">
                    <!-- <Button type="primary" size="large" @click="add()">添加</Button> -->
                </div>
                <div class="page-view allm20">
                    <div class="page-view-body">
                    <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="left">
                        <div class="pagelist">
                            <div class="pagelist-hd">题目信息</div>
                            <div class="pagelist-bd">
                                <Row>
                                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                                        <FormItem label="章节:" prop="chapter">
                                            <span class="span-interval">{{formItem.chapters}}</span>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="题目id:" prop="id">
                                            <p>{{formItem.id}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="questionId:" prop="type">
                                            <p>{{formItem.questionId}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="科目:" prop="type">
                                            <p>{{formItem.course}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="题型:" prop="type">
                                            <p>{{formItem.type}}</p>
                                        </FormItem>
                                    </Col>

                                </Row>
                                <Row v-if="formItem.knowledgeList">
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="难度:" prop="url">
                                            <p>{{formItem.difficulty}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="24" :md="18" :lg="18">
                                        <FormItem label="知识点:" prop="knowledgeList">
                                            <!-- {{formItem.knowledges}} -->
                                            <span v-for="item in formItem.knowledgeList" class="span-interval">{{item}}</span>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div class="page-divider page-divider-horizontal "></div>
                        <div class="pagelist">
                            <div class="pagelist-hd">题干信息</div>
                            <!-- <div class="tableListOperator">
                                <Button type="primary"  @click="add()">添加</Button>
                            </div> -->
                            <div class="pagelist-bd">
                                <div class="">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>题目</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <Ueditor :writeMsg="questionMsg"  :id="ueditorQuestion" :config="myConfig"  ref="ueQuestion" v-if="questionShow"></Ueditor>
                                            <!-- <ue @UE_data="uedata" :UE_editdata="questionMsg" v-if="questionShow"></ue> -->
                                        </Col>
                                    </Row>
                                </div>
                                <div class="">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>题干</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <Ueditor :writeMsg="contentMsg"  :id="ueditorContent" :config="myConfig"  ref="ueContent" v-if="questionShow"></Ueditor>
                                            <!-- <ue @UE_data="uedata" :UE_editdata="questionMsg" v-if="questionShow"></ue> -->
                                        </Col>
                                    </Row>
                                </div>
                                <div class="" v-if="selShow" style="border: 1px solid #D0D0D0;margin-top: 15px;margin-bottom: 15px;padding:15px;">
                                    <div>
                                        <h3>全部选项</h3>
                                        <Button type="primary" @click="addUe">增加富文本选项</Button>
                                        <!-- <Button type="default" @click="getData">获取选项数据</Button> -->
                                    </div>

                                    <div v-for="(value, key, index) in selectionMsg" :key="key">
                                        <!-- <p>{{ index }}. {{ key }} - {{ value }}</p> -->
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
                                <div class="" v-if="selShow">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>正确选项</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <Ueditor :writeMsg="selectionKeyMsg"  :id="ueditorSelectionKey" :config="myConfig"  ref="ueSelectionKey" v-if="selShow"></Ueditor>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>答案</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <Ueditor :writeMsg="answerMsg"  :id="ueditorAnswer" :config="myConfig"  ref="ueAnswer" v-if="questionShow" @contents="cc"></Ueditor>
                                            <!-- <p v-html="formItem.answer"></p> -->
                                        </Col>
                                    </Row>
                                </div>
                                <div class="">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>解析</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <Ueditor :writeMsg="analysisMsg"  :id="ueditorAnalysis" :config="myConfig"  ref="ueAnalysis" v-if="questionShow"></Ueditor>
                                            <!-- <p v-html="formItem.analysis"></p> -->
                                            <!-- <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap> -->
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div class="page-divider page-divider-horizontal"></div>
                        <div style="text-align:center;margin-bottom:15px;">
                            <Button type="primary"  @click="getUEContent()">预览</Button>
                            <Button  @click="back()">返回</Button>
                        </div>
                        <div class="mt20">
                            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                        </div>

                    </Form>
                    <!-- <img src="@/assets/logo.png" alt=""> -->
                    </div>
                </div>
                <!-- <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
                        <Ueditor :writeMsg="msg"  :id="ueditor1" :config="myConfig"  ref="ue" ></Ueditor>
                    </Col>
                </Row> -->
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Pages from '@/components/pub/page.vue'
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
import Ueditor from '@/components/pub/Ueditor.vue';
// import VueUeditorWrap from 'vue-ueditor-wrap';
// import Ue from '../../pub/UE.vue'
export default {
    name: 'index',
    components: {
        Paging:Pages,
        uploadPhoto,
        Ueditor,
        // VueUeditorWrap
    },
    data () {
        return {
            baseInfoShow:false,
            dealerShow:false,
            pageshow:false,
            selShow:false,//判断是否有选择题选项
            inputShow:false,
            formItem: {},
            ruleValidate: {
            },
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
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 关闭自动保存
                enableAutoSave: false,
                autoFloatEnabled:false//是否保持toolbar的位置不动，默认为true
            },
            questionMsg:'',
            answerMsg:'',
            analysisMsg:'',
            selectionMsg:'',
            selectionKeyMsg:'',
            questionShow:false,
            ueditorQuestion:'ueditorQuestion',
            ueditorAnswer:'ueditorAnswer',
            ueditorAnalysis:'ueditorAnalysis',
            ueditorContent:'ueditorContent',
            ueditorSelection:'ueditorSelection',
            ueditorSelectionKey:'ueditorSelectionKey',
            contentSelection:'',//存放全部选项数据
            resultKey:[],//存放选择题的key
            resultKeyCopy:[],
            // 分页
            pageData:{
                //分页数
                arrPageSize:[5,10,15,20],
                //分页大小
                pagesize:1,
                //总分页数
                pageCount:1,
                //当前页面
                pageCurrent:1,
                //总数
                totalCount:10
            },
        }
    },
    beforeRouteEnter(to, from, next) {
        if (from.name==='topicPreview'&&to.name==='topicEdit') {
            to.meta.keepAlive = false;  // 让 列表页 缓存，即不刷新
            to.meta.loading = true;
            next();
        }else{
            to.meta.keepAlive = false;  // 让 列表页 即不缓存，刷新
            to.meta.loading = false;
            next()
        }
    },
    beforeRouteLeave(to,form,next){
        form.meta.loading = false;
        next(vm=>{
            vm.questionShow=false;
        });
    },
    created() {

    },
    mounted(){
        var _this=this;
        if (this.$route.meta.loading) {
            this.getLocalInfo();
        }else{
            // this.formItem=JSON.parse(this.$webapi.getlocal("topicItem"))
            this.getInfo();
        }
    },
    activated(){
        // console.log(3);
        this.getLocalInfo();
    },
    methods: {
        getLocalInfo(){
            var _this=this;
            this.formItem.chapter=this.$webapi.getlocal("contentChapter");
            this.formItem.questionId=this.$webapi.getlocal("contentQuestionId");
            this.formItem.course=this.$webapi.getlocal("contentCourse");
            this.formItem.type=this.$webapi.getlocal("contentType");
            this.formItem.id=this.$webapi.getlocal("contentId")
            this.formItem.scope=this.$webapi.getlocal("contentScope")
            if (this.$webapi.getlocal("contentKnowledgeList")) {
               this.formItem.knowledgeList=JSON.parse(this.$webapi.getlocal("contentKnowledgeList"));
            }
            this.questionMsg=this.$webapi.getlocal("contentQuestion")
            this.answerMsg=this.$webapi.getlocal("contentAnswer")
            this.analysisMsg=this.$webapi.getlocal("contentAnalysis")
            this.contentMsg=this.$webapi.getlocal("contentContent")
            if (this.$webapi.getlocal("contentScope")==1 || this.$webapi.getlocal("contentScope")==2) {
                if (this.$webapi.getlocal("contentSelection")) {
                    this.selectionMsg=JSON.parse(this.$webapi.getlocal("contentSelection")) || {}
                    this.selectionKeyMsg=this.$webapi.getlocal("contentSelectionKey")
                    this.inputShow=this.$webapi.getlocal("inputShow")
                    this.resultKey = Object.keys(this.selectionMsg);
                    this.resultKeyCopy = this.resultKey.concat();
                    this.selShow=true;
                }else{
                    _this.selectionMsg={}
                    _this.selectionKeyMsg=''
                    _this.resultKey = [];
                    _this.resultKeyCopy = [];
                    // console.log(_this.resultKey)
                    _this.selShow=true;
                }
            }

            this.questionShow=true;
        },
        getInfo () {
            this.$Spin.show();
            let _this = this
            let datas={
                id:this.$route.params.id
            }
            this.$api.get("/admin/api/record/subject/detail", datas, reset => {
                if (reset.code === 200) {
                    _this.formItem=reset.data
                    if (_this.formItem.question.indexOf('<p></p>')!=-1) {
                        _this.questionMsg=String(_this.formItem.question).replace(/<p><\/p>/g,'')
                    }else{
                        _this.questionMsg=String(_this.formItem.question)
                    }

                    if (_this.formItem.answer){
                            _this.answerMsg=String(_this.formItem.answer)
                    }
                    if (_this.formItem.content!=undefined){
                        if (_this.formItem.content.indexOf('<p></p>')!=-1) {
                            _this.contentMsg=String(_this.formItem.content).replace(/<p><\/p>/g,'')
                        }else{
                            _this.contentMsg=String(_this.formItem.content)
                        }
                    }
                    // console.log(_this.formItem.selection)
                    if (_this.formItem.scope==1 || _this.formItem.scope==2) {
                        if (_this.formItem.selection!=undefined) {
                            // var json=JSON.parse(_this.formItem.selection)
                            _this.selectionMsg=JSON.parse(_this.formItem.selection)
                            _this.selectionKeyMsg=_this.formItem.selectionKey ? _this.formItem.selectionKey : '';
                            _this.resultKey = Object.keys(this.selectionMsg);
                            _this.resultKeyCopy = this.resultKey.concat();
                            // console.log(_this.resultKey)
                            _this.selShow=true;
                        }else {
                            _this.selectionMsg={}
                            _this.selectionKeyMsg=''
                            _this.resultKey = [];
                            _this.resultKeyCopy = [];
                            _this.selShow=true;
                        }
                    }else {
                        _this.selectionMsg={}
                        _this.selectionKeyMsg=''
                        _this.resultKey = [];
                        _this.resultKeyCopy = [];
                        // console.log(_this.resultKey)
                        // _this.selShow=true;
                    }
                    if (_this.formItem.analysis){
                        if (_this.formItem.analysis.indexOf('<p></p>')!=-1) {
                            _this.analysisMsg=String(_this.formItem.analysis).replace(/<p><\/p>/g,'')
                        }else{
                            _this.analysisMsg=String(_this.formItem.analysis)
                        }
                    }
                    _this.$Spin.hide();
                    _this.questionShow=true;
                }else {
                    _this.$Spin.hide();
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.getInfo()
        },
        // 获取编辑器的内容
        getUEContent() {
            let contentQuestion = this.$refs.ueQuestion.contentChange();
            let contentAnswer = this.$refs.ueAnswer.contentChange();
            let contentAnalysis = this.$refs.ueAnalysis.contentChange();
            let contentContent = this.$refs.ueContent.contentChange();
            if (this.selShow) {
                this.getData()
                let contentSelectionKey= this.$refs.ueSelectionKey.contentChange();
                this.$webapi.savelocal("contentSelection",this.contentSelection);
                this.$webapi.savelocal("contentSelectionKey",contentSelectionKey);
            }else{
                this.$webapi.savelocal("contentSelection","");
                this.$webapi.savelocal("contentSelectionKey","");
            }
            if (this.inputShow) {
                this.$webapi.savelocal("inputShow",this.inputShow);
            }else{
                this.$webapi.savelocal("inputShow",false);
            }
            if (this.formItem.chapter) {
                if (typeof(this.formItem.chapter)=='string') {
                    this.$webapi.savelocal("contentKnowledgeList",this.formItem.chapter);
                }else{
                    this.$webapi.savelocal("contentKnowledgeList",JSON.stringify(this.formItem.chapter));
                }
            }else{
                this.$webapi.savelocal("contentChapter",'');
            }
            if (this.formItem.questionId) {
                this.$webapi.savelocal("contentQuestionId",this.formItem.questionId);
            }else{
                this.$webapi.savelocal("contentQuestionId",'');
            }
            if (this.formItem.course) {
                this.$webapi.savelocal("contentCourse",this.formItem.course);
            }else{
                this.$webapi.savelocal("contentCourse",'');
            }
            if (this.formItem.type) {
                this.$webapi.savelocal("contentType",this.formItem.type);
            }else{
                this.$webapi.savelocal("contentType",'');
            }
            if (this.formItem.knowledgeList) {
                if (typeof(this.formItem.knowledgeList)=='string') {
                    this.$webapi.savelocal("contentKnowledgeList",this.formItem.knowledgeList);
                }else{
                    this.$webapi.savelocal("contentKnowledgeList",JSON.stringify(this.formItem.knowledgeList));
                }
            }else{
                this.$webapi.savelocal("contentKnowledgeList",'');
            }
            this.$webapi.savelocal("contentContent",contentContent);
            this.$webapi.savelocal("contentScope",this.formItem.scope);
            this.$webapi.savelocal("contentQuestion",contentQuestion);
            this.$webapi.savelocal("contentAnswer",contentAnswer);
            this.$webapi.savelocal("contentAnalysis",contentAnalysis);
            this.$webapi.savelocal("contentId",this.$route.params.id);
            this.$router.push({
                path:"/topic/preview/"+this.$route.params.id,
                query:{
                    sel:this.selShow
                }
            });
        },
        back(){
            this.$router.back(-1);
        },
        addUe(){
            this.inputShow=true;
            Vue.set(this.selectionMsg,"选项号"+new Date().getTime(),"")
            this.resultKey = Object.keys(this.selectionMsg);
            if (this.resultKeyCopy.length==0) {
                this.resultKeyCopy = this.resultKey.concat();
            }
        },
        cc(e){
            // console.log(e);
        },
        getData(){
            // console.log(this.$refs.ueSelection)
            // console.log(this.$refs.ueSelection.length);
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
            // console.log(this.resultKeyCopy)
        },
        changeId(e){
            return e;
        }

    }
}
</script>
<style scoped lang="less">
    .ivu-form-item{
        margin-bottom: 0px;
    }
    // .text-indent{
    //     text-indent:36px;
    // }
    .span-interval{
        margin-right: 10px;
    }
</style>
