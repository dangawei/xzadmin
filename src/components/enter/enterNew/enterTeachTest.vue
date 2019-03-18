<template lang="html">
    <div class="">
        <div class="page-component-view">
            <div class="page-component-card">
                <Card style="width:100%;">
                    <p slot="title">
                        <span>{{teachtext}}</span>
                    </p>
                    <!-- <Button slot="extra" @click.prevent="changeLimit">更改章节</Button> -->
                    <span slot="extra" @click="selTeachChange" class="card-text">更改章节</span>
                    <ul v-if="(randomList.length)!=0 ? true:false">
                        <li v-for="(item,index) in randomList">
                            <h4>{{item.title}} <span v-if="index < (randomList.length-1)?true:false"> - </span> </h4>
                        </li>
                        <li style="float:right;">已录入: <span>{{charCountObj.alreadyCount}}</span> <span> / </span>{{charCountObj.total}}<span></span></li>
                    </ul>
                    <ul v-else>
                        <li>
                            <h4 style="color:#098CFF;">请选择章节</h4>
                        </li>
                    </ul>
                </Card>
            </div>
            <div class="page-component-card">
                <menuItems></menuItems>
            </div>
            <div class="">
                <router-view></router-view>
            </div>
        </div>
        <div class="">
            <selCharter :importData="selCharterShow" :importState="selState" @exportData="exportCharter" v-if="selCharterShow"></selCharter>
        </div>
    </div>
</template>

<script>
import selCharter from './selCharter.vue'
import menuItems from './menuItem.vue'
export default {
    components:{
        menuItems,
        selCharter
    },
    data(){
        return{
            selCharterShow:false,
            teachtext:'',
            ctext:'',
            ttext:'',
            vtext:'',
            randomList:[],
            selState:'',
            charCountObj:{
                alreadyCount:0,
                total:0,
            },
            enterBool:false
        }
    },
    watch:{

    },
    beforeRouteEnter(to, from, next){
        if (from.name=='enterNewTest') {
            to.meta.enterBool=true;
        }
        next((vm)=>{
            to.meta.enterBool=false;
        })
    },
    created(){
        if (this.$route.meta.enterBool) {
            let arr=[]
            let obj={
                alreadyCount:0,
                total:0,
            }
            this.$store.commit("selDataEnter",arr)
            this.$store.commit('charCountEnter',obj)
            this.$store.commit("selActiveEnter",'n1')
            this.$store.commit("chapterArrayNew",arr)
        }
        this.selShow=this.$store.state.entertest.selShow
        this.teachtext =this.$route.query.teachtext
        if (this.$store.state.enternew.selData.length!=0) {
            this.randomList=this.$store.state.enternew.selData
        }
        // if (Obj.keys(this.$store.state.enternew.charCountObj).length!=0) {
            this.charCountObj=this.$store.state.enternew.charCountObj
        // }
    },
    methods:{
        selTeachChange(){
            this.selState=this.$route.query.teachstate
            this.selCharterShow=true;
        },
        exportCharter(e){
            // if (e.data.length==0) {
            //     this.randomList=this.$store.state.enternew.selData
            //     this.charCountObj=this.$store.state.enternew.charCountObj
            // }else{
                this.randomList=e.data;
                this.charCountObj=e.count;
            // }
            // console.log(e.data);
            this.selCharterShow=false;
        }
    }
}
</script>

<style lang="less" scoped>
    ul{
        list-style: none;
        li{
            display: inline-block;
            padding-right: 6px;
        }
    }
    .page-component-view{
        background-color: transparent;
    }
    .page-component-card{
        margin-bottom: 15px;
        background-color: #fff;
        // padding:15px;
    }
    .page-component-bd{
    }
    .card-text{
        color:#098CFF;
        cursor:pointer;
    }
</style>
