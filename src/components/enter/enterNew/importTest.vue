<template>
    <div class="">
        <div class="btn-switch">
            <switch-test></switch-test>
            <h4 style="text-align:right;padding-right:100px;"><a href="http://file.xuzhistudy.com/%E5%BD%95%E9%A2%98%E6%A8%A1%E6%9D%BF.docx">下载模板</a></h4>
        </div>
        <div class="test-page">
            <Form :label-width="100">
                <Row>
                    <Col :xs="24" :sm="24" :md="16" :lg="16">
                        <FormItem label="上传word文件:" prop="url">
                            <Upload
                                ref="uploadFile"
                                :before-upload="handleClearFiles "
                                :action="commonurl"
                                :on-success="onsuccess"
                                :on-error="error"
                                :accept="accept"
                                :headers="header"
                                :with-credentials= true
                                name="file"
                                :format="format"
                                :on-format-error="handleFormatError">
                                <Button icon="ios-cloud-upload-outline" style="width:228px;">添加文档</Button>
                            </Upload>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :xs="24" :sm="24" :md="{ span: 6, offset: 5 }" :lg="{ span: 6, offset: 5 }">
                        <div style="text-align:left;margin-bottom:15px;">
                            <Button type="primary" size="large" @click="sure">解析</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="" v-show="spinShow">
            <Spin fix size="large">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <h5>解析中...</h5>
            </Spin>
        </div>
    </div>
</template>

<script>
import SwitchTest from '@/components/common/switch.vue'
export default {
    components:{
        SwitchTest,
    },
    data(){
        return {
            spinShow:false,//spin是否显示
            commonurl: this.$api.root+"/admin/api/upload/document",
            accept:"appliction/json",
            header: {

            },
            // format:['apk','png',"jpg"],
            format:['docx'],
            wordData:{},//文件上传后,返回的数据
        }
    },
    beforeRouteEnter(to,from,next){
        if (to.name=='importTest') {
            next(vm=>{
                vm.$store.dispatch("handBoolEnter",false)
            });
        }
    },
    methods:{
        handleClearFiles(){
            // 点击上传之前，清空之前已上传文件
            this.$refs.uploadFile.clearFiles()
        },
        onsuccess(response, file, fileList) {
            // this.$Message.success("上传成功!")
            if (response.code==200) {
                this.$Message.success("上传成功!")
                this.wordData=response.data;
            }else{
                // this.$Message.error("上传失败!")
                this.$netcode.getApiCode(response)
            }
        },
        handleFormatError(file, fileList){
            this.$Message.error({
                content:"文件上传格式错误,请选择docx的文件!",
                duration:2
            })
        },
        error(error, file, fileList){
            console.log(error);
            this.$Message.error("上传失败!")
        },
        sure(){
            var _this=this;
            this.spinShow=true;
            var data={
                wordUrl:this.wordData.url
                // wordUrl:'http://test.xuzhistudy.com/Fn4tZ5VZs1VWJrlf0xIzlJRs48fB'
            }
            this.$api.post("/admin/api/input/subject", data, res => {
                if(res.code==200){
                    _this.$webapi.save('importTestDatas',JSON.stringify(res.data));
                    _this.spinShow=false;
                    _this.$Message.success("解析成功!")
                    // var importTestDatas=JSON.stringify(res.data);
                    _this.$router.push({
                        path:"/enter/test/list",
                        query:{
                            id:res.data[0]
                        }
                    })
                }else{
                    _this.spinShow=false;
                    _this.$netcode.getApiCode(res)
                }
            })
            // _this.$router.push({
            //     path:"/enter/test/list",
            //     query:{
            //         id:1
            //     }
            // })
        }
    }
}
</script>

<style lang="css" scoped>
    .test-page{
        padding:15px;
        padding-left: 30px;
    }
    .btn-switch{
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .ivu-form-item{
        margin-bottom: 12px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1.5s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .ivu-spin{
        /* color:red; */
    }
    .ivu-spin-fix{
        z-index: 1000;
    }
</style>
