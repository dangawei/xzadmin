<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>新闻管理</BreadcrumbItem>
			<BreadcrumbItem>修改新闻</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>修改新闻</h2>
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
			<div class='class'>
                <Form ref="formValidate" label-position="right" :label-width="80">
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                            <FormItem label="标题:" prop="title">
                                <Input v-model="formValidate.title" placeholder="请输入新闻标题"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 10, offset: 0 }" :lg="{ span: 10, offset: 0 }">
                            <FormItem label="来源:" prop="source">
                                <Input v-model="formValidate.source" placeholder="请输入来源"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="{ span: 10, offset: 0 }" :lg="{ span: 10, offset: 0 }">
                            <FormItem label="作者:" prop="author">
                                <Input v-model="formValidate.author" placeholder="请输入作者"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 10, offset: 0 }" :lg="{ span: 10, offset: 0 }">
                            <FormItem label="学科:" prop="courseId">
                                <Select v-model="formValidate.courseId" clearable :label-in-value="true" placeholder="请选择学科">
                                    <Option :value="1" :key="1">语文</Option>
                                    <Option :value="3" :key="3">英语</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="{ span: 10, offset: 0 }" :lg="{ span: 10, offset: 0 }">
                            <FormItem label="类型:" prop="type">
                                <Select v-model="formValidate.type" clearable :label-in-value="true" placeholder="请选择类型">
                                    <Option value="新闻" :key="1">新闻</Option>
                                    <Option value="美文" :key="2">美文</Option>
                                    <Option value="校园" :key="3">校园</Option>
                                    <Option value="知识" :key="4">知识</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                            <FormItem label="发布日期:" prop="date">
                                <DatePicker type="date" v-model="formValidate.date" placeholder="新闻发布日期" @on-change="dateChange"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row" v-if="imgShow">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                            <FormItem label="缩略图:" prop="url">
                                <upload-img @exportData="exportImgData" :importData="formValidate.image"></upload-img>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                            <FormItem label="缩略图地址:" prop="url">
                                <Input v-model="formValidate.image" placeholder="缩略图地址" disabled></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                            <FormItem label="内容:" prop="content">
                                <vue-ueditor-wrap v-model="formValidate.content" :config="myConfig" ref="ueReady" @ready="ready"></vue-ueditor-wrap>
                            </FormItem>
                        </Col>
                    </Row>
                    <div style="text-align:center;margin-bottom:15px;">
                        <Button type="primary"  @click="sure()">保存</Button>
                        <Button type="default"  @click="back()">返回</Button>
                    </div>
                </Form>
            </div>
		</div>
    </div>
  </div>
</template>
<script>
    import uploadImg from "@/components/pub/uploadImg.vue"
    import VueUeditorWrap from '@/components/pub/vueUeditroWrap.vue';
    export default {
        components:{
            // Ue:Ue,
            VueUeditorWrap,
            uploadImg
        },
        data () {
            return {
                show:false,
                imgShow:false,
                formValidate:{
                    title:'',
                    source:'',
                    courseId:'',
                    type:'',
                    author:'',
                    time:'',
                    content:'',
                    image:'',
                    date:'',
                },
                copyData:{},
                // 富文本编辑器配置
                myConfig: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址
                    // serverUrl: 'http://47.98.238.6/admin/api/upload/config',
                    // serverUrl: 'http://www.xuzhistudy.com/admin/api/upload/config',
                    serverUrl: this.$api.root+'/admin/api/upload/config',
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: '/static/UEditor/',
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 560,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 关闭自动保存
                    enableAutoSave: false,
                    autoFloatEnabled:false//是否保持toolbar的位置不动，默认为true
                },
            }
        },
        created(){
            this.getDetail();
        },
        mounted() {
            this.show=true
        },
        methods:{
            getDetail(){
        		let _this=this;
        		this.$api.get("/admin/api/news/"+this.$route.params.id+"/detail",null,result=>{
        			if (result.code==200) {
        				_this.formValidate=result.data
                        // setTimeout(function(){
                        //     _this.imgShow=true
                        // },100)
                        _this.copyData=Object.assign({},result.data)
                        _this.imgShow=true
        			}else{
                        _this.$netcode.getApiCode(result)
                    }
        		})
        	},
            ready(ue){
                this.ueReady=ue;
            },
            sure(){
                let _this = this;
                var data = {
                    id: this.$route.params.id,
                }
                if(this.formValidate.courseId!=this.copyData.courseId){
                   data.courseId=this.formValidate.courseId
                }
                if(this.formValidate.title!=this.copyData.title){
                   data.title=this.formValidate.title
                }
                if(this.formValidate.image!=this.copyData.image){
                   data.image=this.formValidate.image
                }
                if(this.formValidate.content!=this.copyData.content){
                    data.content=this.ueReady.getContent()
                }
                this.formValidate.date=this.$webapi.gettime("date",this.formValidate.date)
                this.copyData.date=this.$webapi.gettime("date",this.copyData.date)
                if(this.formValidate.date!=this.copyData.date){
                   data.date=this.formValidate.date
                }
                if(this.formValidate.author!=this.copyData.author){
                   data.author=this.formValidate.author
                }
                if(this.formValidate.source!=this.copyData.source){
                   data.source=this.formValidate.source
                }
                if(this.formValidate.type!=this.copyData.type){
                   data.type=this.formValidate.type
                }
                this.$api.post("/admin/api/news/update", data, reset => {
                    if (reset.code == 200) {
                        _this.$Message.success('修改成功');
                        // _this.$router.push("/new/list")
                        _this.$router.back(-1);
                    }else {
                       _this.$netcode.getApiCode(reset)
                    }
                })
            },
            dateChange(value,valueData){
                this.date=value
            },
            exportImgData(e){
                this.formValidate.image=e[0];
            },
            back(){
                this.$router.back(-1);
            }
        }
    }
</script>
<style>
    /* .class{
        font-size: 30px;
        font-weight: 900;
    } */
</style>
