<template>
	<div class="EatShow">
		<Head title="本周菜谱"></Head>
		<van-panel title="园所" desc="明日之星幼儿园">
		</van-panel>
		<van-panel title="营养成分">
			<ul class="ying">
				<li v-for="(v,i) in ying" :key="i">
					{{chinese[i]}}:&nbsp;{{count[v]?count[v].toFixed(2):"___"}}
				</li>
			</ul>
		</van-panel>
		<van-panel :title="i" v-for="(v,i) in data" :key="i">
			<ul class="list">
				<li v-for="(vv,ii) in v" :key="ii">
					<img :src="'/public/img/'+vv.img" alt="">
					<p>{{vv.name}}</p>
				</li>
			</ul>
		</van-panel>
	</div>
</template>

<script>
	import Head from '@/components/Header.vue'
	export default {
		components: {
			Head
		},
		data() {
			return {
				count: "",
				data: [],
				ying: [
					`energy`,
					`dan`,
					`zhi`,
					`tan`,
					`xian`,
					`weia`,
					`weib1`,
					`weib2`,
					`ni`,
					`weic`,
					`weie`,
					`gai`,
					`lin`,
					`jia`,
					`na`,
					`mei`,
					`tie`,
					`xin`,
					`xi`,
					`tong`,
					`bo`
				],
				chinese: [
					"能量",
					"蛋白质",
					"脂肪",
					"碳水化合物",
					"膳食纤维",
					"维生素A",
					"维生素B1",
					"维生素B2",
					"尼克酸",
					"维生素C",
					"维生素E",
					"钙",
					"磷",
					"钾",
					"钠",
					"镁",
					"铁",
					"锌",
					"硒",
					"铜",
					"钼"
				]
			}
		},
		created() {
			this.axios.post("Diet/month_week", {
				eat_time: this.$route.query.eat_time,
				// week: this.$route.query.week
			}).then(res => {
				this.count = res.data.data.count;
				delete res.data.data.count;
				this.data = res.data.data;
			})
		},
	}
</script>

<style lang="less" scoped>
	.EatShow {
		.van-panel {
			margin-bottom: 10px;
		}

		.van-panel__content {
			overflow: hidden;
			padding-bottom: 5px;

			ul {
				&.ying {
					padding: 0 15px;

					li {
						display: inline-block;
						width: 115px;
					}
				}

				&.list {
					width: 100%;
					display: inline;
					white-space: nowrap;
					overflow-x: scroll;
					float: left;
					overflow-y: hidden;
					padding: 0 15px;

					li {
						display: inline-block;
						width: 80px;
						margin-right: 10px;
						text-align: center;

						img {
							width: 100%;
							height: 80px;
						}
					}
				}
			}
		}
	}
</style>
