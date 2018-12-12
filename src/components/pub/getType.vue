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
        ...mapGetters({alldata:'typeArray'}),
        valueId:{
            get () {
                if(this.$store.state.entertest.course){
                    this.isDisabled=false;
                }else{
                    this.isDisabled=true;
                }
                return this.$store.state.entertest.type
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
            this.$emit('exportData',e.value)
            this.$store.dispatch('typeEnter',e)
        }
    }
}
</script>

<style scoped lang="less">
</style>
