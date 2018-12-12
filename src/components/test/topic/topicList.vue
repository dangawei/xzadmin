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
                                <FormItem label="学科">
                                    <course></course>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="章节" prop="chapter">
                                    <!-- <cascader :importData="importCascderData" @exportData="exportCourseData" v-if="cascaderShow"></cascader> -->
                                    <chapter></chapter>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="题型" prop="type">
                                    <get-course-type :importData="importTypeData" @exportData="exportCourseTypeData"></get-course-type>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <!-- <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="类型" prop="category">
                                    <get-category :importData="importCategoryData" @exportData="exportCategoryData"></get-category>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="难度" prop="difficulty">
                                   <get-difficulty :importData="importDifficultyData" @exportData="exportDifficultyData"></get-difficulty>
                                </FormItem>
                            </Col> -->
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="是否反馈" prop="status">
                                   <Select v-model="formCustom.status">
                                        <Option value="1">校验试题</Option>
                                        <Option value="-1">反馈试题</Option>
                                    </Select>
                                </FormItem>
                            </Col>
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
                                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                                        <FormItem label="章节:" prop="chapter">
                                            <span class="span-interval">{{formitem.chapters}}</span>
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
                                        <FormItem label="questionId:" prop="questionId">
                                            <p>{{formitem.questionId}}</p>
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
                                <Row v-if="formitem.knowledgeList">
                                    <Col :xs="24" :sm="8" :md="6" :lg="6">
                                        <FormItem label="难度:" prop="url">
                                            <p>{{formitem.difficulty}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :sm="24" :md="18" :lg="18">
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
                                            <h3>题目</h3>
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
                                            <h3>题干</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <p v-html="formitem.content" class="text-indent"></p>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="" v-if="formitem.scope==5 && formitem.childSubjects!=undefined">
                                    <div>
                                        <h3>全部选项</h3>
                                    </div>
                                    <!-- {{formitem.selection.A}} -->
                                    <div v-for="(value, index) in formitem.childSubjects" :key="index" v-if="wanxingShow">
                                        <Row style="margin-bottom:15px;">
                                            <Col :xs="24" :sm="24" :md="1" :lg="1">
                                                <span>({{index+1}})</span>
                                            </Col>
                                            <Col :xs="24" :sm="24" :md="4" :lg="4" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num">
                                            <!-- <Col :xs="24" :sm="24" :md="24" :lg="24"> -->
                                                <p class="text-indent">
                                                    <span>{{key}}.</span>
                                                    <Input :value="item" style="width:80%;" @input="changeItem(value.id,key,value.selection)"></Input>
                                                </p>
                                            </Col>
                                            <Col :xs="24" :sm="24" :md="1" :lg="1">
                                                <Button type="primary" size="small" @click="sureItem(value.id,value.selection)">确认修改</Button>
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
                                            <Col :xs="24" :sm="24" :md="1" :lg="1">
                                                <Button type="primary" size="small" @click="sureContent(value.id,value.content,value.selection)">确认修改</Button>
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
                                            <Col :xs="24" :sm="24" :md="1" :lg="1">
                                                <span>({{index+1}})</span>
                                            </Col>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num" style="margin-bottom:15px;">
                                                <p class="text-indent">
                                                    <span>{{key}}.</span>
                                                    <Input :value="item" style="width:80%;" @input="changeItem(value.id,key,value.selection)"></Input>
                                                </p>
                                            </Col>
                                            <Col :xs="1" :sm="1" :md="1" :lg="1">
                                                <Button type="primary" size="small" @click="sureContent(value.id,value.content,value.selection)">确认修改</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div class="" v-if="formitem.selection==undefined?false:true">
                                    <div>
                                        <h3>全部选项</h3>
                                    </div>
                                    <!-- {{formitem.selection.A}} -->
                                    <div v-for="(value, key, index) in formitem.selection" :key="key" class="div-indent">
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <h5>选项{{key}}:</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <p v-html="value" class="p-indent"></p>
                                            </Col>
                                        </Row>
                                    </div>

                                </div>
                                <div class="" v-if="formitem.selectionKey==undefined?false:true">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h3>正确选项</h3>
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
                                            <h3>答案</h3>
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
                                            <h3>解析</h3>
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
                            <Button type="primary"  @click="feedback(formitem.id)" v-if="!deleteShow">反馈</Button>
                            <Button type="error"  @click="remove(formitem.id)" v-if="deleteShow">删除</Button>
                        </div>

                    </Form>
                    </div>
                    <div class="mt20">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
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
import Pages from '@/components/pub/page.vue'
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
import getCourse from '@/components/pub/getCourse.vue'
import cascader from '@/components/pub/cascader.vue'
import getCourseType from './courseType.vue'
import getCategory from '@/components/pub/getCategory.vue'
import getDifficulty from '@/components/pub/getDifficulty.vue'
import Course from './course.vue'
import Chapter from './chapter.vue'

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
        Chapter
    },
    data () {
        return {
            baseInfoShow:false,
            dealerShow:false,
            pageshow:false,
            iconShow:false,
            imgShow:false,
            importShow:false,
            importEditShow:false,
            loadingShow:false,
            deleteShow:false,
            cascaderShow:false,
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
            qiwuShow:false,//七选五选项是否显示
            qiwuData:{},//七选五数据
            boolOnloading:false,
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
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        if (from.name==='topicPreview'&&to.name==='topicList') {
            to.meta.keepAlive = false;  // 让 列表页 不缓存，即刷新
            to.meta.boolOnloading = true;
            next(vm=>{
                if (to.meta.boolOnloading) {
                    vm.getpage()
                }
            });
        }else if (from.name==='topicEdit'&&to.name==='topicList') {
            to.meta.keepAlive = false;  // 让 列表页 缓存，即不刷新
            to.meta.boolOnloading = true;
            next(vm=>{
                vm.getpage()
            });
        }else{
            to.meta.keepAlive = false;  // 让 列表页 即不缓存，刷新
            next(vm=>{
                vm.cascaderShow=true;
                vm.getInfo()
            })
        }
    },
    beforeRouteLeave(to,form,next){
        form.meta.boolOnloading = false;
        next();
    },
    created() {
        if (this.$route.meta.boolOnloading) {
            if (this.$webapi.get('difficulty')) {
                this.importDifficultyData=this.$webapi.get('difficulty');
            }
            if (this.$webapi.get('status')) {
                this.formCustom.status=this.$webapi.get('status');
            }
            if (this.$webapi.get('category')) {
                this.importCategoryData=this.$webapi.get('category');
            }
        }
    },
    mounted(){
        // this.getInfo();
    },
    methods: {
        getpage(){
            if (this.$webapi.get('pageCurrent')&&this.$webapi.get('pagesize')) {
                this.pageData.pageCurrent = this.$webapi.get('pageCurrent');
                this.pageData.pagesize = this.$webapi.get('pagesize');
            }
            if (this.$webapi.get('category')) {
                this.formCustom.category=this.$webapi.get('category')
            }
            if (this.$webapi.get('difficulty')) {
                this.formCustom.difficulty=this.$webapi.get('difficulty')
            }
            if (this.$webapi.get('status')) {
                this.formCustom.status=this.$webapi.get('status')
            }
            this.getInfo();
        },
        getInfo () {
            let _this = this
            this.$Spin.show();
            this.wanxingShow=false;
            this.yueduShow=false;
            let datas={
                page: _this.pageData.pageCurrent,//当前页
                pageSize: _this.pageData.pagesize,
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
            // if (this.formCustom.chapterId) {
            //     datas.chapterId=this.formCustom.chapterId
            //     _this.$webapi.save("chapterId",this.formCustom.chapterId);
            // }else{
            //     _this.$webapi.save("chapterId",'');
            // }
            if (this.formCustom.status==-1) {
                datas.status=this.formCustom.status
                _this.$webapi.save("status",this.formCustom.status);
                _this.deleteShow=true;
            }else{
                _this.$webapi.save("status",this.formCustom.status);
                _this.deleteShow=false;
            }
            this.$api.get("/admin/api/record/subject/list", datas, reset => {
                if (reset.code === 200) {
                    this.$Spin.hide();
                    if (reset.data.records) {
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
                        // var topicItem=JSON.stringify(reset.data.records);
                        _this.$webapi.save("pageCurrent",reset.data.current);
                        _this.$webapi.save("pagesize",reset.data.size);
                        // _this.$webapi.savelocal("topicItem",topicItem);
                        _this.pageData.pagesize = reset.data.size
                        _this.pageData.totalCount = reset.data.total
                        _this.pageData.pageCount = reset.data.pages
                        _this.pageData.pageCurrent = reset.data.current

                        _this.pageshow =  true
                        _this.loadingShow=false;
                    }else{
                        _this.$Message.success("暂无数据!");
                        _this.formItem=[]
                    }

                }else {
                    _this.$netcode.getApiCode(reset)
                    _this.$Spin.hide();
                }
            })
            // setTimeout(() => {
            //     this.$Message.success("请求失败,请重试!");
            //     this.$Spin.hide();
            // }, 8000);
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.$webapi.save("pageCurrent",e.pageCurrent);
            this.$webapi.save("pagesize",e.pagesize);
            this.getInfo()
        },
        updata(e){
            this.$router.push({
                path:'/topic/edit/'+e
            })
        },
        add(){
            this.importShow=true;
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
                    this.$api.post("/admin/api/record/subject/submit", data, reset => {
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
        feedback(e){
            let _this = this
            let datas={
                id:e
            }
            this.$api.post("/admin/api/record/subject/feedback", datas, reset => {
                if (reset.code === 200) {
                    _this.$Message.success("反馈成功!");
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
        changeItem(id,key,value){
            if(Object.keys(this.jsonValue).length==0){
                this.jsonValue=JSON.parse(value);
                this.wanxingBool=false;
                this.wanxingId=id;
                if(event.target.value!=this.jsonValue[key]){
                    this.jsonValue[key]=event.target.value;
                }
            }else{
                if (this.wanxingId!=id) {
                    this.$Message.error("请先提交修改选项,再修改其他选项!")
                }else{
                    if(event.target.value!=this.jsonValue[key]){
                        this.jsonValue[key]=event.target.value;
                    }
                }

            }
        },
        sureItem(id,value){
            let _this = this
            if(_this.wanxingId!=0 && _this.wanxingId!=id){
                this.$Message.error("请先提交修改选项,再修改其他选项!")
            }else{
                if(Object.keys(this.jsonValue).length==0){
                    this.jsonValue=JSON.parse(value);
                }
                let datas={
                    id: id,
                    selection:JSON.stringify(this.jsonValue)
                }
                this.$api.post("/admin/api/record/subject/update", datas, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success("修改成功!");
                        _this.jsonValue={}
                        _this.wanxingId=0;
                        _this.getInfo();
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
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
    /* .div-indent{
        text-indent: 18px;
    } */
    /* .p-indent{
        text-indent: 30px;
    } */
</style>
