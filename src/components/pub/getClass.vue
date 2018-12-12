<template>
  <div class="">
    <Select v-model="valueId" clearable @on-change="change(valueId)" filterable>
        <Option value="全部">全部</Option>
        <Option v-for="item in data" :value="item.id" :key="item.id">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    name: '',
    props: ['importData'],
    data () {
        return {
            valueId: "",
            data:[
            ],
            // schoolId:0
        }
    },
    created() {
        // console.log(this.importData)
        // if (this.importData!=0) {
        //     this.schoolId=parseInt(this.importData);
        //     this.list();
        // }
    },
    computed:{
        // ...mapState({
        //     schoolId:'schoolId'
        // })
        schoolId:{
            get:function(){
                return this.$store.state.common.schoolId
            }
        }
    },
    watch:{
        schoolId:function(val){
            if(val){
                this.list();
            }
        }
    },
    mounted() {
        this.list();
    },
    methods: {
        list(){
            var _this=this;
            var data={
                type:0
            }
            // if(this.$store.state.common.schoolId){
            //     data.schoolId=this.$store.state.common.schoolId
            // }
            if(this.schoolId){
                data.schoolId=this.schoolId
            }
            this.$api.get('/admin/api/clazz/list',data,reset => {
                if (reset.code === 200){
                    _this.data = reset.data
                }
            })
        },
        change(e) {
            if (e=="全部") {
                e=""
            }
            this.$emit('exportData',e)
        }
    }
}
</script>

<style scoped lang="less">
    // .ivu-select-dropdown{
    //     height:100px;
    // }
</style>
