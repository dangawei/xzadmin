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
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="问题标签:" prop="tag">
                                                <p>{{formitem.tag}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="24" :md="18" :lg="18" v-if="formitem.reason">
                                            <FormItem label="具体描述:" prop="reason">
                                                <!-- {{formItem.knowledges}} -->
                                                <span class="span-interval">{{formitem.reason}}</span>
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
                                <Button type="primary"  @click="updata(formitem.id)">修改</Button>
                                <Button type="default"  @click="submit(formitem.id)" v-if="!deleteShow">正常</Button>
                                <Button type="primary"  @click="feedback(formitem.id)" v-if="!deleteShow">下架</Button>
                                <Button type="error"  @click="remove(formitem.uid)" v-if="deleteShow">删除</Button>
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
import Pages from '@/components/pub/page.vue'
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
import getCourseType from './backcourseType.vue'
import Course from './backcourse.vue'

export default {
    name: 'index',
    components: {
        Paging:Pages,
        uploadPhoto,
        getCourseType,
        Course
    },
    data () {
        return {
            pageshow:false,
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
                pageSize:this.$store.state.feedback.pageData['pagesize'],
            }
            if(this.$store.state.topic.backsearch_course){
                var search_course=this.$store.state.topic.backsearch_course
                datas.course=search_course[search_course.length-1]
            }
            if(this.$store.state.topic.backsearch_type){
                var search_type=this.$store.state.topic.backsearch_type
                datas.type=search_type
            }
            this.$api.get("/admin/api/feedback/subject/list", datas, reset => {
                if (reset.code === 200) {
                    this.$Spin.hide();
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
                    }
                    _this.pageData.pagesize = reset.data.size
                    _this.pageData.totalCount = reset.data.total
                    _this.pageData.pageCurrent = reset.data.current
                    _this.pageData.pageCount = reset.data.pages
                    _this.$store.dispatch('pageDataFeedback',_this.pageData);
                    _this.pageshow =  true
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
        updata(e){
            this.$router.push({
                path:'/feedback/edit/'+e
            })
        },
        exportData(e){
            console.log(e);
        },
        submit(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要提交吗?</p>',
                onOk: () => {
                    var data={
                        id:e,
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
            let datas={
                id:e,
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
        ignore(){
            this.feedback("0")
        },
        unshelve(){
            this.feedback("1")
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
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.getInfo()
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
