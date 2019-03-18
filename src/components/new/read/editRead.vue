<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>新闻管理</BreadcrumbItem>
			<BreadcrumbItem>修改名著</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>修改名著</h2>
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
                            <FormItem label="作者:" prop="author">
                                <Input v-model="formValidate.author" placeholder="请输入作者"></Input>
                            </FormItem>
                        </Col>
                        <Col span="20">
                            <FormItem label="上传图书:" prop="downloadUrl">
                                <upload @exportData="exportdownloadData"></upload>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="下载地址:" prop="downloadUrl">
                                <Input v-model="formValidate.downloadUrl" placeholder="请下载地址" disabled></Input>
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
                            <FormItem label="作者简介:" prop="authorIntro">
                                <Input type="textarea" v-model="formValidate.authorIntro" placeholder="作者简介" :rows="10"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                            <FormItem label="图书信息:" prop="bookIntro">
                                <Input type="textarea" v-model="formValidate.bookIntro" placeholder="图书信息" :rows="10"></Input>
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
    import Upload from "@/components/pub/Upload.vue"
    import VueUeditorWrap from '@/components/pub/vueUeditroWrap.vue';
    export default {
        components:{
            // Ue:Ue,
            VueUeditorWrap,
            uploadImg,
            Upload
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
        		this.$api.get("/admin/api/readBook/"+this.$route.params.id+"/details",null,result=>{
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
                    // id: this.$route.params.id,
                }
                if(this.formValidate.title!=this.copyData.title){
                   data.title=this.formValidate.title
                }
                if(this.formValidate.image!=this.copyData.image){
                   data.image=this.formValidate.image
                }
                if(this.formValidate.downloadUrl!=this.copyData.downloadUrl){
                    data.downloadUrl=this.formValidate.downloadUrl
                }
                if(this.formValidate.author!=this.copyData.author){
                   data.author=this.formValidate.author
                }
                if(this.formValidate.authorIntro!=this.copyData.authorIntro){
                   data.authorIntro=this.formValidate.authorIntro
                }
                if(this.formValidate.bookIntro!=this.copyData.bookIntro){
                   data.bookIntro=this.formValidate.bookIntro
                }
                this.$api.post("/admin/api/readBook/"+this.$route.params.id+"/update", data, reset => {
                    if (reset.code == 200) {
                        _this.$Message.success('修改成功');
                        // _this.$router.push("/new/list")
                        _this.$router.back(-1);
                    }else {
                       _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportImgData(e){
                this.formValidate.image=e[0];
            },
            exportdownloadData(e){
                this.formValidate.downloadUrl=e[0];
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
