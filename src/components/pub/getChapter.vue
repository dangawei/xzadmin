<template>
    <div class="">
        <Cascader :data="datas" v-model="valueData" :disabled="bool" @on-change="change"></Cascader>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        props: ['importData'],
        data () {
            return {
                bool:true
            }
        },
        computed:{
            ...mapGetters({datas:'chapterDatas'}),
            valueData:{
                get () {
                    if(this.$store.state.entertest.textbook){
                        this.bool=false;
                    }else{
                        this.bool=true;
                    }
                    return this.$store.state.entertest.chapterArray
                },
                set (val) {
                    // this.$emit('exportData',val)
                    // this.$store.dispatch('chapterArrayEnter',val)
                }
            }
        },
        watch:{

        },
        created(){
            // this.getlist();
        },
        methods: {
            change(value,selectedData){
                var labels=selectedData[value.length-1].__label;
                this.$emit('exportData',value)
                this.$store.dispatch('chapterArrayEnter',value)
                this.$store.dispatch('chapterTextEnter',labels)
            },
            format (labels, selectedData) {
                var txt='';
                if (labels[labels.length-1]=="无章节") {
                    labels.splice(labels.length-1,1)
                }
                txt=labels.join('/')
                return txt;
            }
        }
    }
</script>
