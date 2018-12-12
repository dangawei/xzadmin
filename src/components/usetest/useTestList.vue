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
                                                <p v-html="formitem.question" class="text-indents"></p>
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
                                                <p v-html="formitem.content" class="text-indent"></p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <!-- 单选 -->
                                    <div class="" v-if="formitem.selection==undefined?false:true">
                                        <div>
                                            <h3>全部选项</h3>
                                        </div>
                                        <!-- {{formitem.selection.A}} -->
                                        <div v-for="(value, key, index) in formitem.selection" :key="key">
                                            <Row>
                                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                    <h5>选项{{key}}:</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                    <p v-html="value" class="text-indent"></p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <!-- 完型填空 -->
                                    <div class="" v-if="formitem.scope==5 && formitem.childSubjects!=undefined">
                                        <div>
                                            <h3>全部选项</h3>
                                        </div>
                                        <div v-for="(value, index) in formitem.childSubjects" :key="index" v-if="wanxingShow">
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="24" :md="1" :lg="1">
                                                    <span>题({{index+1}})</span>
                                                </Col>
                                                <Col :xs="24" :sm="24" :md="5" :lg="5" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num">
                                                    <p class="text-indent">
                                                        <span>{{key}}.</span>
                                                        <Input :value="item" style="width:80%;" @input="changeItem(value.id,key,value.selection)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="1" :md="1" :lg="1">
                                                    <p>答案:</p>
                                                </Col>
                                                <Col :xs="24" :sm="8" :md="8" :lg="8">
                                                    <p>
                                                        <Input :value="value.selectionKey" @input="changeSel(value.id,value.selectionKey)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="1" :md="1" :lg="1">
                                                    <p>解析:</p>
                                                </Col>
                                                <Col :xs="24" :sm="18" :md="18" :lg="18">
                                                    <p>
                                                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" :value="value.analysis"   @input="changeAna(value.id,value.analysis)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="6" :sm="6" :md="6" :lg="6">
                                                    <Button type="primary" size="small" @click="sureItem(value.id,value.uid)">确认修改</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <!-- 阅读理解 -->
                                    <div class="" v-if="formitem.scope==6 && formitem.childSubjects!=undefined">
                                        <div>
                                            <h3>全部选项</h3>
                                        </div>
                                        <div v-for="(value, index) in formitem.childSubjects" :key="index" v-if="yueduShow">
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                    <Input :value="value.content" style="width:80%;" @input="changeValue(value.id,value.content)"></Input>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="24" :md="24" :lg="24" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num" style="margin-bottom:15px;">
                                                    <p class="text-indent">
                                                        <span>{{key}}.</span>
                                                        <Input :value="item" style="width:80%;" @input="changeItem(value.id,key,value.selection)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="1" :md="1" :lg="1">
                                                    <p>答案:</p>
                                                </Col>
                                                <Col :xs="24" :sm="8" :md="8" :lg="8">
                                                    <p>
                                                        <Input :value="value.selectionKey" @input="changeSel(value.id,value.selectionKey)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="1" :md="1" :lg="1">
                                                    <p>解析:</p>
                                                </Col>
                                                <Col :xs="24" :sm="18" :md="18" :lg="18">
                                                    <p>
                                                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" :value="value.analysis"   @input="changeAna(value.id,value.analysis)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="6" :sm="6" :md="6" :lg="6">
                                                    <Button type="primary" size="small" @click="sureItem(value.id,value.uid)">确认修改</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <!-- 七选五 -->
                                    <div class="" v-if="formitem.scope==7 && formitem.childSubjects!=undefined">
                                        <div>
                                            <h3>全部选项</h3>
                                        </div>
                                        <div v-for="(value, index) in formitem.childSubjects" :key="index" v-if="qiwuShow">
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="24" :md="6" :lg="6">
                                                    <p>选项({{index+1}})</p>
                                                </Col>
                                                <Col :xs="24" :sm="24" :md="24" :lg="24" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num" style="margin-bottom:15px;">
                                                    <p class="text-indent">
                                                        <span>{{key}}.</span>
                                                        <Input :value="item" style="width:80%;" @input="changeItem(value.id,key,value.selection)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="1" :md="1" :lg="1">
                                                    <p>答案:</p>
                                                </Col>
                                                <Col :xs="24" :sm="8" :md="8" :lg="8">
                                                    <p>
                                                        <Input :value="value.selectionKey" @input="changeSel(value.id,value.selectionKey)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="24" :sm="1" :md="1" :lg="1">
                                                    <p>解析:</p>
                                                </Col>
                                                <Col :xs="24" :sm="18" :md="18" :lg="18">
                                                    <p>
                                                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" :value="value.analysis"   @input="changeAna(value.id,value.analysis)"></Input>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:15px;">
                                                <Col :xs="6" :sm="6" :md="6" :lg="6">
                                                    <Button type="primary" size="small" @click="sureItem(value.id,value.uid)">确认修改</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <!-- 诗歌阅读 -->
                                    <div class="" v-if="formitem.scope==14 && formitem.childSubjects!=undefined">
                                        <scope-fourteen :importData="formitem.childSubjects" @exportData="scopeFourteen" @sureData="sureScope14" v-if='shigeShow'></scope-fourteen>
                                    </div><!-- 诗歌阅读结束 -->
                                    <div class="" v-if="formitem.selectionKey==undefined?false:true">
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <h4>正确选项</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <p v-html="formitem.selectionKey" class="text-indent"></p>
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
                                                <p v-html="formitem.answer"></p>
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
                                                <p v-html="formitem.analysis"></p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            <div class="page-divider page-divider-horizontal"></div>
                            <div style="text-align:center;margin-bottom:15px;">
                                <Button type="primary"  @click="updata(formitem.uid)">修改</Button>
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
import Pages from '@/components/pub/page.vue'
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
import useCourse from './useCourse.vue'
import useType from './useType.vue'
import scopeFourteen from '@/components/pub/scopeFourteen.vue'
export default {
    name: 'index',
    components: {
        Paging:Pages,
        uploadPhoto,
        useCourse,
        useType,
        scopeFourteen
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
            importCascderData:[],
            importTypeData:'',
            importDifficultyData:'',
            importStatusData:'',
            importCategoryData:'',
            jsonValue:{},//存储阅读的选项
            jsonContent:'',//存储阅读的小题题干
            wanxingBool:false,//修改阅读内容是否提交
            wanxingId:0,//修改内容的id
            wanxingShow:false,//完型选项是否显示
            yueduShow:false,//阅读选项是否显示
            qiwuShow:false,//七选五是否显示
            boolOnloading:false,
            selectionKey:'',//正确选项
            content:'',//阅读小题题干
            deleteShow:false,
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
            // scope等于14,诗歌阅读数据
            shigeShow:false,//诗歌阅读是否显示
            scopeFourteenData:{
                id:0,//选中修改小题的id
                jsonContent:'',//修改的小题题干
                stringAnalysis:'',//修改的小题解析
                stringAnswer:'',//修改的小题答案
                stringSelectionKey:'',//修改的小题正确选项
                jsonValue:{},//修改的小题选项
            }
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
        // beforeGetInfo(){
        //     this.pageData.pagesize= this.$store.state.usetest.pageData['pagesize']
        //     this.pageData.pageCurrent= this.$store.state.usetest.pageData['pageCurrent']
        //     this.getInfo();
        // },
        getInfo () {
            let _this = this
            this.$Spin.show();
            let datas={
                page: this.$store.state.usetest.pageData['pageCurrent'],//当前页
                pageSize:this.$store.state.usetest.pageData['pagesize'],
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
            this.$api.get("/admin/api/subject/list", datas, reset => {
                if (reset.code === 200) {
                    this.$Spin.hide();
                    if(reset.data.records){
                        _this.formItem=reset.data.records;
                        for (var i = 0; i < _this.formItem.length; i++) {
                            if (_this.formItem[i].selection) {
                                _this.formItem[i].selection=JSON.parse(_this.formItem[i].selection)
                            }
                            if(_this.formItem[i].scope==5 && _this.formItem[i].childSubjects!=undefined){
                                _this.wanxingShow=true
                            }
                            if(_this.formItem[i].scope==6 && _this.formItem[i].childSubjects!=undefined){
                                _this.yueduShow=true
                            }
                            if(_this.formItem[i].scope==7 && _this.formItem[i].childSubjects!=undefined){
                                _this.qiwuShow=true
                            }
                            if(_this.formItem[i].scope==14 && _this.formItem[i].childSubjects!=undefined){
                                _this.shigeShow=true
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
        updata(e){
            this.$router.push({
                path:'/use/test/edit/'+e
            })
        },
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
        changeItem(id,key,value){
            if(this.wanxingId==0){
                this.jsonValue=JSON.parse(value);
                this.jsonValue[key]=event.target.value;
                this.wanxingBool=false;
                this.wanxingId=id;
            }else if(this.wanxingId==id){
                if (Object.keys(this.jsonValue).length==0) {
                    this.jsonValue=JSON.parse(value);
                }
                this.jsonValue[key]=event.target.value;
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        changeSel(id,value){
            if(this.wanxingId==0){
                this.selectionKey=event.target.value;
                this.wanxingBool=false;
                this.wanxingId=id;
            }else if(this.wanxingId==id){
                this.selectionKey=event.target.value;
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        changeValue(id,value){
            if(this.wanxingId==0){
                this.content=event.target.value;
                this.wanxingBool=false;
                this.wanxingId=id;
            }else if(this.wanxingId==id){
                this.content=event.target.value;
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        changeAna(id,value){
            if(this.wanxingId==0){
                this.analysis=event.target.value;
                this.wanxingBool=false;
                this.wanxingId=id;
            }else if(this.wanxingId==id){
                this.analysis=event.target.value;
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        sureItem(id,uid){
            let _this = this
            if(_this.wanxingId!=0 && _this.wanxingId!=id){
                this.$Message.error("请先提交修改选项,再修改其他选项!")
            }else{
                let datas={
                    id: id,
                    uid: uid
                }
                if(this.jsonValue){
                    datas.selection=JSON.stringify(this.jsonValue);
                }
                if(this.content){
                    datas.content=this.content;
                }
                if(this.selectionKey){
                    datas.selectionKey=this.selectionKey;
                }
                if(this.analysis){
                    datas.analysis=this.analysis;
                }
                this.$api.post("/admin/api/feedback/subject/update", datas, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success("修改成功!");
                        _this.jsonValue={}
                        _this.wanxingId=0;
                        _this.selectionKey=''
                        _this.analysis=''
                        _this.content=''
                        _this.getInfo();
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        },
        // scope等于14,诗歌阅读的修改
        scopeFourteen(e){
            this.scopeFourteenData=e
        },
        sureScope14(e){
            var _this=this;
            if(e){
                let datas={
                    uid: this.scopeFourteenData.uid,
                }
                if(Object.keys(this.scopeFourteenData.jsonValue).length!=0){
                    datas.selection=JSON.stringify(this.scopeFourteenData.jsonValue);
                }
                if(this.scopeFourteenData.jsonContent){
                    datas.content=this.scopeFourteenData.jsonContent;
                }
                if(this.scopeFourteenData.stringAnalysis){
                    datas.analysis=this.scopeFourteenData.stringAnalysis;
                }
                if(this.scopeFourteenData.stringAnswer){
                    datas.answer=this.scopeFourteenData.stringAnswer;
                }
                if(this.scopeFourteenData.stringSelectionKey){
                    datas.selectionKey=this.scopeFourteenData.stringSelectionKey;
                }
                this.$api.post("/admin/api/feedback/subject/update", datas, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success("修改成功!");
                        _this.shigeShow=false;
                        _this.getInfo();
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
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
</style>
