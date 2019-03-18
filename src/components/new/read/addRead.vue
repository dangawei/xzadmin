<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>新闻管理</BreadcrumbItem>
			<BreadcrumbItem>添加名著</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>添加名著</h2>
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
                <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="80"  :rules="ruleValidate">
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 12, offset: 0 }" :lg="{ span: 12, offset: 0 }">
                            <FormItem label="标题:" prop="title">
                                <Input v-model="formValidate.title" placeholder="请输入新闻标题"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 12, offset: 0 }" :lg="{ span: 12, offset: 0 }">
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
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 0 }" :lg="{ span: 20, offset: 0 }">
                            <FormItem label="缩略图:" prop="image">
                                <upload-img @exportData="exportImgData"></upload-img>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 12, offset: 0 }" :lg="{ span: 12, offset: 0 }">
                            <FormItem label="缩略图地址:" prop="image">
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
                        <Button type="primary"  @click="sure('formValidate')">保存</Button>
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
                source:'',
                type:'',
                author:'',
                time:'',
                url:'',
                date:'',
                formValidate:{
                    title:'',
                    author:'',
                    downloadUrl:'',
                    image:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        // { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/,message:'请输入11位手机号', trigger: "blur" }
                    ],
                    author: [
                        { required: true, message: '请添加作者' }
                    ],
                    downloadUrl: [
                        { required: true, message: '请填写下载地址' }
                    ],
                    image: [
                        { required: true, message: '请填写缩略图地址' }
                    ],
                    authorIntro: [
                        { required: true, message: '请填写作者简介' }
                    ],
                    bookIntro: [
                        { required: true, message: '请填写图书简介' }
                    ],
                },
            }
        },
        created(){

        },
        mounted() {
            this.show=true
        },
        methods:{
            ready(ue){
                this.ueReady=ue;
            },
            sure (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    }
                })
            },
            post(){
                let _this = this;
                var data = {
                    title: this.formValidate.title,
                    image: this.formValidate.image,
                    author: this.formValidate.author,
                    authorIntro: this.formValidate.authorIntro,
                    bookIntro: this.formValidate.bookIntro,
                    downloadUrl: this.formValidate.downloadUrl,
                }
                this.$api.post("/admin/api/readBook/add", data, reset => {
                    if (reset.code == 200) {
                        _this.$Message.success('添加成功');
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
