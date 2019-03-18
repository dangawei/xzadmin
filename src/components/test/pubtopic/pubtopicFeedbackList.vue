<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>题目管理</BreadcrumbItem>
                <BreadcrumbItem>校验管理</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>公共库题目列表</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    <Form :model="formCustom" :label-width="80" label-position="right">
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
                        </Row>
                        <Row>

                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
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
                                        <FormItem label="题目id:" prop="id">
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
                                    <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.source">
                                        <FormItem label="来源:" prop="source">
                                            <p>{{formitem.source}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="24" :md="18" :lg="18" v-if="formitem.knowledgeList">
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
                                            <update-ueditor :importData="formitem.question" :importType="'question'" :importId="formitem.id"  @exportData="exportQuestionData"></update-ueditor>
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
                                            <update-ueditor :importData="formitem.content" :importType="'content'" :importId="formitem.id"  @exportData="exportContentData"></update-ueditor>
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
                                            <select-ueditor :importData="selectValue" :importType="selectValueKey" :importId="formitem.id"  @exportData="exportSelectionData"></select-ueditor>
                                        </Col>
                                    </Row>
                                </div>

                                <!-- 完型填空&&阅读理解&&七选五 -->
                                <div class="mgt" v-if="(formitem.scope==5 ||formitem.scope==6 ||formitem.scope==7) && formitem.course=='英语'">
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
                                <div class="mgt" v-if="(formitem.scope==12 || formitem.scope==13 || formitem.scope==14) &&  formitem.course=='语文'">
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
                                            <update-ueditor :importData="formitem.selectionKey" :importType="'selectionKey'" :importId="formitem.id"  @exportData="exportSelectionKeyData"></update-ueditor>
                                        </Col>
                                    </Row>
                                </div>

                                <div class="mgt">
                                    <Row>
                                        <Col :xs="2" :sm="2" :md="2" :lg="2">
                                            <h3>答案</h3>
                                        </Col>
                                        <Col span="22">
                                            <update-ueditor :importData="formitem.answer" :importType="'answer'" :importId="formitem.id"  @exportData="exportAnswerData"></update-ueditor>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="mgt">
                                    <Row>
                                        <Col :xs="2" :sm="2" :md="2" :lg="2">
                                            <h3>解析</h3>
                                        </Col>
                                        <Col span="22">
                                            <update-ueditor :importData="formitem.analysis" :importType="'analysis'" :importId="formitem.id"  @exportData="exportAnalysisData"></update-ueditor>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div class="page-divider page-divider-horizontal"></div>
                        <div style="text-align:center;margin-bottom:15px;">
                            <!-- <Button type="primary"  @click="updata(formitem.id)">提交</Button> -->
                            <Button type="default"  @click="submit(formitem.id)">提交</Button>
                            <Button type="error"  @click="remove(formitem.id)">删除</Button>
                        </div>
                    </Form>
                    </div>
                    <div class="mt20">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                    </div>
                </div>
                <div>
                    <BackTop></BackTop>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
import cascader from '@/components/pub/cascader.vue'
import Course from './pubcourse.vue'
import getCourseType from './pubcourseType.vue'
import getCategory from '@/components/pub/getCategory.vue'
import getDifficulty from '@/components/pub/getDifficulty.vue'
import getCourceCascader from '@/components/pub/getCourceCascader.vue'

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
        Course,
        getCourseType,
        getCategory,
        getDifficulty,
        getCourceCascader,
        cascader,

        updateUeditor,
        selectUeditor,
        scopeFss,
        scopeChinese
    },
    data () {
        return {
            pageshow:false,
            deleteShow:false,
            formItem: {},
            ruleValidate: {

            },
            formCustom:{
                type:'',
                category:'',
                difficulty:'',
                course:'',
                status:'1'
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
            updataDatas:{

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

    },
    mounted(){
        this.getInfo();
    },
    methods: {
        getInfo () {
            let _this = this
            this.$Spin.show();
            let datas={
                page: _this.pageData.pageCurrent,//当前页
                pageSize: 1,
                status:-1
            }
            if(this.$store.state.topic.pubsearch_course.length!=0){
                var search_course=this.$store.state.topic.pubsearch_course
                datas.courseId=search_course[search_course.length-1]
            }
            if(this.$store.state.topic.pubsearch_type){
                var search_type=this.$store.state.topic.pubsearch_type
                datas.typeId=search_type
            }

            if (this.formCustom.category) {
                datas.categoryId=this.formCustom.category
                _this.$webapi.save("category",this.formCustom.category);
            }else{
                _this.$webapi.save("category",'');
            }
            if (this.formCustom.difficulty) {
                datas.difficultyId=this.formCustom.difficulty
                _this.$webapi.save("difficulty",this.formCustom.difficulty);
            }else{
                _this.$webapi.save("difficulty",'');
            }
            if (this.formCustom.chapterId) {
                datas.knowledgeId=this.formCustom.chapterId
                _this.$webapi.save("chapterId",this.formCustom.chapterId);
            }else{
                _this.$webapi.save("chapterId",'');
            }
            this.$api.get("/admin/api/source/subject/list", datas, reset => {
                if (reset.code === 200) {
                    _this.$Spin.hide();
                    _this.$store.commit("ueType",'')
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
                        _this.pageData.pagesize = reset.data.size
                        _this.pageData.totalCount = reset.data.total
                        _this.pageData.pageCount = reset.data.pages
                        _this.pageData.pageCurrent = reset.data.current

                        _this.pageshow =  true
                        this.chineseShow=false
                        this.styleSel='';
                        this.fssShow=false;
                        this.selBool=false;
                    }else{
                        _this.formItem=[]
                        _this.$Message.success("暂无数据!")
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
            this.$webapi.save("pageCurrent",e.pageCurrent);
            this.$webapi.save("pagesize",e.pagesize);
            this.getInfo()
        },
        submit(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要提交吗?</p>',
                onOk: () => {
                    var data={
                        id:e
                    }
                    this.$api.post("/admin/api/source/subject/submit", data, reset => {
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
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.getInfo()
        },
        exportCourseData(e){
            if (e.course=="全部") {
                this.formCustom.course='';
            }else{
                this.formCustom.course=e.course;
                this.formCustom.courseValue=e.courseValue;
            }
            this.formCustom.chapterId=e.chapterId;
        },
        exportCourseTypeData(e){
            this.formCustom.type=e;
        },
        exportCategoryData(e){
            this.formCustom.category=e;
        },
        exportDifficultyData(e){
            this.formCustom.difficulty=e;
        },
        remove (params) {
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除吗?</p>',
                onOk: () => {
                    _this.itemdel(params)
                },
                onCancel: () => {

                }
            });

        },
        itemdel (params) {
            let _this = this
            var data={
                id:params
            }
            this.$api.post("/admin/api/source/subject/delete", data, reset => {
                if (reset.code === 200) {
                    _this.$Message.success("删除成功!")
                    _this.getInfo();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
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
            this.$api.post("/admin/api/source/subject/update", datas, reset => {
                if (reset.code === 200) {
                    // _this.$Message.success("修改成功!");
                    _this.updataDatas={}
                    _this.selBool=false
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
        exportSelectionKeyData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.selectionKey=e.data
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
                this.$api.post("/admin/api/source/subject/update",e.data, reset => {
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
