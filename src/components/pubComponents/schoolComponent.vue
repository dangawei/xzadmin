<template>
  <div class="">
    <Select v-model="valueId" clearable @on-change="change(valueId)" filterable>
        <Option v-for="item in data" :value="item.id" :key="item.id">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
    name: '',
    props: ['importData'],
    data () {
        return {
            valueId: "",
            data:[
            ]
        }
    },
    created() {
        if (this.importData) {
            this.valueId=parseInt(this.importData);
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
            this.$api.get('/admin/api/school/list',data,reset => {
                if (reset.code === 200){
                    _this.data = reset.data
                }
            })
        },
        change(e) {
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
