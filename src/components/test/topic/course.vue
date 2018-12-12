<template>
  <div class="">
    <Cascader :data="alldata" v-model="valueArray"></Cascader>
  </div>
</template>
<script>
export default {
    name: '',
    props: ['importData'],
    data () {
        return {
            // valueId:[],
        }
    },
    computed:{
        alldata:function(){
            return this.$store.state.topic.search_course_array
        },
        valueArray:{
            get(){
                return this.$store.state.topic.search_course
            },
            set(value){
                this.$store.dispatch('courseSearch',value)
            }
        }
    },
    watch:{

    },
    created(){
        if(this.$store.state.topic.search_course_array.length==0){
            this.$store.dispatch("courseArraySearch")
        }
    },
    mounted() {
        // this.list();
    },
    methods: {
        change(value,valueData) {
            this.$emit('exportData',value)
            // console.log(valueData)
            this.$store.dispatch('courseDataSearch',valueData)
        }
    }
}
</script>

<style scoped lang="less">
</style>
