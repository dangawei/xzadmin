<template>
    <div class="">
        <Cascader :data="datas" v-model="valueData" @on-change="change" clearable></Cascader>
    </div>
</template>
<script>
    export default {
        props: ['importData'],
        data () {
            return {
                datas:[],
                valueData:[],
            }
        },
        computed:{

        },
        watch:{

        },
        created(){
            var _this=this;
            if (this.$store.state.enternew.chapterData.length==0) {
                if(this.$route.query.teachstate==0){
                    this.$store.dispatch('chapterArrayNew',this.$route.query.tid).then(function(data){
                        _this.datas=data;
                    })
                }else{
                    this.$store.dispatch('chapterArrayNews',this.$route.query.teachId).then(function(data){
                        _this.datas=data;
                    })
                }
            }else{
                _this.datas=this.$store.state.enternew.chapterData;
            }
        },
        methods: {
            change(value,selectedData){
                if (selectedData.length==0) {
                    var obj={
                        label:'',
                        value:0
                    }
                    this.$emit("exportData",{data:obj})
                }else{
                    this.$emit("exportData",{data:selectedData[selectedData.length-1]})
                }
            },
        }
    }
</script>
