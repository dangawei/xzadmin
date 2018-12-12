<template>
    <!-- 诗歌阅读 -->
    <!-- <div class="" v-if="formitem.scope==14 && formitem.childSubjects!=undefined"> -->
    <div class="">
        <div>
            <h3>全部小题</h3>
        </div>
        <div v-for="(value, index) in datas" :key="index">
            <div class="" v-if="value.scope==2">
                <Row style="margin-bottom:15px;">
                    <Col :xs="24" :sm="24" :md="1" :lg="1">
                        <span>({{index+1}})</span>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <span>题目:</span>
                        <Input :value="value.content || ''" style="width:78%;" @input="changeValue(value,value.content)"></Input>
                    </Col>
                </Row>
                <Row style="margin-bottom:15px;" v-if="value.selection">
                    <Col :xs="24" :sm="24" :md="24" :lg="24" v-for="(item,key,num) in JSON.parse(value.selection)" :key="num" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span>{{key}}.</span>
                            <Input :value="item" style="width:80%;" @input="changeItem(value,key,value.selection)"></Input>
                        </p>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span>正确选项:</span>
                            <Input :value="value.selectionKey || ''" type="textarea" :autosize="{minRows: 2,maxRows: 8}" style="width:77%;" @input="changeSelectionKey(value,value.selectionKey)"></Input>
                        </p>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span>答案:</span>
                            <Input :value="value.answer || ''" type="textarea" :autosize="{minRows: 2,maxRows: 8}" style="width:80%;" @input="changeAnswer(value,value.answer)"></Input>
                        </p>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span>解析:</span>
                            <Input :value="value.analysis || ''" type="textarea" style="width:80%;" :autosize="{minRows: 2,maxRows: 8}" @input="changeAnalysis(value,value.analysis)"></Input>
                        </p>
                    </Col>
                    <Col :xs="1" :sm="1" :md="1" :lg="1">
                        <Button type="primary" size="small" @click="sure(value.id)">确认修改</Button>
                    </Col>
                </Row>
            </div>
            <div class="" v-else>
                <Row>
                    <Col :xs="24" :sm="24" :md="1" :lg="1">
                        <span>({{index+1}})</span>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span>题目:</span>
                            <Input :value="value.content || ''" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width:80%;" @input="changeValue(value,value.content)"></Input>
                        </p>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span>答案:</span>
                            <Input :value="value.answer || ''" type="textarea" :autosize="{minRows: 2,maxRows: 8}" style="width:80%;" @input="changeAnswer(value,value.answer)"></Input>
                        </p>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="margin-bottom:15px;">
                        <p class="text-indent">
                            <span>解析:</span>
                            <Input :value="value.analysis || ''" type="textarea" style="width:80%;" :autosize="{minRows: 2,maxRows: 8}" @input="changeAnalysis(value,value.analysis)"></Input>
                        </p>
                    </Col>
                    <Col :xs="2" :sm="2" :md="2" :lg="2">
                        <Button type="primary" size="small" @click="sure(value.id)">确认修改</Button>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["importData"],
    data(){
        return{
            datas:[],
            exportData:{
                id:0,//选中修改小题的id
                uid:0,//选中修改小题的uid
                jsonContent:'',//修改的小题题干
                stringAnalysis:'',//修改的小题解析
                stringAnswer:'',//修改的小题答案
                stringSelectionKey:'',//修改的小题正确选项
                jsonValue:{},//修改的小题选项
            },//传递给父组件的数据
        }
    },
    mounted(){
        this.datas=this.importData;
    },
    methods:{
        // 修改小题题干
        changeValue(val,content){
            if(this.exportData.id==0){
                this.exportData.id=val.id;
                if(val.uid){
                    this.exportData.uid=val.uid;
                }
                this.exportData.jsonContent=event.target.value;
                this.$emit("exportData",this.exportData)
            }else if (this.exportData.id==val.id) {
                this.exportData.jsonContent=event.target.value;
                this.$emit("exportData",this.exportData)
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        // 修改小题解析
        changeAnalysis(val,value){
            if(this.exportData.id==0){
                this.exportData.id=val.id;
                if(val.uid){
                    this.exportData.uid=val.uid;
                }
                this.exportData.stringAnalysis=event.target.value;
                this.$emit("exportData",this.exportData)
            }else if (this.exportData.id==val.id) {
                this.exportData.stringAnalysis=event.target.value;
                this.$emit("exportData",this.exportData)
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        // 修改小题正确选项
        changeSelectionKey(val,value){
            if(this.exportData.id==0){
                this.exportData.id=val.id;
                if(val.uid){
                    this.exportData.uid=val.uid;
                }
                this.exportData.stringSelectionKey=event.target.value;
                this.$emit("exportData",this.exportData)
            }else if (this.exportData.id==val.id) {
                this.exportData.stringSelectionKey=event.target.value;
                this.$emit("exportData",this.exportData)
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        // 修改小题答案
        changeAnswer(val,value){
            if(this.exportData.id==0){
                this.exportData.id=val.id;
                if(val.uid){
                    this.exportData.uid=val.uid;
                }
                this.exportData.stringAnswer=event.target.value;
                this.$emit("exportData",this.exportData)
            }else if (this.exportData.id==val.id) {
                this.exportData.stringAnswer=event.target.value;
                this.$emit("exportData",this.exportData)
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        // 修改小题选项
        changeItem(val,key,value){
            if(this.exportData.id==0){
                this.exportData.jsonValue=JSON.parse(value);
                this.exportData.jsonValue[key]=event.target.value;
                this.exportData.id=val.id;
                if(val.uid){
                    this.exportData.uid=val.uid;
                }
                this.$emit("exportData",this.exportData)
            }else if(this.exportData.id==val.id){
                if (Object.keys(this.exportData.jsonValue).length==0) {
                    this.exportData.jsonValue=JSON.parse(value);
                }
                this.exportData.jsonValue[key]=event.target.value;
                this.$emit("exportData",this.exportData)
            }else {
                this.$Message.error("请先提交已修改选项,再修改其他选项!")
            }
        },
        sure(id){
            let _this = this
            if(_this.exportData.id!=0 && _this.exportData.id!=id){
                this.$Message.error("请先提交修改选项,再修改其他选项!")
            }else if(_this.exportData.id==0){
                this.$Message.error("请选择要修改的内容!")
            }else{
                this.$emit("sureData",true)
            }
        }
    }
}
</script>

<style lang="css">
</style>
