<template lang="html">
    <div class="">
        <div class="page-component-card">
            <Card style="width:100%;">
                <p slot="title">
                    <span>题目信息</span>
                </p>
                <Row>
                    <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="60">
                        <Col span="6">
                            <FormItem label="题号:" prop="questionId">
                                <Input v-model="formValidate.questionId" placeholder="题号"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="题型:" prop="type">
                                <get-type @exportData="exportTypeData"></get-type>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="难度:" prop="grade">
                                <get-difficulty @exportData="exportDifficultyData" :importData="3"></get-difficulty>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="来源:" prop="source">
                                <Input v-model="formValidate.source" placeholder="来源"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="知识点:" prop="knowledge">
                                <get-knowledge @exportData="exportKnowledgeData"></get-knowledge>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
            </Card>
        </div>
        <div class="page-component-card">
            <Card style="width:100%;">
                <p slot="title">
                    <span>题干</span>
                </p>
                <vue-ueditor-wrap v-model="formValidate.content" :config="myConfig" ref="ueContent"></vue-ueditor-wrap>
            </Card>
        </div>
        <div class="page-component-card" v-show="selShow">
            <Card style="width:100%;">
                <p slot="title">
                    <span>小题或选项</span>
                </p>
                <vue-ueditor-wrap v-model="formValidate.selection" :config="myConfig" ref="ueSelect"></vue-ueditor-wrap>
            </Card>
        </div>
        <div class="page-component-card">
            <Card style="width:100%;">
                <p slot="title">
                    <span>答案</span>
                </p>
                <vue-ueditor-wrap v-model="formValidate.answer" :config="myConfig" ref="ueAnswer"></vue-ueditor-wrap>
            </Card>
        </div>
        <div class="page-component-card">
            <Card style="width:100%;">
                <p slot="title">
                    <span>解析</span>
                </p>
                <vue-ueditor-wrap v-model="formValidate.analysis" :config="myConfig" ref="ueAnalysis"></vue-ueditor-wrap>
            </Card>
        </div>
        <div style="text-align:center;margin-bottom:15px;">
            <Button type="primary" size="large" @click="sure('formValidate')">提交</Button>
        </div>
        <div class="" v-if="spinShow">
            <Spin fix size="large">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <h5>解析中...</h5>
            </Spin>
        </div>
    </div>
</template>

<script>
import getType from '@/components/view/getType.vue'
import getDifficulty from '@/components/pub/getDifficulty.vue'
import getKnowledge from '@/components/view/getKnowledge.vue'
import VueUeditorWrap from '@/components/pub/vueUeditroWrap.vue'
export default {
    components:{
        getType,
        getDifficulty,
        getKnowledge,
        VueUeditorWrap
    },
    data(){
        return {
            formValidate: {
                id:1,
                questionId:"",
                type:'',
                source:'',
                selection:'',
                content:'',
                answer:'',
                analysis:'',
            },
            // 富文本编辑器配置
            myConfig: {
                // 如果需要上传功能,找后端小伙伴要服务器接口地址
                serverUrl: this.$api.root+'/admin/api/upload/config',
                // 你的UEditor资源存放的路径,相对于打包后的index.html
                UEDITOR_HOME_URL: '/static/UEditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: true,
                // 初始容器高度
                initialFrameHeight: 312,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 关闭自动保存
                enableAutoSave: false,
                autoFloatEnabled:false//是否保持toolbar的位置不动，默认为true
            },
            selData:["单选题","多选题","选择题组","现代文阅读","文言文阅读","诗歌阅读","完形填空","阅读理解","阅读理解七选五"],
            selShow:true,//判断小题或者选项编辑框是否显示
            spinShow:false,
        }
    },
    created(){
        if (this.$store.state.entertest.type) {
            this.formValidate.type=this.$store.state.entertest.type
        }
        if (this.$store.state.entertest.difficulty) {
            this.formValidate.difficulty=this.$store.state.entertest.difficulty
        }
        if (this.$store.state.entertest.knowledge) {
            this.formValidate.knowledge=this.$store.state.entertest.knowledge
        }
        this.selShow=this.$store.state.entertest.selShow
    },
    methods:{
        exportTypeData(e){
            this.formValidate.type=e.value;
            if (this.selData.indexOf(e.label)!=-1) {
                this.selShow=true
            }else{
                this.selShow=false
            }
            this.$store.commit("selShowEnter",this.selShow)
        },
        exportDifficultyData(e){
            this.formValidate.difficulty=e;
        },
        exportKnowledgeData(e){
            this.formValidate.knowledge=e;
        },
        sure(name){
            var _this=this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    var data={
                        gradeId:this.$route.query.gid,
                        courseId:this.$route.query.cid,
                        editionId:this.$route.query.vid,
                        textbookId:this.$route.query.tid,
                        bookNameId:this.$route.query.teachId,
                    };
                    // if(this.linkurl){
                    //     data.webUrl=this.linkurl
                    // }else{
                        if(this.formValidate.content){
                            data.content=this.formValidate.content
                        }
                        if(this.formValidate.selection){
                            data.selection=this.formValidate.selection
                        }
                        if(this.formValidate.answer){
                            data.answer=this.formValidate.answer
                            // data.answer=this.ueAnswer.getContentTxt()
                        }
                        if(this.formValidate.analysis){
                            data.analysis=this.formValidate.analysis
                        }
                    // }
                    if(this.formValidate.type){
                        data.typeId=this.formValidate.type
                    }

                    if(this.formValidate.knowledge){
                        data.knowledges=this.formValidate.knowledge
                    }
                    if(this.formValidate.questionId){
                        data.questionId=this.formValidate.questionId
                    }
                    if(this.formValidate.difficulty){
                        data.difficultyId=this.formValidate.difficulty
                    }
                    if(this.formValidate.source){
                        data.source=this.formValidate.source
                    }
                    if(this.$store.state.enternew.selData.length!=0){
                        var arr=[]
                        for (var i = 0; i < this.$store.state.enternew.selData.length; i++) {
                            arr.push(this.$store.state.enternew.selData[i].title)
                        }
                        data.chapters=arr
                        this.spinShow=true;
                        this.$api.post("/admin/api/input/subject", data, res => {
                            if(res.code==200){
                                _this.$webapi.save('importTestDatas',JSON.stringify(res.data));
                                if(res.data.length==0){
                                    _this.$Message.error("解析失败,请重新提交!")
                                }else{
                                    _this.spinShow=false;
                                    _this.$Message.success("解析成功!")
                                    this.$store.dispatch("contentEnter",'')
                                    this.$store.dispatch("selectionEnter",'')
                                    this.$store.dispatch("analysisEnter",'')
                                    this.$store.dispatch("answerEnter",'')
                                    this.linkurl=''
                                    _this.$router.push({
                                        path:"/enter/new/list",
                                        query:{
                                            id:res.data[0]
                                        }
                                    })
                                }
                            }else{
                                _this.spinShow=false;
                                _this.$netcode.getApiCode(res)
                            }
                        })
                    }else{
                        _this.$Message.error('请选择章节!')
                    }
                }else{
                    _this.$Message.error('请输入完整信息!')
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
    .page-component-view{
        background-color: transparent;
    }
    .page-component-card{
        margin-bottom: 15px;
        background-color: #fff;
        // padding:15px;
    }
    .page-component-bd{
    }
    .card-text{
        color:#098CFF;
        cursor:pointer;
    }
</style>
