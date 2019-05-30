<!-- 日志详情 -->
<template>
	<div class='content'>
		<Head title="日志详情" @click-left="onClickLeft" />
		<div class="contentDay">
			<div class="contentNei">
				<span>今日日志</span>
				<p>{{msg.today_desc}}</p>
			</div>
		</div>
		<div class="contentMing">
			<div class="contentNei">
				<span>明日日志</span>
				<p>{{msg.ming_desc}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';

	import Head from '@/components/Header.vue'
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			Head
		},
		data() {
			//这里存放数据
			return {
				msg: {},
			};
		},
		//方法集合
		methods: {
			onClickLeft() {
				history.go(-1)
			},
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			this.msg = this.$route.query.msgKey
			console.log(this.$route.query.msgKey)
		}
	};
</script>
<style lang='less' scoped>
	/* @import url(); 引入公共css类 */
	.contentDay {
		width: 96%;
		margin: 10px 2% 10px 2%;
		background-color: white;
	}

	.contentDay .contentNei {
		padding: 10px;
	}

	.contentDay .contentNei span {
		font-size: 16px;
	}

	.contentDay .contentNei p {
		margin-top: 5px;
		font-size: 14px;
	}

	.contentMing {
		width: 96%;
		margin: 10px 2% 10px 2%;
		background-color: white;
	}

	.contentMing .contentNei {
		padding: 10px;
	}

	.contentMing .contentNei span {
		font-size: 16px;
	}

	.contentMing .contentNei p {
		margin-top: 5px;
		font-size: 14px;
	}

</style>
