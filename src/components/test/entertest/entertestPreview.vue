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
                <!-- <div class="page-view allm20">
                    <div class="page-view-body">
                        <Row>
                            <Col :xs="24" :sm="24" :md="{ span: 20, offset: 2 }" :lg="{ span: 20, offset: 2 }">
                                <Table border :columns="columns" :data="data" :show-header="false"></Table>
                            </Col>
                        </Row>

                    </div>
                </div> -->
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
                                                <p>{{formItem.chapter}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <FormItem label="知识点:" prop="knowledge">
                                                <p>{{formItem.knowledge}}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="page-divider page-divider-horizontal"></div>
                                <div class="">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>题干</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <p v-html="formItem.content"></p>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="" v-if="formItem.selection">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>选项</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <p v-html="formItem.selection"></p>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="" v-if="formItem.item">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>小题</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <p v-html="formItem.item"></p>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>答案</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <p v-html="formItem.answer"></p>
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
                        </Form>
                    </div>
                </div>
                <div class="page-divider page-divider-horizontal"></div>
            </div>
            <div style="text-align:center;margin-bottom:15px;">
                <Button type="primary" size="large" @click="edit">修改</Button>
                <Button type="default" size="large" @click="add">上架</Button>
                <Button type="error" size="large" @click="del">下架</Button>
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
            }
        },
        mounted(){
            // console.log(this.$store.state.entertest.difficultyText)
            this.formItem.course=this.$store.state.entertest.courseText;//科目
            this.formItem.grade=this.$store.state.entertest.gradeText;//年级
            this.formItem.textbook=this.$store.state.entertest.textbookText;//教材
            this.formItem.textbookVersion=this.$store.state.entertest.textbookVersionText;//教材版本
            this.formItem.type=this.$store.state.entertest.typeText;//题型
            this.formItem.chapter=this.$store.state.entertest.chapterText;//章节id
            this.formItem.knowledge=this.$store.state.entertest.knowledge;//知识点
            this.formItem.difficulty=this.$store.state.entertest.difficultyText;//难度
            this.formItem.source=this.$store.state.entertest.source;//来源
            this.formItem.assistants=this.$store.state.entertest.assistants;//教辅
            this.formItem.content=this.$store.state.entertest.content;//题干
            this.formItem.selection=this.$store.state.entertest.selection;//选项
            this.formItem.item=this.$store.state.entertest.item;//小题
            this.formItem.answer=this.$store.state.entertest.answer;//答案
            this.formItem.analysis=this.$store.state.entertest.analysis;//解析
        },
        methods:{
            edit(){
                this.$router.push({
                    path:"/edit/enter"
                })
            },
            add(){
                this.$Message.success("上架成功");
            },
            del(){
                this.$Message.success("下架成功");
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
