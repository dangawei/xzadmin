<template>
  <div class="">
    <Select v-model="valueId" clearable :disabled="bool" :label-in-value="true" placeholder="请先选择年级,再选择学科" @on-change="change">
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
            // valueId:'',
            // alldata:[],
            bool:true
        }
    },
    computed:{
        // ...mapGetters({alldata:'doneDatas'}),
        alldata:{
            get () {
                if(this.importData){
                    if(this.$webapi.get("enterCourse")){
                        return JSON.parse(this.$webapi.get("enterCourse"))
                    }else{
                        return this.$store.state.entertest.datas
                    }
                }else{
                    return this.$store.state.entertest.datas
                }
            },
            set (val) {
                // this.formValidate.course=val

            }
        },
        valueId:{
            get () {
                if(this.importData){
                    if(this.$store.state.entertest.grade){
                        this.bool=false;
                        var datas=JSON.parse(this.$webapi.get("enterCourse"))
                        var obj={
                            id:'id'
                        }
                        var num=this.$common.arrayIndex(datas,this.importData,obj)
                        this.$webapi.save("enterTextVersion",JSON.stringify(datas[num].list))
                        this.$store.commit('courseIdEnter',this.importData)
                        this.$store.commit('textbookVersionDatasEnter',datas[num].list)
                        this.$store.dispatch('knowledgeDisabledEnter')
                        this.$store.dispatch('knowledgeDatasEnter',this.importData)
                        this.$store.dispatch('typeArrayEnter',this.importData)
                        return this.importData
                    }else{
                        this.bool=true;
                    }
                }else{
                    if(this.$store.state.entertest.grade){
                        this.bool=false;
                        return this.$store.state.entertest.course
                    }
                }
            },
            set (val) {
                // this.formValidate.course=val

            }
        },
    },
    watch:{

    },
    mounted() {

    },
    methods: {
        change(value,selectedData) {
            if(!value){
                this.$store.dispatch('courseEnter','')
                this.$store.dispatch('textVersionDatasEnter','')
                this.$emit('exportData','')
            }
        },
        getMoreParams(e){
            this.$store.dispatch('courseEnter',e)
            this.$store.dispatch('textVersionDatasEnter',e.list)
            this.$store.dispatch('knowledgeDisabledEnter')
            this.$store.dispatch('knowledgeDatasEnter',e.id)
            this.$store.dispatch('typeArrayEnter',e.id)
            this.$emit('exportData',e.id)
        }
    }
}
</script>

<style scoped lang="less">
</style>
