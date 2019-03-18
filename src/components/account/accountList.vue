<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem>账号管理</BreadcrumbItem>
                    <BreadcrumbItem>账号列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>账号列表</h2>
                </div>
            </div>
        </div>

        <div class="page-component-view">
            <div class="page-component-bd">
            <!--查询条件-->
                <div class="tableListForm">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                    </Form>
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
                       <i-table border  :columns="columns7" :data="data" class="table"></i-table>
                       <div class="mt20">
                           <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
                       </div>
                    </Col>
                </Row>
                <add-account-component :importShow="addShow" @exportShow="exportAddShow" v-if="addShow"></add-account-component>
                <edit-account-component :importShow="editShow" :importData="editData" @exportShow="exportEditShow" v-if="editShow"></edit-account-component>
            </div>
        </div>
    </div>
</template>
<script>
    import paging from "@/components/pub/page"
    import addAccountComponent from './addAccount.vue'
    import editAccountComponent from './editAccount.vue'
    export default {
        components:{
            addAccountComponent,
            editAccountComponent,
            paging
        },
        data () {
            return {
                addShow:false,
                editShow:false,
                pageShow:false,
                editData:{},
                formCustom: {
                    number: '',
                    name: '',
                    des:'',
                },
                ruleCustom: {
                    number: [
                        {trigger: 'blur' }
                    ],
                    name: [
                        {trigger: 'blur' }
                    ]
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
                modals:{
                    modalBool: false,
                    successText:""
                },
                columns7: [
                    {
                        title: '账号编号',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.id)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '真实姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.name)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '账号',
                        key: 'account',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.account)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '角色',
                        key: 'roleName',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.roleName)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params)=> {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.editData=params.row;
                                            this.editShow=true
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        // color:color
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
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
        mounted () {
          //do something after creating vue instance
          this.list()
        },
        methods: {
            addrole () {
                this.addShow = true
            },
            list () {
                let _this = this
                var datas={
                    page:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize
                }
                this.$api.get('/admin/api/user/list',datas,reset => {
                    if (reset.code === 200) {
                        _this.data = reset.data.records;
                        _this.pageData.pagesize = reset.data.size
                        _this.pageData.totalCount = reset.data.total
                        _this.pageData.pageCount = reset.data.pages
                        _this.pageData.pageCurrent = reset.data.current
                        _this.pageShow =  true
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove (item) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要删除【'+item.roleName+'】吗?</p>',
                    onOk: () => {
                       this.del(item)
                    },
                    onCancel: () => {

                    }
                });
            },
            del (item){
              let _this = this;
              var data = {
                  id:item.id
              }
              this.$api.post("/admin/api/user/delete", data, reset => {
                if (reset.code === 200) {
                    this.$Message.success("删除成功!")
                    this.list()
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            },
            exportAddShow(e){
                this.addShow=e.show;
                this.list();
            },
            exportEditShow(e){
                this.editShow=e.show;
                this.list();
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.list()
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
        }
    }
</script>
<style scoped>
   .base-info{
        font-size: 18px;
        text-align: left;
        padding-top: 15px;
        margin-bottom: 26px;
        padding-left: 30px;
        padding-bottom: 15px;
        background-color: #fff;
   }
   .base-color{
        color: #8c8c8c;
   }
    h3{
        font-size: 26px;
        text-align: left;
    }
    .dep-updata{
        text-align: left;
        padding-left: 30px;
        margin-bottom: 15px;
    }
</style>
