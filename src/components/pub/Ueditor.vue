<template>
	<div>
		<script :id="id"  :defaultMsg="writeMsg" type="text/plain"></script>
		<!-- id,defaultMsg接收父组件传来的内容 -->
	</div>
</template>
<script>
	const UE = require('UE');
	// import '../../../static/ueditor/ueditor.config.js'
	// import '../../../static/ueditor/ueditor.all.js'
	// import '../../../static/ueditor/lang/zh-cn/zh-cn.js'
	// // //引入公式插件
	// import '../../../static/ueditor/kityformula-plugin/addKityFormulaDialog.js'
	// import '../../../static/ueditor/kityformula-plugin/getKfContent.js'
	// import '../../../static/ueditor/kityformula-plugin/defaultFilterFix.js'
	export default {
		name: "UEditor",
		props: {
			id: {
				type: String
			},
			config: {
				type: Object
			},
			writeMsg:{
				type: String
			}
		},
		data() {
			return {
				editor: null,
				msg:'',
				msgChange:false
			}
	    },
		created(){
		} ,
		mounted() {
			//初始化UE
			const _this = this;
			this.editor = UE.delEditor(this.id);
			this.editor = UE.getEditor(this.id,this.config);
			this.editor.addListener("ready",function(){
				setTimeout(function(){//过段时间在加载。这是在编辑的时候把获取的内容传到编辑器里
					// if(_this.writeMsg!=''){
						_this.editor.setContent(_this.writeMsg)
						_this.msg=_this.editor.getContent();
					// }else{
					// 	_this.msg=_this.editor.getContent()
					// }
				},400)
			});
			this.editor.addListener("simpleupload",function(){
				console.log(12321)
			});
			// this.editor.addListener("contentChange",function(){
			// 	console.log(1);
			// 	if (_this.writeMsg=='') {
			// 		_this.msg=_this.editor.getContent()
			// 	}

			// 	return true;
			// })
		},
		watch:{
			msg:function(val){
				var _this=this;
				this.editor.addListener("contentChange",function(){
					_this.msg=_this.editor.getContent()
					_this.msgChange=true;
					_this.contentChange();
				})
			}
		},
	    destoryed() {
			this.editor.destory();
		},
		methods:{
			getUEContent: function(){
				return this.editor.getContent();
			},
			getContentTxt: function(){
				return this.editor.getContentTxt();
			},
			contentChange:function(){
				if (this.msgChange) {
					this.$emit("contents",this.editor.getContent())
					return this.editor.getContent();
				}else{
					if (this.editor.getContent()) {
						this.$emit("contents",this.editor.getContent())
						return this.editor.getContent();
					}else{
						this.$emit("contents",this.writeMsg)
						return this.writeMsg;
					}
				}
				// console.log(1111111);
				// this.$emit('getContent',this.editor.getContent());
			}
		}
	}
</script>
