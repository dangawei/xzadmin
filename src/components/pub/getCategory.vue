<template>
  <div class="">
    <Select v-model="valueId" clearable @on-change="change(valueId)" v-if="show">
        <Option value="全部">全部</Option>
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
            alldata:[],
            show:false
        }
    },
    created() {
        if (this.importData) {
            this.valueId=this.importData;
            // this.valueId="单选题";
        }
    },
    mounted() {
       this.list(); 
    },
    methods: {
        list(){
            var _this=this;
            var data={
                type:2
            }
            this.$api.get('/admin/api/subject/option',data,reset => {
                var obj={};
                if (reset.code === 200){
                    for (let i =0; i < reset.data.length; i++) {
                        obj.name=reset.data[i]
                        _this.alldata.push(obj);
                        obj={};
                    }
                    this.show=true;
                }else{
                    _this.$netcode.getApiCode(reset)
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