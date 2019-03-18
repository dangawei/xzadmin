<template>
  <div class="">
    <Select v-model="valueId" :disabled="bool" clearable placeholder="请先选教材版本,再选择教材"  @on-change="change">
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
            // valueId:Number,
            // alldata:[],
            bool:true
        }
    },
    computed:{
        alldata:{
            get () {
                return this.$store.state.entertest.textDatas
            },
            set (val) {
            }
        },
        valueId:{
            get () {
                if(this.$store.state.entertest.textbookVersion){
                    this.bool=false;
                    return this.$store.state.entertest.textbook
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
    },
    methods: {
        change(e){
            if(!e){
                this.$store.dispatch('textbookEnter','')
                this.$emit('exportData','')
            }
        },
        getMoreParams(e){
            this.$store.dispatch('textbookEnter',e)
            this.$store.dispatch('chapterDatasEnters',e.id)
            this.$emit('exportData',e.id)
        },
    }
}
</script>

<style scoped lang="less">
</style>
