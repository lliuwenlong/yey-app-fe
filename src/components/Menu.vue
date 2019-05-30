<template>
	<van-tabbar v-model="active" active-color="#07c160" style='height:50px;'>
		<van-tabbar-item
			:icon="v.icon"
			:to="v.to"
			v-for="(v,i) in list"
			:key="i"
		>
			{{v.name}}
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
import {mapState} from 'vuex';
export default {
	data() {
		return {
			active: 1
		}
	},
	computed: {
		...mapState('user', ['userInfo'])
	},
	created(){
		const userInfo = this.userInfo;
		this.list = [
			{icon:'home-o',to:'Index',name:'首页'},
			...(
				(userInfo.roleStatus === 2 || userInfo.roleStatus === 4 || userInfo.roleStatus === 1)
					? [
						{icon:'friends-o',to:'Resourcelist',name:'资源'},
						{icon:'points',to:'Parkservice',name:'园务'},
					]
					: []
			),
			...(
				(userInfo.roleStatus === 5)
					? [
						{icon:'friends-o',to:'Teachbooks',name:'教材书籍'},
					]
					: []
			),
			{icon:'manager-o',to:'My',name:'我的'}
		];
		for (const key in this.list) {
				// console.log(key,this.list[key].to,this.$route.name)
			if (this.list[key].to==this.$route.name) {
				this.active=key*1
			}
		}
	}
}
</script>

<style scoped>

</style>
