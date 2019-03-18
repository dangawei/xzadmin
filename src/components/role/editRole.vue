<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>修改角色</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="角色名称:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入角色名称" ref="focusBool"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
                       <Button type="error" @click="handleReset('formValidate')" size="large">取消</Button>
                   </FormItem>
                </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    export default {
        props:['importData','importShow'],
        data () {
            return {
                focusBool:'',
                ashow:false,
                formValidate: {
                    name:'',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 14, min:2,message: '请填写2-14个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        created() {
            this.ashow=this.importShow;
            this.formValidate=this.importData;
        },
        methods: {
            cancel () {
                this.ashow = false
                this.$emit('exportShow',{show:false})
            },
            handleSubmit (name) {
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //         this.post(name)
                //     } else {
                //         this.$Message.error('内容填写有误!')
                //         // this.focusBool=true;
                //         this.$refs.focusBool.focus();
                //     }
                // })
                this.post()
            },
            handleReset (name) {
                this.$emit('exportShow',{show:false})
            },
            post () {
                let _this = this;
                var data = {
                    id: this.formValidate.id,
                    name: this.formValidate.name,
                }
                this.$api.post('/admin/api/role/modify',data, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success('添加成功');
                        _this.$emit('exportShow',{show:false})
                    }else {
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
        }
    }
</script>
