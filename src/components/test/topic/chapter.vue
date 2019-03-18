<template>
    <div class="">
        <Cascader :data="datas" v-model="valueData" :disabled="isDisabled" :load-data="loadData"></Cascader>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        props: ['importData'],
        data () {
            return {
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
                this.$store.dispatch('chapterSearch',value)
            },
        }
    }
</script>
