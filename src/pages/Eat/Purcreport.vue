<!-- 采购报表 -->
<template>
	<div class='content'>
		<Head title="采购报表" @click-left="onClickLeft" />
		<van-cell-group>
			<van-field @click='show = true' v-model='valueModel' readonly="readonly" placeholder="请选择时间" />
		</van-cell-group>
		<div>
			<table class="table">
				<tr>
					<td>食材</td>
					<td>所需重量（周）</td>
				</tr>
				<tr v-for='(item,index) in tableAnd' :key='index'>
					<td>{{item.name}}</td>
					<td>{{item.weight}}</td>
				</tr>
			</table>
			<table class="table">
				<tr>
					<td>食材</td>
					<td>所需重量（日）</td>
				</tr>
				<tr v-for='(item,index) in tableList' :key='index'>
					<td>{{item.name}}</td>
					<td>{{item.weight}}</td>
				</tr>
			</table>
		</div>
		<div class='footer'>
			<van-datetime-picker v-model="currentDate" v-show="show" type="year-month" :formatter="formatter" @cancel="onCancel" @confirm='confirm' />
		</div>
	</div>
</template>

<script>
	import Head from '@/components/Header.vue'
	export default {
		components: {
			Head
		},
		data() {
			//这里存放数据
			return {
				tableList: [],
				tableAnd: [],
				show: false,
				currentDate: new Date(),
				valueModel: '',
			};
		},
		//方法集合
		methods: {
			onClickLeft() {
				history.go(-1)
			},
			init() {
				this.axios.post('/Diet/getDetailedList')
					.then(res => {
						this.tableList = res.data.data[1]
						this.tableAnd = res.data.data[2]
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`
				}
				return value;
			},
			confirm(value) {
				this.valueModel = this.moment(value).format('YYYY-MM')
				this.show = false
				let savePost = {
					addtime: this.moment(value).format('YYYY-MM')
				}
				this.axios.post('/Diet/getDetailedList', savePost)
					.then(res => {
						if (res.data.data == null) {
							this.tableList = []
							this.tableAnd = []
							this.$dialog.alert({
								message: '暂无数据'
							}).then(() => {
								// on close
							});
						} else {
							this.tableList = res.data.data[1]
							this.tableAnd = res.data.data[2]
						}

					})
					.catch(function(error) {
						console.log(error);
					});
			},
			onCancel() {
				this.show = false
			},
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {
			this.init()
		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {

		},
	}
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.footer {
		width: 100%;
		height: 6rem;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	body {
		width: 100%;
	}

	ul li {
		list-style: none;
	}

	body {
		font-family: PingFang-SC-Medium;
		font-size: 0.32rem;
	}

	.clearfix:after {
		content: "";
		display: block;
		visibility: hidden;
		height: 0;
		clear: both;
	}

	.clearfix {
		zoom: 1;
	}

	.mui-icon-back {
		position: absolute;
		left: 0.2rem;

	}

	.fonta {
		font-family: PingFang-SC-Medium;
		font-size: 0.32rem;
		color: rgb(51, 51, 51);
		line-height: 0.9rem;
	}

	.fontb {
		font-family: PingFang-SC-Regular;
		font-size: 0.28rem;
		color: rgb(102, 102, 102);
	}

	.boxs {
		width: 9.5rem;
		height: 0.9rem;
		background-color: rgb(255, 255, 255);
		overflow: scroll;
		white-space: nowrap;
	}

	.boxs::-webkit-scrollbar {
		display: none;
	}

	.boxs span {
		margin-right: 0.3rem;
	}

	.bs {
		border-bottom: solid 0.01rem rgba(0, 0, 0, 0.1);
		line-height: 0.9rem;
		display: flex;
	}

	.bs div:nth-of-type(1) {
		padding-left: 0.3rem;
		background-color: white;
		width: 2.2rem;
		height: 0.9rem;
	}

	.box {
		height: 0.9rem;
		line-height: 0.9rem;
		background-color: rgb(255, 255, 255);
		padding-left: 0.3rem;
	}

	table {
		width: 96%;
		margin: 0.15rem auto;
		border: solid 0.01rem rgb(221, 221, 221);
		font-family: PingFang-SC-Medium;
		font-size: 0.24rem;
		color: rgb(34, 34, 34);
	}

	td {
		width: 3.45rem;
		height: 0.8rem;
		text-align: center;
		border: solid 0.01rem rgb(221, 221, 221);
	}

	tr:nth-child(odd) {
		background-color: rgb(250, 255, 238);
	}

	tr:nth-child(even) {
		background-color: rgb(255, 255, 255);
	}

	.teacherTeaching .publicTimeStyle {
		margin-top: 0;
		border-bottom: .01rem solid rgb(221, 221, 221);
		height: 0.9rem;
	}

	.publicTimeStyle {
		margin: 0 !important;
		padding-left: .3rem;
	}

	.TeachingCourseTime {
		width: 85%;
		height: .4rem;
		vertical-align: top;
		line-height: .4rem;
		overflow: hidden;
	}

	.publicTimeStyle span {
		font-family: PingFang-SC-Medium;
		font-size: 0.32rem;
		color: rgb(51, 51, 51);
		margin-left: .3 rem;
	}
</style>
