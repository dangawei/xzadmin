<template>
   <div class="SideMenuComponent">
        <div class="mermber-logo"><i></i>旭智后台管理</div>
        <Scroll :height='muneheight'>
            <!-- theme="light" -->
            <Menu width="auto" :open-names="['1']" :theme="theme2"  @on-select="changeMenu" accordion v-if="show">
                <div class="">
                    <Submenu :name="index" v-for="(item,index) in dataArr" :key="item.id">
                        <template slot="title" style="text-align: left;">
                            <Icon type="ios-navigate"></Icon>
                            <span>{{item.name}}</span>
                        </template>
                        <Submenu :name="index+'-'+itemlistindex"  v-for="(itemlist,itemlistindex) in item.childMenu" :key="itemlist.id" v-if="itemlist.childMenu">
                            <template slot="title" style="text-align: left;">
                                <span>{{itemlist.name}}</span>
                            </template>
                            <MenuItem :name="index+'-'+itemlistindex+'-'+itemindex" v-for="(itemOne,itemindex) in itemlist.childMenu" :key="itemOne.id" style="padding-left: 58px;text-align: left;">
                                {{itemOne.name}}
                            </MenuItem>
                        </Submenu>
						<MenuItem :name="index+'-'+itemlistindex" v-if="!itemlist.childMenu" v-for="(itemlist,itemlistindex) in item.childMenu" style="text-align: left;" :key="itemlist.id">
                            {{itemlist.name}}
                        </MenuItem>
                    </Submenu>
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
            show:false
        }
    },
    //获取菜单内容，是否缓存内容存在，如果没有，就重新获取，已存在，就从缓存里面获取
    beforeCreate () {

    },
    created () {
        this.list();
        this.show=true
        this.muneheight = window.innerHeight-64;
        window.onresize = function() {
            this.muneheight = window.innerHeight-64;
        }
    },
    methods: {
        changeMenu (e) {
            var arrIndex=e.split("-");
            if (arrIndex.length==2) {
                var muneindex = e.split("-")[0]
                var itemlistindex = e.split("-")[1]
                this.$router.push({path:this.dataArr[muneindex].childMenu[itemlistindex].uri})
            }else{
                var muneindex = e.split("-")[0]
                var itemlistindex = e.split("-")[1]
                var itemindex = e.split("-")[2]
                this.$router.push({path:this.dataArr[muneindex].childMenu[itemlistindex].childMenu[itemindex].uri})
            }
            //window.location.href = this.items[muneindex].adminResourcesDoList[itemindex].path
        },
        list() {
            let _this = this
            this.$api.get('/admin/api/menu/list', null, reset => {
                if (reset.code === 200) {
                    if(reset.data){
                        this.dataArr = reset.data
                    }else{
                        this.$Message.success("暂无菜单权限!")
                    }
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
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
  background:url(../../assets/logo.png);
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
