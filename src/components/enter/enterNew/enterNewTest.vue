
<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>录题管理</BreadcrumbItem>
                    <BreadcrumbItem>新题录入</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>新题录入</h2>
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
                        <div class="pagelist">
                            <div class="pagelist-hd">教辅列表</div>
                            <div class="pagelist-bd">
                                <div class="teach">
                                    <div class="tableListForm">
                                        <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="80" :rules="ruleValidate">
                                            <Row class="search-row">
                                                <Col span="6">
                                                    <FormItem label="年级:" prop="grade">
                                                        <get-grade @exportData="exportGradeData"></get-grade>
                                                    </FormItem>
                                                </Col>
                                                <Col span="6">
                                                    <FormItem label="学科:" prop="course">
                                                        <get-course @exportData="exportCourseData"></get-course>
                                                    </FormItem>
                                                </Col>
                                                <Col span="6">
                                                    <FormItem label="教材版本:" prop="textbookVersion">
                                                        <get-textbook-version @exportData="exportTextbookVersionData"></get-textbook-version>
                                                    </FormItem>
                                                </Col>
                                                <Col span="6">
                                                    <FormItem label="教材:" prop="textbook">
                                                        <get-textbooks @exportData="exportTextbookData"></get-textbooks>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row v-if="bookData.length!=0">
                                                <Col span="11" offset="1" v-for="(value,index) in bookData" :key="index">
                                                    <div class="defined">
                                                        <div class="d-img">
                                                            <img src="../../../assets/logo.png" alt="">
                                                        </div>
                                                        <div class="d-text">
                                                            <h4>{{value.name}}</h4>
                                                            <p><span>已录入{{value.alreadyCount}}/{{value.total}}</span><span>待修改{{value.unmodifiedCount}}道</span></p>
                                                        </div>
                                                        <div class="d-button">
                                                            <Button type="primary" @click="teachList(value)">录题</Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row v-else>
                                                <Col span="24">
                                                    <p style="text-align:center;">暂无数据!</p>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import getCourse from '@/components/pub/getCourse.vue'
import getGrade from '@/components/pub/getGrade.vue'
import getTextbooks from '@/components/pub/getTextbooks.vue'
import getTextbookVersion from '@/components/pub/getTextbookVersion.vue'
export default {
    name: 'index',
    components: {
        getCourse,
        getGrade,
        getTextbooks,
        getTextbookVersion,
    },
    data () {
        return {
            formValidate:{
                grade:'',
                course:'',
                textbook:''
            },
            ruleValidate:{
                // grade: [
                //     { required: true, message: '请选择班级'},
                // ],
                // course: [
                //     { required: true, message: '请选择学科'},
                // ],
                // textbookVersion: [
                //     { required: true, message: '请选择教材版本'},
                // ],
            },
            enterData:{},
            bookData:[],//教辅数据
        }
    },
    created(){
        if (this.$store.state.enternew.bookData.length==0 && (!this.$store.state.entertest.course)) {
            this.getBook();
        }else{
            this.bookData=this.$store.state.enternew.bookData
        }
    },
    methods:{
        getBook(){
            var data={};
            if (this.formValidate.grade) {
                data.gradeId=this.formValidate.grade
            }
            if (this.formValidate.course) {
                data.courseId=this.formValidate.course
            }
            if (this.formValidate.textbook) {
                data.textbookId=this.formValidate.textbook
            }
            if (this.formValidate.textbookVersion) {
                data.editionId=this.formValidate.textbookVersion
            }
            this.$api.get("/admin/api/bookName/list", data, reset => {
                if (reset.code === 200) {
                    if (reset.hasOwnProperty('data')) {
                        this.bookData=reset.data;
                    }else{
                        this.$Message.warning("暂无教辅数据!")
                        this.bookData=[]
                    }
                    this.$store.commit("bookDataEnter",this.bookData)
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        exportGradeData(e){
            this.formValidate.grade=e;
            this.formValidate.course='';
            this.formValidate.textbook='';
            this.formValidate.textbookVersion='';
            this.getBook();
        },
        exportCourseData(e){
            this.formValidate.course=e;
            this.formValidate.textbook='';
            this.formValidate.textbookVersion='';
            this.getBook();
        },
        exportTextbookData(e){
            this.formValidate.textbook=e;
            this.formValidate.textbookVersion='';
            this.getBook();
        },
        exportTextbookVersionData(e){
            this.formValidate.textbookVersion=e;
            this.getBook();
        },
        teachList(e){
            // if(this.$store.state.entertest.courseText&&this.$store.state.entertest.gradeText&&this.$store.state.entertest.textbookVersionText){
            //     if (this.$store.state.entertest.textbook) {
            //         this.enterData.tid=this.$store.state.entertest.textbook
            //         this.enterData.ttext=this.$store.state.entertest.textbookText
            //     }
                this.enterData.teachId=e.id
                this.enterData.teachtext=e.name
                this.enterData.teachstate=e.state
                this.enterData.cid=e.courseId
                this.enterData.gid=e.gradeId
                this.enterData.vid=e.editionId
                if (e.textbookId) {
                    this.enterData.tid=e.textbookId
                }
                this.$router.push({
                    path:"/enter/teach/link",
                    query:this.enterData
                })
            // }else{
            //     this.$Message.error("请完整选择必选项!")
            // }
        }
    }
}
</script>
<style scoped lang="less">
    .defined{
        width: 100%;
        height:150px;
        border:1px solid #565657;
        margin-bottom: 15px;
        overflow: hidden;
        padding: 15px;
        display: flex;
        display: -webkit-flex;
        align-items:center;
        .d-img{
            height: 100%;
            // width: 120px;
            // float: left;
            flex:0 1 auto;
            img{
                height: 100%;
            }
        }
        .d-text{
            // float: left;
            flex:1 1 auto;
            line-height: 48px;
            span{
                margin-right: 15px;
            }
        }
        .d-button{
            // float: right;
            flex:0 1 auto;
        }
    }
    .teach{
        margin-top: 15px;
    }
</style>
