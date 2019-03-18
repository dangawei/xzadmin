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
                    <h2>正式使用题目列表</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    <Form :label-width="80" label-position="right">
                        <Row class="search-row" style="margin-bottom:15px;">
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                                <FormItem label="题库来源">
                                    <Select v-model="sourceId">
                                        <Option :value="1" :key="1">公共库</Option>
                                        <Option :value="2" :key="2">校本库</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                                <FormItem label="学科">
                                    <use-course></use-course>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                                <FormItem label="题型" prop="type">
                                    <use-type></use-type>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                                <FormItem label="状态" prop="state">
                                    <Select v-model="stateId">
                                        <Option :value="0" :key="0">正常</Option>
                                        <Option :value="1" :key="1">下架</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit">查询</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <!--操作按钮-->
                <div class="tableListOperator" style="margin-bottom: 0px;">
                    <!-- <Button type="primary" size="large" @click="add()">添加</Button> -->
                </div>
                <div class="page-view allm20">
                    <div class="page-view-body">
                        <Form :ref="index" :model="formitem" label-position="left" v-for="(formitem,index) in formItem" :key="formitem.id" class="form-border">
                            <div class="pagelist">
                                <div class="pagelist-hd">题目信息</div>
                                <div class="pagelist-bd">
                                    <Row>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="id:" prop="id">
                                                <p>{{formitem.id}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="科目:" prop="course">
                                                <p>{{formitem.course}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="题型:" prop="type">
                                                <p>{{formitem.type}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="难度:" prop="url">
                                                <p>{{formitem.difficulty}}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="uid:" prop="uid">
                                                <p>{{formitem.uid}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="24" :md="12" :lg="12" v-if="formitem.knowledgeList">
                                            <FormItem label="知识点:" prop="knowledgeList">
                                                <!-- {{formItem.knowledges}} -->
                                                <span v-for="item in formitem.knowledgeList" class="span-interval">{{item}}</span>
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
                                                <update-ueditor :importData="formitem.question" :importType="'question'"  @exportData="exportQuestionData"></update-ueditor>
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
                                                <update-ueditor :importData="formitem.content" :importType="'content'"  @exportData="exportContentData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                    <!-- 单选或者多选 -->
                                    <div class="mgt" v-if="formitem.scope==1||formitem.scope==2">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <div>
                                                    <h3>全部选项</h3>
                                                </div>
                                            </Col>
                                            <Col span="22">
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
                                                <select-ueditor :importData="selectValue" :importType="selectValueKey" @exportData="exportSelectionData"></select-ueditor>
                                            </Col>
                                        </Row>
                                    </div>

                                    <!-- 完型填空&&阅读理解&&七选五 -->
                                    <div class="mgt" v-if="formitem.scope==5 ||formitem.scope==6 ||formitem.scope==7 && formitem.childSubjects!=undefined">
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
                                    <div class="mgt" v-if="formitem.scope==12 || formitem.scope==13 || formitem.scope==14&& formitem.childSubjects!=undefined">
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

                                    <div class="mgt" v-if="formitem.scope==1||formitem.scope==2">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>正确选项</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formitem.selectionKey" :importType="'selectionKey'" @exportData="exportSelectionKeyData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>答案</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formitem.answer" :importType="'answer'" @exportData="exportAnswerData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>解析</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formitem.analysis" :importType="'analysis'" @exportData="exportAnalysisData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            <div class="page-divider page-divider-horizontal"></div>
                            <div style="text-align:center;margin-bottom:15px;">
                                <Button type="primary"  @click="updata(formitem.uid)">保存</Button>
                                <Button type="default"  @click="submit(formitem.uid)" v-if="!deleteShow">上架</Button>
                                <Button type="error"  @click="remove(formitem.uid)" v-if="deleteShow">下架</Button>
                            </div>
                        </Form>
                    </div>
                    <div class="mt20">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-show="pageshow"></paging>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import useCourse from './useCourse.vue'
import useType from './useType.vue'

import updateUeditor from '@/components/view/updateUeditor.vue'
import selectUeditor from '@/components/view/selectUeditor.vue'
import scopeFss from '@/components/view/scopeFss.vue'
import scopeChinese from '@/components/view/scopeChinese.vue'
import Pages from '@/components/view/page.vue'
import Vue from 'vue'
export default {
    name: 'index',
    components: {
        Paging:Pages,
        useCourse,
        useType,
        updateUeditor,
        selectUeditor,
        scopeFss,
        scopeChinese
    },
    data () {
        return {
            // 搜索数据
            sourceId:1,//选中题库来源
            stateId:0,//选中状态
            pageshow:false,
            // 题目展示数据
            formItem: {},
            ruleValidate: {

            },
            // 分页
            pageData:{
                //分页数
                arrPageSize:[1,5,10,15,20],
                //分页大小
                pagesize:this.$store.state.usetest.pageData['pagesize'],
                //总分页数
                pageCount:this.$store.state.usetest.pageData['pageCount'],
                //当前页面
                pageCurrent:this.$store.state.usetest.pageData['pageCurrent'],
                //总数
                totalCount:this.$store.state.usetest.pageData['totalCount']
            },
            // 修改数据
            updataDatas:{
                question:'',//题目
                content:'',//题干
                selectionKey:'',//正确选项
                answer:'',//答案
                analysis:'',//解析
            },
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
            deleteShow:false,//是否上架
        }
    },
    watch:{
        sourceId:function(val){
            this.$store.dispatch("usesourceSearch",val);
        },
        stateId:function(val){
            this.$store.dispatch("usestateSearch",val);
        },
    },
    created() {
        this.sourceId=this.$store.state.topic.usesearch_source
        this.stateId=this.$store.state.topic.usesearch_state
        this.getInfo();
    },
    mounted(){

    },
    methods: {
        getInfo () {
            let _this = this
            this.$Spin.show();
            let datas={
                page: this.$store.state.usetest.pageData['pageCurrent'],//当前页
                pageSize:1,
                source:this.$store.state.topic.usesearch_source,
                state:this.$store.state.topic.usesearch_state
            }
            if(this.$store.state.topic.usesearch_course){
                var search_course=this.$store.state.topic.usesearch_course
                datas.courseId=search_course[search_course.length-1]
            }
            if(this.$store.state.topic.usesearch_type){
                var search_type=this.$store.state.topic.usesearch_type
                datas.typeId=search_type
            }
            this.$api.get("/admin/api/formal/subject/list", datas, reset => {
                if (reset.code === 200) {
                    this.$Spin.hide();
                    this.$store.commit("ueType",'')
                    if(reset.data.records){
                        _this.formItem=reset.data.records;
                        for (var i = 0; i < _this.formItem.length; i++) {
                            if(_this.formItem[i].scope==1 || _this.formItem[i].scope==2){
                                if (_this.formItem[i].selection) {
                                    _this.selectionMsg=JSON.parse(_this.formItem[i].selection)
                                    _this.selectionMsgCopy={..._this.selectionMsg}
                                }else{
                                    _this.selectionMsg={}
                                    _this.selectionMsgCopy={}
                                }
                            }
                            if(_this.formItem[i].scope==5 || _this.formItem[i].scope==6 || _this.formItem[i].scope==7 && _this.formItem[i].childSubjects!=undefined){
                                _this.yingyuMsg=_this.formItem[i].childSubjects
                            }
                            if(_this.formItem[i].scope==12 ||_this.formItem[i].scope==13||_this.formItem[i].scope==14 && _this.formItem[i].childSubjects!=undefined){
                                _this.chineseMsg=_this.formItem[i].childSubjects
                            }
                        }
                        if(this.$store.state.topic.usesearch_state==0){//正常状态
                            this.deleteShow=true
                        }else{
                            this.deleteShow=false
                        }
                        _this.pageData.pageCount=reset.data.pages//总页数
                        _this.pageData.totalCount=reset.data.total//总条数
                        _this.$store.dispatch('usepageSearch',_this.pageData);
                        _this.pageshow=true;
                        this.chineseShow=false
                        this.styleSel='';
                        this.fssShow=false;
                        this.selBool=true;
                    }else{
                        this.$Message.error('暂无数据!')
                        _this.formItem={}
                        _this.pageshow=false;
                    }
                }else {
                    _this.formItem={}
                    _this.pageshow=false;
                    _this.$netcode.getApiCode(reset)
                    this.$Spin.hide();
                }
            })
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent//当前页
            this.pageData.pagesize = e.pagesize//每页大小
            this.$store.dispatch('usepageSearch',this.pageData);
            this.getInfo()
        },
        // 查询
        handleSubmit(){
            this.pageData.pageCurrent=1;
            this.pageData.pagesize=1;
            this.$store.dispatch('usepageSearch',this.pageData);
            this.getInfo();
        },
        // updata(e){
        //     this.$router.push({
        //         path:'/use/test/edit/'+e
        //     })
        // },
        submit(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要上架试题吗?</p>',
                onOk: () => {
                    var data={
                        uid:e,
                    }
                    this.$api.post("/admin/api/subject/up", data, reset => {
                        if (reset.code === 200) {
                            _this.$Message.success("上架成功!")
                            if (_this.pageData.pageCurrent!=1) {
                                _this.pageData.pageCurrent=_this.pageData.pageCurrent-1
                            }
                            _this.getInfo();
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        remove(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要下架试题吗?</p>',
                onOk: () => {
                    let datas={
                        uid:e
                    }
                    this.$api.post("/admin/api/subject/off", datas, reset => {
                        if (reset.code === 200) {
                            _this.$Message.success("下架成功!")
                            if (_this.pageData.pageCurrent!=1) {
                                _this.pageData.pageCurrent=_this.pageData.pageCurrent-1
                            }
                            _this.getInfo();
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        // 修改
        exportQuestionData(e){
            if(e.data){
                this.updataDatas.question=e.data
            }
        },
        exportContentData(e){
            if(e.data){
                this.updataDatas.content=e.data
            }
        },
        exportSelectionKeyData(e){
            if(e.data){
                this.updataDatas.selectionKey=e.data
            }
        },
        exportAnswerData(e){
            if(e.data){
                this.updataDatas.answer=e.data
            }
        },
        exportAnalysisData(e){
            if(e.data){
                this.updataDatas.analysis=e.data
            }
        },
        // 保存修改内容
        updata(e){
            let _this = this
            let datas={
                id: e,//当前页
            }
            if(this.updataDatas.question){
                datas.question=this.updataDatas.question
            }
            if(this.updataDatas.content){
                datas.content=this.updataDatas.content
            }
            if(this.updataDatas.answer){
                datas.answer=this.updataDatas.answer
            }
            if(this.updataDatas.analysis){
                datas.analysis=this.updataDatas.analysis
            }
            if(this.updataDatas.selectionKey){
                datas.selectionKey=this.updataDatas.selectionKey
            }
            if(this.selBool){
                datas.selection=JSON.stringify(this.selectionMsg)
            }
            this.$api.post("/admin/api/feedback/subject/update", datas, reset => {
                if (reset.code === 200) {
                    _this.$Message.success("修改成功!");
                    _this.getInfo();;
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
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
                this.$api.post("/admin/api/feedback/subject/update",e.data, reset => {
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
            if (e.data) {
                this.selectionMsg[e.key]=e.data
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
            Vue.set(this.selectionMsg,"选项号"+new Date().getTime(),"暂无添加选项值")
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
    .form-border{
        border: 1px solid #dedede;
        margin-bottom:15px;
    }
    .mgt{
        margin-top: 15px;
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
