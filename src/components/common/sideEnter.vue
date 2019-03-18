<template>
   <div class="SideMenuComponent">
        <div class="mermber-logo"><i></i><router-link :to="{ path: '/enter/new/test', query: {} }">返回首页</router-link></div>
        <Scroll :height='muneheight'>
            <!-- theme="light" -->
            <Menu width="auto" :open-names="['1']" :theme="theme2" accordion :active-name='itemName' @on-select="changeMenu">
                <div class="">
                    <MenuGroup>
                        <MenuItem name="n1" :to="{ path: '/enter/teach/link', query:enterData }">
                            <Icon type="md-document" />
                            教辅录题
                        </MenuItem>
                        <MenuItem name="n2" :to="{ path: '/enter/submit/list', query:enterData }">
                            <Icon type="md-chatbubbles" />
                            待提交
                        </MenuItem>
                        <MenuItem name="n3" :to="{ path: '/enter/fack/list', query:enterData }">
                            <Icon type="md-chatbubbles" />
                            待修改
                        </MenuItem>
                    </MenuGroup>
                </div>
           </Menu>
       </Scroll>
   </div>
</template>
<script>
export default {
  name: 'SideMenu',
    data () {
        return {
            dataArr:[],
            muneheight:"",
            theme2:'dark',
            show:false,
            enterData:{},
            // itemName:'n1'
        }
    },
    //获取菜单内容，是否缓存内容存在，如果没有，就重新获取，已存在，就从缓存里面获取
    // beforeRouteEnter(to, from, next){
    //     console.log(to);
    //     next((vm)=>{
    //         // to.meta.enterBool=false;
    //     })
    // },
    computed:{
        itemName:function(){
            return this.$store.state.enternew.itemName
        }
    },
    created () {
        // console.log(this.$store.state.enternew.itemName)
        // this.itemName=this.$store.state.enternew.itemName
        this.enterData=this.$route.query;
        this.muneheight = window.innerHeight-64;
        window.onresize = function() {
            this.muneheight = window.innerHeight-64;
        }
    },
    methods: {
        changeMenu (e) {
            if(e==1){
                this.$store.commit("selActiveEnter",'n1')
            }
        },
    }
}
</script>

<style>
.SideMenuComponent .subitemest{
  color: #fff
}
.mermber-logo{
  height: 64px;
  position: relative;
  line-height: 64px;
  /* padding-left: 24px; */
  -webkit-transition: all .3s;
  transition: all .3s;
  background: #002140;
  overflow: hidden;
  color: #fff;
  text-align: left;
  font-size: 18px;
}
.mermber-logo i{
  display: inline-block;
  background:url(../../assets/lg.png);
  background-repeat: no-repeat;
  background-size: 40px;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-top:10px;
  float:left;
  margin-right: 10px;
}
.ivu-scroll-container{
    overflow-y:auto
}
.ivu-menu-dark{
   background: #001529!important
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
  background: #000c17!important;
  -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.45) inset;
  box-shadow: inset 0 2px 8px rgba(0,0,0,.45);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
  background: #001529
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover{
    background: #001529
}
.ivu-menu-submenu-title,.ivu-menu-item{
    text-align: left;
}
</style>
