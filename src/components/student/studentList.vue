<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>学生管理</BreadcrumbItem>
			<BreadcrumbItem to="/student/list">学生列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>学生列表</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
                <Form :model="formCustom" :label-width="60">
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="学校" prop="schoolId">
                                <get-school @exportData="exportShcoolData"></get-school>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="班级" prop="classId">
                                <get-class :importData="schoolId" @exportData="exportClassData"></get-class>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <Row>
                    <Col :xs="16" :sm="16" :md="16" :lg="16">

        			    <Upload
                            ref="excel"
                            :action="commonurl"
                            :on-success="onsuccess"
                            :accept="accept"
                            :headers="header"
                            :with-credentials= true
                            name="file"
                            :format="format"
                            :on-format-error="handleFormatError"
                            >
                            <Button type="default" icon="ios-cloud-upload-outline">导入excel文件</Button>
                        </Upload>
                    </Col>
                    <Col :xs="8" :sm="8" :md="8" :lg="8">
                        <div style="margin-bottom: 15px;padding-right:15px;text-align:right;">
                            <a href="http://img.xuzhistudy.com/%E5%AF%BC%E5%85%A5%E5%AD%A6%E7%94%9F%E6%A8%A1%E6%9D%BF.xlsx">下载excel文件模板</a>
                        </div>
                    </Col>
                    <!-- <Col :xs="8" :sm="8" :md="8" :lg="8">
                        <div style="text-align:right;">
                            <Button type="primary" @click="add">添加单个学生</Button>
                        </div>
                    </Col> -->
                </Row>
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
				    <div class="">
						<Table border :columns="columnsdata" :data="data"></Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
						</div>
				    </div>
				</Col>
			</Row>
		</div>
    </div>
    <!-- <add-student v-if="importShow" :importShow="importShow" @exportShow="exportShow"></add-student>
    <edit-student v-if="importEditShow" :importEditShow="importEditShow" :importEditData="importEditData" @exportEditData="exportEditData"></edit-student> -->
  </div>
</template>
<script>
    import paging from "@/components/pub/page"
    import getSchool from "@/components/pub/getSchool.vue"
    import getClass from "@/components/pub/getClass.vue"
    import addStudent from "./addStudent.vue"
    import editStudent from "./editStudent.vue"
export default {
    components:{
        paging,
        addStudent,
        editStudent,
        getSchool,
        getClass
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            importShow:false,
            importEditShow:false,
            importEditData:'',
            classShow:false,
            commonurl: this.$api.root+"/admin/api/import/student/add",
            editData:{},
            format:['xls','xlsx'],
            fileName:'',
            formCustom:{
                schoolId:'',
                clazzId:''
            },
            schoolId:0,
            accept:"appliction/json",
            header:{
                // 'Content-Type': 'multipart/form-data'
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
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
                {
                    title: '学生id',
                    key: 'id'
                },
                {
                    title: '名字',
                    key: 'name'
                },
                {
                    title: '账号',
                    key: 'account'
                },
                {
                    title: '学号',
                    key: 'studentNumber',
                    render:(h,params)=>{
                        var str="暂无信息"
                        if(params.row.studentNumber){
                           str= params.row.studentNumber
                        }
                        return h('div',[
                            h('span',str)
                        ])
                    }
                },
                {
                    title: '设备id',
                    key: 'deviceId',
                    render:(h,params)=>{
                        var str="暂未绑定"
                        if(params.row.deviceId){
                           str= params.row.deviceId
                        }
                        return h('div',[
                            h('span',str)
                        ])
                    }
                },
                {
                    title: '班级名称',
                    key: 'clazzName'
                },
                {
                    title: '学校名称',
                    key: 'schoolName'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:168,
                    render: (h, params) => {
                        var bool=true;
                        if(params.row.deviceId){
                           bool= false
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    disabled:bool
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.unbind(params.row)
                                    }
                                }
                            }, '解绑设备'),
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
    created(){
        this.header.token = this.$webapi.get("token");
        this.companyId=this.$webapi.get("companyId")
    },
    mounted() {
      	this.list()
      	// this.getList().then(()=>{
        //     console.log(1111);
        //     this.list();
        // })
    },
    methods:{
        getList(){
            let _this=this;
    		let data={
                page:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize
    		}
            return new Promise((resolve,reject)=>{
                this.$http.get("/admin/api/student/list",data).then(res=>{
                    console.log(res);
                    resolve();
                })
            })
        },
    	list(){
    		let _this=this;
    		let data={
                page:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize
    		}
            if (this.formCustom.schoolId) {
                data.schoolId=this.formCustom.schoolId
            }
            if (this.formCustom.clazzId) {
                data.clazzId=this.formCustom.clazzId
            }
            if (this.formCustom.type) {
                data.type=this.formCustom.type
            }
    		this.$api.get("/admin/api/student/list",data,result=>{
    			if (result.code==200) {
    				_this.data=result.data.records
                    _this.pageData.pagesize = result.data.size
                    _this.pageData.totalCount = result.data.total
                    _this.pageData.pageCount = result.data.pages
                    _this.pageData.pageCurrent = result.data.current
                    _this.pageshow =  true
                    _this.classShow=true;
    			}else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
    	add(){
            this.importShow=true
    	},
        exportShow(e){
            this.importShow=e.show
            this.list();
        },
    	unbind (params) {
			let _this = this
			this.$Modal.confirm({
				title: '提示',
				content: '<p>确认要解绑【'+params.name+'】吗?</p>',
				onOk: () => {
        			var data={
        			  	id:params.id
        			}
        			_this.$api.post("/admin/api/student/unbind", data, reset => {
        			 	if (reset.code === 200) {
        			    	_this.$Message.success("解绑成功!")
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
			this.$api.post("/admin/api/student/delete", data, reset => {
			 	if (reset.code === 200) {
			    	_this.$Message.success("删除成功!")
			    	_this.list();
			 	}else {
			   		_this.$netcode.getApiCode(reset)
				}
			})
		},
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        onsuccess(response, file, fileList) {
            if (response.code==200) {
                this.$Message.success("上传成功!")
                // this.$refs.excel.clearFiles();
                // this.fileName=file.name
                this.list();
            }else{
                this.$Message.error("上传失败!")
                this.$netcode.getApiCode(response)
            }
        },
        handleFormatError(file, fileList){
            this.$Message.error({
                content:"文件上传格式错误,请选择xls和xlsx的文件!",
                duration:2
            })
        },
        exportEditData(e){
            this.importEditShow=e.show
            this.list()
        },
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
        exportShcoolData(e){
            // console.log(e);
            this.classShow=false
            this.formCustom.schoolId=e
            this.schoolId=e
            this.classShow=true
        },
        exportClassData(e){
            this.formCustom.clazzId=e
        }
    }
  }
</script>
