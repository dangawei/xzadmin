<template>
    <div class="">
        <Cascader :data="datas" v-model="valueData" :disabled="isDisabled" :load-data="loadData"></Cascader>
        <!-- <Cascader :data="datas" :load-data="loadData" v-model="valueData" @on-change="change" :render-format="format"></Cascader> -->
         <!-- :load-data="loadData" -->
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        props: ['importData'],
        data () {
            return {
                // datas: [
                //     {
                //         value: 0,
                //         label: '全部',
                //         children: [],
                //         loading: false
                //     }
                // ],
                isDisabled:true
            }
        },
        computed:{
            chapterBool:function(){
                return this.$store.state.topic.search_chapter_bool
            },
            datas:{
                get(){
                    return this.$store.state.topic.search_chapter_array
                }
            },
            valueData:{
                get () {
                    if (this.$store.state.topic.search_course.length!=0) {
                        this.isDisabled=false;
                    }
                    return this.$store.state.topic.search_chapter
                },
                set (val) {
                    this.$store.dispatch('chapterSearch',val)
                }
            }
        },
        watch:{
            datas:{
                handler:function(newVal,oldVal){
                    this.$store.dispatch('chapterArraySearch',newVal)
                },
                deep:true
            }
        },
        created(){
            
        },
        methods: {
            loadData (e, callback) {
                var _this=this;
                e.loading = true;
                this.$store.dispatch('chapterArrayChanges',e).then(function(data){
                    e.children=data;
                    e.loading=false;
                    callback();
                })
            },
            change(value,selectedData){
                // var labels=selectedData[value.length-1].__label;
                this.$store.dispatch('chapterSearch',value)
                console.log(value);
            },
        }
    }
</script>
