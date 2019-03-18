<template>
  <div class="">
    <Select v-model="valueId" clearable placeholder="请选择录入者" :label-in-value="true" @on-change="change">
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
            alldata:[],
            valueId:'',
        }
    },
    computed:{

    },
    mounted() {
        if (this.$store.state.topic.search_user) {
            this.valueId=this.$store.state.topic.search_user
        }
        this.list();
    },
    methods: {
        list(){
            var data={
                page:1,
                pageSize:20,
                roleId:4
            }
            this.$api.get("/admin/api/user/list",data,reset=>{
                if (reset.code === 200) {
                    this.alldata=reset.data.records;

                }
            })
        },
        change(e) {
            if(e){
                this.$emit('exportData',e.value)
                this.$store.dispatch('userSearch',e.value)
            }else{
                this.$emit('exportData','')
                this.$store.dispatch('userSearch','')
            }
        }
    }
}
</script>

<style scoped lang="less">
</style>
