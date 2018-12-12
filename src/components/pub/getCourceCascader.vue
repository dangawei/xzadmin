<template>
    <Cascader :data="datas" :load-data="loadData" v-model="valueData" @on-change="change":render-format="format"></Cascader>
     <!-- :load-data="loadData" -->
</template>
<script>
    export default {
        props: ['importData'],
        data () {
            return {
                datas: [
                    {
                        value: 0,
                        label: '全部',
                        children: [],
                        loading: false
                    }
                ],
                sectionId:'',
                valueData:[],
                // show:false
            }
        },
        created(){
            this.list();
            var _this=this
            setTimeout(function(){
                if (_this.importData.length!=0) {
                    _this.valueData=_this.importData;
                }
            },250)

        },
        methods: {
            list(){
                var _this=this;
                this.$api.get('/admin/api/course/list',null,reset => {
                    if (reset.code === 200){
                        // console.log(reset.data);
                        let obj={}
                        for (var i = 0; i < reset.data.length; i++) {
                            obj.label=reset.data[i].name;
                            obj.value=reset.data[i].id;
                            obj.loading=false;
                            obj.children=[];
                            _this.datas.push(obj);
                            obj={};
                        }
                    }else{
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            getChilden(e){
                var _this=this;
                let data={
                    courseId:e.value
                }
                if (this.sectionId) {
                    data.id=this.sectionId;
                }
                this.$api.get('/admin/api/source/knowledge/list',data,reset => {
                    if (reset.code === 200){
                        if (reset.data) {
                            let obj={}
                            for (var i = 0; i < reset.data.length; i++) {
                                obj.label=reset.data[i].name;
                                obj.value=reset.data[i].id;
                                obj.loading=false;
                                obj.children=[];
                                e.children.push(obj);
                                obj={};
                            }
                            e.loading=false;
                        }else{
                            // console.log(222222);
                            // delete e.children
                            // console.log(e);
                            e.loading=false;
                        }
                    }else{
                       _this.$netcode.getApiCode(reset)
                    }
                })
            },
            loadData (e, callback) {
                var _this=this;
                e.loading = true;
                new Promise(function(resolve,reject){
                    if (e.parentId) {
                        var data={
                            courseId:e.parentId,
                            id:e.value
                        }
                    }else{
                        var data={
                            courseId:e.value
                        }
                    }
                    _this.$api.get('/admin/api/source/knowledge/list',data,reset => {
                        if (reset.code === 200){
                            if (reset.data) {
                                let obj={}
                                if (!e.parentId) {
                                    for (var i = 0; i < reset.data.length; i++) {
                                        obj.label=reset.data[i].name;
                                        obj.value=reset.data[i].id;
                                        obj.parentId=e.value;
                                        obj.children=[];
                                        obj.loading=false;
                                        e.children.push(obj);
                                        obj={};
                                    }
                                }else if (e.parentId && !e.parentTowId) {
                                    for (var i = 0; i < reset.data.length; i++) {
                                        obj.label=reset.data[i].name;
                                        obj.value=reset.data[i].id;
                                        obj.parentId=e.parentId;
                                        obj.loading=false;
                                        obj.parentTowId=2;
                                        obj.children=[];
                                        e.children.push(obj);
                                        obj={};
                                    }
                                }else if (e.parentId && !e.parentThereId) {
                                    for (var i = 0; i < reset.data.length; i++) {
                                        obj.label=reset.data[i].name;
                                        obj.value=reset.data[i].id;
                                        obj.parentId=e.parentId;
                                        obj.parentTowId=2;
                                        obj.loading=false;
                                        obj.parentThereId=3;
                                        obj.children=[];
                                        e.children.push(obj);
                                        obj={};
                                    }
                                }else if(e.parentId && e.parentThereId) {
                                    for (var i = 0; i < reset.data.length; i++) {
                                        obj.label=reset.data[i].name;
                                        obj.value=reset.data[i].id;
                                        e.children.push(obj);
                                        obj={};
                                    }
                                }
                                // console.log(11111111);
                                resolve()
                            }else{
                                e.loading=false;
                                e.children=[
                                    {
                                        value: 0,
                                        label: '无章节'
                                    }
                                ];
                                resolve()
                            }
                        }else{
                           _this.$netcode.getApiCode(reset)
                            resolve()
                        }
                    })
                })
                .then(val=>{
                     e.loading=false;
                    // console.log(222222);
                    callback();
                })
            },
            change(value,selectedData){
                if (value[value.length-1]==0) {
                    this.$emit("exportData",{
                        course:selectedData[0].label,
                        chapterId:value[value.length-2],
                        courseValue:value
                    })
                }else{
                    this.$emit("exportData",{
                        course:selectedData[0].label,
                        chapterId:value[value.length-1],
                        courseValue:value
                    })
                }
                // this.$webapi.save("courseValue",JSON.stringify(value));
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
