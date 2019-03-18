<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>新闻管理</BreadcrumbItem>
			<BreadcrumbItem>名著列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>名著列表</h2>
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
            pageShow:true,
            formValidate:{
                courseId:this.$store.state.news.courseId,
                type:this.$store.state.news.type,
                status:this.$store.state.news.status
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
                    title: '编号',
                    key: 'id',
                    align: 'center',
                    width:58
                },
                {
                    title: '书名',
                    key: 'title',
                    align: 'center',
                    maxWidth:172,
                    render:(h,params)=>{
                        return h('div',[
                            h('a',{
                                on: {
                                    click : () => {
                                        this.$router.push("/read/edit/"+params.row.id)
                                    }
                                }
                            },params.row.title)
                        ])
                    }
                },
                {
                    title: '作者',
                    key: 'author',
                    align: 'center',
                    width:98,
                },
                {
                    title: '下载地址',
                    key: 'downloadUrl',
                    align: 'center',
                },
                {
                    title: '缩略图',
                    key: 'image',
                    align: 'center',
                    width:72,
                    render:(h,params)=>{
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: params.row.image
                                },
                                style: {
                                    width: '40px',
                                    height: '40px',
                                    verticalAlign:"middle"
                                }
                            })
                        ])
                    }
                },
                {
                    title: '作者简介',
                    key: 'authorIntro',
                    align: 'center',
                    render:(h,params)=> {
                        return h('span',{
                            style: {
                                diaplay: 'inline-block',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }
                        },params.row.authorIntro)
                    }
                },
                {
                    title: '图书信息',
                    key: 'bookIntro',
                    align: 'center',
                    render:(h,params)=> {
                        return h('span',{
                            style: {
                                diaplay: 'inline-block',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }
                        },params.row.bookIntro)
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    width:62,
                    render:(h,params)=>{
                        var str="上架"
                        if(params.row.status==0){
                            str="下架"
                        }
                        return h('div',[
                            h('span',str)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:178,
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
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:strFalse
                                },
                                on: {
                                    click: () => {
                                        this.putaway(params.row)
                                    }
                                }
                            }, '上架'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:strTrue
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row);
                                    }
                                }
                            }, '下架'),
                            // h('Button', {
                            //     props: {
                            //         type: 'default',
                            //         size: 'small'
                            //     },
                            //     style: {
                            //         marginRight: '5px',
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.detail(params.row)
                            //         }
                            //     }
                            // }, '详情'),
                        ]);
                    }
                }
            ],
            datas: []
        }
    },
    watch:{
        "formValidate.type":function(val){
            this.$store.commit("typeSearch",val)
        },
        "formValidate.courseId":function(val){
            this.$store.commit("courseIdSearch",val)
        },
        "formValidate.status":function(val){
            this.$store.commit("statusSearch",val)
        },
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
                page:_this.$store.state.news.pageRead.pageCurrent,
                pageSize:_this.$store.state.news.pageRead.pagesize,
                // star:0
    		}
    		this.$api.get("/admin/api/readBook/list",data,result=>{
    			if (result.code==200) {
    				_this.datas=result.data.records
                    _this.pageData.pageCount=result.data.pages//总页数
                    _this.pageData.totalCount=result.data.total//总条数
                    _this.pageData.pageCurrent=result.data.current
                    _this.pageData.pagesize=result.data.size
                    _this.$store.dispatch('pageSearchRead',_this.pageData);
                    _this.pageShow =  true
    			}else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
        add(){
            this.$router.push("/read/add")
        },
        detail(e){
            this.$router.push("/new/detail/"+e.id)
        },
        putaway(e){
            let _this = this
			this.$Modal.confirm({
				title: '提示',
				content: '<p>确认要上架吗?</p>',
				onOk: () => {
                    let data={
                        status:1
            		}
            		this.$api.get("/admin/api/readBook/"+e.id+"/status",data,result=>{
                        if (result.code === 200) {
        			    	_this.$Message.success("上架成功!")
        			    	_this.list();
        			 	}else {
        			   		_this.$netcode.getApiCode(result)
        				}
            		})
				},
				onCancel: () => {

				}
			});
        },
        starState(e){
            let _this = this
            if (e.star==0) {
                var starData=1;
            }else{
                var starData=0;
            }
            let data={
                star:starData,
            }
            this.$api.get("/admin/api/news/"+e.id+"/star",data,result=>{
                if (result.code == 200) {
                    // _this.$Message.success("加入成功!")
                    _this.list();
                }else {
                    _this.$netcode.getApiCode(result)
                }
            })
        },
    	remove (params) {
			let _this = this
			this.$Modal.confirm({
				title: '提示',
				content: '<p>确认要下架吗?</p>',
				onOk: () => {
					_this.itemdel(params)
				},
				onCancel: () => {

				}
			});
      	},
    	delete (params) {
			let _this = this
			this.$Modal.confirm({
				title: '提示',
				content: '<p>确认要删除吗?</p>',
				onOk: () => {
					_this.$api.get("/admin/api/news/"+params.id+"/del",null,reset=>{
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
		itemdel (params) {
			let _this = this
			var data={
                status:0
			}
			this.$api.get("/admin/api/readBook/"+params.id+"/status", data, reset => {
			 	if (reset.code === 200) {
			    	_this.$Message.success("下架成功!")
			    	_this.list();
			 	}else {
			   		_this.$netcode.getApiCode(reset)
				}
			})
		},
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.$store.dispatch('pageSearchRead',this.pageData);
            this.list()
        },
        exportEditData(e){
            this.importEditShow=e.show
            this.list()
        },
        handleSubmit (name) {
            this.pageShow = false
            this.pageData.pageCurrent = 1
            this.$store.dispatch('pageSearchRead',this.pageData);
            this.list()
        },
        exportDataAdd(e){
            this.addShow=e.show
            this.list()
        }
    }
  }
</script>
