<template>
    <div class="">
        <div class="btn-switch">
            <switch-test></switch-test>
        </div>
        <div class="">
            <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="80" :rules="ruleValidate">
                <Row class="search-row">
                    <Col :xs="24" :sm="24" :md="{ span: 4, offset: 1 }" :lg="{ span: 4, offset: 1 }">
                        <FormItem label="年级:" prop="grade">
                            <get-grade @exportData="exportGradeData"></get-grade>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="4" :lg="4">
                        <FormItem label="学科:" prop="course">
                            <get-course @exportData="exportCourseData"></get-course>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="4" :lg="4">
                        <FormItem label="教材版本:" prop="textbookVersion">
                            <get-textbook-version @exportData="exportTextbookVersionData"></get-textbook-version>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="4" :lg="4">
                        <FormItem label="教材:" prop="textbook">
                            <get-textbook @exportData="exportTextbookData"></get-textbook>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="4" :lg="4">
                        <FormItem label="难易度:" prop="difficulty">
                            <get-difficulty @exportData="exportDifficultyData"></get-difficulty>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="search-row">
                    <Col :xs="24" :sm="24" :md="{ span: 20, offset: 1 }" :lg="{ span: 20, offset: 1 }">
                        <FormItem label="教辅:" prop="assistants">
                            <Input v-model="formValidate.assistants" placeholder="教辅" @input="assistantsInput"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="search-row">
                    <Col :xs="24" :sm="24" :md="{ span: 12, offset: 1 }" :lg="{ span: 12, offset: 1 }">
                        <FormItem label="章节:" prop="chapterArray">
                            <get-chapter @exportData="exportChapterData"></get-chapter>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="8" :lg="8">
                        <FormItem label="题型:" prop="type">
                            <get-type @exportData="exportTypeData"></get-type>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="search-row">
                    <Col :xs="24" :sm="24" :md="{ span: 12, offset: 1 }" :lg="{ span: 12, offset: 1 }">
                        <FormItem label="知识点:" prop="knowledge">
                            <get-knowledge @exportData="exportKnowledgeData"></get-knowledge>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="8" :lg="8">
                        <FormItem label="来源:" prop="source">
                            <Input v-model="formValidate.source" placeholder="来源" @input="sourceInput"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <div class="btn-switch">
                    <enter-switch></enter-switch>
                </div>
                <div class="" v-if="linkBool">
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 1 }" :lg="{ span: 20, offset: 1 }">
                            <FormItem label="题干:" prop="contentMsg">
                                <vue-ueditor-wrap v-model="formValidate.content" :config="myConfig" ref="ueContent"  @ready="readyContent"></vue-ueditor-wrap>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 1 }" :lg="{ span: 20, offset: 1 }">
                            <FormItem label="选项:" prop="selection">
                                <vue-ueditor-wrap v-model="formValidate.selection" :config="myConfig" ref="ueSelect" @ready="readySelect"></vue-ueditor-wrap>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 1 }" :lg="{ span: 20, offset: 1 }">
                            <FormItem label="小题:" prop="item">
                                <vue-ueditor-wrap v-model="formValidate.item" :config="myConfig" ref="ueItem" @ready="readyItem"></vue-ueditor-wrap>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 1 }" :lg="{ span: 20, offset: 1 }">
                            <FormItem label="答案:" prop="answer">
                                <vue-ueditor-wrap v-model="formValidate.answer" :config="myConfig" ref="ueAnswer" @ready="readyAnswer"></vue-ueditor-wrap>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 1 }" :lg="{ span: 20, offset: 1 }">
                            <FormItem label="解析:" prop="analysis">
                                <!-- <Ueditor :writeMsg="formValidate.analysis"  :id="ueditorAnalysis" :config="myConfig"  ref="ueAnalysis"></Ueditor> -->
                                <vue-ueditor-wrap v-model="formValidate.analysis" :config="myConfig" ref="ueAnalysis" @ready="readyAnalysis"></vue-ueditor-wrap>
                            </FormItem>
                        </Col>
                    </Row>
                    <div style="text-align:center;margin-bottom:15px;">
                        <Button type="primary" size="large" @click="sure('formValidate')">提交</Button>
                    </div>
                </div>
                <div class="" v-if="!linkBool">
                    <Row class="search-row">
                        <Col :xs="24" :sm="24" :md="{ span: 20, offset: 1 }" :lg="{ span: 20, offset: 1 }">
                            <FormItem label="连接:" prop="linkUrl">
                                <!-- <Ueditor :writeMsg="formValidate.analysis"  :id="ueditorAnalysis" :config="myConfig"  ref="ueAnalysis"></Ueditor> -->
                                <vue-ueditor-wrap v-model="formValidate.linkUrl" :config="myConfig" ref="ueLinkUrl" @ready="readyLinkUrl"></vue-ueditor-wrap>
                            </FormItem>
                        </Col>
                    </Row>
                    <div style="text-align:center;margin-bottom:15px;">
                        <Button type="primary" size="large" @click="sure('formValidate')">提交</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    import SwitchTest from '@/components/common/switch.vue'
    import enterSwitch from './enterSwitch.vue'
    import getCourse from '@/components/pub/getCourse.vue'
    import getGrade from '@/components/pub/getGrade.vue'
    import getTextbook from '@/components/pub/getTextbook.vue'
    import getTextbookVersion from '@/components/pub/getTextbookVersion.vue'
    import getType from '@/components/pub/getType.vue'
    import getChapter from '@/components/pub/getChapter.vue'
    import getKnowledge from '@/components/pub/getKnowledge.vue'
    import getDifficulty from '@/components/pub/getDifficulty.vue'
    import Ueditor from '@/components/pub/Ueditor.vue';
    import VueUeditorWrap from 'vue-ueditor-wrap'

    import {mapGetters} from 'vuex';

    export default {
        components:{
            SwitchTest,
            getCourse,
            getGrade,
            getTextbook,
            getTextbookVersion,
            getType,
            getChapter,
            getKnowledge,
            getDifficulty,
            Ueditor,
            VueUeditorWrap,
            enterSwitch,
        },
        data(){
            return {
                source:'',
                assistants:'',
                formValidate:{
                    course:'',
                    grade:'',
                    textbook:'',
                    textbookVersion:'',
                    type:'',
                    chapterArray:'',
                    knowledge:'',
                    difficulty:'',
                    source:'',
                    assistants:'',
                    content:'',
                    selection:'',
                    answer:'',
                    analysis:'',
                    linkUrl:''
                },
                ueContent:'',
                ueSelection:'',
                ueAnalysis:'',
                ueAnswer:'',
                ueItem:'',
                ue:'',
                // 富文本编辑器配置
                myConfig: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址
                    // serverUrl: 'http://47.98.238.6/admin/api/upload/config',
                    // serverUrl: 'http://www.xuzhistudy.com/admin/api/upload/config',
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
                ruleValidate:{
                    course:[
                        { required: true, message: '请选择学科'},
                    ],
                    grade: [
                        { required: true, message: '请选择年级'},
                        // { validator: vers,message:'版本格式书写错误' trigger: "blur" }
                        // { type:'string',pattern: /^\d{1,2}(\.\d{1,2}){2,3}$/,message:'版本格式书写错误', trigger: "blur" }
                    ],
                    textbook: [
                        { required: true, message: '请选择教材'}
                    ],
                    textbookVersion:[
                        {required:true, message: '请选择教材版本'}
                    ],
                    type:[
                        {required:true, message: '请选择题型'}
                    ],
                    // chapterArray:[
                    //     {required:true, message: '请选择章节'}
                    // ],
                    // knowledge:[
                    //     {required:true, message: '请选择知识点'}
                    // ],
                    difficulty:[
                        {required:true, message: '请选择难易度'}
                    ],
                    // source:[
                    //     {required:true, message: '请输入来源',trigger:'blur'}
                    // ],
                    // assistants:[
                    //     {required:true, message: '请输入教辅',trigger:'blur'}
                    // ],
                }
            }
        },
        computed:{
            linkBool:function(){
                return this.$store.state.entertest.linkBool
            }
        },
        watch:{
            // 'formValidate.content':function(val){
            //     console.log(val);
            //     console.log(this.ueContent.getContent())
            //     this.$store.dispatch("contentEnter",val)
            // },
            // 'formValidate.selection':function(val){
            //     this.$store.dispatch("selectionEnter",val)
            // },
            // 'formValidate.analysis':function(val){
            //     this.$store.dispatch("analysisEnter",val)
            // },
            // 'formValidate.answer':function(val){
            //     this.$store.dispatch("answerEnter",val)
            // },
        },
        created(){
            // this.formValidate.course=this.$store.state.entertest.course;
        },
        mounted(){
            this.formValidate.course=this.$store.state.entertest.course;//科目
            this.formValidate.grade=this.$store.state.entertest.grade;//年级
            this.formValidate.textbook=this.$store.state.entertest.textbook;//教材
            this.formValidate.textbookVersion=this.$store.state.entertest.textbookVersion;//教材版本
            this.formValidate.type=this.$store.state.entertest.type;//题型
            this.formValidate.chapterArray=this.$store.state.entertest.chapterArray;//章节id
            this.formValidate.knowledge=this.$store.state.entertest.knowledge;//知识点
            this.formValidate.difficulty=this.$store.state.entertest.difficulty;//难度
            this.formValidate.source=this.$store.state.entertest.source;//来源
            this.formValidate.assistants=this.$store.state.entertest.assistants;//教辅
            this.formValidate.content=this.$store.state.entertest.content;//题干
            this.formValidate.selection=this.$store.state.entertest.selection;//选项
            this.formValidate.answer=this.$store.state.entertest.answer;//答案
            this.formValidate.analysis=this.$store.state.entertest.analysis;//解析
        },
        methods:{
            exportCourseData(e){
                this.formValidate.course=e;
            },
            exportGradeData(e){
                this.formValidate.grade=e;
            },
            exportTextbookData(e){
                this.formValidate.textbook=e;
            },
            exportTextbookVersionData(e){
                this.formValidate.textbookVersion=e;
            },
            exportTypeData(e){
                this.formValidate.type=e;
            },
            exportChapterData(e){
                this.formValidate.chapterArray=e[e.length-1];
            },
            exportKnowledgeData(e){
                this.formValidate.knowledge=e;
            },
            exportDifficultyData(e){
                this.formValidate.difficulty=e;
            },
            sourceInput(){
                this.$store.dispatch("sourceEnter",this.formValidate.source)
            },
            assistantsInput(val){
                this.$store.dispatch("assistantsEnter",this.formValidate.assistants)
            },
            sure(name){
                var _this=this;
                new Promise((resolve,reject)=>{
                    if(this.linkBool){
                        _this.$store.dispatch("contentEnter",this.ueContent.getContent())
                        _this.$store.dispatch("selectionEnter",this.ueSelect.getContent())
                        _this.$store.dispatch("itemEnter",this.ueItem.getContent())
                        _this.$store.dispatch("analysisEnter",this.ueAnalysis.getContent())
                        _this.$store.dispatch("answerEnter",this.ueAnswer.getContent())
                    }else{
                        _this.$store.dispatch("LinkEnter",this.ueLinkUrl.getContent())
                    }
                    resolve();
                }).then(()=>{
                    _this.$router.push({
                        path:"/enter/test/preview"
                    })
                })
                // this.$refs[name].validate((valid) => {
                //     if(valid){
                //         _this.$router.push({
                //             path:"/enter/test/preview"
                //         })
                //     }else{
                //         _this.$Message.error('请输入完整信息!')
                //     }
                // })
                // _this.$router.push({
                //     path:"/enter/test/preview"
                // })
            },
            // sure(){
            //     this.$store.dispatch("LinkEnter",this.ueLinkUrl.getContent())
            //     this.$router.push({
            //         path:"/analysis/enter/preview"
            //     })
            // },
            readyContent(ue){
                this.ueContent=ue;
            },
            readySelect(ue){
                this.ueSelect=ue;
            },
            readyAnalysis(ue){
                this.ueAnalysis=ue;
            },
            readyAnswer(ue){
                this.ueAnswer=ue;
            },
            readyItem(ue){
                this.ueItem=ue;
            },
            readyLinkUrl(ue){
                this.ueLinkUrl=ue;
            },
        }
    }
</script>

<style lang="css" scpoed>
    .btn-switch{
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .ivu-form-item{
        margin-bottom: 1px;
    }
</style>
