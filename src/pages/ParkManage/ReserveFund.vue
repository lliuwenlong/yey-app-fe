<!-- 园所备用金 -->
<template>
    <div class='content'>
        <Head title="园所备用金" />
        <Fil :types="['park']" :day="true" @change="change"/>
        <div>
			<table class="table" v-for='(item,index) in techang' :key='index'>
				<tr>
					<td>前台备用现金</td>
					<td>{{item.chu_money}}</td>
				</tr>
				<tr>
					<td>现金收入</td>
					<td>{{item.cash}}</td>
				</tr>
                <tr>
					<td>刷卡收入</td>
					<td>{{item.card}}</td>
				</tr>
                <tr>
					<td>支付宝缴费</td>
					<td>{{item.alipay}}</td>
				</tr>
                <tr>
					<td>银行卡批扣</td>
					<td>{{item.deduction}}</td>
				</tr>
                <tr>
					<td>银校通收入</td>
					<td>{{item.silver}}</td>
				</tr>
                <tr>
					<td>微信收入</td>
					<td>{{item.weixin}}</td>
				</tr>
                <tr>
					<td>现金支出</td>
					<td>{{item.expend}}</td>
				</tr>
                <tr>
					<td>转集团</td>
					<td>{{item.transfer}}</td>
				</tr>
                <tr>
					<td>前台备用现金结余<br />(不含刷卡收入)</td>
					<td>{{item.yu_money}}</td>
				</tr>
			</table>
		</div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
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
            count:'',
            techang:[],
        };
    },
    //方法集合
    methods: {
        change(types){
            this.init(types)
        },
        init(types){
            console.log(types)
            let savePost = {
                // addtime:types.day,
                garden_id:types.park.id
            }
            this.axios.post('/Money/price',savePost)
            .then(res=> {
                this.techang = res.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
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
<style lang='less' scoped>
//@import url(); 引入公共css类
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
</style>