<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>新闻管理</BreadcrumbItem>
			<BreadcrumbItem>全部文章</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>全部文章</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
                <Form :model="formValidate" :label-width="80">
                    <Row>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem label="学科" prop="courseId">
                                <Select v-model="formValidate.courseId" clearable placeholder="请选择学科">
                                    <Option :value="1" :key="1">语文</Option>
                                    <Option :value="3" :key="3">英语</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem label="类型" prop="type">
                                <Select v-model="formValidate.type" clearable placeholder="请选择类型">
                                    <Option value="新闻" :key="1">新闻</Option>
                                    <Option value="美文" :key="2">美文</Option>
                                    <Option value="校园" :key="3">校园</Option>
                                    <Option value="知识" :key="4">知识</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem label="是否上架" prop="status">
                                <Select v-model="formValidate.status" clearable placeholder="请选择状态">
                                    <Option :value="1" :key="1">是</Option>
                                    <Option :value="0" :key="0">否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="6" :lg="6">
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <!-- <Row>
                    <Col :xs="8" :sm="8" :md="8" :lg="8">
                        <div style="text-align:left;">
                            <Button type="primary" @click="add">添加</Button>
                        </div>
                    </Col>
                </Row> -->
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
                    title: '是否收藏',
                    key: 'star',
                    align: 'center',
                    width:62,
                    render:(h,params)=>{
                        var colorStr="#515A6E"
                        if (params.row.star==1) {
                            colorStr="#F5A623"
                        }
                        return h("span",[
                            h("Icon",{
                                attrs:{
                                    type:"ios-heart"
                                },
                                style:{
                                    fontSize:"20px",
                                    color:colorStr
                                },
                                on:{
                                    click:()=>{
                                        // console.log(111);
                                        this.starState(params.row);
                                    }
                                }
                            })
                        ])
                    }
                },
                {
                    title: '题目',
                    key: 'title',
                    align: 'center',
                    minWidth:172,
                    render:(h,params)=>{
                        return h('div',[
                            h('a',{
                                on: {
                                    click : () => {
                                        this.$router.push("/new/edit/"+params.row.id)
                                    }
                                }
                            },params.row.title)
                        ])
                    }
                },
                {
                    title: '类型',
                    key: 'type',
                    align: 'center',
                    width:62,
                },
                {
                    title: '学科',
                    key: 'courseId',
                    align: 'center',
                    width:62,
                    render:(h,params)=>{
                        var str="语文"
                        if(params.row.courseId==3){
                            str="英语"
                        }
                        return h('div',[
                            h('span',str)
                        ])
                    }
                },
                {
                    title: '来源',
                    key: 'source',
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
                    title: '发表时间',
                    key: 'date',
                    align: 'center',
                },
                {
                    title: '修改时间',
                    key: 'lastModifiedDate',
                    align: 'center',
                    render:(h,params)=>{
                        var time=this.$webapi.gettime("minute",params.row.lastModifiedDate)
                        return h('div',[
                            h('span',time)
                        ])
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
                    title: '点击人数',
                    key: 'studentCount',
                    align: 'center',
                    width:62,
                },
                {
                    title: '总点击量',
                    key: 'clickCount',
                    align: 'center',
                    width:62,
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
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                },
                                on: {
                                    click: () => {
                                        this.detail(params.row)
                                    }
                                }
                            }, '详情'),
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
                page:_this.$store.state.news.pageData.pageCurrent,
                pageSize:_this.$store.state.news.pageData.pagesize,
                // star:0
    		}
            if (this.$store.state.news.courseId) {
                data.courseId=this.formValidate.courseId
            }
            if (this.$store.state.news.type) {
                data.type=this.formValidate.type
            }
            if (this.$store.state.news.status==0||this.$store.state.news.status==1) {
                data.status=this.formValidate.status
            }
    		this.$api.get("/admin/api/news/list",data,result=>{
    			if (result.code==200) {
    				_this.datas=result.data.records
                    _this.pageData.pageCount=result.data.pages//总页数
                    _this.pageData.totalCount=result.data.total//总条数
                    _this.pageData.pageCurrent=result.data.current
                    _this.pageData.pagesize=result.data.size
                    _this.$store.dispatch('pageSearch',_this.pageData);
                    _this.pageShow =  true
    			}else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
        add(){
            this.$router.push("/new/add")
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
                        id:e.id,
                        status:1
            		}
            		this.$api.post("/admin/api/news/shelf",data,result=>{
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
			  	id:params.id,
                status:0
			}
			this.$api.post("/admin/api/news/shelf", data, reset => {
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
            this.$store.dispatch('pageSearch',this.pageData);
            this.list()
        },
        exportEditData(e){
            this.importEditShow=e.show
            this.list()
        },
        handleSubmit (name) {
            this.pageShow = false
            this.pageData.pageCurrent = 1
            this.$store.dispatch('pageSearch',this.pageData);
            this.list()
        },
        exportDataAdd(e){
            this.addShow=e.show
            this.list()
        }
    }
  }
</script>
