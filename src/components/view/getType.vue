<template>
  <div class="">
    <Select v-model="valueId" clearable placeholder="请先选学科,再选择题型" :label-in-value="true" @on-change="change">
        <Option v-for="item in alldata" :value="item.id" :key="item.id">{{item.name}}</Option>
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
            // alldata:[],
            isDisabled:true
        }
    },
    computed:{
        alldata:{
            get () {
                return this.$store.state.entertest.typeArray
            },
            set (val) {
            }
        },
        valueId:{
            get () {
                if(this.importData){
                    if(this.$store.state.entertest.course){
                        this.isDisabled=false;
                        this.$store.commit('typeIdEnter',this.importData)
                        return this.importData
                    }else{
                        this.isDisabled=true;
                    }
                }else{
                    if(this.$store.state.entertest.course){
                        this.isDisabled=false;
                        return this.$store.state.entertest.type
                    }
                }
            },
            set (val) {
                // this.$emit('exportData',val)
                // this.$store.dispatch('typeEnter',val)
            }
        }
    },
    mounted() {
        if (this.$route.query.cid) {
            this.getType();
        }else{
            this.$store.commit('typeArrayEnter',[])
        }
    },
    methods: {
        getType(){
            const parmas={
                id:this.$route.query.cid
            }
            this.$api.get('/admin/api/type/list',parmas,res=>{
                if (res.code === 200){
                    if(res.data){
                        this.$store.commit('typeArrayEnter',res.data)
                    }else{
                        var arr=[]
                        this.$store.commit('typeArrayEnter',arr)
                    }
                }else{
                    this.$netcode.getApiCode(res)
                }
            })
        },
        change(e) {
            if(e){
                this.$emit('exportData',e)
                this.$store.dispatch('typeEnter',e)
            }else{
                var obj={
                    label:'',
                    value:0
                }
                this.$emit('exportData',obj)
                this.$store.dispatch('typeEnter',obj)
            }

        }
    }
}
</script>

<style scoped lang="less">
</style>
