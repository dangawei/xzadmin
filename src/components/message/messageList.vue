<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>消息管理</BreadcrumbItem>
			<BreadcrumbItem>消息列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>消息列表</h2>
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
        <add-message :importShow="addShow" v-if="addShow" @exportData="exportAddData"></add-message>
    </div>
  </div>
</template>
<script>
    import paging from "@/components/pub/page"
    import addMessage from "@/components/message/addMessage"
    export default {
        components:{
            paging,
            addMessage
        },
        data () {
            return {
                pageShow:true,
                addShow:false,
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
                        title: '编号',
                        key: 'id',
                        align: 'center',
                        width:60
                    },
                    {
                        title: '内容',
                        key: 'content',
                        align: 'center',
                    },
                    {
                        title: '修改时间',
                        key: 'createdDate',
                        align: 'center',
                        width:136,
                        render:(h,params)=>{
                            var time=this.$webapi.gettime("minute",params.row.createdDate)
                            return h('div',[
                                h('span',time)
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:100,
                        render: (h, params) => {
                            var strTrue="none"
                            var strFalse="inline-block"
                            if(params.row.status==1){
                                strTrue="inline-block"
                                strFalse="none"
                            }
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row)
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
        watch:{
        },
        created(){

        },
        mounted() {
          	this.list()
        },
        methods:{
        	list(){
        		let _this=this;
        		let data={
                    page:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                    // star:0
        		}
        		this.$api.get("/admin/api/system/notice/list",data,result=>{
        			if (result.code==200) {
        				_this.datas=result.data.records
                        _this.pageData.pageCount=result.data.pages//总页数
                        _this.pageData.totalCount=result.data.total//总条数
                        _this.pageData.pageCurrent=result.data.current
                        _this.pageData.pagesize=result.data.size
                        _this.pageShow =  true
        			}else{
                        _this.$netcode.getApiCode(result)
                    }
        		})
        	},
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            add(){
                this.addShow=true;
            },
            delete (params) {
    			let _this = this
    			this.$Modal.confirm({
    				title: '提示',
    				content: '<p>确认要删除吗?</p>',
    				onOk: () => {
                        var data={
                            id:params.id
                        }
    					_this.$api.post("/admin/api/system/notice/delete",data,reset=>{
                            if (reset.code === 200) {
            			    	_this.$Message.success("删除成功!")
            			    	_this.list();
            			 	}else {
            			   		_this.$netcode.getApiCode(reset)
            				}
                        })
    				},
    				onCancel: () => {

    				}
    			});
          	},
            exportAddData(e){
                this.addShow=e.show
                this.list();
            }
        }
    }
</script>
