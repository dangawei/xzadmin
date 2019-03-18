<template lang="html">
    <!-- 完型&&阅读&&七选五 -->
    <div class="">
        <Card>
            <div>
                <Row>
                    <Col span="24" v-for="(item,key,num) in selectionData" :key="num" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span style="display:inline-block;width:7%;" v-if="!inputShow">{{key}}.</span>
                            <Input v-model="key" style="width:7%;" placeholder="输入选项" @input="changeCon(num,key)" v-if="inputShow"/>
                            <Input :value="item" style="width:60%;" @input="changeItem(key,selectionData)" ref="selRef"></Input>
                            <span style="fontSize:20px;" @click="add(num,key)"><Icon type="md-add-circle" /></span>
                            <span style="fontSize:20px;"  @click="removeIcon(num,key)"><Icon type="md-remove-circle" /></span>
                        </p>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span style="display:inline-block;width:7%;">答案:</span>
                            <Input v-model="contentData.answer" style="width:60%;"></Input>
                        </p>
                    </Col>

                </Row>
            </div>
            <div class="">
                <p>解析:</p>
                <vue-ueditor-wrap v-model="contentData.analysis" :config="myConfig" ref="ueQuestion"  @ready="readyQuestion"></vue-ueditor-wrap>
            </div>
            <div style="text-align:center;margin-top:15px;">
                <Button type="primary"  @click="sure">确定</Button>
                <Button type="default"  @click="remove">取消</Button>
            </div>
        </Card>
    </div>
</template>

<script>
import Vue from 'vue'
import VueUeditorWrap from '@/components/pub/vueUeditroWrap.vue';
import {mapGetters} from 'vuex';
export default {
    props:["importData","importType","importScope"],
    components: {
        VueUeditorWrap
    },
    data(){
        return {
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
            ueQuestion:'',
            contentData:{},
            contentDataCopy:{},
            // 修改选项内容数据
            updateData:{},
            selectionData:{},//选项数据
            inputShow:false,//是否选项是编辑状态
            selBool:false,//小题选项是否改变
        }
    },
    computed:{
        ...mapGetters({type:'ueType'}),
    },
    mounted(){
        if (!this.importData.hasOwnProperty('answer')) {
            this.importData.answer=''
        }
        if (!this.importData.hasOwnProperty('analysis')) {
            this.importData.analysis=''
        }
        this.contentData=this.importData
        this.contentDataCopy={...this.importData}
        this.updateData.id=this.importData.id
        if (this.contentData.selection) {
            this.selectionData=JSON.parse(this.importData.selection)
        }
        this.$store.commit("ueType",this.importType)
    },
    watch:{
        "contentData.answer":function(val){
            if (val!=this.contentDataCopy.answer) {
                this.updateData.answer=val
            }
        },
        // "contentData.selectionKey":function(val){
        //     if (val!=this.contentDataCopy.selectionKey) {
        //         this.updateData.selectionKey=val
        //     }
        // },
        "contentData.analysis":function(val){
            if (val!=this.contentDataCopy.analysis) {
                this.updateData.analysis=val
            }
        },
    },
    methods:{
        sure(){
            // var datas=this.updateData
            if(this.selBool){
                this.updateData.selection=JSON.stringify(this.selectionData)
            }
            this.$emit("exportData",{data:this.updateData})
            // this.$api.post("/admin/api/record/subject/update",this.updateData, reset => {
            //     if (reset.code === 200) {
            //         this.$Message.success("修改成功!");
            //         this.$store.commit("ueType",'')
            //         this.$emit("exportData",{data:true,show:false})
            //     }else {
            //         this.$netcode.getApiCode(reset)
            //     }
            // })
        },
        remove(){
            this.$store.commit("ueType",'')
            this.$emit("exportData",{data:false,show:false})
        },
        readyQuestion(ue){
            this.ueQuestion=ue;
        },
        //改变选项值
        changeItem(key,data){
            data[key]=event.target.value
            var selData=JSON.stringify(data)
            this.contentData.selection=selData
            this.selBool=true
            // this.updateData.selection=selData
        },
        // 增加选项
        add(num){
            Vue.set(this.selectionData,"选项号"+new Date().getTime(),"")
            this.inputShow=true;
            this.selBool=true
        },
        removeIcon(num,key){
            this.inputShow=false;
            this.selBool=true
            delete this.selectionData[key];
            var _this=this
            setTimeout(function(){
                _this.inputShow=true;
            },50)
        },
        // 改变选项
        changeCon(num,key){
            this.selBool=true
            if (key) {
                var arrValue=[]
                var obj={}
                for(let i in this.selectionData){
                    arrValue.push(this.selectionData[i])
                }
                var arrKey = Object.keys(this.selectionData);
                arrKey.splice(num,1,key)
                for (var i = 0; i < arrKey.length; i++) {
                    obj[arrKey[i]]=arrValue[i];
                }
                this.selectionData=obj
            }else{
                this.$Message.error("选项格式不正确!")
            }
        }
    }
}
</script>

<style lang="css">
</style>
