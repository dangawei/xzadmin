<template>
    <div class="teach-list">
        <Drawer
            title="选择章节"
            v-model="drawerShow"
            width="380"
            :mask-closable="false"
            :styles="styles"
            @on-close="onClose"
        >
            <Tree :data="data1"
                @on-select-change="selCharter"
                @on-toggle-expand="toggleExpand"
                ref="treeNode"
            ></Tree>
        </Drawer>
    </div>
</template>
<script>
    // import common from '../../api/common.js'
    import tree from '@/script/tree.js'
    export default {
        props:["importData","importState"],
        data () {
            return {
                drawerShow: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                data1: [],
                togData:[],//展开数据
                selData:[],
                charCountObj:{},
            }
        },
        created(){
            if(this.importState!=this.$store.state.enternew.selState){
                if (this.importState==1) {
                    this.getBookChapter();
                }else{
                    this.getChapter();
                }
            }else{
                if (this.importState==1) {
                    this.getBookChapter();
                }else{
                    if (this.$route.query.tid) {
                        if(this.$store.state.entertest.chapterNewDatas.length==0){
                            this.getChapter();
                        }else{
                            this.data1=this.$store.state.entertest.chapterNewDatas
                        }
                    }else{
                        this.$Message.warning("没教材信息,暂无法获取章节!")
                        let arr=[]
                        this.$store.commit('chapterDatasEnters',arr)
                    }
                }

            }
            if (this.$store.state.enternew.togData.length==0) {
                this.togData=[]
            }else{
                this.togData=this.$store.state.enternew.togData
            }
            this.drawerShow=this.importData;
        },
        methods:{
            getChapter(){
                const parmas={
                    id:this.$route.query.tid,
                    state:1
                }
                const map={
                    id:'id',
                    pid:'pid',
                    title:'name',
                    children:'chapters',
                }
                this.$api.get('/admin/api/chapter/list',parmas,res=>{
                    if (res.code === 200){
                        if(res.data){
                            var convert=tree.treeConversion(res.data,map)
                            this.$store.commit('chapterDatasEnters',convert)
                            this.$store.commit('selStateEnter',0)
                            this.data1=convert
                        }else{
                            var arr=[]
                            this.$store.commit('chapterDatasEnters',arr)
                        }
                    }else{
                        this.$netcode.getApiCode(res)
                    }
                })
            },
            getBookChapter(){
                const parmas={
                    id:this.$route.query.teachId
                }
                this.$api.get('/admin/api/bookName/chapter/list',parmas,res=>{
                    if (res.code === 200){
                        if(res.data){
                            this.data1=res.data
                            this.$store.commit('chapterDatasEnters',res.data)
                            this.$store.commit('selStateEnter',1)
                        }else{
                            var arr=[]
                            this.$store.commit('chapterDatasEnters',arr)
                        }
                    }else{
                        this.$netcode.getApiCode(res)
                    }
                })
            },
            changeChar(){
                this.drawerShow=true;
            },
            selCharter(arr,val){
                this.selData=[];
                // this.getChapterCount().then(()=>{
                    if (val.children) {
                        if (val.children.length==0) {
                            if(this.togData.length==0){//一级结构
                                let zero={
                                    id:val.id,
                                    title:val.title,
                                }
                                this.selData.push(zero);
                                this.$store.commit("selDataEnter",this.selData)
                                this.drawerShow=false;
                                this.getChapterCount().then(()=>{
                                    this.$emit("exportData",{data:this.selData,count:this.charCountObj})
                                })
                            }else{
                                for (var i = 0; i < this.togData.length; i++) {
                                    var parentOne=this.togData[i].children//这是二级章节
                                    for(var j = 0; j < parentOne.length; j++){//遍历二级章节
                                        if (parentOne[j].children==0) {//不存在三级章节
                                            if(parentOne[j].id==val.id){//二级章节的id等于选中的id
                                                let one1={
                                                    id:this.togData[i].id,
                                                    title:this.togData[i].title,
                                                }
                                                this.selData.push(one1);
                                                this.selData.push(val);
                                                this.$store.commit("selDataEnter",this.selData)
                                                this.drawerShow=false;
                                                this.getChapterCount().then(()=>{
                                                    this.$emit("exportData",{data:this.selData,count:this.charCountObj})
                                                })
                                                break;
                                            }
                                        }else{//存在三级章节
                                            // if (parentOne[j].id==val.pid) {//选中的三级章节的父章节
                                                var parentTwo=parentOne[j].children//这是三级章节列表
                                                for(var k = 0; k < parentTwo.length; k++){//循环遍历三级章节
                                                    if(parentTwo[k].children==0){//不否存在四级章节
                                                        if(parentTwo[k].id==val.id){//三级章节的id等于选中的id
                                                            let one2={
                                                                id:this.togData[i].id,
                                                                title:this.togData[i].title,
                                                            }
                                                            let two2={
                                                                id:parentOne[j].id,
                                                                title:parentOne[j].title,
                                                            }
                                                            this.selData.push(one2);
                                                            this.selData.push(two2);
                                                            this.selData.push(val);
                                                            this.$store.commit("selDataEnter",this.selData)
                                                            this.drawerShow=false;
                                                            this.getChapterCount().then(()=>{
                                                                this.$emit("exportData",{data:this.selData,count:this.charCountObj})
                                                            })
                                                            break;
                                                        }
                                                    }else{//存在四级章节
                                                        if(parentTwo[k].id==val.pid){
                                                            var parentThree=parentTwo[k].children
                                                            for (var l = 0; l < parentThree.length; l++) {
                                                                if (parentThree[l].id==val.id) {
                                                                    let one3={
                                                                        id:this.togData[i].id,
                                                                        title:this.togData[i].title,
                                                                    }
                                                                    let two3={
                                                                        id:parentOne[j].id,
                                                                        title:parentOne[j].title,
                                                                    }
                                                                    let three3={
                                                                        id:parentTwo[k].id,
                                                                        title:parentTwo[k].title,
                                                                    }
                                                                    this.selData.push(one3);
                                                                    this.selData.push(two3);
                                                                    this.selData.push(three3);
                                                                    this.selData.push(val);
                                                                    this.$store.commit("selDataEnter",this.selData)
                                                                    this.drawerShow=false;
                                                                    this.getChapterCount().then(()=>{
                                                                        this.$emit("exportData",{data:this.selData,count:this.charCountObj})
                                                                    })
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            // }
                                        }
                                    }
                                }
                            }
                        }else{
                            this.selData.push(val);
                            this.$store.commit("selDataEnter",this.selData)
                        }
                    }else{
                        this.selData.push(val);
                        this.$store.commit("selDataEnter",this.selData)
                        this.drawerShow=false;
                        this.getChapterCount().then(()=>{
                            this.$emit("exportData",{data:this.selData,count:this.charCountObj})
                        })
                    }//val.children没有数据
                // })
            },
            getChapterCount(){
                const parmas={
                    id:this.$route.query.teachId,
                    chapterId:this.selData[this.selData.length-1].id
                }
                return new Promise((resolve, reject)=> {
                    this.$api.get('/admin/api/bookName/chapter/count',parmas,res=>{
                        if (res.code === 200){
                            if(res.data){
                                this.charCountObj=res.data
                                this.$store.commit('charCountEnter',this.charCountObj)
                                resolve();
                            }else{
                                var obj={}
                                this.$store.commit('charCountEnter',obj)
                                resolve();
                            }
                        }else{
                            this.$netcode.getApiCode(res)
                            resolve();
                        }
                    })
                });
            },
            onClose(){
                this.selData=[]
                this.charCountObj={}
                this.$store.commit("selDataEnter",this.selData)
                this.$emit("exportData",{data:this.selData,count:this.charCountObj})
            },
            toggleExpand(val){
                var bool=0;
                if (val.pid==0) {
                    if(val.expand){
                        for(let i=0;i<this.togData.length;i++ ){
                            if (this.togData[i].id==val.id) {
                                bool=2;//togData已经存在数据
                                break;
                            }
                        }
                    }else{
                        for(let i=0;i<this.togData.length;i++ ){
                            if (this.togData[i].id==val.id) {
                                bool=1;//需要删除的数据
                                this.togData.splice(i,1);
                                break;
                            }
                        }
                    }
                    if (bool==0) {
                        this.togData.push(val);
                    }
                    this.$store.commit("togDataEnter",this.togData)
                }
            }
        }
    }
</script>
<style scoped>
    /* .teach-list{
        padding:30px 30px;
    } */
    /* .teach-tree{
        padding:15px 30px;
        width: 75%;
        margin: 0 auto;
        border:1px solid #666666;
    } */
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>
