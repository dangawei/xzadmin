<template>
  <div class="">
    <Select v-model="valueId" :disabled="bool" clearable placeholder="请先选教材版本,再选择教材">
        <Option v-for="item in alldata" :value="item.id" :key="item.id" @click.native="getMoreParams(item)">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
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
        ...mapGetters({alldata:'textDatas'}),
        valueId:{
            get () {
                if(this.$store.state.entertest.textbookVersion){
                    this.bool=false;
                }else{
                    this.bool=true;
                }
                return this.$store.state.entertest.textbook
            },
            set (val) {

            }
        }
    },
    watch:{

    },
    mounted() {
        // console.log(this.$store.state.textVersionDatas);
    },
    methods: {
        getMoreParams(e){
            this.$emit('exportData',e.id)
            this.$store.dispatch('textbookEnter',e)
            this.$store.dispatch('chapterDatasEnter',e.id)
        }
    }
}
</script>

<style scoped lang="less">
</style>
