<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>题库管理</BreadcrumbItem>
                    <BreadcrumbItem>题目录入</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>待提交</h2>
                </div>
            </div>
        </div>
         <!--  -->
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">

                </div>
                <!--操作按钮-->
                <div class="tableListOperator" style="margin-bottom: 0px;">
                    <!-- <Button type="primary" size="large" @click="add()">添加</Button> -->
                </div>
                <div class="page-component-card">
                    <Card style="width:100%;">
                        <Form :model="formCustom" :label-width="50" label-position="right">
                            <Row class="search-row">
                                <Col :xs="12" :sm="12" :md="12" :lg="12">
                                    <FormItem label="章节" prop="chapters">
                                         <submitChapter @exportData="chapterChange"></submitChapter>
                                    </FormItem>
                                </Col>
                                <Col :xs="6" :sm="6" :md="6" :lg="6">
                                    <FormItem label="题型" prop="type">
                                         <getType @exportData="exportTypeData"></getType>
                                    </FormItem>
                                </Col>
                                <Col :xs="6" :sm="6" :md="6" :lg="6">
                                    <FormItem>
                                        <Button type="primary" @click="handleSubmit">查询</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <!-- <p slot="title">
                            章节
                        </p> -->
                        <p style="text-align:right;">
                            <span>待提交:</span>
                            <span>{{submitData.uncommittedCount}}</span>
                            <Button type="primary"  @click="submitAll">全部提交</Button>
                        </p>
                    </Card>
                </div>
                <div class="page-component-card" v-if="wrapShow">
                    <Card style="width:100%;">
                        <p slot="title">
                            <span>{{formItem.bookName}}</span>
                        </p>
                        <ul v-if="formItem.chapters">
                            <li>
                                <h4>{{formItem.chapters}}</h4>
                            </li>
                        </ul>
                        <ul v-else>
                            <li>
                                <!-- <h4 style="color:#098CFF;">无</h4> -->
                                <h4>{{formItem.source}}</h4>
                            </li>
                        </ul>
                    </Card>
                </div>
                <div class="page-view allm20" v-if="wrapShow">
                    <div class="page-view-body">
                        <Form  :model="formItem" label-position="left" :key="formItem.id" class="form-border">
                            <div class="pagelist">
                                <div class="pagelist-hd">题目信息</div>
                                <div class="pagelist-bd">
                                    <Row>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="id:" prop="id">
                                                <p>{{formItem.id}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="题号:" prop="questionId">
                                                <p>{{formItem.questionId}}</p>
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
                                                <span class="span-interval">{{formItem.chapters}}</span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="18" :lg="18" v-if="formItem.knowledgeList">
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
                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>题目</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formItem.question" :importType="'question'" :importId="formItem.id"   @exportData="exportQuestionData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>题干</h3>
                                            </Col>
                                            <Col span="22">
                                                <!-- <Card> -->
                                                <update-ueditor :importData="formItem.content" :importType="'content'" :importId="formItem.id"  @exportData="exportContentData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                    <!-- 单选或者多选 -->
                                    <div class="mgt" v-if="formItem.scope==1||formItem.scope==2">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <div>
                                                    <h3>全部选项</h3>
                                                </div>
                                            </Col>
                                            <Col span="22" style="margin-bottom:15px;">
                                                <Card>
                                                    <div v-for="(value, key, index) in selectionMsg" :key="key" class="div-indent">
                                                        <h5 v-if="!inputShow">{{key}}:</h5>
                                                        <Input v-model="key" style="width:7%;" placeholder="输入选项" @input="changeCon(index,key)" v-if="inputShow"/>
                                                        <span style="fontSize:20px;"  @click="removeIcon(key)"><Icon type="md-remove-circle" v-if="inputShow" /></span>
                                                        <p style="margin-top:10px;" v-html="value" class="p-indent"></p>
                                                    </div>
                                                    <div style="text-align:right;margin-top:15px;" v-if="!selBottonShow">
                                                        <Button type="primary"  @click="editor" size="small">编辑选项</Button>
                                                    </div>
                                                    <div style="text-align:right;margin-top:15px;" v-if="selBottonShow">
                                                        <span style="fontSize:20px;" @click="addIcon"><Icon type="md-add-circle" /></span>
                                                        <Button type="primary"  @click="editorSure" size="small">确定</Button>
                                                        <Button type="default"  @click="editorRemove" size="small">取消</Button>
                                                    </div>
                                                </Card>
                                                <p>
                                                    <span v-for="(value, key, index) in selectionMsg" :class="['sel-span',{classSel:styleSel==key}]" @click.capture.stop="selQuestion(value,key)">{{key}}</span>
                                                </p>
                                            </Col>
                                            <Col span="22" offset="2" v-if="selectValueShow">
                                                <select-ueditor :importData="selectValue" :importType="selectValueKey" :importId="formItem.id"  @exportData="exportSelectionData"></select-ueditor>
                                            </Col>
                                        </Row>
                                    </div>

                                    <!-- 完型填空&&阅读理解&&七选五 -->
                                    <div class="mgt" v-if="(formItem.scope==5 ||formItem.scope==6 ||formItem.scope==7) && formItem.course=='英语'">
                                        <Row>
                                        <Col span="2">
                                            <div>
                                                <h3>全部选项</h3>
                                            </div>
                                        </Col>
                                        <Col span="22">
                                            <Card>
                                                <div v-for="(value,index) in yingyuMsg" :key="index" class="div-indent">
                                                    <Row style="margin-bottom:20px;border:1px solid #EAEAEA;">
                                                        <Col span="3">
                                                            <h5 style="display:inline-block;margin-right:10px;">
                                                                <span style="margin-right:10px;">{{value.answer}}</span>
                                                                <span>（{{index+1}}）</span>
                                                            </h5>
                                                        </Col>
                                                        <Col span="21">
                                                            <Row>
                                                                <Col span="6" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num">
                                                                    <span class="text-indent">
                                                                        <span>{{key}}.</span>
                                                                        <span>{{item}}</span>
                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>
                                            <p>
                                                <span v-for="(value,index) in yingyuMsg" :class="['sel-span',{classSel:styleSel==index+1}]" @click.capture.stop="selFss(value,index)">{{index+1}}</span>
                                            </p>
                                        </Col>
                                        <Col span="22" offset="2" v-if="fssShow">
                                            <scope-fss :importData="selectValue" :importType="selectValueKey" @exportData="exportFssData"></scope-fss>
                                        </Col>
                                        </Row>
                                    </div><!-- 型填空&&阅读理解&&七选五 -->
                                    <!-- 语文题干分离 -->
                                    <div class="mgt" v-if="(formItem.scope==12 || formItem.scope==13 || formItem.scope==14)&& formItem.course=='语文'">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>全部小题</h3>
                                            </Col>
                                            <Col span="22">
                                                <Card>
                                                    <div v-for="(value,index) in chineseMsg" :key="index" class="div-indent">
                                                        <Row style="margin-bottom:20px;border:1px solid #EAEAEA;" v-if="value.scope==1||value.scope==2">
                                                            <Col span="2">
                                                                <h5 style="display:inline-block;margin-right:10px;">
                                                                    <span style="margin-right:10px;"></span>
                                                                    <span>（{{index+1}}）</span>
                                                                </h5>
                                                            </Col>
                                                            <Col span="22">
                                                                <p v-html="value.content"></p>
                                                            </Col>
                                                            <Col span="21">
                                                                <Row>
                                                                    <Col span="5" offset="1" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num">
                                                                        <span class="text-indent">
                                                                            <span>{{key}}.</span>
                                                                            <span>{{item}}</span>
                                                                        </span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row style="margin-bottom:20px;border:1px solid #EAEAEA;" v-else>
                                                            <Col span="3">
                                                                <h5 style="display:inline-block;margin-right:10px;">
                                                                    <span style="margin-right:10px;"></span>
                                                                    <span>（{{index+1}}）</span>
                                                                </h5>
                                                            </Col>
                                                            <Col span="21">
                                                                <p v-html="value.content"></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Card>
                                                <p>
                                                    <span v-for="(value,index) in chineseMsg" :class="['sel-span',{classSel:styleSel==index+1}]" @click.capture.stop="selChinese(value,index)">{{index+1}}</span>
                                                </p>
                                            </Col>
                                            <Col span="22" offset="2" v-if="chineseShow">
                                                <scope-chinese :importData="selectValue" :importType="selectValueKey" @exportData="exportChineseData"></scope-chinese>
                                            </Col>
                                        </Row>
                                    </div><!-- 语文题干分离 -->

                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>答案</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formItem.answer" :importType="'answer'" :importId="formItem.id"  @exportData="exportAnswerData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>解析</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formItem.analysis" :importType="'analysis'" :importId="formItem.id"  @exportData="exportAnalysisData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            <div class="page-divider page-divider-horizontal"></div>
                            <div style="text-align:center;margin-bottom:15px;">
                                <Button type="error"  @click="remove(formItem.id)">删除</Button>
                                <Button type="primary"  @click="submit(formItem.id)">提交</Button>
                            </div>
                        </Form>
                        <div class="mt20">
                            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import updateUeditor from '@/components/view/updateUeditor.vue'
import selectUeditor from '@/components/view/selectUeditor.vue'
import scopeFss from '@/components/view/scopeFss.vue'
import scopeChinese from '@/components/view/scopeChinese.vue'
import submitChapter from './submitChapter.vue'
import getType from '@/components/view/getType.vue'
import Pages from '@/components/view/page.vue'
import Vue from 'vue'
export default {
    name: 'index',
    components: {
        Paging:Pages,

        updateUeditor,
        selectUeditor,
        scopeFss,
        submitChapter,
        getType
    },
    data () {
        return {
            pageshow:false,
            // 录入试题的id
            enterArray:[],
            enterId:0,
            // 题目展示数据
            formItem: {},
            ruleValidate: {

            },
            // 查询条件
            formCustom:{
                chapters:'',
                type:'',
            },
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
            // 修改数据
            updataDatas:{},
            selectData:{},
            selectValueKey:'',
            selectValue:'',
            selectValueShow:false,
            selectionMsg:{},
            // 单多选选项原数据复制
            selectionMsgCopy:{},
            // 单多选选项改变数据
            selectionMsgChange:{},
            styleSel:'',
            // 英语题干分离数据
            yingyuMsg:[],
            fssShow:false,
            // 语文题干分离数据
            chineseMsg:[],
            chineseShow:false,
            //编辑单选或者多选操作数据
            inputShow:false,//是否选择选项key在编辑状态
            selBottonShow:false,//选项按钮是否在编辑状态
            selBool:false,//是否修改单选或者多选题
            submitData:{},//待提交待修改数据
            wrapShow:true,
        }
    },
    watch:{
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            if (to.path=='/enter/submit/list') {
                vm.$store.commit('itemNameEnter','n2')
            }
            // to.meta.enterBool=false;
        })
    },
    created() {
        this.getSubmitCount();
        this.getInfo();
    },
    mounted(){

    },
    methods: {
        getSubmitCount(){
            var datas={
                id:this.$route.query.teachId
            }
            this.$api.get("/admin/api/bookName/count", datas, reset => {
                if (reset.code === 200) {
                    this.submitData=reset.data;
                }else{
                    this.$netcode.getApiCode(reset)
                }
            })
        },
        getInfo () {
            let _this = this
            this.$Spin.show();
            let datas={
                page: _this.pageData.pageCurrent,//当前页
                pageSize:1,
                bookNameId:this.$route.query.teachId,
                status:0
            }
            if(this.formCustom.chapters){
                datas.chapterId=this.formCustom.chapters
            }
            if(this.formCustom.type){
                datas.typeId=this.formCustom.type
            }
            this.$api.get("/admin/api/record/subject/list", datas, reset => {
                if (reset.code === 200) {
                    this.$Spin.hide();
                    if(reset.data.records){
                        _this.formItem=reset.data.records[0];
                        // for (var i = 0; i < _this.formItem.length; i++) {
                            if(_this.formItem.scope==1 || _this.formItem.scope==2){
                                if (_this.formItem.selection) {
                                    _this.selectionMsg=JSON.parse(_this.formItem.selection)
                                    _this.selectionMsgCopy={..._this.selectionMsg}

                                    this.chineseShow=false
                                    this.styleSel='';
                                    this.fssShow=false;
                                    this.selBool=false;
                                }else{
                                    _this.selectionMsg={}
                                    _this.selectionMsgCopy={}
                                }
                            }
                            if(_this.formItem.scope==5 || _this.formItem.scope==6 || _this.formItem.scope==7 && _this.formItem.childSubjects!=undefined){
                                _this.yingyuMsg=_this.formItem.childSubjects
                            }
                            if(_this.formItem.scope==12 ||_this.formItem.scope==13||_this.formItem.scope==14 && _this.formItem.childSubjects!=undefined){
                                _this.chineseMsg=_this.formItem.childSubjects
                            }
                        // }
                        _this.pageData.pagesize = reset.data.size
                        _this.pageData.totalCount = reset.data.total
                        _this.pageData.pageCount = reset.data.pages
                        _this.pageData.pageCurrent = reset.data.current
                        _this.pageshow =  true
                        _this.wrapShow=true;
                    }else{
                        this.$Message.error('暂无待提交试题!')
                        _this.formItem=[]
                        _this.wrapShow=false;
                    }
                }else {
                    _this.formItem=[]
                    _this.$netcode.getApiCode(reset)
                    this.$Spin.hide();
                }
            })
        },
        pageComponentDate (e) {
            this.pageshow = false
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.getInfo()
        },
        // 修改数据请求
        post(e){
            var _this=this;
            var datas={};
            datas.id=e.id
            if(this.selBool){
                datas.selection=JSON.stringify(this.selectionMsg)
            }else{
                datas=e
            }
            this.$api.post("/admin/api/input/modify", datas, reset => {
                if (reset.code === 200) {
                    // _this.$Message.success("修改成功!");
                    _this.updataDatas={}
                    _this.selBool=false;
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        // 修改
        exportQuestionData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.question=e.data
                this.post(this.updataDatas)
            }
        },
        exportContentData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.content=e.data
                this.post(this.updataDatas)
            }
        },
        exportAnswerData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.answer=e.data
                this.post(this.updataDatas)
            }
        },
        exportAnalysisData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.analysis=e.data
                this.post(this.updataDatas)
            }
        },
        selQuestion(val,key){
            if (this.inputShow) {
                this.$Message.warning({
                    content:"选项正在编辑中,暂不能编辑选项值!",
                    duration: 2.5
                })
            }else{
                if(!this.$store.state.common.ueType){
                    this.styleSel=key;
                    this.selectValue=val;
                    this.selectValueKey='select'+key;
                    this.$store.commit("ueType",this.selectValueKey)
                    this.selectValueShow=true;
                }
            }
        },
        selFss(val,key){
            if(!this.$store.state.common.ueType){
                this.styleSel=key+1;
                this.selectValue=val;
                this.selectValueKey='select'+key+1;
                this.fssShow=true;
            }
        },
        selChinese(val,key){
            if(!this.$store.state.common.ueType){
                this.styleSel=key+1;
                this.selectValue=val;
                this.selectValueKey='chinese'+key+1;
                this.$nextTick(function () {
                    this.chineseShow=true; // => '更新完成'
                })
            }
        },
        exportFssData(e){
            if(e.data){
                this.$api.post("/admin/api/input/modify",e.data, reset => {
                    if (reset.code === 200) {
                        this.$Message.success("修改成功!");
                        this.$store.commit("ueType",'')
                        this.styleSel='';
                        this.fssShow=false;
                        this.getInfo();
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })
            }else{
                this.styleSel='';
                this.fssShow=false;
            }
        },
        exportChineseData(e){
            this.styleSel='';
            this.chineseShow=e.show;
            if (e.data) {
                this.getInfo();
            }
        },
        exportSelectionData(e){
            this.styleSel='';
            this.selBool=true;
            this.updataDatas.id=e.id
            if (e.data) {
                this.selectionMsg[e.key]=e.data
                this.post(this.updataDatas)
            }
            this.selectValueShow=e.show;
        },
        // 单选或者多选题,增加选项
        editor(){
            this.inputShow=true;
            this.selBottonShow=true;
        },
        editorSure(){
            if (Object.keys(this.selectionMsg).length==0) {
                this.selectionMsg={...this.selectionMsgCopy}
            }
            if (this.selectionMsg==this.selectionMsgCopy) {
                this.selBool=false;
            }else{
                this.selBool=true;
            }
            this.inputShow=false;
            this.selBottonShow=false;
        },
        editorRemove(){
            this.selectionMsg={...this.selectionMsgCopy}
            this.inputShow=false;
            this.selBottonShow=false;
        },
        addIcon(){
            Vue.set(this.selectionMsg,new Date().getTime(),"暂无添加选项值")
        },
        removeIcon(key){
            this.inputShow=false;
            delete this.selectionMsg[key];
            var _this=this
            setTimeout(function(){
                _this.inputShow=true;
            },50)
        },
        changeCon(num,key){
            if (key) {
                var arrValue=[]
                var obj={}
                for(let i in this.selectionMsg){
                    arrValue.push(this.selectionMsg[i])
                }
                var arrKey = Object.keys(this.selectionMsg);
                arrKey.splice(num,1,key)
                for (var i = 0; i < arrKey.length; i++) {
                    obj[arrKey[i]]=arrValue[i];
                }
                this.selectionMsg=obj
            }else{
                this.$Message.error("选项格式不正确!")
            }
        },
        remove(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除试题吗?</p>',
                onOk: () => {
                    var data={
                        id:e
                    }
                    this.$api.post("/admin/api/input/delete", data, reset => {
                        if (reset.code === 200) {
                            _this.$Message.success("删除成功!")
                            setTimeout(function(){
                                if (_this.pageData.pageCurrent!=1) {
                                    _this.pageData.pageCurrent=_this.pageData.pageCurrent-1
                                }
                                _this.getInfo();
                            },100)
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        submit(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要提交试题吗?</p>',
                onOk: () => {
                    var data={
                        id:e
                    }
                    this.$api.post("/admin/api/input/up", data, reset => {
                        if (reset.code === 200) {
                            _this.$Message.success("提交成功!")
                            if (_this.pageData.pageCurrent!=1) {
                                _this.pageData.pageCurrent=_this.pageData.pageCurrent-1
                            }
                            this.getInfo();
                            this.getSubmitCount();
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        submitAll(){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要全部提交试题吗?</p>',
                onOk: () => {
                    var datas={
                        id:this.$route.query.teachId
                    }
                    this.$api.post("/admin/api/input/batch/submit", datas, reset => {
                        if (reset.code === 200) {
                            this.$Message.success("提交成功!")
                            setTimeout(function(){
                                _this.getInfo();
                            },300)
                        }else{
                            this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        // 章节查询
        chapterChange(e){
            this.formCustom.chapters=e.data.value;
        },
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.getInfo()
        },
        // 获取题型

        exportTypeData(e){
            this.formCustom.type=e.value;
        },
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
    .form-border{
        border: 1px solid #dedede;
        margin-bottom:15px;
    }
    .page-component-view{
        background-color: transparent;
    }
    .page-component-card{
        margin-bottom: 15px;
        background-color: #fff;
        // padding:15px;
    }
    ul{
        list-style: none;
        li{
            display: inline-block;
            padding-right: 6px;
        }
    }
    .sel-span{
        padding:3px 5px;
        background-color: #DDDDDD;
        border:1px solid #E4E4E4;
        cursor: pointer;
    }
    .classSel{
        background-color: #0192FF;
    }
</style>
