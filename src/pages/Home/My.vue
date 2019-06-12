<!-- 我的 -->
<template>
	<div class='content'>
		<Head title="我的" :back="false" />
		<van-row>
			<van-col span="8">
				<span class='contentImg'>
					<img :src="adminMsg.user_img" />
				</span>
			</van-col>
			<van-col span="16">
				<div class='contentWen'>
					<p>姓名&nbsp;:&nbsp;&nbsp;{{adminMsg.username}}</p>
					<span>手机号 :&nbsp;&nbsp;{{adminMsg.user_name}}</span>
				</div>
			</van-col>
		</van-row>
		<van-cell title="工资条" is-link to="/Articlewages" v-if="userInfo.roleStatus !== 5"/>
		<van-cell title="审批" is-link to="/Approval" v-if="userInfo.roleStatus !== 5"/>
		<van-cell title="学生档案" is-link to="/Studentfile" v-if="userInfo.roleStatus !== 5"/>
		<van-cell title="缴费" is-link to="/Pay" v-if="userInfo.roleStatus === 5"/>
		<van-cell title="退出登录" @click="logout"/>
		<Menu></Menu>
	</div>
</template>

<script>
	import Menu from '@/components/Menu.vue'
	import Head from '@/components/Header.vue'
	import {mapState} from 'vuex';
	export default {
		components: {
			Menu,
			Head
		},
		data() {
			//这里存放数据
			return {
				active: 3,
				adminMsg: ''
			};
		},
		//方法集合
		methods: {
			logout(){
				localStorage.clear();
				this.$router.push('/login')
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {
			this.adminMsg = this.$store.state.user.userInfo
		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {

		},
		computed: {
			...mapState('user', ['userInfo'])
		}
	}
</script>
<style scoped>

	.van-row {
		height: 100px;
		background-color: white;
	}

	.van-col .contentImg {
		margin: 14%;
		width: 60px;
		display: inline-block;
	}

	.van-col .contentImg img {
		width: 100%;
		border-radius: 50%;
	}

	.contentWen {
		height: 70px;
		line-height: 25px;
		/* font-weight: bold; */
		font-size: 14px;
	}

	.contentWen p {
		color: #000;
		margin-top: 22px;
		/* font-weight: bold; */
		font-size: 16px;
	}
</style>
