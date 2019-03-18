<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>系统反馈管理</BreadcrumbItem>
			<BreadcrumbItem>系统反馈列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>系统反馈列表</h2>
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
    </div>
  </div>
</template>
<script>
    import paging from "@/components/pub/page"
export default {
    components:{
        paging,
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
                    title: 'id',
                    key: 'id',
                    align: 'center',
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '标签',
                    key: 'tag',
                    align: 'center',
                },
                {
                    title: '原因',
                    key: 'reason',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'createDate',
                    align: 'center',
                    render:(h,params)=>{
                        var str = this.$webapi.gettime('date',params.row.createdDate)
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
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
                page:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize
    		}

    		this.$api.get("/admin/api/systemFeedBack/list",data,result=>{
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
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
    }
  }
</script>
