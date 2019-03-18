<template>
  <div class="">
    <Select v-model="valueId" :disabled="bool" clearable placeholder="请先选学科,再选择教材版本"  @on-change="change">
        <Option v-for="item in alldata" :value="item.id" :key="item.id" @click.native="getMoreParams(item)">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
import {mapGetters, mapActions,mapState} from 'vuex';
export default {
    name: '',
    props: ['importData'],
    data () {
        return {
            // valueId:Number,
            // alldata:[],
            bool:true
        }
    },
    computed:{
        // ...mapGetters({alldata:'textVersionDatas'}),
        alldata:{
            get () {
                if(this.importData){
                    if(this.$webapi.get("enterTextVersion")){
                        return JSON.parse(this.$webapi.get("enterTextVersion"))
                    }else{
                        return this.$store.state.entertest.textVersionDatas
                    }
                }else{
                    return this.$store.state.entertest.textVersionDatas
                }
            },
            set (val) {
            }
        },
        valueId:{
            get () {
                if(this.importData){
                    if(this.$store.state.entertest.course){
                        this.bool=false;
                        var datas=JSON.parse(this.$webapi.get("enterTextVersion"))
                        var obj={
                            id:'id'
                        }
                        var num=this.$common.arrayIndex(datas,this.importData,obj)
                        this.$webapi.save("enterTextbook",JSON.stringify(datas[num].list))
                        this.$store.commit('textbookVersionIdEnter',this.importData)
                        this.$store.commit('textbookDataEnter',datas[num].list)
                        return this.importData
                    }else{
                        this.bool=true;
                    }
                }else{
                    if(this.$store.state.entertest.course){
                        this.bool=false;
                        return this.$store.state.entertest.textbookVersion
                    }
                }
            },
            set (val) {

            }
        }
    },
    watch:{
        // alldata:function(){
        //     if(this.$store.state.course){
        //         this.bool=false;
        //     }else{
        //         this.bool=true;
        //     }
        // }
    },
    mounted() {

    },
    methods: {
        change(e){
            if(!e){
                this.$store.dispatch('textbookVersionEnter','')
                this.$emit('exportData','')
            }
        },
        getMoreParams(e){
            this.$store.dispatch('textbookVersionEnter',e)
            this.$store.dispatch('textDatasEnter',e.list)
            this.$emit('exportData',e.id)
        }
    }
}
</script>

<style scoped lang="less">
</style>
