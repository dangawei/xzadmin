<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加班级</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="96">
                    <FormItem label="名称:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入班级名称" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem label="学校:" prop="schoolId">
                        <school-component @exportData="exportDataSchool"></school-component>
                    </FormItem>
                    <FormItem label="年级:" prop="gradeId">
                        <grade-component @exportData="exportDataGrade"></grade-component>
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
    import schoolComponent from "@/components/pubComponents/schoolComponent"
    import gradeComponent from "@/components/pubComponents/gradeComponent"
    export default {
        props:['importData'],
        components:{
            schoolComponent,
            gradeComponent
        },
        data () {
            return {
                ashow:false,
                formValidate: {
                    name:'',
                    gradeId:{
                        type:Number,
                        default:0
                    },
                    schoolId:{
                        type:Number,
                        default:0
                    },
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入班级名称', trigger: 'blur' },
                        // { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/,message:'请输入11位手机号', trigger: "blur" }
                    ],
                    schoolId: [
                        { required: true, message: '请选择学校' }
                    ],
                    gradeId: [
                        { required: true, message: '请选择年级'},
                        // { type: 'string', min: 6, max:16, message: '密码长度6-16位', trigger: 'blur' }
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
                    gradeId: this.formValidate.gradeId,
                    schoolId: this.formValidate.schoolId,
                }
                this.$api.post("/admin/api/clazz/add", data, reset => {
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
