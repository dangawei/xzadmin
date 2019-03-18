<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>修改角色</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="ip地址:" prop="ip">
                        <Input v-model="formValidate.ip" placeholder="请输入ip地址"></Input>
                    </FormItem>
                    <FormItem label="备注:" prop="comments">
                        <Input type="textarea" v-model="formValidate.comments" placeholder="请输入备注" :rows="8"></Input>
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
                    ip:'',
                    comments:''
                },
                formValidateCopy:{},
                ruleValidate: {
                    ip: [
                        { required: true, message: 'ip不能为空', trigger: 'blur' },
                        { type: 'string', max: 14, min:2,message: '请填写2-14个字符', trigger: 'blur'}
                    ],
                    comments: [
                        { required: true, message: '备注不能为空', trigger: 'blur' },
                    ],
                }
            }
        },
        created() {
            this.ashow=this.importShow;
            this.formValidate=this.importData;
            this.formValidateCopy={...this.importData};
        },
        methods: {
            cancel () {
                this.ashow = false
                this.$emit('exportShow',{show:false})
            },
            handleSubmit (name) {
                this.post()
            },
            handleReset (name) {
                this.$emit('exportShow',{show:false})
            },
            post () {
                let _this = this;
                var data = {
                    id: this.formValidate.id,
                }
                if(this.formValidate.ip!=this.formValidateCopy.ip){
                    data.ip=this.formValidate.ip
                }
                if(this.formValidate.comments!=this.formValidateCopy.comments){
                    data.comments=this.formValidate.comments
                }
                this.$api.post('/admin/api/ip/modify',data, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success('修改成功');
                        _this.$emit('exportShow',{show:false})
                    }else {
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
        }
    }
</script>
