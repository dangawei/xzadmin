<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem >角色管理</BreadcrumbItem>
                    <BreadcrumbItem>角色列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>角色列表</h2>
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
                <add-role-component :importShow="addShow" @exportShow="exportAddShow" v-if="addShow"></add-role-component>
                <edit-role-component :importShow="editShow" :importData="editData" @exportShow="exportEditShow" v-if="editShow"></edit-role-component>
            </div>
        </div>
    </div>
</template>
<script>
  import addRoleComponent from './addRoleComponent.vue'
  import editRoleComponent from './editRole.vue'
    export default {
        components:{
            addRoleComponent,
            editRoleComponent
        },
        data () {
            return {
                addShow:false,
                editShow:false,
                editData:{},
                self:this,
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
                modals:{
                    modalBool: false,
                    successText:""
                },
                columns7: [
                    {
                        title: '角色编号',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.id)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '角色名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.name)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '创建时间',
                        key: 'createdDate',
                        align: 'center',
                        render:(h,params)=>{
                            var time=this.$webapi.gettime("date",params.row.createdDate)
                            return h('div',[
                                h('span',time)
                            ])
                        }
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
                                        type: 'default',
                                        size: 'small',
                                        // disabled:str
                                    },
                                    style: {
                                        marginRight: '5px',
                                        // color:color
                                    },
                                    on: {
                                        click: () => {
                                           this.$router.push({path:"/role/resource/"+params.row.id})
                                        }
                                    }
                                }, '权限'),
                                // h('Button', {
                                //     props: {
                                //         type: 'error',
                                //         size: 'small',
                                //     },
                                //     style: {
                                //         marginRight: '5px',
                                //         color:color
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.remove(params.row)
                                //         }
                                //     }
                                // }, '删除'),
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
                this.$api.get('/admin/api/role/list',null,reset => {
                    if (reset.code === 200) {
                        _this.data = reset.data;
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
              this.$api.post("/role/delete", data, reset => {
                if (reset.code === 0) {
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
