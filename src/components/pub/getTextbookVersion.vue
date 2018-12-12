<template>
  <div class="">
    <Select v-model="valueId" :disabled="bool" clearable placeholder="请先选学科,再选择教材版本">
        <Option v-for="item in alldata" :value="item.id" :key="item.id" @click.native="getMoreParams(item)">{{item.name}}</Option>
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
            // valueId:Number,
            // alldata:[],
            bool:true
        }
    },
    computed:{
        ...mapGetters({alldata:'textVersionDatas'}),
        valueId:{
            get () {
                if(this.$store.state.entertest.course){
                    this.bool=false;
                }else{
                    this.bool=true;
                }
                return this.$store.state.entertest.textbookVersion
            },
            set (val) {

            }
        }
    },
    watch:{
        // alldata:function(){
        //     if(this.$store.state.course){
        //         this.bool=false;
        //     }else{
        //         this.bool=true;
        //     }
        // }
    },
    mounted() {

    },
    methods: {
        getMoreParams(e){
            this.$emit('exportData',e.id)
            this.$store.dispatch('textbookVersionEnter',e)
            this.$store.dispatch('textDatasEnter',e.list)
        }
    }
}
</script>

<style scoped lang="less">
</style>
