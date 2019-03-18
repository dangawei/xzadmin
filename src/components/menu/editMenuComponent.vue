<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>编辑菜单</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="名称:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入名称" ref="focusBool"></Input>
                    </FormItem>
                    <FormItem label="页面路径:" prop="uri">
                        <Input v-model="formValidate.uri" placeholder="请输入页面路径"></Input>
                    </FormItem>
                    <FormItem label="菜单排序:" prop="sort">
                        <Input v-model="formValidate.sort" placeholder="请输入菜单序列(数字)"></Input>
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
                    uri:'',
                    levelId:'',
                    pid:'',
                    sort:0
                },
                copyData:{},
                ruleValidate: {
                    // name: [
                    //     { required: true, message: '名称不能为空', trigger: 'blur' },
                    //     { type: 'string', max: 14, min:2,message: '请填写2-14个字符', trigger: 'blur'}
                    // ],
                    sort: [
                        { pattern: /^[0-9]*$/, message: '请填写数字', trigger: 'blur'},
                    ],

                }
            }
        },
        created() {
            this.formValidate=this.importData;
            this.copyData={...this.importData};
            this.ashow=this.importShow;
        },
        methods: {
            cancel () {
                this.ashow = false
                this.$emit('exportShow',{show:false})
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    } else {
                        // this.$Message.error('内容填写有误!')
                        // this.focusBool=true;
                        this.$refs.focusBool.focus();
                    }
                })
            },
            handleReset (name) {
                this.$emit('exportShow',{show:false})
                this.$refs[name].resetFields();
            },
            post (name) {
                let _this = this;
                var data = {
                    id: this.formValidate.id,
                }
                if(this.formValidate.name!=this.copyData.name){
                    data.name=this.formValidate.name
                }
                if(this.formValidate.uri!=this.copyData.uri){
                    data.uri=this.formValidate.uri
                }
                if(this.formValidate.sort!=this.copyData.sort){
                    data.sort=this.formValidate.sort
                }
                this.$api.post('/admin/api/menu/modify',data, reset => {
                    if (reset.code === 200) {
                        _this.$Message.success('编辑成功');
                        _this.$emit('exportShow',{refresh:true,show:false})
                        _this.$refs[name].resetFields();
                    }else {
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
            changesel(val){
                if (val=="显示") {
                    this.formValidate.isShow=1
                }else{
                    this.formValidate.isShow=-1
                }
            }
        }
    }
</script>
