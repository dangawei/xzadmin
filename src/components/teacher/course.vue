<template>
  <div class="">
    <!-- <Select v-model="valueId" clearable :disabled="bool" :label-in-value="true" placeholder="请先选择年级,再选择学科"> -->
    <Select v-model="valueId" clearable :label-in-value="true" @on-change="change">
        <Option value="全部" label="全部">全部</Option>
        <Option v-for="item in alldata" :value="item.id" :key="item.name">{{item.name}}</Option>
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
            valueId:'',
            // alldata:[],
            bool:true
        }
    },
    computed:{
        alldata:function(){
            return this.$topic.state.courseArray
        },
    },
    watch:{

    },
    created(){
        if(this.$topic.state.courseArray.length==0){
            this.$topic.dispatch("courseArrayChange")
        }
    },
    mounted() {
        // this.list();
    },
    methods: {
        change(v) {
            this.$emit('exportData',v.value)
        },
    }
}
</script>

<style scoped lang="less">
</style>
