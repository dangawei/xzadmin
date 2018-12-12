<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>题库管理</BreadcrumbItem>
                    <BreadcrumbItem>题目管理</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>编辑预览</h2>
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
                </div>
                <div class="page-view allm20">
                    <div class="page-view-body">
                    <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="left" v-if="show">
                        <div class="page-divider page-divider-horizontal "></div>
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
                                    <div v-for="(value, key, index) in formItem.selection" :key="key">
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
                                <div class="" v-if="this.$route.query.sel">
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <h4>正确选项</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                                            <p v-html="formItem.selectionKey" class="text-indent"></p>
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
                        </div>
                        <div class="page-divider page-divider-horizontal"></div>
                        <div style="text-align:center;margin-bottom:15px;">
                            <Button type="primary"  @click="updata(formItem.id)">保存</Button>
                            <Button  @click="back()">返回</Button>
                        </div>
                    </Form>
                    <!-- <img src="@/assets/logo.png" alt=""> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    components: {

    },
    data () {
        return {
            show:false,
            formItem: {
                id:'',
                question:'',
                answer:'',
                analysis:''
            },
            ruleValidate: {

            },
        }
    },
    created() {
    },
    mounted(){
        this.getInfo();
    },
    methods: {
        getInfo () {
            let _this = this
            this.formItem.question=this.$store.state.usetest.question
            this.formItem.content=this.$store.state.usetest.content
            this.formItem.answer=this.$store.state.usetest.answer
            this.formItem.analysis=this.$store.state.usetest.analysis

            this.formItem.uid=this.$store.state.usetest.uid
            if (this.$route.query.sel){
                this.formItem.selection=JSON.parse(this.$store.state.usetest.selection)
                this.formItem.selectionKey=this.$store.state.usetest.selectionKey
            }
            this.show=true;
        },
        updata(e){
            let _this = this
            let datas={
                uid:this.$store.state.usetest.uid,
                question:this.formItem.question,
                answer:this.formItem.answer,
                analysis:this.formItem.analysis
            }
            if(this.formItem.content){
                datas.content=this.formItem.content
            }
            if(this.formItem.selection){
                datas.selection=JSON.stringify(this.formItem.selection)
            }
            if(this.formItem.selectionKey){
                datas.selectionKey=this.formItem.selectionKey
            }
            this.$api.post("/admin/api/feedback/subject/update", datas, reset => {
                if (reset.code === 200) {
                    _this.$Message.success("修改成功!");
                    _this.$router.push({path:"/use/test/list"});
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        back(){
            this.$router.back(-1);
        }
    }



}
</script>
<style scoped lang="less">
    .ivu-form-item{
        margin-bottom: 0px;
    }
    .span-interval{
        margin-right: 10px;
    }
</style>
