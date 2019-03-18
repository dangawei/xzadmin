<template>
  <div class="">
    <Select v-model="valueId" clearable>
        <Option v-for="item in alldata" :value="item.id" :key="item.id" @click.native="getMoreParams(item)">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
    name: '',
    props: ['importData'],
    data () {
        return {
            // alldata:[],
            show:false
        }
    },
    computed:{
        alldata:function(){
            return this.$store.state.entertest.difficulty_datas
        },
        valueId:{
            get () {
                if(this.importData){
                    this.$store.commit('difficultyIdEnter',this.importData)
                    return this.importData
                }else{
                    return this.$store.state.entertest.difficulty
                }
            },
            set (val) {
                // this.formValidate.course=val
                // this.$emit('exportData',val)
                // this.$store.dispatch('difficultyEnter',val)
            }
        }
    },
    created() {
        if (this.$store.state.entertest.difficulty_datas.length==0) {
            this.$store.dispatch("difficultyDatasEnter")
        }
    },
    mounted() {

    },
    methods: {
        getMoreParams(e){
            this.$emit('exportData',e.id)
            this.$store.dispatch('difficultyEnter',e)
        }
    }
}
</script>

<style scoped lang="less">
</style>
