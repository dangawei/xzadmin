<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加系统信息</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="52">
                    <FormItem label="内容:" prop="content">
                        <Input type="textarea" v-model="formValidate.content" placeholder="请输入内容" :rows="8"></Input>
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
        props:['importShow'],
        components:{

        },
        data () {
            return {
                ashow:false,
                formValidate: {
                    content:''
                },
                ruleValidate: {
                    content:{ required: true, message: '内容不能为空', trigger: 'blur' },
                }
            }
        },
        created(){

        },
        mounted() {
            this.ashow = this.importShow
        },
        methods: {
            cancel () {
               this.$emit('exportData',{show:false})
            },
            remove (item) {
                this.ashow = false
                this.$emit('exportData',{show:false})
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
                    content:this.formValidate.content
                }
                this.$api.post("/admin/api/system/notice/add", data, reset => {
                    if (reset.code == 200) {
                        _this.$Message.success('添加成功');
                        _this.$emit('exportData',{show:false})
                    }else {
                       _this.$netcode.getApiCode(reset)
                    }
                })
            },
        }
    }
</script>
