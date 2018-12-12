<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>题库管理</BreadcrumbItem>
                    <BreadcrumbItem>题目管理</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>正式试题题目列表</h2>
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
                    <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="left" v-if="questionShow">
                        <div class="pagelist">
                            <div class="pagelist-hd">题目信息</div>
                            <div class="pagelist-bd">
                                <Row>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="反馈id:" prop="id">
                                            <p>{{formItem.id}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="科目:" prop="course">
                                            <p>{{formItem.course}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="题型:" prop="type">
                                            <p>{{formItem.type}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="难度:" prop="url">
                                            <p>{{formItem.difficulty}}</p>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="uid:" prop="uid">
                                            <p>{{formItem.uid}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="24" :md="12" :lg="12" v-if="formItem.knowledgeList">
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
                            <div class="pagelist-bd">
                                <div class="">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>题目</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <vue-ueditor-wrap v-model="formItem.question" :config="myConfig" ref="ueditorQuestion" @ready="readyQuestion"></vue-ueditor-wrap>
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
                                            <vue-ueditor-wrap v-model="formItem.content" :config="myConfig" ref="ueContent" @ready="readyContent"></vue-ueditor-wrap>
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
                                            <vue-ueditor-wrap v-model="formItem.selectionKey" :config="myConfig" ref="ueSelectionKey" @ready="readySelectionKey"></vue-ueditor-wrap>
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
                                            <vue-ueditor-wrap v-model="formItem.answer" :config="myConfig" ref="ueAnswer" @ready="readyAnswer"></vue-ueditor-wrap>
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
                                            <vue-ueditor-wrap v-model="formItem.analysis" :config="myConfig" ref="ueAnalysis" @ready="readyAnalysis"></vue-ueditor-wrap>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div class="page-divider page-divider-horizontal"></div>
                        <div style="text-align:center;margin-bottom:15px;">
                            <Button type="primary"  @click="getUEContent()">预览</Button>
                            <Button type="default"  @click="back()">返回</Button>
                        </div>
                    </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Pages from '@/components/pub/page.vue'
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
import Ueditor from '@/components/pub/Ueditor.vue';
 import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    name: 'index',
    components: {
        Paging:Pages,
        uploadPhoto,
        Ueditor,
        VueUeditorWrap
    },
    data () {
        return {
            selShow:false, //判断是否有选择题选项
            inputShow:false,
            formItem: {},
            ruleValidate: {

            },
            // 富文本编辑器配置
            myConfig: {
                // 如果需要上传功能,找后端小伙伴要服务器接口地址
                serverUrl: this.$api.root+'/admin/api/upload/config',
                // 你的UEditor资源存放的路径,相对于打包后的index.html
                UEDITOR_HOME_URL: '/static/UEditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: true,
                // 初始容器高度
                initialFrameHeight: 280,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 关闭自动保存
                enableAutoSave: false,
                autoFloatEnabled:false,//是否保持toolbar的位置不动，默认为true
            },
            selectionMsg:'',
            questionShow:false,
            ueditorSelection:'ueditorSelection',
            contentSelection:'',//存放全部选项数据
            ueContent:'',
            ueSelection:'',
            ueSelectionKey:'',
            ueQuestion:'',
            ueAnalysis:'',
            ueAnswer:'',
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
        if (from.name==='useTestPreview'&&to.name==='useTestEdit') {
            next(vm=>{
                vm.getLocalInfo();
            });
        }else{
            next(vm=>{
                vm.getInfo();
            })
        }
    },
    beforeRouteLeave(to,form,next){
        form.meta.loading = false;
        next(vm=>{
            vm.questionShow=false;
        });
    },
    watch:{
    },
    created() {

    },
    mounted(){

    },
    // activated(){
    //     this.getLocalInfo();
    // },
    methods: {
        getLocalInfo(){
            this.formItem.question=this.$store.state.usetest.question
            this.formItem.content=this.$store.state.usetest.content
            this.formItem.answer=this.$store.state.usetest.answer
            this.formItem.analysis=this.$store.state.usetest.analysis

            this.formItem.chapter=this.$store.state.usetest.chapter
            this.formItem.questionId=this.$store.state.usetest.questionId
            this.formItem.course=this.$store.state.usetest.course
            this.formItem.type=this.$store.state.usetest.type
            this.formItem.id=this.$store.state.usetest.id
            this.formItem.scope=this.$store.state.usetest.scope

            if (this.$store.state.usetest.knowledgeList.length!=0) {
               this.formItem.knowledgeList=this.$store.state.usetest.knowledgeList;
            }

            if (this.$store.state.usetest.scope==1 || this.$store.state.usetest.scope==2) {
                if (this.$store.state.usetest.content) {
                    this.selectionMsg=JSON.parse(this.$store.state.usetest.selection) || {}
                    this.formItem.selectionKey=this.$store.state.usetest.selectionKey
                    this.inputShow=this.$store.state.usetest.inputShow
                    this.resultKey = Object.keys(this.selectionMsg);
                    this.resultKeyCopy = this.resultKey.concat();
                    this.selShow=true;
                }else{
                    _this.selectionMsg={}
                    this.formItem.selectionKey=''
                    _this.resultKey = [];
                    _this.resultKeyCopy = [];
                    // console.log(_this.resultKey)
                    _this.selShow=true;
                }
            }
            this.questionShow=true;
        },
        getInfo () {
            let _this = this
            _this.$Spin.show();
            let datas={
                uid:this.$route.params.uid
            }
            this.$api.get("/admin/api/subject/detail", datas, reset => {
                if (reset.code === 200) {
                    _this.formItem=reset.data
                    this.$store.dispatch("usetest_data_datas",_this.formItem)
                    if (_this.formItem.question.indexOf('<p></p>')!=-1) {
                        _this.formItem.question=String(_this.formItem.question).replace(/<p><\/p>/g,'')
                    }else{
                        _this.formItem.question=String(_this.formItem.question)
                    }

                    if (_this.formItem.answer){
                            _this.formItem.answer=String(_this.formItem.answer)
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
                            _this.formItem.selectionKey=_this.formItem.selectionKey ? _this.formItem.selectionKey : '';
                            _this.resultKey = Object.keys(this.selectionMsg);
                            _this.resultKeyCopy = this.resultKey.concat();
                            _this.selShow=true;
                        }else {
                            _this.selectionMsg={}
                            _this.formItem.selectionKey=''
                            _this.resultKey = [];
                            _this.resultKeyCopy = [];
                            _this.selShow=true;
                        }
                    }else {
                        _this.selectionMsg={}
                        _this.formItem.selectionKey=''
                        _this.resultKey = [];
                        _this.resultKeyCopy = [];
                    }
                    _this.$Spin.hide();
                    _this.questionShow=true;
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        // 获取编辑器的内容
        getUEContent() {
            this.$store.dispatch("usetest_data_content",this.ueContent.getContent())
            this.$store.dispatch("usetest_data_question",this.ueQuestion.getContent())
            this.$store.dispatch("usetest_data_answer",this.ueAnswer.getContent())
            this.$store.dispatch("usetest_data_analysis",this.ueAnalysis.getContent())
            this.$store.dispatch("inputShowFeedback",this.inputShow)
            if (this.selShow) {
                this.getData()
                this.$store.dispatch("usetest_data_selectionKey",this.ueSelectionKey.getContent())
                this.$store.dispatch("usetest_data_selection",this.contentSelection)
            }
            this.$router.push({
                path:"/use/test/preview/"+this.$route.params.uid,
                query:{
                    sel:this.selShow
                }
            });
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
        back(){
            this.$router.back(-1);
        },
    }
}
</script>
<style scoped lang="less">
    .ivu-form-item{
        margin-bottom: 0px;
    }
    .text-indent{
        text-indent:36px;
    }
    .span-interval{
        margin-right: 10px;
    }
</style>
