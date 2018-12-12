<template>
    <div class="switch-test">
        <ButtonGroup size="large" shape="circle">
            <Button class="btn-size" :class="{'ivu-btn-hover':!handBool}" @click="hover">导入题目</Button>
            <Button class="btn-size" :class="{'ivu-btn-hover':handBool}" @click="handHover">手动录入</Button>
        </ButtonGroup>
    </div>

</template>
<script>
    export default {
        name: '',
        data(){
            return {
                // handBool:true
            }
        },
        computed:{
            handBool:function(){
                return this.$store.state.entertest.handBool
            }
        },
        mounted(){

        },
        methods:{
            hover(){
                this.$store.dispatch("handBoolEnter",false);
                this.$router.push({
                    path:'/import/test'
                })
            },
            handHover(){
                this.$store.dispatch("handBoolEnter",true);
                this.$router.push({
                    path:'/enter/test'
                })
            },
        }
    }
</script>
<style scpoed>
    .switch-test{
        text-align: center;
    }
    .btn-size{
        min-width:150px;
    }
    .ivu-btn:focus{
        border-color: #2b85e4;
        border-width: 1px;
        /* color: #2b85e4; */
        /* box-shadow: 0 0 0 2px rgba(45,140,240,.2); */
        box-shadow:none;
    }
    .ivu-btn-hover{
        border-color: #2b85e4;
        border-width: 1px;
        color: #2b85e4;
        /* box-shadow: 0 0 0 2px rgba(45,140,240,.2); */
        box-shadow:none;
    }
</style>
