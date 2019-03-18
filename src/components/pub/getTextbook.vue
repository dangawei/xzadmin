<template>
  <div class="">
    <Select v-model="valueId" :disabled="bool" clearable placeholder="请先选教材版本,再选择教材"  @on-change="change">
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
        // ...mapGetters({alldata:'textDatas'}),
        alldata:{
            get () {
                if(this.importData){
                    if(this.$webapi.get("enterTextbook")){
                        return JSON.parse(this.$webapi.get("enterTextbook"))
                    }else{
                        return this.$store.state.entertest.textDatas
                    }
                }else{
                    return this.$store.state.entertest.textDatas
                }
            },
            set (val) {
            }
        },
        valueId:{
            get () {
                if(this.importData){
                    if(this.$store.state.entertest.textbookVersion){
                        this.bool=false;
                        this.$store.commit('textbookIdEnter',this.importData)
                        this.$store.dispatch('chapterDatasEnter',this.importData)
                        return this.importData
                    }else{
                        this.bool=true;
                    }
                }else{
                    if(this.$store.state.entertest.textbookVersion){
                        this.bool=false;
                        return this.$store.state.entertest.textbook
                    }
                }
            },
            set (val) {
                // console.log(val);
            }
        }
    },
    watch:{

    },
    mounted() {
        // console.log(this.$store.state.textVersionDatas);
    },
    methods: {
        change(e){
            if(!e){
                this.$emit('exportData','')
                this.$store.dispatch('textbookEnter','')
            }
        },
        getMoreParams(e){
            this.$emit('exportData',e.id)
            this.$store.dispatch('textbookEnter',e)
            this.$store.dispatch('chapterDatasEnter',e.id)
        },
    }
}
</script>

<style scoped lang="less">
</style>
