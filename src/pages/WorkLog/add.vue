<!-- 工作日志 -->
<template>
	<div class="content">
		<Head title="工作日志填写" left="返回" @click-left="onClickLeft" right="保存" @click-right="save"/>
		<van-field v-model="post" label="职务" :disabled="true" />
		<van-field v-model="name" label="姓名" :disabled="true" />
		<van-field v-model="saveData.today_desc" label="今日工作描述" type="textarea" rows="6"/>
		<van-field v-model="saveData.ming_desc" label="明日工作计划" type="textarea" rows="6"/>
	</div>
</template>

<script>
	import Head from '@/components/Header.vue'
	import Fil from '@/components/Filter.vue'
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			Head,Fil
		},
		data() {
			//这里存放数据
			return {
				msg: [],
                activeNames: ['1'],
                post:this.$store.state.user.userInfo.roleName,
                name:this.$store.state.user.userInfo.staff_name,
                saveData: {
                    staff_id: this.$store.state.user.userInfo.staff_id,
                },
			};
		},
		//方法集合
		methods: {
			onClickLeft() {
				history.go(-1)
			},
			staffName(a) {
				this.$router.push({
					path: 'Logdetails',
					query: {
						msgKey: a
					}
				})
			},
			inputClick() {
				this.show = true
			},
			init() {
				this.axios.post('/TeacherApp/word_log')
					.then(res => {
						this.msg = res.data.data
					})
			},
			save() {
                this.axios.post("/staff/journal_add", this.saveData).then(res => {
                    this.$message({
                        message: res.data.msg,
                        type: "success"
                    });
                    this.$router.back();
                });
			},
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {
			this.init()
		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {}
	};
</script>
<style lang='less' scoped>
	//@import url(); 引入公共css类
	.van-cell-group {
		width: 47%;
		margin: 10px 0 0 10px;
	}

	.footer {
		width: 100%;
		height: 6rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: -1;
	}
</style>
