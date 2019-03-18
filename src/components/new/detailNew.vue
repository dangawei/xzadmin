<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>新闻管理</BreadcrumbItem>
			<BreadcrumbItem to="/new/list">新闻列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>新闻详情</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">

			</div>
			<!--操作按钮-->
			<div class="tableListOperator">

			</div>
			<div class='class'>
                <div class="">
                    <h3 class="title-top text-center">{{datas.title}}</h3>
                </div>
                <div class="text-center">
                    <p class="text-inline">{{datas.author}}</p>
                    <p class="text-inline"> | </p>
                    <p class="text-inline">{{datas.date}}</p>
                </div>
                <div class="text-centent">
                    <p v-html="datas.content">{{datas.author}}</p>
                </div>
                <div style="text-align:center;margin-bottom:15px;">
                    <Button type="primary"  @click="edit()">编辑</Button>
                    <Button type="default"  @click="back()">返回</Button>
                </div>
            </div>
		</div>
    </div>
  </div>
</template>
<script>
    export default {
        components:{

        },
        data () {
            return {
                datas:{},
            }
        },
        created(){
            this.getDetail();
        },
        mounted() {
            this.show=true
        },
        methods:{
            getDetail(){
        		let _this=this;
        		this.$api.get("/admin/api/news/"+this.$route.params.id+"/detail",null,result=>{
        			if (result.code==200) {
        				_this.datas=result.data
        			}else{
                        _this.$netcode.getApiCode(result)
                    }
        		})
        	},
            back(){
                this.$router.back(-1);
            },
            edit(){
                this.$router.push("/new/edit/"+this.$route.params.id)
            },
        }
    }
</script>
<style scoped>
    .text-center{
        text-align: center;
    }
    .text-inline{
        display: inline-block;
    }
</style>
