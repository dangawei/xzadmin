<template>
    <div>
        <Input type="text" @on-focus="focus" placeholder="请先选择学科,再选择知识点" :disabled="isDisabled" v-model="selValue"></Input>
        <Drawer
            title="选择知识点"
            v-model="value"
            width="520"
            :mask-closable="false"
            :styles="styles"
        >
            <Tree :data="alldata" show-checkbox multiple ref="treeNode"></Tree>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="remove">取消</Button>
                <Button type="primary" @click="sure">确定</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
    // import {mapGetters} from 'vuex';
    import tree from '@/script/tree.js'
    export default {
        data () {
            return {
                value: false,
                // selValue:'',
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                isDisabled:true
            }
        },
        computed:{
            // ...mapGetters({bool:"knowledgeDisabled"}),
            alldata:{
                get(){
                    if(this.$store.state.entertest.knowledgeDatas.length==0){
                        this.isDisabled=true
                    }else{
                        this.isDisabled=false
                    }
                    return this.$store.state.entertest.knowledgeDatas
                },
                set(val){

                }
            },
            selValue:{
                get(){
                    return this.$store.state.entertest.knowledge
                },
                set(val){

                }
            }
        },
        watch:{
        },
        created(){
            if (this.$route.query.cid) {
                this.getKnowledge();
            }else{
                let arr=[]
                this.isDisabled=true
                this.$store.commit('knowledgeDatasEnter',arr)
            }
        },
        methods:{
            getKnowledge(){
                const parmas={
                    id:this.$route.query.cid
                }
                const map={
                    id:'id',
                    pid:'pid',
                    title:'name',
                    children:'knowledges',
                }
                this.$api.get('/admin/api/knowledge/list',parmas,res=>{
                    if (res.code === 200){
                        if(res.data){
                            var convert=tree.treeConversion(res.data,map)
                            this.$store.commit('knowledgeDatasEnter',convert)
                            this.isDisabled=false
                        }else{
                            let arr=[]
                            this.$store.commit('knowledgeDatasEnter',arr)
                            this.isDisabled=false
                        }
                    }else{
                        this.$netcode.getApiCode(res)
                    }
                })
            },
            focus(){
                this.value=true;
            },
            sure(){
                this.value=false;
                var selectDatas=this.$refs.treeNode.getCheckedNodes()
                var selectFilterDatas=selectDatas.filter(item => item.children.length==0)
                var selValue=selectFilterDatas.map(item=>item.title).join(',')
                this.$emit('exportData',selValue)
                this.$store.dispatch('knowledgeEnter',selValue)
                // console.log(this.selValue);
            },
            remove(){
                this.value=false;
            },
        }
    }

</script>
<style>
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
