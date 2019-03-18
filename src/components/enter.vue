<template>
    <div class="layout">
        <Layout>
            <Row>
                <Col :style="widthdata">
                    <side-component :height="sideHeight" v-if="sideshow"></side-component>
                </Col>
                <Col :style="widthdataright" >
                  <div class="web-shell">
                    <div class="web-shell-hd">
                        <header-component @headerdata="headerdata"></header-component>
                    </div>
                    <div class="web-shell-bd">
                        <Content>
                            <!-- <transition name="fade"> -->
                                <keep-alive>
                                    <!-- 会被缓存的视图组件 -->
                                    <router-view v-if="$route.meta.keepAlive"></router-view>
                                </keep-alive>
                                <!-- 不被缓存的视图组件 -->
                                <router-view v-if="!$route.meta.keepAlive"></router-view>
                            <!-- </transition> -->
                        </Content>
                    </div>
                  </div>
                </Col>
            </Row>
        </Layout>
    </div>
</template>

<script>
import HeaderComponent from "./common/headerComponent"
import SideComponent from "./common/sideEnter"
export default {
    components:{
        HeaderComponent,
        SideComponent,
    },
    data () {
        return {
            sideshow:false,
            show:true,
            sideHeight:0,
            muneheight:100,
            widthnum:240,
            widthdata:{},
            widthdataright:{}
        }
    },
    mounted(){
        this.widthdataright = {
            display:"block",
            "margin-left":this.widthnum+"px",
        }
        this.sideHeight = window.innerHeight-64
        this.widthdata = {
            width:this.widthnum+"px",
            float:"left",
            background:"#001529",
            "box-shadow":"2px 0 6px rgba(0,21,41,.35)",
            "webkit-box-shadow":"2px 0 6px rgba(0,21,41,.35)",
             position: "relative",
             "z-index":100,
              overflow:"hidden"
        }
        this.watchwidth()
        this.sideshow = true
    },
    watch:{
        widthnum:function (a,c){
            this.widthdata = {
                width:this.widthnum+"px",
                float:"left",
                background:"#001529",
                "box-shadow":"2px 0 6px rgba(0,21,41,.35)",
                "webkit-box-shadow":"2px 0 6px rgba(0,21,41,.35)",
                position: "relative",
                "z-index":100,
                overflow:"hidden"
            }
            // console.log(window.innerWidth)
            this.widthdataright = {
                display:"block",
                "margin-left":this.widthnum+"px",
                // width:(window.innerWidth)+"px"
            }
        }
    },
    methods:{
        headerdata() {
            if(this.widthnum==240){
                this.widthnum=0
            }else{
                this.widthnum=240
            }
        },
        watchwidth () {
            var _this = this
            window.onresize = function () {
                _this.sideHeight = window.innerHeight-64
                if(document.body.offsetWidth<780){
                    _this.widthnum = 0
                }else if(document.body.offsetWidth>780){
                    _this.widthnum = 240
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .ivu-menu-item-group-title{
        height: 0px !important;
        line-height: 0px !important;
        padding-left: 0px !important;
    }
</style>
