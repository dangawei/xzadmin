<template>
  <div class="">
    <Select v-model="valueId" clearable :disabled="isDisabled" placeholder="请先选择学科再选题目类型">
        <Option value="全部">全部</Option>
        <Option v-for="item in alldata" :value="item.id" :key="item.name">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
    name: '',
    props: ['importData'],
    data () {
        return {
            // valueId: "",
            isDisabled:true,
        }
    },
    computed:{
        alldata:function(){
            return this.$store.state.topic.usesearch_type_array
        },
        valueId:{
            get(){
                if (this.$store.state.topic.usesearch_course.length!=0) {
                    this.isDisabled=false;
                }
                return this.$store.state.topic.usesearch_type
            },
            set(value){
                if (value=="全部") {
                    value=""
                }
                this.$store.dispatch('usetypeSearch',value)
            }
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
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
