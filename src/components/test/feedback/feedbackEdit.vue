<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>题目管理</BreadcrumbItem>
                <BreadcrumbItem>反馈题目列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>反馈题目修改</h2>
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
                    <!-- <Button type="primary" size="large" @click="add()">添加</Button> -->
                </div>
                <div class="page-view allm20">
                    <div class="page-view-body">
                    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">
                        <div class="pagelist">
                            <div class="pagelist-hd">桌面信息</div>
                            <div class="pagelist-bd" v-if="baseInfoShow">
                                <Row>
                                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                                        <FormItem label="缩略图:" prop="icon">
                                            <div v-if="iconShow">
                                                <upload-photo :importData='importIconData' @exportData="exportIconData"></upload-photo>
                                            </div>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                                        <FormItem label="点击图:" prop="img">
                                            <div v-if="imgShow">
                                                <upload-photo :importData='importImgData' @exportData="exportImgData"></upload-photo>
                                            </div>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col :xs="24" :sm="24" :md="16" :lg="12">
                                        <FormItem label="首页地址:" prop="url">
                                            <Input v-model="formItem.baseInfo.url" placeholder="首页地址"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div class="page-divider page-divider-horizontal "></div>
                        <div class="pagelist">
                            <div class="pagelist-hd">安装包信息</div>
                            <div class="tableListOperator">
                                <Button type="primary"  @click="add()">添加</Button>
                            </div>
                            <div class="pagelist-bd" v-if="dealerShow">
                                <div class="">
                                    <i-table border :columns="columnsdata" :data="dealerArray"></i-table>
                                    <div class="mt20">
                                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="page-divider page-divider-horizontal"></div>
                        <div style="text-align:center;margin-bottom:15px;">
                            <Button type="primary"  @click="back()">确定修改</Button>
                        </div>
                    </Form>
                    <!-- <img src="@/assets/logo.png" alt=""> -->
                    </div>
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <!-- <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap> -->
                        <Ueditor :writeMsg="msg"  :id="ueditor1" :config="myConfig"  ref="ue" ></Ueditor>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
    import Pages from '@/components/pub/page.vue'
    import VueUeditorWrap from 'vue-ueditor-wrap'
    import Ueditor from '@/components/pub/Ueditor.vue';
    export default {
        components:{
            Paging:Pages,
            VueUeditorWrap,
            Ueditor
        },
        data () {
            return {
                msg: 'awe',
                ueditor1:'ueditor1',
                myConfig: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址
                    // serverUrl: 'http://api.demo.com/ueditor/upload',
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: '/static/UEditor/',
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 240,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 关闭自动保存
                    enableAutoSave: false
                }
            }
        },
        mounted () {
            
        },
        methods: {
            
        }
    }
</script>
