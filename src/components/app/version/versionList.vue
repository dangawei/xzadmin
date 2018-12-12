<template>
  <div class="rule">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>APP管理</BreadcrumbItem>
            <BreadcrumbItem to="/app/student/list">学生版本管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>学生版本列表</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-component-bd">
            <!--查询条件-->
            <div class="tableListForm">
                <!-- <Form :model="formCustom" :label-width="100">
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="apk名称" prop="appName">
                                <Input type="text" v-model="formCustom.appName"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="版本号" prop="version">
                                <Input type="text" v-model="formCustom.version"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="更新开始时间 ">
                                <start-date @exportDate="startExport"></start-date>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="更新结束时间 ">
                                <end-date @exportDate="endExport"></end-date>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form> -->
            </div>
            <!--操作按钮-->
            <div class="tableListOperator">
                <Button type="primary"  @click="add()">添加</Button>
            </div>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
                        <Table border :columns="columnsdata" :data="data"></Table>
                    </div>
                </Col>

            </Row>
            <Row justify="center">
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                </Col>
            </Row>
        </div>
        <add-version :importShow="importShow" @exportData="exportData" v-if="importShow"></add-version>
        <edit-version :importEditShow="importEditShow" :importEditData="importEditData" @exportEditData="exportEditData" v-if="importEditShow"></edit-version>
    </div>
  </div>
</template>
<script>
    import Pages from '@/components/pub/page.vue'
    import addVersion from "./addVersion"
    import editVersion from "./editVersion"
    import startDate from "@/components/pub/startDate"
    import endDate from "@/components/pub/endDate"
export default {
    components:{
        addVersion,
        editVersion,
        Paging:Pages,
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
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '描述',
                    key: 'descr'
                },
                {
                    title: '版本名',
                    key: 'versionName'
                },
                {
                    title: '版本号',
                    key: 'versionCode'
                },
                {
                    title: '渠道',
                    key: 'channel'
                },
                {
                    title: '下载地址',
                    key: 'url',
                    width:168,
                    render:(h,params)=>{
                        return h("a",{
                            attrs: {
                                href: params.row.url
                            },
                        },params.row.url)
                    }
                },
                {
                    title: '更新时间',
                    key: 'createdDate',
                    render:(h,params)=>{
                        var str = this.$webapi.gettime('date',(params.row.createdDate)/1000)
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:136,
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
            var data={
                page: _this.pageData.pageCurrent,//当前页
                pageSize: _this.pageData.pagesize,
            }
            this.$api.get("/admin/api/upgrade/list",data,result=>{
                if (result.code==200) {
                    _this.data=result.data.records
                    _this.pageData.pagesize = result.data.size
                    _this.pageData.totalCount = result.data.total
                    _this.pageData.pageCount = result.data.pages
                    _this.pageData.pageCurrent = result.data.current
                    _this.pageshow =  true
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
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
                content: '<p>确认要删除【'+params.name+params.versionName+'】版本吗?</p>',
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
            var data={
                id:params.id
            }
            this.$api.post("/admin/api/upgrade/delete", data, reset => {
                if (reset.code === 200) {
                    _this.$Message.success("删除成功!")
                    _this.list();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
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
