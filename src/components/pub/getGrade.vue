<template>
  <div class="">
    <Select v-model="valueId" clearable :label-in-value="true" @on-change="change">
        <Option v-for="item in alldata" :value="item.id" :key="item.id">{{item.grade}}</Option>
    </Select>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name: '',
    props: ['importData'],
    data () {
        return {
            alldata:[]
        }
    },
    computed:{
        valueId:{
            get () {
                if(this.importData){
                    // this.$store.commit('gradeIdEnter',this.importData)
                    this.$store.dispatch('gradeIdEnter',this.importData)
                    return this.importData
                }else{
                    return this.$store.state.entertest.grade
                }
                // return this.$store.getters.grade
            },
            set (val) {
                // this.$emit('exportData',val)
                // this.$store.dispatch('gradeEnter',val)
            }
        }
    },
    mounted() {
        if(this.$webapi.get("enterGrade")){
            this.alldata=JSON.parse(this.$webapi.get("enterGrade"))
        }else{
            this.list();
        }

    },
    methods: {
        list(){
            var _this=this;
            this.$api.get('/admin/api/grade/list',null,reset => {
                if (reset.code === 200){
                    _this.alldata = reset.data
                    _this.$webapi.save("enterGrade",JSON.stringify(_this.alldata));
                }else{
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        change(e) {
            if(e){
                this.$store.dispatch('gradeEnter',e)
                this.$emit('exportData',e.value)
            }else{
                this.$store.dispatch('gradeEnter','')
                this.$emit('exportData','')
            }

        }
    }
}
</script>

<style scoped lang="less">
</style>
