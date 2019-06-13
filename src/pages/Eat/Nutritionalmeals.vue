<!-- 营养膳食 -->
<template>
	<div class='content'>
		<Head title="营养膳食" right="采购报表" @click-left="onClickLeft" @click-right="onClickRight" />
		<Fil :types="['park']" @change="change" :month="true" />
		<div class="item" v-for='(item,index) in msg' :key="index">
			{{index}}
			<ul>
				<li v-for='(v,i) in item' :key="i" @click="showFn(v)">
					第{{i+1}}周
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Head from '@/components/Header.vue'
	import Fil from '@/components/Filter.vue'
	export default {
		components: {
			Head,
			Fil
		},
		data() {
			//这里存放数据
			return {
				msg: [],
			};
		},
		//方法集合
		methods: {
			change(data) {
				this.init(data)
			},
			showFn(o) {
				this.$router.push({
					path: "/EatShow",
					query: {
						eat_time: o.eat_time,
                        week: o.week,
                        garden_id: o.garden_id
					}
				})
			},
			init(data) {
				let savePost = {
					garden_id: data.park.id,
					eat_time: data.month
				}
				this.axios.post('/Diet/getMonthFoodMenu', savePost)
					.then(res => {
						this.msg = res.data.data
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			inputClick() {
				this.show = true
			},
			onClickLeft() {
				history.go(-1)
			},
			onClickRight() {
				this.$router.push({
					path: '/Purcreport'
				})
			},
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {

		},
	}
</script>
<style scoped>
	.item {
		padding-left: 0.3rem;
		margin-top: 0.1rem;
		line-height: 0.9rem;
		background-color: rgb(255, 255, 255);
		font-family: PingFang-SC-Regular;
		font-size: 0.28rem;
		color: rgb(51, 51, 51);
	}
</style>
