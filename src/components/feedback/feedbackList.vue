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
                    <h2>反馈题目列表</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    <Form :label-width="80" label-position="right">
                        <Row class="search-row">
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="学科">
                                    <course></course>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="题型" prop="type">
                                    <get-course-type></get-course-type>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit()">查询</Button>
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
                                            <FormItem label="反馈id:" prop="id">
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
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="反馈时间:" prop="createdDate">
                                                <p>{{formitem.createdDate | formatTime('time',formitem.createdDate)}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="24" :md="12" :lg="12" v-if="formitem.knowledgeList">
                                            <FormItem label="知识点:" prop="knowledgeList">
                                                <!-- {{formItem.knowledges}} -->
                                                <span v-for="item in formitem.knowledgeList" class="span-interval">{{item}}</span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="18" :sm="18" :md="18" :lg="18">
                                            <FormItem label="问题标签:" prop="tag">
                                                <div :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
                                                  <div class="intro-content" ref="desc">
                                                    <span class="merchant-desc">{{formitem.tag}}</span>
                                                    <div class="unfold" @click="showTotalIntro">
                                                      <p>{{exchangeButton ? '展开' : '收起'}}</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <!-- <span>{{formitem.tag}}</span> -->
                                            </FormItem>
                                        </Col>
                                        <Col :xs="18" :sm="18" :md="18" :lg="18" v-if="formitem.reason">
                                            <FormItem label="具体描述:" prop="reason">
                                                <div :class="detshowTotal ? 'total-introduce' : 'detailed-introduce'">
                                                  <div class="intro-content" ref="desc">
                                                    <span class="merchant-desc">{{formitem.reason}}</span>
                                                    <div class="unfold" @click="detshowTotalIntro">
                                                      <p>{{detexchangeButton ? '展开' : '收起'}}</p>
                                                    </div>
                                                  </div>
                                                </div>
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
                                <Button type="default"  @click="submit(formitem.uid)">正常</Button>
                                <Button type="error"  @click="feedback(formitem.uid)">下架</Button>
                            </div>
                        </Form>
                    </div>
                    <div class="mt20">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
import getCourseType from './backcourseType.vue'
import Course from './backcourse.vue'

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
        uploadPhoto,
        getCourseType,
        Course,
        updateUeditor,
        selectUeditor,
        scopeFss,
        scopeChinese
    },
    data () {
        return {
            pageshow:false,
            formItem: {},
            ruleValidate: {

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
            // 是否展示所有文本内容
            showTotal: true,
            // 显示展开还是收起
            exchangeButton: true,
            // 是否显示展开收起按钮
            showExchangeButton: false,
            // 是否展示所有文本内容
            detshowTotal: true,
            // 显示展开还是收起
            detexchangeButton: true,
            // 是否显示展开收起按钮
            detshowExchangeButton: false,
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
        }
    },
    created() {
        this.getInfo();
    },
    mounted(){

    },
    methods: {
        getInfo () {
            let _this = this
            this.$Spin.show();
            let datas={
                page: this.$store.state.feedback.pageData['pageCurrent'],//当前页
                pageSize:1,
            }
            if(this.$store.state.topic.backsearch_course){
                var search_course=this.$store.state.topic.backsearch_course
                datas.courseId=search_course[search_course.length-1]
            }
            if(this.$store.state.topic.backsearch_type){
                var search_type=this.$store.state.topic.backsearch_type
                datas.typeId=search_type
            }
            this.$api.get("/admin/api/feedback/subject/list", datas, reset => {
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
                    _this.$netcode.getApiCode(reset)
                    this.$Spin.hide();
                }
            })
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.$store.dispatch('pageDataFeedback',this.pageData);
            this.getInfo()
        },
        // updata(e){
        //     this.$router.push({
        //         path:'/feedback/edit/'+e
        //     })
        // },
        submit(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要提交吗?</p>',
                onOk: () => {
                    var data={
                        uid:e,
                        state:0
                    }
                    this.$api.post("/admin/api/feedback/subject/off", data, reset => {
                        if (reset.code === 200) {
                            _this.$Message.success("提交成功!")
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
        feedback(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要提交吗?</p>',
                onOk: () => {
                    let datas={
                        uid:e,
                        state:1
                    }
                    this.$api.post("/admin/api/feedback/subject/off", datas, reset => {
                        if (reset.code === 200) {
                            _this.$Message.success("下架成功!");
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
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.getInfo()
        },
        // 展开&隐藏功能
        showTotalIntro () {
          this.showTotal = !this.showTotal;
          this.exchangeButton = !this.exchangeButton;
        },
        detshowTotalIntro () {
          this.detshowTotal = !this.detshowTotal;
          this.detexchangeButton = !this.detexchangeButton;
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
    // 折叠显示隐藏的样式
    // .total-introduce {
    .detailed-introduce {
      height: auto;
      overflow: hidden;
      font-size: 14px;
      color: #434343;
      padding-right: 40px;
      .intro-content {
        .merchant-desc {
          width: 100%;
          line-height: 2rem;
        }
      }
      .unfold {
        display: block;
        z-index: 11;
        float: right;
        width: 40px;
        height: 2rem;
        cursor: pointer;
        p {
          margin: 0;
          line-height: 2rem;
          color: #57A3F3;
        }
      }
    }
    .total-introduce {
        font-size: 14px;
        color: #434343;
        position: relative;
        overflow: hidden;
        padding-right: 40px;
        .intro-content {
            // 最大高度设为1倍的行间距
            max-height: 2rem;
            line-height: 2rem;
            -webkit-line-clamp: 1;
            word-wrap: break-word;
            /*强制打散字符*/
            word-break: break-all;
            background: #ffffff;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            .merchant-desc {
                width: 100%;
                line-height: 2rem;
            }
        .unfold {
          z-index: 11;
          width: 40px;
          height: 2rem;
          outline: 0;
          position: absolute;
          right: 0;
          bottom: 0;
          cursor: pointer;
          p {
            margin: 0;
            line-height: 2rem;
            color: #57A3F3;
          }
        }
      }
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
