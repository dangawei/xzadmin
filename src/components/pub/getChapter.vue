<template>
    <div class="">
        <Cascader :data="datas" v-model="valueData" :disabled="bool" @on-change="change" placeholder="请先选教材,再选择章节"></Cascader>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        props: ['importData'],
        data () {
            return {
                bool:true,
                // datas:[],
                // valueData:[]
            }
        },
        computed:{
            // ...mapGetters({datas:'chapterDatas'}),
            datas:{
                get () {
                    if(this.importData){
                        if(this.$webapi.get("enterChapters")){
                            return JSON.parse(this.$webapi.get("enterChapters"))
                        }else{
                            return this.$store.state.entertest.chapterDatas
                        }
                    }else{
                        return this.$store.state.entertest.chapterDatas
                    }
                },
                set (val) {
                }
            },
            valueData:{
                get () {
                    if(this.importData){
                        var dataSel=JSON.parse(this.importData)
                        this.bool=false;
                        return dataSel
                    }else{
                        if(this.$store.state.entertest.textbook){
                            this.bool=false;
                            return this.$store.state.entertest.chapterArray
                        }
                    }
                },
                set (val) {
                }
            }
        },
        created(){
            if(this.$store.state.entertest.chapterArray.length==0){
                // console.log("false")
                this.$store.dispatch('chapterTextEnter',[])
            }

        },
        methods: {
            change(value,selectedData){
                var labelsArray=[];
                var labels=selectedData[value.length-1].__label;
                for(let i=0,length=selectedData.length;i<length;i++){
                    labelsArray.push(selectedData[i].label);
                }
                this.$emit('exportData',labelsArray)
                this.$store.dispatch('chapterArrayEnter',value)
                this.$store.dispatch('chapterTextEnter',labelsArray)
            },
        }
    }
</script>
