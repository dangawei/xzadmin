<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加帐号</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="账号:" prop="account">
                        <Input v-model="formValidate.account" placeholder="请输入账号"></Input>
                    </FormItem>
                    <FormItem label="密码:" prop="password">
                        <div class="" v-if="passwordshow">
                           <Input type="password" v-model="formValidate.password" placeholder="请输入密码" icon="md-eye-off"  @on-click="password01()"></Input>
                        </div>
                        <div class="" v-else>
                           <Input v-model="formValidate.password" placeholder="请输入密码" icon="md-eye" @on-click="password01()"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="姓名:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="角色:" prop="roleId">
                        <get-role @exportData="exportData"></get-role>
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
    import md5 from 'js-md5'
    export default {
        props:['importShow'],
        components:{
            GetRole
        },
        data () {
            return {
                departmentvalue:"",
                ashow:false,
                passwordshow:true,
                formValidate: {
                    password:'',
                    account:'',
                    name:"",
                    roleId:"",
                },
                ruleValidate: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        // { type: 'string', min: 2, max:20, message: '账号长度5-20位', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        // { type: 'string', min: 2, max:12, message: '账号长度2-12位', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '密码长度5-20位', trigger: 'blur' }
                    ],
                }
            }
        },
        created(){

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
                // var url = "?token=" + this.$webapi.get('token')
                var data = {
                    account: this.formValidate.account,
                    password: md5(this.formValidate.password),
                    roleId: this.formValidate.roleId,
                    name:this.formValidate.name
                }
              this.$api.post("/admin/api/user/add", data, reset => {
                if (reset.code === 200) {
                    _this.$Message.success('添加成功');
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
