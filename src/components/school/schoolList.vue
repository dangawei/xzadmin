<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>班级管理</BreadcrumbItem>
			<BreadcrumbItem to="/class/list">班级列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>班级列表</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">

			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <Row>
                    <Col :xs="8" :sm="8" :md="8" :lg="8">
                        <div style="text-align:left;">
                            <Button type="primary" @click="add">添加</Button>
                        </div>
                    </Col>
                </Row>
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
				    <div class="">
						<Table border :columns="columnsdata" :data="datas"></Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageShow"></paging>
						</div>
				    </div>
				</Col>
			</Row>
		</div>
        <add-school :importData="addShow" @exportData="exportDataAdd" v-if="addShow"></add-school>
    </div>
  </div>
</template>
<script>
    import paging from "@/components/pub/page"
    import addSchool from "./addSchool.vue"
    // import editSchool from "./editSchool.vue"
export default {
    components:{
        paging,
        addSchool,
        // editSchool
    },
    data () {
        return {
            addShow:false,
            editShow:false,
            pageShow:true,
            formCustom:{
                schoolId:'',
                clazzId:''
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
                    title: '班级id',
                    key: 'id',
                    align: 'center',
                },
                {
                    title: '名称',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row)
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
            datas: []
        }
    },
    created(){
        this.companyId=this.$webapi.get("companyId")
    },
    mounted() {
      	this.list()
    },
    methods:{
    	list(){
    		let _this=this;
    		let data={
                type:1,
                page:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize
    		}

    		this.$api.get("/admin/api/school/list",data,result=>{
    			if (result.code==200) {
    				_this.datas=result.data.records
                    _this.pageData.pagesize = result.data.size
                    _this.pageData.totalCount = result.data.total
                    _this.pageData.pageCount = result.data.pages
                    _this.pageData.pageCurrent = result.data.current
                    _this.pageShow =  true
    			}else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
        add(){
            this.addShow=true;
        },
        edit(){
            this.$Message.success("暂无数据接口!")
        },
    	remove (params) {
			let _this = this
			this.$Modal.confirm({
				title: '提示',
				content: '<p>确认要删除【'+params.name+'】吗?</p>',
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
			  	id:params.id
			}
            this.$Message.error("暂无数据接口!")
			// this.$api.post("/admin/api/student/delete", data, reset => {
			//  	if (reset.code === 200) {
			//     	_this.$Message.success("删除成功!")
			//     	_this.list();
			//  	}else {
			//    		_this.$netcode.getApiCode(reset)
			// 	}
			// })
		},
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        exportEditData(e){
            this.importEditShow=e.show
            this.list()
        },
        handleSubmit (name) {
            this.pageShow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
        exportShcoolData(e){
            this.formCustom.schoolId=e
        },
        exportDataAdd(e){
            this.addShow=e.show
            this.list()
        }
    }
  }
</script>
