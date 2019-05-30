<template>
	<div>
		<Head title="成长档案" />
		<Fil :types="['park','class']" @change="getList" :times="true" />
		<ul>
			<li v-for="(v,i) in list" :key='i' @click="showFn(v)">
				<img :src="'/public/img/'+v.student_img" alt="">
				<p>{{v.name}}</p>
			</li>
		</ul>
		<van-dialog v-model="show" title="标题" show-cancel-button>
			<div class="show" v-for="(v,i) in showData" :key="i">
				<p>{{v.desc}}</p>
				<img :src="'/public/img/'+vv" v-for="(vv,ii) in v.img" :key="ii">
			</div>
		</van-dialog>
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
			return {
				list: [],
				show:false,
				showData:{}
			}
		},
		methods: {
			showFn(v){
				this.$router.push({
					path:"/GrowthFileShow",
					query:{
						data:v
					}
				})
			},
			getList(data) {
				this.axios.post("/staff/record", {
					garden_id: data.park.id,
					class_id: data.class.id
				}).then(res => {
					this.list = res.data.data
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	ul {
		padding: 10px;

		li {
			width: 25%;
			padding: 10px;
			box-sizing: border-box;
			display: inline-block;
			text-align: center;

			img {
				width: 80%;
				border-radius: 50%;
			}
		}
	}
	.van-dialog{
		/deep/ .van-dialog__header{
			padding:10px 0;
		}
		/deep/ .van-dialog__content{
			padding:15px 10px 0;
			img{
				width: 30%;
				margin: 1.6666%
			}
		}
	}
</style>
