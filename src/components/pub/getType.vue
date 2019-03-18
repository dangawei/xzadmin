<template>
  <div class="">
    <Select v-model="valueId" clearable placeholder="请先选学科,再选择题型" :disabled="isDisabled" :label-in-value="true" @on-change="change">
        <Option v-for="item in alldata" :value="item.id" :key="item.id">{{item.name}}</Option>
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
            // alldata:[],
            isDisabled:true
        }
    },
    computed:{
        // ...mapGetters({alldata:'typeArray'}),
        alldata:{
            get () {
                if(this.importData){
                    if(this.$webapi.get("enterType")){
                        return JSON.parse(this.$webapi.get("enterType"))
                    }else{
                        return this.$store.state.entertest.typeArray
                    }
                }else{
                    return this.$store.state.entertest.typeArray
                }
            },
            set (val) {
            }
        },
        valueId:{
            get () {
                if(this.importData){
                    if(this.$store.state.entertest.course){
                        this.isDisabled=false;
                        this.$store.commit('typeIdEnter',this.importData)
                        return this.importData
                    }else{
                        this.isDisabled=true;
                    }
                }else{
                    if(this.$store.state.entertest.course){
                        this.isDisabled=false;
                        return this.$store.state.entertest.type
                    }
                }
            },
            set (val) {
                // this.$emit('exportData',val)
                // this.$store.dispatch('typeEnter',val)
            }
        }
    },
    mounted() {

    },
    methods: {
        change(e) {
            if(e){
                this.$emit('exportData',e)
                this.$store.dispatch('typeEnter',e)
            }
        }
    }
}
</script>

<style scoped lang="less">
</style>
