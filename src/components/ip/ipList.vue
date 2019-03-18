<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem >IP管理</BreadcrumbItem>
                    <BreadcrumbItem>IP列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>IP列表</h2>
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

                    </Col>
                </Row>
                <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
                </div>
                <add-ip :importShow="addShow" @exportData="exportAddShow" v-if="addShow"></add-ip>
                <edit-ip :importShow="editShow" :importData="editData" @exportShow="exportEditShow" v-if="editShow"></edit-ip>
            </div>
        </div>
    </div>
</template>
<script>
  import addIp from './addIp.vue'
  import editIp from './editIp.vue'
  import paging from "@/components/pub/page"
    export default {
        components:{
            addIp,
            editIp,
            paging
        },
        data () {
            return {
                addShow:false,
                editShow:false,
                editData:{},
                self:this,
                formCustom: {
                    id: '',
                    ip: '',
                    comments:'',
                },
                ruleCustom: {

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
                pageShow:false,
                columns7: [
                    {
                        title: '编号',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.id)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: 'IP',
                        key: 'ip',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.ip)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '备注',
                        key: 'comments',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.comments)
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
                let data={
                    page:this.pageData.pageCurrent,
                    pageSize:this.pageData.pagesize,
                }
                this.$api.get('/admin/api/ip/list',data,reset => {
                    if (reset.code === 200) {
                        _this.data = reset.data.records;
                        _this.pageData.pageCount=reset.data.pages//总页数
                        _this.pageData.totalCount=reset.data.total//总条数
                        _this.pageData.pageCurrent=reset.data.current
                        _this.pageData.pagesize=reset.data.size
                        _this.pageShow=true
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            pageComponentDate (e) {
                console.log(e);
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            remove (item) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要删除【'+item.ip+'】吗?</p>',
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
              this.$api.post("/admin/api/ip/delete", data, reset => {
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
            }
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
