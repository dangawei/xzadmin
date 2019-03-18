<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>修改帐号</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <!-- <FormItem label="账号:" prop="account">
                        <Input v-model="formValidate.account" placeholder="请输入账号"></Input>
                    </FormItem> -->
                    <FormItem label="姓名:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="角色:" prop="roleId">
                        <get-role @exportData="exportData" :importData="formValidate.roleId"></get-role>
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
    import GetRole from "@/components/pub/getRole"
    export default {
        props:['importShow','importData'],
        components:{
            GetRole
        },
        data () {
            return {
                departmentvalue:"",
                ashow:false,
                passwordshow:true,
                formValidate: {
                    id:'',
                    password:'',
                    account:'',
                    name:"",
                    roleId:"",
                },
                ruleValidate: {

                },
                formValidateCopy:{}
            }
        },
        created(){
            this.formValidate=this.importData
            this.formValidateCopy={...this.importData}
        },
        mounted() {
            this.ashow = this.importShow
        },
        methods: {
            password01 () {
               this.passwordshow = !this.passwordshow
            },
            cancel () {
               this.remove()
            },
            remove (item) {
                this.ashow = false
                this.$emit('exportShow',{show:false})
            },
            handleSubmit (name) {
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //         this.post(name)
                //     }
                // })
                this.post(name)
            },
            handleReset (name) {
                this.remove()
            },
            post (name) {
              let _this = this;
                var data = {
                    id: this.formValidate.id
                }
                // if(this.formValidate.account!=this.formValidateCopy.account){
                //     data.account=this.formValidate.account
                // }
                if(this.formValidate.roleId!=this.formValidateCopy.roleId){
                    data.roleId=this.formValidate.roleId
                }
                if(this.formValidate.name!=this.formValidateCopy.name){
                    data.name=this.formValidate.name
                }
                this.$api.post("/admin/api/user/modify", data, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success('修改成功');
                        _this.$emit('exportShow',{show:false})
                    }else {
                       _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportData(e){
               this.formValidate.roleId=e;
            }
        }
    }
</script>
