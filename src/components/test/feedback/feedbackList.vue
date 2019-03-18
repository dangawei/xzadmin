<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>题目管理</BreadcrumbItem>
                <BreadcrumbItem>反馈题目列表</BreadcrumbItem>
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
                    <Form :model="formCustom" :label-width="100">
                        <Row>
                            <Col :xs="12" :sm="12" :md="6" :lg="6">
                                <FormItem label="题号" prop="appName">
                                    <Input type="text" v-model="formCustom.appName"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="12" :sm="12" :md="6" :lg="6">
                                <FormItem label="题目科目" prop="version">
                                    <Input type="text" v-model="formCustom.version"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="12" :sm="12" :md="6" :lg="6">
                                <FormItem label="题型" prop="version">
                                    <Input type="text" v-model="formCustom.version"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="12" :sm="12" :md="6" :lg="6">
                                <FormItem label="类型" prop="version">
                                    <Input type="text" v-model="formCustom.version"></Input>
                                </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col :xs="12" :sm="12" :md="6" :lg="6">
                                <FormItem label="开始时间 ">
                                    <start-date @exportDate="startExport"></start-date>
                                </FormItem>
                            </Col>
                            <Col :xs="12" :sm="12" :md="6" :lg="6">
                                <FormItem label="结束时间 ">
                                    <end-date @exportDate="endExport"></end-date>
                                </FormItem>
                            </Col>
                            <Col :xs="12" :sm="12" :md="6" :lg="6">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div class="">
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
                </div>
                <!--操作按钮-->
                <div class="tableListOperator">
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div>
                                <Button type="primary" @click="addrole()"> <Icon type="android-add"></Icon> 添加</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                       <i-table border  :columns="columnsdata" :data="data" class="table"></i-table>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                    </Col>
                </Row>
                <!-- <role-component-add @rolecomponentdata="rolecomponentdata" :addroleshow="addroleshow" v-if="addroleshow"></role-component-add>
                <role-component-edit @editrolecomponentdata="editrolecomponentdata" :editroleshow="editroleshow" :editroledta="editroledta" v-if="editroleshow"></role-component-edit> -->
            </div>
        </div>
    </div>
</template>
<script>
    import Pages from '@/components/pub/page.vue'
    import VueUeditorWrap from 'vue-ueditor-wrap'
    import Ueditor from '@/components/pub/Ueditor.vue';
    import startDate from "@/components/pub/startDate"
    import endDate from "@/components/pub/endDate"
    export default {
        components:{
            Paging:Pages,
            VueUeditorWrap,
            Ueditor,
            startDate,
            endDate
        },
        data () {
            return {
                pageshow:false,
                importShow:false,
                importEditShow:false,
                importEditData:{},
                formCustom:{
                    createAt:"",
                    appName:"",
                    version:"",
                    expireStartTime:'',
                    expireEndTime:'',
                },
                // 分页
                pageData:{
                    //分页数
                    arrPageSize:[5,10,15,20],
                    //分页大小
                    pagesize:15,
                    //总分页数
                    pageCount:1,
                    //当前页面
                    pageCurrent:1,
                    //总数
                    totalCount:10
                },
                columnsdata: [
                    {
                        title: '题号',
                        key: 'topicNum'
                    },
                    {
                        title: '科目',
                        key: 'topicSub'
                    },
                    {
                        title: '题型',
                        key: 'topicModel'
                    },
                    {
                        title: '类型',
                        key: 'topicType'
                    },
                    {
                        title: '更新时间',
                        key: 'updata'
                    },
                    {
                        title: '更新人员',
                        key: 'createName'
                    },
                    {
                        title: '反馈信息',
                        key: 'feedbackInfo'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:220,
                        render: (h, params) => {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.importEditData=params.row;
                                            this.importEditShow=true;
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row);
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        mounted() {
            this.list()
        },
        methods:{
            list(){
                let _this=this;
                // var data={
                //     "appTypeId":null,
                //     "status":1
                // }
                // this.$api.post("/appVersion/list",data,result=>{
                //     if (result.code==0) {
                //         _this.data=result.data
                //     }else{
                //         _this.$netcode.getApiCode(result)
                //     }
                // })
                _this.data=[
                    {
                        id:1,
                        topicNum:"题号",
                        topicType:"类型",
                        topicSub:"题目科目",
                        topicModel:"题型",
                        feedbackInfo:"反馈信息",
                        updata:"2018-10-31",
                        createName:"更新人员"
                    }
                ]
                _this.pageshow =  true
            },
            add(){
                this.importShow=true;
            },
            exportData(e){
                this.importShow=e.show;
                this.list();
            },
            exportEditData(e){
                this.importEditShow=e.show;
                this.list();
            },
            remove (params) {
                let _this = this
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要删除【'+params.version+'】版本吗?</p>',
                    onOk: () => {
                        _this.itemdel(params)
                    },
                    onCancel: () => {

                    }
                });

            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            itemdel (params) {
                let _this = this
                // var data={
                //     id:params.id
                // }
                // this.$api.post("/appVersion/delete", data, reset => {
                //     if (reset.code === 0) {
                //         _this.$Message.success("删除成功!")
                //         _this.list();
                //     }else {
                //         _this.$netcode.getApiCode(reset)
                //     }
                // })
                _this.$Message.success("删除成功!")
            },
            startExport(e){
                this.formCustom.expireStartTime=e
            },
            endExport(e){
                this.formCustom.expireEndTime=e
            },
        }
    }
</script>
