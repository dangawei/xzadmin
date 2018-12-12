<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>编辑学生端APP版本</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="left">
                    <FormItem label="名称:" prop="name">
                        <Input v-model="formValidate.name" placeholder="名称"></Input>
                    </FormItem>
                    <FormItem label="APP包名:" prop="packageName">
                        <Input v-model="formValidate.packageName" placeholder="APP包名"></Input>
                    </FormItem>
                    <FormItem label="APP渠道:" prop="channel">
                        <Input v-model="formValidate.channel" placeholder="渠道"></Input>
                    </FormItem>
                    <FormItem label="APP版本名:" prop="versionName">
                        <Input v-model="formValidate.versionName" placeholder="APP版本名"></Input>
                    </FormItem>
                    <FormItem label="APP版本号:" prop="versionCode">
                        <Input v-model="formValidate.versionCode" placeholder="APP版本号"></Input>
                    </FormItem>
                    <FormItem label="上传APP文件:" prop="url">
                        <Upload
                            ref="upload"
                            :action="commonurl"
                            :on-success="onsuccess"
                            :on-error="error"
                            :accept="accept"
                            :headers="header"
                            name="file"
                            :format="format"
                            :on-format-error="handleFormatError">
                            <Button icon="ios-cloud-upload-outline" style="width:228px;">导入apk文件</Button>
                        </Upload>
                        <!-- <div>
                          <span>{{formValidate.url}}</span>
                        </div> -->
                    </FormItem>
                    <FormItem label="APP下载地址:" prop="url">
                        <Input v-model="formValidate.url" placeholder="APP下载地址" disabled></Input>
                    </FormItem>
                    <FormItem label="版本描述:" prop="descr">
                        <Input v-model="formValidate.descr" type="textarea" :autosize="{minRows: 5,maxRows: 7}" placeholder="版本描述" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">修改</Button>
                        <Button type="error" @click="handleReset('formValidate')" >取消</Button>
                    </FormItem>
             </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>


    let vers=(rule,value,callback)=>{
        let reg=/^\d{1,2}(\.\d{1,2}){2,3}$/
        if (!reg.test(value)) {
            callback(new Error("版本格式书写错误!"))
        }
    }
    export default {
        props:['importEditShow','importEditData'],
        components:{
           // getAppType
        },
        data () {
            return {
                ashow:false,
                commonurl: this.$api.root+"/file/upload",
                accept:"appliction/json",
                header: {

                },
                format:['apk'],
                formValidate: {
                    name:'',
                    packageName:'',
                    channel:'',
                    versionName:'',
                    versionCode:'',
                    md5:'',
                    url:'',
                    descr:''
                },
                formValidateCopy:{},
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
                        { required: true, message: '请输入渠道' }
                    ],
                    versionName:[
                        {required:true, message: '请输入版本名'}
                    ],
                    versionCode:[
                        {required:true, message: '请输入版本号'}
                    ],
                    descr:[
                        {required:true, message: '请输入描述'}
                    ],
                    url:[
                        {required:true, message: '请上传apk文件'}
                    ],
                }
            }
        },
        watch:{
            // "formValidate.version":(e)=>{
            //     console.log(e);
            // }
        },
        created(){
            // this.header.token = this.$webapi.get("token");
        },
        mounted() {
            this.ashow = this.importEditShow
            this.formValidate=this.importEditData
            this.formValidateCopy={...this.importEditData}
        },
        methods: {
            cancel () {
                this.ashow = false
                this.$emit('exportEditData',{show:false})
            },
            remove (item) {
              var _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      _this.ashow = false
                      _this.$emit('exportEditData',{show:false})
                    },
                    onCancel: () => {
                       _this.ashow = true
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(111);
                        this.post(name)
                    }
                })
            },
            handleReset (name) {
                this.remove()
            },
            post (name) {
                let _this = this;
                var data = {
                    id:this.formValidate.id,
                    name: this.formValidate.name,
                    packageName: this.formValidate.packageName,
                    channel: this.formValidate.channel,
                    versionName:this.formValidate.versionName,
                    versionCode:this.formValidate.versionCode,
                    md5:this.formValidate.md5,
                    url:this.formValidate.url,
                    descr:this.formValidate.descr
                }
                // if(this.formValidate.name!=this.formValidateCopy.name){
                //     data.name=this.formValidate.name
                // }
                // if(this.formValidate.packageName!=this.formValidateCopy.packageName){
                //     data.packageName=this.formValidate.packageName
                // }
                // if(this.formValidate.channel!=this.formValidateCopy.channel){
                //     data.channel=this.formValidate.channel
                // }
                // if(this.formValidate.versionCode!=this.formValidateCopy.versionCode){
                //     data.versionCode=this.formValidate.versionCode
                // }
                // if(this.formValidate.url!=this.formValidateCopy.url){
                //     data.url=this.formValidate.url
                //     data.md5=this.formValidate.md5
                // }
                // if(this.formValidate.descr!=this.formValidateCopy.descr){
                //     data.descr=this.formValidate.descr
                // }
                this.$api.post("/admin/api/upgrade/modify", data, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success('修改成功!');
                        _this.$emit('exportEditData',{show:false})
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportData(e){
                this.formValidate.appTypeId=e
            },
            onsuccess(response, file, fileList) {
                if (response.code==0) {
                    this.$Message.success("上传成功!")
                    // this.$refs.upload.clearFiles()
                    this.formValidate.url=response.data.url
                    this.formValidate.md5=response.data.md5
                    this.formValidate.names=response.data.name
                }else{
                    this.$Message.error("上传失败!")
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
                this.$Message.error("上传失败!")
            }
        }
    }
</script>
