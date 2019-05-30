<!-- 特长管理 -->
<template>
    <div class='content'>
        <Head title="特长管理" />
        <Fil :types="['park','class','techang']" :times='true' @change="change"/>
        <div>

        </div>
        <van-row style='text-indent:2em;margin:10px 0px;'>
            <van-col span="12">合计人数：{{count.countNum}}</van-col>
            <van-col span="12">合计金额：{{count.money}}</van-col>
        </van-row>

        <van-row style='text-indent:2em;'>
            <van-col span="12">合计收入：{{count.incomeMoney}}</van-col>
            <van-col span="12">合计支出：{{count.expenditureMoney}}</van-col>
        </van-row>

        <div>
			<table class="table" v-for='(item,index) in techang' :key='index'>
				<tr>
					<td>特长名称</td>
					<td>{{item.tName}}</td>
				</tr>
				<tr>
					<td>金额</td>
					<td>{{item.price}}</td>
				</tr>
                <tr>
					<td>收入比例</td>
					<td>{{item.income}}</td>
				</tr>
                <tr>
					<td>支出比例</td>
					<td>{{item.expenditure}}</td>
				</tr>
                <tr>
					<td>学习人数</td>
					<td>{{item.countNum}}</td>
				</tr>
                <tr>
					<td>收入</td>
					<td>{{item.incomeMoney}}</td>
				</tr>
                <tr>
					<td>支出</td>
					<td>{{item.expenditureMoney}}</td>
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
            let saveList = {
                istype:1,
                parkId:types.park.id,
                classId:types.class.id,
                hId:types.techang.id,
                starttime:types.times[0],
                endtime:types.times[1]
            }
            this.axios.post('/Techang/counttechang',saveList)
            .then(res=> {
                this.count = res.data.count[0]
                this.techang = res.data.techang
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

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