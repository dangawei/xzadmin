<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem>首页</BreadcrumbItem>
              <BreadcrumbItem>App管理</BreadcrumbItem>
              <BreadcrumbItem>桌面管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>桌面管理</h2>
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
                <Button type="primary"  @click="add()">添加</Button>
            </div>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
                        <Table border :columns="columnsdata" :data="data"></Table>
                    </div>
                </Col>

            </Row>
            <Row justify="center">
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                </Col>
            </Row>
        </div>
        <!-- <add-desktop :importShow="importShow" @exportData="exportData" v-if="importShow"></add-desktop> -->
        <!-- <edit-desktop :importEditShow="importEditShow" :importEditData="importEditData" @exportEditData="exportEditData" v-if="importEditShow"></edit-desktop> -->
    </div>
</div>
</template>

<script>
import Pages from '@/components/pub/page.vue'
import uploadPhoto from '@/components/pub/uploadPhoto.vue'
// import addDesktop from "./addDesktop"
import editDesktop from "./editDesktop"
export default {
    name: 'index',
    components: {
        Paging:Pages,
        uploadPhoto,
        // addDesktop,
        editDesktop
    },
    created() {
    },
    data () {
        return {
            pageshow:false,
            importShow:false,
            importEditShow:false,
            importEditData:{},
            // 分页
            pageData:{
                //分页数
                arrPageSize:[5,10,15,20],
                //分页大小
                pagesize:15,
                //总分页数
                pageCount:1,
                //当前页面
                pageCurrent:1,
                //总数
                totalCount:10
            },
            columnsdata: [
                {
                    title: '应用名称',
                    key: 'name',
                    width:106,
                    fixed:'left'
                },
                {
                    title: '包名',
                    key: 'packageName',
                    width:128,
                },
                {
                    title: '渠道',
                    key: 'channel',
                    width:108,
                },
                {
                    title: '首页',
                    key: 'index',
                    width:128,
                },
                {
                    title: '下载地址',
                    key: 'url',
                    width:178,
                    render:(h,params)=>{
                        return h("a",{
                            attrs: {
                                href: params.row.url
                            },
                        },params.row.url)
                    }
                },
                {
                    title: '描述',
                    key: 'descr',
                    width:178,
                },
                {
                    title: 'logo1',
                    key: 'appLogo1',
                    width:108,
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: params.row.appLogo1
                                },
                                style: {
                                    width: '40px',
                                    height: '40px',
                                    verticalAlign:"middle"
                                }
                            })
                        ])
                    }
                },
                {
                    title: 'logo2',
                    key: 'appLogo2',
                    width:108,
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: params.row.appLogo2
                                },
                                style: {
                                    width: '40px',
                                    height: '40px',
                                    verticalAlign:"middle"
                                }
                            })
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:178,
                    fixed: "right",
                    render: (h, params) => {
                        var _this=this;
                        var str="下架";
                        if(params.row.state==0){
                            str="下架"
                        }else if (params.row.state==1) {
                            str="上架"
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _this.$router.push({
                                            path:'/app/desktop/edit/'+params.row.id
                                        })
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _this.remove(params.row);
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _this.switch(params.row);
                                    }
                                }
                            }, str)
                        ]);
                    }
                }
            ],
            data:[]
        }
    },
    mounted(){
        this.getInfo();
    },
    methods: {
        getInfo () {
            let _this = this
            let datas={
                state:0
            }
            this.$api.get("/admin/api/desktop/list", null, reset => {
                if (reset.code === 200) {
                    // _this.$Message.success("!");
                    _this.data=reset.data
                    // _this.baseInfoShow=true
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        back(){
            this.$router.back(-1);
        },
        add(){
            this.$router.push({
                path:"/app/desktop/add"
            })
        },
        remove (params) {
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+params.name+'】版本吗?</p>',
                onOk: () => {
                    _this.itemdel(params)
                },
                onCancel: () => {

                }
            });

        },
        switch(params){
            let _this = this
            var str="下架";
            var num=1
            if(params.state==0){
                str="下架"
                num=1
            }else if (params.state==1) {
                str="上架"
                num=0
            }
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要'+str+'【'+params.name+'】版本吗?</p>',
                onOk: () => {
                    var data={
                        id:params.id,
                        state:num
                    }
                    this.$api.post("/admin/api/desktop/update", data, reset => {
                        if (reset.code === 200) {
                            _this.$Message.success("成功!")
                            _this.getInfo();
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        itemdel (params) {
            let _this = this
            var data={
                id:params.id
            }
            this.$api.post("/admin/api/desktop/delete", data, reset => {
                if (reset.code === 200) {
                    _this.$Message.success("删除成功!")
                    _this.getInfo();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
