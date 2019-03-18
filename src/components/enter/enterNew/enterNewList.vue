<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>题库管理</BreadcrumbItem>
                    <BreadcrumbItem>题目录入</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>录入题目预览</h2>
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
                        <Form :ref="index" :model="formitem" label-position="left" v-for="(formitem,index) in formItem" :key="formitem.id" class="form-border">
                            <div class="pagelist">
                                <div class="pagelist-hd">题目信息</div>
                                <div class="pagelist-bd">
                                    <Row>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6">
                                            <FormItem label="id:" prop="id">
                                                <p>{{formitem.id}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.grade">
                                            <FormItem label="年级:" prop="grade">
                                                <p>{{formitem.grade}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.course">
                                            <FormItem label="科目:" prop="course">
                                                <p>{{formitem.course}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.edition">
                                            <FormItem label="教材版本:" prop="edition">
                                                <p>{{formitem.edition}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.textbook">
                                            <FormItem label="教材:" prop="textbook">
                                                <p>{{formitem.textbook}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.type">
                                            <FormItem label="题型:" prop="type">
                                                <p>{{formitem.type}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.difficulty">
                                            <FormItem label="难度:" prop="difficulty">
                                                <p>{{formitem.difficulty}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.bookName">
                                            <FormItem label="教辅:" prop="bookName">
                                                <p>{{formitem.bookName}}</p>
                                            </FormItem>
                                        </Col>
                                        <Col :xs="24" :sm="8" :md="6" :lg="6" v-if="formitem.source">
                                            <FormItem label="来源:" prop="source">
                                                <p>{{formitem.source}}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="18" :lg="18" v-if="formitem.chapters">
                                            <FormItem label="章节:" prop="chapters">
                                                <span class="span-interval">{{formitem.chapters}}</span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col :xs="24" :sm="24" :md="18" :lg="18" v-if="formitem.knowledgeList">
                                            <FormItem label="知识点:" prop="knowledgeList">
                                                <!-- {{formItem.knowledges}} -->
                                                <span v-for="item in formitem.knowledgeList" class="span-interval">{{item}}</span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div class="page-divider page-divider-horizontal "></div>
                            <div class="pagelist">
                                <div class="pagelist-hd">题干信息</div>
                                <div class="pagelist-bd">
                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>题目</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formitem.question" :importType="'question'" :importId="formitem.id"   @exportData="exportQuestionData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>题干</h3>
                                            </Col>
                                            <Col span="22">
                                                <!-- <Card> -->
                                                <update-ueditor :importData="formitem.content" :importType="'content'" :importId="formitem.id"  @exportData="exportContentData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                    <!-- 单选或者多选 -->
                                    <div class="mgt" v-if="formitem.scope==1||formitem.scope==2">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <div>
                                                    <h3>全部选项</h3>
                                                </div>
                                            </Col>
                                            <Col span="22">
                                                <Card>
                                                    <div v-for="(value, key, index) in selectionMsg" :key="key" class="div-indent">
                                                        <h5 v-if="!inputShow">{{key}}:</h5>
                                                        <Input v-model="key" style="width:7%;" placeholder="输入选项" @input="changeCon(index,key)" v-if="inputShow"/>
                                                        <span style="fontSize:20px;"  @click="removeIcon(key)"><Icon type="md-remove-circle" v-if="inputShow" /></span>
                                                        <p style="margin-top:10px;" v-html="value" class="p-indent"></p>
                                                    </div>
                                                    <div style="text-align:right;margin-top:15px;" v-if="!selBottonShow">
                                                        <Button type="primary"  @click="editor" size="small">编辑选项</Button>
                                                    </div>
                                                    <div style="text-align:right;margin-top:15px;" v-if="selBottonShow">
                                                        <span style="fontSize:20px;" @click="addIcon"><Icon type="md-add-circle" /></span>
                                                        <Button type="primary"  @click="editorSure" size="small">确定</Button>
                                                        <Button type="default"  @click="editorRemove" size="small">取消</Button>
                                                    </div>
                                                </Card>
                                                <p>
                                                    <span v-for="(value, key, index) in selectionMsg" :class="['sel-span',{classSel:styleSel==key}]" @click.capture.stop="selQuestion(value,key)">{{key}}</span>
                                                </p>
                                            </Col>
                                            <Col span="22" offset="2" v-if="selectValueShow">
                                                <select-ueditor :importData="selectValue" :importType="selectValueKey" :importId="formitem.id"  @exportData="exportSelectionData"></select-ueditor>
                                            </Col>
                                        </Row>
                                    </div>

                                    <!-- 完型填空&&阅读理解&&七选五 -->
                                    <div class="mgt" v-if="formitem.scope==5 ||formitem.scope==6 ||formitem.scope==7 && formitem.childSubjects!=undefined">
                                        <Row>
                                        <Col span="2">
                                            <div>
                                                <h3>全部选项</h3>
                                            </div>
                                        </Col>
                                        <Col span="22">
                                            <Card>
                                                <div v-for="(value,index) in yingyuMsg" :key="index" class="div-indent">
                                                    <Row style="margin-bottom:20px;border:1px solid #EAEAEA;">
                                                        <Col span="3">
                                                            <h5 style="display:inline-block;margin-right:10px;">
                                                                <span style="margin-right:10px;">{{value.answer}}</span>
                                                                <span>（{{index+1}}）</span>
                                                            </h5>
                                                        </Col>
                                                        <Col span="21">
                                                            <Row>
                                                                <Col span="6" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num">
                                                                    <span class="text-indent">
                                                                        <span>{{key}}.</span>
                                                                        <span>{{item}}</span>
                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>
                                            <p>
                                                <span v-for="(value,index) in yingyuMsg" :class="['sel-span',{classSel:styleSel==index+1}]" @click.capture.stop="selFss(value,index)">{{index+1}}</span>
                                            </p>
                                        </Col>
                                        <Col span="22" offset="2" v-if="fssShow">
                                            <scope-fss :importData="selectValue" :importType="selectValueKey" @exportData="exportFssData"></scope-fss>
                                        </Col>
                                        </Row>
                                    </div><!-- 型填空&&阅读理解&&七选五 -->
                                    <!-- 语文题干分离 -->
                                    <div class="mgt" v-if="formitem.scope==12 || formitem.scope==13 || formitem.scope==14&& formitem.childSubjects!=undefined">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>全部小题</h3>
                                            </Col>
                                            <Col span="22">
                                                <Card>
                                                    <div v-for="(value,index) in chineseMsg" :key="index" class="div-indent">
                                                        <Row style="margin-bottom:20px;border:1px solid #EAEAEA;" v-if="value.scope==1||value.scope==2">
                                                            <Col span="2">
                                                                <h5 style="display:inline-block;margin-right:10px;">
                                                                    <span style="margin-right:10px;"></span>
                                                                    <span>（{{index+1}}）</span>
                                                                </h5>
                                                            </Col>
                                                            <Col span="22">
                                                                <p v-html="value.content"></p>
                                                            </Col>
                                                            <Col span="21">
                                                                <Row>
                                                                    <Col span="5" offset="1" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num">
                                                                        <span class="text-indent">
                                                                            <span>{{key}}.</span>
                                                                            <span>{{item}}</span>
                                                                        </span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row style="margin-bottom:20px;border:1px solid #EAEAEA;" v-else>
                                                            <Col span="3">
                                                                <h5 style="display:inline-block;margin-right:10px;">
                                                                    <span style="margin-right:10px;"></span>
                                                                    <span>（{{index+1}}）</span>
                                                                </h5>
                                                            </Col>
                                                            <Col span="21">
                                                                <p v-html="value.content"></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Card>
                                                <p>
                                                    <span v-for="(value,index) in chineseMsg" :class="['sel-span',{classSel:styleSel==index+1}]" @click.capture.stop="selChinese(value,index)">{{index+1}}</span>
                                                </p>
                                            </Col>
                                            <Col span="22" offset="2" v-if="chineseShow">
                                                <scope-chinese :importData="selectValue" :importType="selectValueKey" @exportData="exportChineseData"></scope-chinese>
                                            </Col>
                                        </Row>
                                    </div><!-- 语文题干分离 -->

                                    <!-- <div class="mgt" v-if="formitem.scope==1||formitem.scope==2">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>正确选项</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formitem.selectionKey" :importType="'selectionKey'" :importId="formitem.id"  @exportData="exportSelectionKeyData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div> -->

                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>答案</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formitem.answer" :importType="'answer'" :importId="formitem.id"  @exportData="exportAnswerData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div class="mgt">
                                        <Row>
                                            <Col :xs="2" :sm="2" :md="2" :lg="2">
                                                <h3>解析</h3>
                                            </Col>
                                            <Col span="22">
                                                <update-ueditor :importData="formitem.analysis" :importType="'analysis'" :importId="formitem.id"  @exportData="exportAnalysisData"></update-ueditor>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            <div class="page-divider page-divider-horizontal"></div>
                            <div style="text-align:center;margin-bottom:15px;">
                                <!-- <Button type="primary"  @click="updata(formitem.id)">保存</Button> -->
                                <!-- <Button type="default"  @click="submit(formitem.id)">提交</Button> -->
                                <Button type="error"  @click="remove(formitem.id)">删除</Button>
                                <Button type="primary"  @click="continues(formitem.id)">继续录题</Button>
                            </div>
                        </Form>
                    </div>
                    <div class="mt20" style="text-align: center;">
                        <Page :current="pageCurrent" :total="total" @on-change="pageChange" :page-size="1" simple />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import updateUeditor from '@/components/view/updateUeditor.vue'
import selectUeditor from '@/components/view/selectUeditor.vue'
import scopeFss from '@/components/view/scopeFss.vue'
import scopeChinese from '@/components/view/scopeChinese.vue'
import Vue from 'vue'
export default {
    name: 'index',
    components: {
        updateUeditor,
        selectUeditor,
        scopeFss,
        scopeChinese
    },
    data () {
        return {
            // 录入试题的id
            enterArray:[],
            enterId:0,
            // 题目展示数据
            formItem: {},
            ruleValidate: {

            },
            // 分页
            pageCurrent:1,
            total:1,
            // 修改数据
            updataDatas:{
                // question:'',//题目
                // content:'',//题干
                // answer:'',//答案
                // analysis:'',//解析
            },
            selectData:{},
            selectValueKey:'',
            selectValue:'',
            selectValueShow:false,
            selectionMsg:{},
            // 单多选选项原数据复制
            selectionMsgCopy:{},
            // 单多选选项改变数据
            selectionMsgChange:{},
            styleSel:'',
            // 英语题干分离数据
            yingyuMsg:[],
            fssShow:false,
            // 语文题干分离数据
            chineseMsg:[],
            chineseShow:false,
            //编辑单选或者多选操作数据
            inputShow:false,//是否选择选项key在编辑状态
            selBottonShow:false,//选项按钮是否在编辑状态
            selBool:false,//是否修改单选或者多选题
        }
    },
    watch:{
    },
    created() {
        if(this.$webapi.get('importTestDatas')){
            this.enterArray=JSON.parse(this.$webapi.get('importTestDatas'))
            this.total=this.enterArray.length
            var num=this.$common.arrayIndex(this.enterArray,this.$route.query.id)
            this.pageCurrent=num?(num+1):1;
            this.pageShow=true;
        }
        this.enterId=this.$route.query.id?this.$route.query.id:this.enterArray[0]
        // this.pageCurrent=this.$route.query.id? Number(this.$route.query.id):1
        this.getInfo();
    },
    mounted(){

    },
    methods: {
        getInfo () {
            let _this = this
            this.$Spin.show();
            let datas={
                ids:this.enterId
            }
            this.$api.get("/admin/api/input/list", datas, reset => {
                if (reset.code === 200) {
                    this.$Spin.hide();
                    this.$store.commit("ueType",'')
                    if(reset.data){
                        _this.formItem=reset.data;
                        for (var i = 0; i < _this.formItem.length; i++) {
                            if(_this.formItem[i].scope==1 || _this.formItem[i].scope==2){
                                if (_this.formItem[i].selection) {
                                    _this.selectionMsg=JSON.parse(_this.formItem[i].selection)
                                    _this.selectionMsgCopy={..._this.selectionMsg}

                                    this.chineseShow=false
                                    this.styleSel='';
                                    this.fssShow=false;
                                    this.selBool=true;
                                }else{
                                    _this.selectionMsg={}
                                    _this.selectionMsgCopy={}
                                }
                            }
                            if(_this.formItem[i].scope==5 || _this.formItem[i].scope==6 || _this.formItem[i].scope==7 && _this.formItem[i].childSubjects!=undefined){
                                _this.yingyuMsg=_this.formItem[i].childSubjects
                            }
                            if(_this.formItem[i].scope==12 ||_this.formItem[i].scope==13||_this.formItem[i].scope==14 && _this.formItem[i].childSubjects!=undefined){
                                _this.chineseMsg=_this.formItem[i].childSubjects
                            }
                        }
                        _this.selBool=false;
                        this.chineseShow=false
                        this.styleSel='';
                        this.fssShow=false;
                    }else{
                        this.$Message.error('暂无数据!')
                        _this.formItem={}
                    }
                }else {
                    _this.formItem={}
                    _this.$netcode.getApiCode(reset)
                    this.$Spin.hide();
                }
            })
        },
        pageChange (e) {
            this.pageCurrent = e//当前页
            this.enterId = this.enterArray[e-1]//当前页
            this.getInfo();
            this.$router.push({
                path:'/enter/new/test',
                query:{
                    id:this.enterId
                }
            })
        },
        submit(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要提交试题吗?</p>',
                onOk: () => {
                    var data={
                        id:_this.$route.query.id
                    }
                    this.$api.post("/admin/api/input/up", data, reset => {
                        if (reset.code === 200) {
                            if (_this.enterArray.length>1) {
                                var nums=_this.$common.arrayIndex(_this.enterArray,this.$route.query.id)
                                _this.enterArray.splice(nums,1);
                                // console.log(JSON.stringify(_this.enterArray))
                                _this.total=this.enterArray.length
                                _this.$webapi.save('importTestDatas',JSON.stringify(_this.enterArray));
                                _this.enterId=_this.enterArray[0]
                                _this.$router.push({
                                    path:'/enter/new/test',
                                    query:{
                                        id:_this.enterArray[0]
                                    }
                                })
                                _this.getInfo();
                            }else{
                                this.enterArray=[];
                                this.$webapi.save('importTestDatas',JSON.stringify(this.enterArray));
                                this.$store.commit('removeDatas')
                                this.$router.push({
                                    path:'/enter/new/test'
                                })
                            }
                            _this.$Message.success("提交成功!")
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        remove(e){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除试题吗?</p>',
                onOk: () => {
                    var data={
                        id:_this.$route.query.id
                    }
                    this.$api.post("/admin/api/input/delete", data, reset => {
                        if (reset.code === 200) {
                            if (_this.enterArray.length>1) {
                                var nums=_this.$common.arrayIndex(_this.enterArray,this.$route.query.id)
                                _this.enterArray.splice(nums,1);
                                _this.total=this.enterArray.length
                                _this.$webapi.save('importTestDatas',JSON.stringify(_this.enterArray));
                                _this.enterId=_this.enterArray[0]
                                _this.$router.push({
                                    path:'/enter/new/test',
                                    query:{
                                        id:_this.enterArray[0]
                                    }
                                })
                                _this.getInfo();
                            }else{
                                _this.enterArray=[];
                                _this.$webapi.save('importTestDatas',JSON.stringify(_this.enterArray));
                                // this.$router.push({
                                //     path:'/enter/new/test'
                                // })
                                this.$router.back(-1);
                            }
                            _this.$Message.success("删除成功!")
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        // 修改数据请求
        post(e){
            var _this=this;
            var datas={};
            datas.id=e.id
            if(this.selBool){
                datas.selection=JSON.stringify(this.selectionMsg)
            }else{
                datas=e
            }
            this.$api.post("/admin/api/input/modify", datas, reset => {
                if (reset.code === 200) {
                    // _this.$Message.success("修改成功!");
                    _this.updataDatas={}
                    _this.selBool=false;
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        // 修改
        exportQuestionData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.question=e.data
                this.post(this.updataDatas)
            }
        },
        exportContentData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.content=e.data
                this.post(this.updataDatas)
            }
        },
        exportAnswerData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.answer=e.data
                this.post(this.updataDatas)
            }
        },
        exportAnalysisData(e){
            this.updataDatas.id=e.id
            if(e.data){
                this.updataDatas.analysis=e.data
                this.post(this.updataDatas)
            }
        },
        selQuestion(val,key){
            if (this.inputShow) {
                this.$Message.warning({
                    content:"选项正在编辑中,暂不能编辑选项值!",
                    duration: 2.5
                })
            }else{
                if(!this.$store.state.common.ueType){
                    this.styleSel=key;
                    this.selectValue=val;
                    this.selectValueKey='select'+key;
                    this.$store.commit("ueType",this.selectValueKey)
                    this.selectValueShow=true;
                }
            }
        },
        selFss(val,key){
            if(!this.$store.state.common.ueType){
                this.styleSel=key+1;
                this.selectValue=val;
                this.selectValueKey='select'+key+1;
                this.fssShow=true;
            }
        },
        selChinese(val,key){
            if(!this.$store.state.common.ueType){
                this.styleSel=key+1;
                this.selectValue=val;
                this.selectValueKey='chinese'+key+1;
                this.$nextTick(function () {
                    this.chineseShow=true; // => '更新完成'
                })
            }
        },
        exportFssData(e){
            if(e.data){
                this.$api.post("/admin/api/input/modify",e.data, reset => {
                    if (reset.code === 200) {
                        this.$Message.success("修改成功!");
                        this.$store.commit("ueType",'')
                        this.styleSel='';
                        this.fssShow=false;
                        this.getInfo();
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })
            }else{
                this.styleSel='';
                this.fssShow=false;
            }
        },
        exportChineseData(e){
            this.styleSel='';
            this.chineseShow=e.show;
            if (e.data) {
                this.getInfo();
            }
        },
        exportSelectionData(e){
            this.styleSel='';
            this.selBool=true;
            this.updataDatas.id=e.id
            if (e.data) {
                this.selectionMsg[e.key]=e.data
                this.post(this.updataDatas)
            }
            this.selectValueShow=e.show;
        },
        // 单选或者多选题,增加选项
        editor(){
            this.inputShow=true;
            this.selBottonShow=true;
        },
        editorSure(){
            if (Object.keys(this.selectionMsg).length==0) {
                this.selectionMsg={...this.selectionMsgCopy}
            }
            if (this.selectionMsg==this.selectionMsgCopy) {
                this.selBool=false;
            }else{
                this.selBool=true;
            }
            this.inputShow=false;
            this.selBottonShow=false;
        },
        editorRemove(){
            this.selectionMsg={...this.selectionMsgCopy}
            this.inputShow=false;
            this.selBottonShow=false;
        },
        addIcon(){
            Vue.set(this.selectionMsg,"选项号"+new Date().getTime(),"暂无添加选项值")
        },
        removeIcon(key){
            this.inputShow=false;
            delete this.selectionMsg[key];
            var _this=this
            setTimeout(function(){
                _this.inputShow=true;
            },50)
        },
        changeCon(num,key){
            if (key) {
                var arrValue=[]
                var obj={}
                for(let i in this.selectionMsg){
                    arrValue.push(this.selectionMsg[i])
                }
                var arrKey = Object.keys(this.selectionMsg);
                arrKey.splice(num,1,key)
                for (var i = 0; i < arrKey.length; i++) {
                    obj[arrKey[i]]=arrValue[i];
                }
                this.selectionMsg=obj
            }else{
                this.$Message.error("选项格式不正确!")
            }
        },
        continues(e){
            this.$router.back(-1);
        },//继续录题
    }
}
</script>
<style scoped lang="less">
    .ivu-form-item{
        margin-bottom: 0px;
    }
    // .text-indent{
    //     text-indent:36px;
    // }
    .span-interval{
        margin-right: 10px;
    }
    .form-border{
        border: 1px solid #dedede;
        margin-bottom:15px;
    }
    .mgt{
        margin-top: 15px;
    }
    .sel-span{
        padding:3px 5px;
        background-color: #DDDDDD;
        border:1px solid #E4E4E4;
        cursor: pointer;
    }
    .classSel{
        background-color: #0192FF;
    }
</style>
