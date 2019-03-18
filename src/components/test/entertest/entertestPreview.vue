<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>题目管理</BreadcrumbItem>
                <BreadcrumbItem>录题</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>录题预览</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">

                </div>
                <!--操作按钮-->
                <div class="tableListOperator" style="margin-bottom: 0px;">
                    <!-- <Button type="primary" size="large" @click="add()">添加</Button> -->
                </div>
                <div class="page-view allm20">
                    <div class="page-view-body">
                        <Form :model="formItem" label-position="left" class="form-border">
                            <div class="pagelist">
                                <div class="pagelist-hd">题目信息</div>
                                <div class="pagelist-bd">
                                    <Row>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="年级:" prop="grade">
                                                <p>{{formItem.grade}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="科目:" prop="course">
                                                <p>{{formItem.course}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="教材版本:" prop="textbookVersion">
                                                <p>{{formItem.textbookVersion}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="教材:" prop="textbook">
                                                <p>{{formItem.textbook}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="题型:" prop="type">
                                                <p>{{formItem.type}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="难度:" prop="difficulty">
                                                <p>{{formItem.difficulty}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="教辅:" prop="assistants">
                                                <p>{{formItem.assistants}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <FormItem label="章节:" prop="chapter">
                                                <p>{{formItem.chapters}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <FormItem label="知识点:" prop="knowledgeList">
                                                <span v-for="item in formItem.knowledgeList" class="span-interval">{{item}}</span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="page-divider page-divider-horizontal"></div>
                            </div>
                            <div class="pagelist">
                                <div class="pagelist-hd">题干信息</div>
                                <div class="pagelist-bd">
                                    <div class="">
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <h4>题目</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <p v-html="formItem.question" class="text-indent"></p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="">
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <h4>题干</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <p v-html="formItem.content" class="text-indent"></p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="" v-if="this.$route.query.sel">
                                        <div>
                                            <h3>全部选项</h3>
                                        </div>
                                        <div v-for="(value, key, index) in selctions" :key="key">
                                            <Row>
                                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                    <h5>选项{{key}}:</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                    <p v-html="value" class="text-indent"></p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <!-- <div class="" v-if="this.$route.query.sel">
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <h4>正确选项</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <p v-html="formItem.selectionKey" class="text-indent" ref="selectionKey"></p>
                                            </Col>
                                        </Row>
                                    </div> -->
                                    <div class="">
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <h4>答案</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <p v-html="formItem.answer" ref="answer"></p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="">
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <h4>解析</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                                <p v-html="formItem.analysis"></p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <div class="page-divider page-divider-horizontal"></div>
            </div>
            <div style="text-align:center;margin-bottom:15px;">
                <Button type="primary" size="large" @click="add">保存</Button>
                <Button type="default" size="large" @click="back">返回</Button>
                <!-- <Button type="error" size="large" @click="del">下架</Button> -->
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                formItem:{
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
                },
                selctions:{}
            }
        },
        mounted(){
            this.formItem=this.$store.state.entertest.enter_datas;//科目
            if(this.$route.query.sel){
                if(this.$store.state.entertest.seletionDatas){
                    // this.selctions=JSON.parse(this.formItem.selection)
                    this.selctions=JSON.parse(this.$store.state.entertest.seletionDatas)
                }else{
                    this.selctions=JSON.parse(this.formItem.selection)
                }
            }
            this.enterArray=JSON.parse(this.$webapi.get('importTestDatas'))
            // this.formItem.grade=this.formItem.gradeText;//年级
            // this.formItem.textbook=this.formItem.textbookText;//教材
            // this.formItem.textbookVersion=this.formItem.textbookVersionText;//教材版本
            // this.formItem.type=this.formItem.typeText;//题型
            // this.formItem.chapter=this.formItem.chapterText;//章节id
            // this.formItem.knowledge=this.formItem.knowledge;//知识点
            // this.formItem.difficulty=this.formItem.difficultyText;//难度
            // this.formItem.source=this.formItem.source;//来源
            // this.formItem.assistants=this.formItem.assistants;//教辅
            // this.formItem.content=this.formItem.content;//题干
            // this.formItem.selection=this.formItem.selection;//选项
            // this.formItem.item=this.formItem.item;//小题
            // this.formItem.answer=this.formItem.answer;//答案
            // this.formItem.analysis=this.formItem.analysis;//解析
        },
        methods:{
            edit(){
                this.$router.push({
                    path:"/edit/enter"
                })
            },
            add(){
                let _this = this
                let datas={
                    id: this.$route.query.id,//当前页
                    // scope: this.formItem.scope,//题型
                }
                if(this.$store.state.entertest.gradeSel){
                    datas.gradeId=this.formItem.grade
                }
                if(this.$store.state.entertest.courseSel){
                    datas.courseId=this.formItem.course
                }
                if(this.$store.state.entertest.textbookSel){
                    datas.textbookId=this.formItem.textbook
                }
                if(this.$store.state.entertest.gradeSel){
                    datas.editionId=this.formItem.grade
                }
                if(this.$store.state.entertest.difficultySel){
                    datas.difficultyId=this.formItem.difficulty
                }
                if(this.$store.state.entertest.knowledgeSel){
                    datas.knowledges=this.formItem.knowledge
                }
                if(this.$store.state.entertest.chapterSel){
                    datas.chapters=this.formItem.chapterText
                }
                if(this.$store.state.entertest.typeSel){
                    datas.typeId=this.formItem.type
                }
                if(this.$store.state.entertest.questionSel){
                    datas.question=this.formItem.question
                }
                if(this.$store.state.entertest.contentSel){
                    datas.content=this.formItem.content
                }
                if(this.$store.state.entertest.selectionSel){
                    datas.selection=this.$store.state.entertest.seletionDatas
                }
                // if(this.$store.state.entertest.selectionKeySel){
                //     var e=this.$refs.selectionKey
                //     datas.selectionKey=e.textContent
                // }
                if(this.$store.state.entertest.answerSel){
                    if (this.formItem.scope==1||this.formItem.scope==2) {
                        var e=this.$refs.answer
                        datas.answer=e.textContent
                    }else{
                        datas.answer=this.formItem.answer
                    }
                }
                if(this.$store.state.entertest.analysisSel){
                    datas.analysis=this.formItem.analysis
                }
                if(this.$store.state.entertest.assistantsSel){
                    datas.bookName=this.formItem.assistants
                }
                if(this.$store.state.entertest.sourceSel){
                    datas.source=this.formItem.source
                }
                this.$api.post("/admin/api/input/modify", datas, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success("修改成功!");
                        _this.$router.push({
                            path:'/enter/test/list',
                            query:{
                                id:_this.$route.query.id
                            }
                        })

                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            del(){
                this.$Message.success("下架成功");
            },
            back(){
                this.$router.back(-1)
            }
        }
    }
</script>
<style scoped>
    .page-component-view{
        padding-bottom: 15px;
    }
    .ivu-form-item{
        margin-bottom: 0px;
    }
</style>
