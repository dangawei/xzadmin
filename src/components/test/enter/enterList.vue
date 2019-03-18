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
                    <h2>录入题目列表</h2>
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
                                            <FormItem label="题号:" prop="questionId">
                                                <p>{{formitem.questionId}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.grade">
                                            <FormItem label="年级:" prop="grade">
                                                <p>{{formitem.grade}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.course">
                                            <FormItem label="科目:" prop="course">
                                                <p>{{formitem.course}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.edition">
                                            <FormItem label="教材版本:" prop="edition">
                                                <p>{{formitem.edition}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.textbook">
                                            <FormItem label="教材:" prop="textbook">
                                                <p>{{formitem.textbook}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.type">
                                            <FormItem label="题型:" prop="type">
                                                <p>{{formitem.type}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.difficulty">
                                            <FormItem label="难度:" prop="difficulty">
                                                <p>{{formitem.difficulty}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.bookName">
                                            <FormItem label="教辅:" prop="bookName">
                                                <p>{{formitem.bookName}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.source">
                                            <FormItem label="来源:" prop="source">
                                                <p>{{formitem.source}}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="18" :lg="18" v-if="formitem.chapters">
                                            <FormItem label="章节:" prop="chapters">
                                                <!-- {{formItem.knowledges}} -->
                                                <span class="span-interval">{{formitem.chapters}}</span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
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
                                    <div class="" v-if="formitem.scope==1 || formitem.scope==2 &&formitem.selection!=undefined">
                                        <div>
                                            <h3>全部选项</h3>
                                        </div>
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
                                        <scope-five :importScope="formitem.scope" :importData="formitem.childSubjects" @exportData="exportScopeDatas" @sureData="sureDatas" v-if='wanxingShow'></scope-five>
                                    </div><!-- 完型填空结束 -->
                                    <!-- 阅读理解 -->
                                    <div class="" v-if="formitem.scope==6 && formitem.childSubjects!=undefined">
                                        <scope-six :importScope="formitem.scope" :importData="formitem.childSubjects" @exportData="exportScopeDatas" @sureData="sureDatas" v-if='yueduShow'></scope-six>
                                    </div><!-- 阅读理解结束 -->
                                    <!-- 七选五 -->
                                    <div class="" v-if="formitem.scope==7 && formitem.childSubjects!=undefined">
                                        <scope-seven :importScope="formitem.scope" :importData="formitem.childSubjects" @exportData="exportScopeDatas" @sureData="sureDatas" v-if='qiwuShow'></scope-seven>
                                    </div><!-- 七选五结束 -->
                                    <!-- 诗歌阅读 -->
                                    <div class="" v-if="formitem.scope==14 && formitem.childSubjects!=undefined">
                                        <scope-fourteen :importScope="formitem.scope" :importData="formitem.childSubjects" @exportData="exportScopeDatas" @sureData="sureDatas" v-if='shigeShow'></scope-fourteen>
                                    </div><!-- 诗歌阅读结束 -->
                                    <!-- 现代文,文言文阅读 -->
                                    <div class="" v-if="formitem.scope==12 || formitem.scope==13&& formitem.childSubjects!=undefined">
                                        <scope-twelve :importScope="formitem.scope" :importData="formitem.childSubjects" @exportData="exportScopeDatas" @sureData="sureDatas" v-if='xiandaiShow'></scope-twelve>
                                    </div><!-- 现代文,文言文阅读结束 -->
                                    <!-- <div class="" v-if="formitem.selectionKey==undefined?false:true">
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
                                    </div> -->

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
import scopeFourteen from '@/components/pub/scopeFourteen.vue'
import scopeSeven from '@/components/pub/scopeSeven.vue'
import scopeSix from '@/components/pub/scopeSix.vue'
import scopeFive from '@/components/pub/scopeFive.vue'
import scopeTwelve from '@/components/pub/scopeTwelve.vue'
export default {
    name: 'index',
    components: {
        scopeFourteen,
        scopeSeven,
        scopeSix,
        scopeFive,
        scopeTwelve,
        paging:Pages,
    },
    data () {
        return {
            // 录入试题的id
            enterArray:[],
            enterId:0,
            // 题目展示数据
            formItem: [],
            ruleValidate: {

            },
            jsonValue:{},//存储阅读的选项
            jsonContent:'',//存储阅读的小题题干
            selectionKey:'',//正确选项
            content:'',//阅读小题题干
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
            pageshow:false,
            // scope修改数据
            qiwuShow:false,//七选五是否显示
            shigeShow:false,//诗歌阅读是否显示
            xiandaiShow:false,//现代文阅读是否显示
            wanxingShow:false,//完型选项是否显示
            yueduShow:false,//阅读选项是否显示
            scopeDatas:{
                id:0,//选中修改小题的id
                uid:0,//选中修改小题的uid
                jsonContent:'',//修改的小题题干
                stringAnalysis:'',//修改的小题解析
                stringAnswer:'',//修改的小题答案
                stringSelectionKey:'',//修改的小题正确选项
                jsonValue:{},//修改的小题选项
            },
        }
    },
    watch:{
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
                page: _this.pageData.pageCurrent,//当前页
                pageSize: _this.pageData.pagesize,
            }
            this.$api.get("/admin/api/record/subject/list", datas, reset => {
                if (reset.code === 200) {
                    this.$Spin.hide();
                    if(reset.data.records){
                        _this.formItem=reset.data.records;
                        for (var i = 0; i < _this.formItem.length; i++) {
                            if (_this.formItem[i].scope==1 || _this.formItem[i].scope==2 && _this.formItem[i].selection) {
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
                            if(_this.formItem[i].scope==12 ||_this.formItem[i].scope==13 && _this.formItem[i].childSubjects!=undefined){
                                _this.xiandaiShow=true
                            }
                        }
                        _this.pageData.pagesize = reset.data.size
                        _this.pageData.totalCount = reset.data.total
                        _this.pageData.pageCount = reset.data.pages
                        _this.pageData.pageCurrent = reset.data.current

                        _this.pageshow =  true
                    }else{
                        this.$Message.error('暂无数据!')
                        _this.formItem=[]
                    }
                }else {
                    _this.formItem=[]
                    _this.$netcode.getApiCode(reset)
                    this.$Spin.hide();
                }
            })
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.getInfo()
        },
        // scope判断修改数据
        exportScopeDatas(e){
            this.scopeDatas=e
        },
        sureDatas(e){
            var _this=this;
            if(e){
                let datas={
                    id: this.scopeDatas.id,
                }
                if(Object.keys(this.scopeDatas.jsonValue).length!=0){
                    datas.selection=JSON.stringify(this.scopeDatas.jsonValue);
                }
                if(this.scopeDatas.uid){
                    datas.uid=this.scopeDatas.uid;
                }
                if(this.scopeDatas.jsonContent){
                    datas.content=this.scopeDatas.jsonContent==1?"":this.scopeDatas.jsonContent;
                }
                if(this.scopeDatas.stringAnalysis){
                    datas.analysis=this.scopeDatas.stringAnalysis==1?"":this.scopeDatas.stringAnalysis;
                }
                if(this.scopeDatas.stringAnswer){
                    datas.answer=this.scopeDatas.stringAnswer==1?"":this.scopeDatas.stringAnswer;
                }
                // if(this.scopeDatas.stringSelectionKey){
                //     datas.selectionKey=this.scopeDatas.stringSelectionKey;
                // }
                this.$api.post("/admin/api/input/modify", datas, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success("修改成功!");
                        if(_this.scopeDatas.scope==5){
                            _this.wanxingShow=false
                        }
                        if(_this.scopeDatas.scope==6){
                            _this.yueduShow=false
                        }
                        if(_this.scopeDatas.scope==7){
                            _this.qiwuShow=false
                        }
                        if(_this.scopeDatas.scope==14){
                            _this.shigeShow=false
                        }
                        if(_this.scopeDatas.scope==12||_this.scopeDatas.scope==13){
                            _this.xiandaiShow=false
                        }
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
