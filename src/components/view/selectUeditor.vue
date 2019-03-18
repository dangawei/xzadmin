<template lang="html">
    <!-- 单选和多选 -->
    <div class="">
        <Card>
            <vue-ueditor-wrap v-model="contentData" :config="myConfig" ref="ueQuestion"  @ready="readyQuestion"></vue-ueditor-wrap>
            <div style="text-align:center;margin-top:15px;">
                <Button type="primary"  @click="sure">确定</Button>
                <Button type="default"  @click="remove">取消</Button>
            </div>
        </Card>
    </div>
</template>

<script>
import VueUeditorWrap from '@/components/pub/vueUeditroWrap.vue';
import {mapGetters} from 'vuex';
export default {
    props:["importData","importType","importId"],
    components: {
        VueUeditorWrap
    },
    data(){
        return {
            datas:'',
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
            contentId:'',
            contentData:'',
            str:'',
        }
    },
    computed:{
        ...mapGetters({type:'ueType'}),
    },
    mounted(){
        this.contentData=this.importData
        if(this.importId){
            this.contentId=this.importId
        }
        this.str=this.importType.split("select")
        this.$store.commit("ueType",this.importType)
        // console.log(this.str)
    },
    methods:{
        sure(){
            this.$store.commit("ueType",'')
            console.log(this.contentId)
            this.$emit("exportData",{data:this.contentData,show:false,key:this.str[1],id:this.contentId})
        },
        remove(){
            this.$store.commit("ueType",'')
            this.contentData=this.importData
            this.$emit("exportData",{data:null,show:false,key:this.str[1],id:this.contentId})
        },
        readyQuestion(ue){
            this.ueQuestion=ue;
        },
    }
}
</script>

<style lang="css">
</style>
