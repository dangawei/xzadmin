<template lang="html">
    <div class="">
        <div class="">
            <!-- <Menu mode="horizontal" :theme="theme" active-name="2" @on-select="change">
                <MenuItem name="1" :to="{ path: '/enter/teach/link', query:enterData }">
                    链接导入
                </MenuItem>
                <MenuItem name="2" :to="{ path: '/enter/teach/hand', query:enterData }">
                    手动录入
                </MenuItem>
                <MenuItem name="3" :to="{ path: '/enter/teach/word', query:enterData }">
                    word导入
                </MenuItem>
            </Menu> -->
            <Tabs v-model="selActives" @on-click="change">
                <TabPane label="链接导入" name="n1"></TabPane>
                <TabPane label="手动录入" name="n2"></TabPane>
                <TabPane label="word导入" name="n3"></TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                theme: 'light',
                enterData:{},
                selActives:'n1',
                show:false,
            }
        },
        created () {
            this.enterData=this.$route.query;
            this.selActives=this.$store.state.enternew.selActive;
        },
        mounted(){
        },
        methods:{
            change(val){
                if (val=='n1') {
                    this.$router.push({ path: '/enter/teach/link', query:this.enterData })
                }else if(val=='n2'){
                    this.$router.push({ path: '/enter/teach/hand', query:this.enterData })
                }else{
                    this.$router.push({ path: '/enter/teach/word', query:this.enterData })
                }
                this.$store.commit("selActiveEnter",val)
            }
        }
    }
</script>

<style lang="css">
    .ivu-tabs-bar{
        margin-bottom: 0px !important;
    }
</style>
