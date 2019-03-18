<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加学校</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="96">
                    <FormItem label="名称:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入班级名称" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem label="渠道:" prop="channel">
                        <Input v-model="formValidate.channel" placeholder="请输入渠道" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >添加</Button>
                        <Button type="error" @click="handleReset('formValidate')" >取消</Button>
                    </FormItem>
                </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>

    export default {
        props:['importData'],
        components:{

        },
        data () {
            return {
                ashow:false,
                formValidate: {
                    name:'',
                    channel:'',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入班级名称', trigger: 'blur' },
                        // { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/,message:'请输入11位手机号', trigger: "blur" }
                    ],
                    channel: [
                        { required: true, message: '请输入班级渠道', trigger: 'blur' },
                    ],
                }
            }
        },
        created(){

        },
        mounted() {
            this.ashow = this.importData
        },
        methods: {
            cancel () {
               this.$emit('exportData',{show:false})
            },
            remove (item) {
              var _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      _this.ashow = false
                      _this.$emit('exportData',{show:false})
                    },
                    onCancel: () => {
                       _this.ashow = true
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    }
                })
            },
            handleReset (name) {
                this.remove()
            },
            post (name) {
                let _this = this;
                var data = {
                    name: this.formValidate.name,
                    channel: this.formValidate.channel
                }
                this.$api.post("/amin/api/school/add", data, reset => {
                    if (reset.code == 200) {
                        _this.$Message.success('添加成功');
                        _this.$emit('exportData',{show:false})
                    }else {
                       _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportDataSchool(e){
                this.formValidate.schoolId=e
            },
            exportDataGrade(e){
                this.formValidate.gradeId=e
            }
        }
    }
</script>
