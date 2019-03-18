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
                    <h2>校本库题目列表</h2>
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
                                <FormItem label="录题人">
                                    <get-user></get-user>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="学科">
                                    <course></course>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="章节" prop="chapter">
                                    <chapter></chapter>
                                </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="题型" prop="type">
                                    <get-course-type :importData="importTypeData" @exportData="exportCourseTypeData"></get-course-type>
                                </FormItem>
                            </Col>
                            <!-- <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="是否反馈" prop="status">
                                   <Select v-model="formCustom.status">
                                        <Option value="1">校验试题</Option>
                                        <Option value="-1">反馈试题</Option>
                                    </Select>
                                </FormItem>
                            </Col> -->
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
                                    <Col :xs="24" :sm="6" :md="6" :lg="6">
                                        <FormItem label="录入者姓名:" prop="userName">
                                            <p>{{formitem.userName}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="6" :md="6" :lg="6">
                                        <FormItem label="来源:" prop="source">
                                            <p>{{formitem.source}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="科目:" prop="type">
                                            <p>{{formitem.course}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="题型:" prop="type">
                                            <p>{{formitem.type}}</p>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="题目id:" prop="id">
                                            <p>{{formitem.id}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="题号:" prop="questionId">
                                            <p>{{formitem.questionId}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="难度:" prop="url">
                                            <p>{{formitem.difficulty}}</p>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                                        <FormItem label="章节:" prop="chapter">
                                            <span class="span-interval">{{formitem.chapters}}</span>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col :xs="24" :sm="24" :md="24" :lg="24" v-if="formitem.knowledgeList">
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
                                            <update-ueditor :importData="formitem.question"
                                            :importId="formitem.id" :importType="'question'"  @exportData="exportQuestionData"></update-ueditor>
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
                                            <update-ueditor :importData="formitem.content" :importType="'content'"
                                            :importId="formitem.id"  @exportData="exportContentData"></update-ueditor>
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
                                <div class="mgt" v-if="formitem.scope==5 ||formitem.scope==6 ||formitem.scope==7 && formitem.course=='英语'">
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
                                        <scope-fss :importData="selectValue" :importType="selectValueKey"  @exportData="exportFssData"></scope-fss>
                                    </Col>
                                    </Row>
                                </div><!-- 型填空&&阅读理解&&七选五 -->
                                <!-- 语文题干分离 -->
                                <div class="mgt" v-if="formitem.scope==12 || formitem.scope==13 || formitem.scope==14&& formitem.course=='语文'">
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
                                            <update-ueditor :importData="formitem.answer" :importType="'answer'" :importId="formitem.id" @exportData="exportAnswerData"></update-ueditor>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="mgt">
                                    <Row>
                                        <Col :xs="2" :sm="2" :md="2" :lg="2">
                                            <h3>解析</h3>
                                        </Col>
                                        <Col span="22">
                                            <update-ueditor :importData="formitem.analysis" :importType="'analysis'" :importId="formitem.id" @exportData="exportAnalysisData"></update-ueditor>
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
            </div>
        </div>
    </div>
</template>
<script>
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
import getCourse from '@/components/pub/getCourse.vue'
import cascader from '@/components/pub/cascader.vue'
import getCourseType from './courseType.vue'
import getCategory from '@/components/pub/getCategory.vue'
import getDifficulty from '@/components/pub/getDifficulty.vue'
import Course from './course.vue'
import Chapter from './chapter.vue'
import getUser from './getUser.vue'

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
        getCourse,
        getCourseType,
        getCategory,
        getDifficulty,
        cascader,
        Course,
        Chapter,
        getUser,
        updateUeditor,
        selectUeditor,
        scopeFss,
        scopeChinese
    },
    data () {
        return {
            dealerShow:false,
            pageshow:false,
            cascaderShow:false,
            formItem: {},
            ruleValidate: {

            },
            importTypeData:'',
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
                // question:'',//题目
                // content:'',//题干
                // selectionKey:'',//正确选项
                // answer:'',//答案
                // analysis:'',//解析
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
    methods:{
        getInfo () {
            let _this = this
            this.$Spin.show();
            let datas={
                page: _this.pageData.pageCurrent,//当前页
                // pageSize: _this.pageData.pagesize,
                pageSize: 1,
                status:-1
            }
            if(this.$store.state.topic.search_course){
                var search_course=this.$store.state.topic.search_course
                datas.courseId=search_course[search_course.length-1]
            }
            if(this.$store.state.topic.search_type){
                var search_type=this.$store.state.topic.search_type
                datas.typeId=search_type
            }
            if(this.$store.state.topic.search_chapter){
                var search_chapter=this.$store.state.topic.search_chapter
                datas.chapterId=search_chapter[search_chapter.length-1]
            }
            if(this.$store.state.topic.search_user){
                datas.userId=this.$store.state.topic.search_user
            }

            if (this.formCustom.category) {
                datas.categoryId=this.formCustom.category
                _this.$webapi.save("category",this.formCustom.category);
            }else{
                _this.$webapi.save("category",'');
            }
            if (this.formCustom.difficulty) {
                datas.difficulty=this.formCustom.difficulty
                _this.$webapi.save("difficulty",this.formCustom.difficulty);
            }else{
                _this.$webapi.save("difficulty",'');
            }
            this.$api.get("/admin/api/record/subject/list", datas, reset => {
                if (reset.code === 200) {
                    this.$Spin.hide();
                    this.$store.commit("ueType",'')
                    if (reset.data.records) {
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
                        _this.$Message.success("暂无数据!");
                        _this.formItem=[]
                    }

                }else {
                    _this.$netcode.getApiCode(reset)
                    _this.$Spin.hide();
                }
            })
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
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
                    this.$api.post("/admin/api/input/up", data, reset => {
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
            this.$api.post("/admin/api/record/subject/delete", data, reset => {
                if (reset.code === 200) {
                    _this.$Message.success("删除成功!")
                    _this.getInfo();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
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
            this.$api.post("/admin/api/record/subject/update", datas, reset => {
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
        exportSelectionKeyData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.selectionKey=e.data
                this.post(this.updataDatas)
            }
        },
        //解析
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
            console.log(e);
            this.updataDatas.id=e.id
            if (e.data) {
                this.selectionMsg[e.key]=e.data
                this.post(this.updataDatas)
            }
            this.selectValueShow=e.show;
        },
        // 保存修改内容
        // updata(e){
        //     let _this = this
        //     let datas={
        //         id: e,//当前页
        //     }
        //     if(this.updataDatas.question){
        //         datas.question=this.updataDatas.question
        //     }
        //     if(this.updataDatas.content){
        //         datas.content=this.updataDatas.content
        //     }
        //     if(this.updataDatas.answer){
        //         datas.answer=this.updataDatas.answer
        //     }
        //     if(this.updataDatas.analysis){
        //         datas.analysis=this.updataDatas.analysis
        //     }
        //     if(this.updataDatas.selectionKey){
        //         datas.selectionKey=this.updataDatas.selectionKey
        //     }
        //     if(this.selBool){
        //         datas.selection=JSON.stringify(this.selectionMsg)
        //     }
        //     this.$api.post("/admin/api/record/subject/update", datas, reset => {
        //         if (reset.code === 200) {
        //             _this.$Message.success("修改成功!");
        //             _this.getInfo();;
        //         }else {
        //             _this.$netcode.getApiCode(reset)
        //         }
        //     })
        // },
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
                this.$api.post("/admin/api/record/subject/update",e.data, reset => {
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
<style scoped>
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
