<template>
  <div class="">
    <Select v-model="valueId" clearable :label-in-value="true" @on-change="change">
        <Option v-for="item in alldata" :value="item.id" :key="item.id">{{item.grade}}</Option>
    </Select>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name: '',
    props: ['importData'],
    data () {
        return {
            alldata:[]
        }
    },
    computed:{
        valueId:{
            get () {
                return this.$store.state.entertest.grade
                // return this.$store.getters.grade
            },
            set (val) {
                // console.log(val);
                // this.$emit('exportData',val)
                // this.$store.dispatch('gradeEnter',val)
            }
        }
    },
    mounted() {
        this.list();
    },
    methods: {
        list(){
            var _this=this;
            this.$api.get('/admin/api/grade/list',null,reset => {
                if (reset.code === 200){
                    _this.alldata = reset.data
                }else{
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        change(e) {
            this.$emit('exportData',e.value)
            this.$store.dispatch('gradeEnter',e)
        }
    }
}
</script>

<style scoped lang="less">
</style>
