<template>
  <div class="">
    <Select v-model="valueId" clearable @on-change="change(valueId)">
        <Option v-for="item in alldata" :value="item.name" :key="item.id">{{item.name}}</Option>
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
            alldata:[]
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
            this.$api.get('/admin/api/course/list',null,reset => {
                if (reset.code === 200){
                    _this.alldata = reset.data
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
</style>
