<template>
   <div class="SideMenuComponent">
        <div class="mermber-logo"><i></i>旭智后台管理</div>
        <Scroll :height='muneheight'>
            <Menu  theme="light" width="auto" :open-names="['1']" :theme="theme2"  @on-select="changeMenu" accordion v-if="show">
                <div class="">
                    <Submenu :name="index" v-for="(item,index) in datas" :key="item.id">
                        <template slot="title" style="text-align: left;">
                            <Icon type="ios-navigate"></Icon>
                            <span>{{item.menuName}}</span>
                        </template>
                        <MenuGroup :title="itemlist.menuItem" v-if="itemlist.menuItem" v-for="(itemlist,itemlistindex) in item.menuLists" :key="itemlist.id">
                            <MenuItem :name="index+'-'+itemlistindex+'-'+itemindex" v-for="(itemOne,itemindex) in itemlist.menuItemList" :key="itemOne.id" style="padding-left: 58px;text-align: left;">
                                {{itemOne.menuName}}
                            </MenuItem>
                        </MenuGroup>
						<MenuItem :name="index+'-'+itemlistindex" v-if="!itemlist.menuItem" v-for="(itemlist,itemlistindex) in item.menuLists" style="text-align: left;" :key="itemlist.id">
                            {{itemlist.menuName}}
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
            datas:[
                // {
                //     id:1,
                //     menuName:"角色管理",
                //     menuLists:[
                //         {
                //             id:2,
                //             menuName:"角色列表",
                //             path:"/role/list"
                //         }
                //     ]
                // },
                {
                    menuName:"题库管理",
                    menuLists:[
                        {
                            menuItem:"题目管理",
                            menuItemList:[
                                {
                                    id:11,
                                    menuName:"反馈题目列表",
                                    path:"/feedback/list"
                                },
                                {
                                    id:12,
                                    menuName:"题目录入",
                                    path:"/enter/test"
                                },
                                {
                                    id:15,
                                    menuName:"正式试题列表",
                                    path:"/use/test/list"
                                },
                                // {
                                //     id:14,
                                //     menuName:"公共库题目列表",
                                //     path:"/pubtopic/list"
                                // }
                            ]
                        },
                        {
                            menuItem:"校验管理",
                            menuItemList:[
                                {
                                    id:13,
                                    menuName:"校本库题目列表",
                                    path:"/topic/list"
                                },
                                {
                                    id:14,
                                    menuName:"公共库题目列表",
                                    path:"/pubtopic/list"
                                }
                            ]
                        }
                    ]
                },
                {
                    id:3,
                    menuName:"App版本管理",
                    menuLists:[
                        {
                            id:4,
                            menuName:"版本列表",
                            path:"/app/version/list"
                        },
                        {
                            id:6,
                            menuName:"桌面管理",
                            path:"/app/desktop/list"
                        }
                    ]
                },
                {
                    id:21,
                    menuName:"学生管理",
                    menuLists:[
                        {
                            id:22,
                            menuName:"学生列表",
                            path:"/student/list"
                        },
                    ]
                },
                {
                    id:31,
                    menuName:"教师管理",
                    menuLists:[
                        {
                            id:32,
                            menuName:"教师列表",
                            path:"/teacher/list"
                        },
                    ]
                },
                // {
                //     id:7,
                //     menuName:"资源管理",
                //     menuLists:[
                //         {
                //             id:8,
                //             menuName:"资源列表",
                //             path:"www.baidu.com"
                //         },
                //         {
                //             id:9,
                //             menuName:"资源详情",
                //             path:"www.baidu.com"
                //         },
                //     ]
                // },
            ],
            muneheight:"",
            theme2:'dark',
            show:false
        }
    },
    //获取菜单内容，是否缓存内容存在，如果没有，就重新获取，已存在，就从缓存里面获取
    beforeCreate () {

    },
    created () {
        this.show=true
        this.muneheight = window.innerHeight-64;
        window.onresize = function() {
            this.muneheight = window.innerHeight-64;
        }
    },
    methods: {
        changeMenu (e) {
            var arrIndex=e.split("-");
            // console.log(arrIndex);
            if (arrIndex.length==2) {
                var muneindex = e.split("-")[0]
                var itemlistindex = e.split("-")[1]
                this.$router.push({path:this.datas[muneindex].menuLists[itemlistindex].path})
            }else{
                var muneindex = e.split("-")[0]
                var itemlistindex = e.split("-")[1]
                var itemindex = e.split("-")[2]
                this.$router.push({path:this.datas[muneindex].menuLists[itemlistindex].menuItemList[itemindex].path})
            }
            //window.location.href = this.items[muneindex].adminResourcesDoList[itemindex].path
        }
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
