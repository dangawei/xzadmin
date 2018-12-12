<template>
  <div class="">
    <Select v-model="valueId" clearable :disabled="bool" :label-in-value="true" placeholder="请先选择年级,再选择学科">
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
            // valueId:'',
            // alldata:[],
            bool:true
        }
    },
    computed:{
        ...mapGetters({alldata:'doneDatas'}),
        valueId:{
            get () {
                if(this.$store.state.entertest.grade){
                    this.bool=false;
                }
                return this.$store.state.entertest.course
            },
            set (val) {
                // this.formValidate.course=val

            }
        },
    },
    watch:{

    },
    mounted() {
        // this.list();
        // if(this.$store.state.entertest.grade){
        //     this.list()
        // }
    },
    methods: {
        change(value,selectedData) {

        },
        getMoreParams(e){
            this.$emit('exportData',e.id)
            this.$store.dispatch('courseEnter',e)
            this.$store.dispatch('textVersionDatasEnter',e.list)
            this.$store.dispatch('knowledgeDisabledEnter')
            this.$store.dispatch('knowledgeDatasEnter',e.id)
            this.$store.dispatch('typeArrayEnter',e.id)
        }
    }
}
</script>

<style scoped lang="less">
</style>
