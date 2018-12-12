<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>APP管理</BreadcrumbItem>
                    <BreadcrumbItem to="/app/desktop/list">桌面管理列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>修改桌面管理</h2>
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
                        <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="120">
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="应用名称" prop="name">
                                        <Input v-model="adddatas.name" placeholder="请输入应用名称" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="包名" prop="packageName">
                                        <Input v-model="adddatas.packageName" placeholder="请输入安装包名称" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="APP渠道:" prop="channel">
                                        <Input v-model="adddatas.channel" placeholder="渠道" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="上传APP文件:" prop="url">
                                        <Upload
                                            ref="upload"
                                            :action="commonurl"
                                            :on-success="onsuccess"
                                            :on-error="error"
                                            :accept="accept"
                                            :headers="header"
                                            :with-credentials= true
                                            name="file"
                                            :format="format"
                                            :on-format-error="handleFormatError">
                                            <Button icon="ios-cloud-upload-outline" style="width:228px;">导入apk文件</Button>
                                        </Upload>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="首页:" prop="index">
                                        <Input v-model="adddatas.index" placeholder="首页" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="logo1地址" prop="appLogo1">
                                        <div v-if="imgShow">
                                            <upload-photo :importData="adddatas.appLogo1" @exportData="exportImgData"></upload-photo>
                                        </div>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="logo2地址" prop="appLogo2">
                                        <div v-if="imgShow">
                                            <upload-photo :importData="adddatas.appLogo2" @exportData="exportLogoData"></upload-photo>
                                        </div>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="描述:" prop="descr">
                                        <Input v-model="adddatas.descr" type="textarea" :autosize="{minRows: 7,maxRows: 15}" placeholder="描述" />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem class="text-center">
                                        <Button type="primary" @click="handleSave('adddatas')" size="large">修改</Button>
                                        <Button type="default" @click="handleCancel" size="large">返回</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>

    </div>
</template>
<script>
    import uploadPhoto from "@/components/pub/uploadPhoto.vue"
    export default {
        components: {
            uploadPhoto
        },
        data () {
            return {
                imgShow:false,
                logoShow:false,
                adddatas:{
                    remark:'',
                    startPhoto:'',
                    photo:''
                },
                commonurl: this.$api.root+"/admin/api/upload/apk",
                accept:"appliction/json",
                header: {

                },
                // format:['apk','png',"jpg"],
                format:['apk'],
                ruleValidate: {
                    name:[
                        { required: true, message: '请输入APP名称'},
                    ],
                    packageName: [
                        { required: true, message: '请输入APP包名' },
                        // { validator: vers,message:'版本格式书写错误' trigger: "blur" }
                        // { type:'string',pattern: /^\d{1,2}(\.\d{1,2}){2,3}$/,message:'版本格式书写错误', trigger: "blur" }
                    ],
                    channel: [
                        { required: true, message: '请输入渠道', trigger: 'blur' }
                    ],
                    index: [
                        { required: true, message: '请输入首页', trigger: 'blur' }
                    ],
                    appLogo1:[
                        {required:true, message: '请上传图片',trigger: 'blur'}
                    ],
                    appLogo2:[
                        {required:true, message: '请上传logo',trigger: 'blur'}
                    ],
                    descr:[
                        {required:true, message: '请输入描述',trigger: 'blur'}
                    ],
                    url:[
                        {required:true, message: '请上传apk文件',trigger: 'blur'}
                    ],
                }
            }
        },
        mounted(){
            this.list();
        },
        methods: {
            list(){
                let _this = this
                let datas={
                    id:this.$route.params.id
                }
                this.$api.get("/admin/api/desktop/detail", datas, reset => {
                    if (reset.code === 200) {
                        // _this.$Message.success("!");
                        _this.adddatas=reset.data
                        _this.imgShow=true
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            handleSave(name){
                let _this = this
                this.$refs[name].validate((valid) => {
                    if(valid){
                        _this.post();
                    }else{
                        _this.$Message.error('请输入完整信息!')
                    }
                })
            },
            handleCancel(){
                this.$router.back(-1);
            },
            post () {
                let _this = this;
                var data={
                    // name: 'Well',
                    // packageName: 'WellAPP',
                    // channel: '旭智',
                    // md5: '988cef7b866b1e5088fca17118af44a6',
                    // url: 'http://app.xuzhistudy.com/teacher_xuzhi_v1.5.00_2018-05-24_release.apk',
                    // descr: 'Well测试',
                    // index:'index',
                    // appLogo1:'http://app.xuzhistudy.com/FlmomJjjGm4ZgCnZcXJ7j5HeBGk0',
                    // appLogo2: 'http://app.xuzhistudy.com/FqOy09MbUpLHBS_xLqo-iKl-tfeu'
                    id:this.adddatas.id,
                    name: this.adddatas.name,
                    packageName: this.adddatas.packageName,
                    channel: this.adddatas.channel,
                    index:this.adddatas.index,
                    md5:this.adddatas.md5,
                    url:this.adddatas.url,
                    descr:this.adddatas.descr,
                    appLogo1:this.adddatas.appLogo1,
                    appLogo2:this.adddatas.appLogo2
                }
                // console.log(data);
                this.$api.post("/admin/api/desktop/modify", data, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success("修改成功!")
                        _this.$router.back(-1);
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            onsuccess(response, file, fileList) {
                // this.$Message.success("上传成功!")
                if (response.code==200) {
                    this.$Message.success("上传成功!")
                    // this.$refs.upload.clearFiles()
                    this.adddatas.url=response.data.url
                    this.adddatas.md5=response.data.md5
                    this.adddatas.names=response.data.name
                }else{
                    // this.$Message.error("上传失败!")
                    this.$netcode.getApiCode(response)
                }
            },
            handleFormatError(file, fileList){
                this.$Message.error({
                    content:"文件上传格式错误,请选择apk的文件!",
                    duration:2
                })
            },
            error(error, file, fileList){
                console.log(error);
                this.$Message.error("上传失败!")
            },
            exportImgData(e){
                console.log(e);
                this.adddatas.appLogo1=e[0];
            },
            exportLogoData(e){
                this.adddatas.appLogo2=e[0];
            },
        }
    }
</script>
<style scoped>
    .ml15{
        margin-left: 15px;
    }
</style>
