<!-- 工资条 -->
<template>
    <div class='content'>
        <Head title="工资条" />
        <div>
			<el-table border :data="techang">
				<el-table-column
					v-for="(item, key) in title"
					:label="item.label"
					:prop="item.data"
					:key="key"
					:width="item.width"
				>
				</el-table-column>
			</el-table>
		</div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from '@/components/Header.vue'
import Fil from '@/components/Filter.vue'
import {WAGES_TITLE} from './common/config';
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
        Head,Fil
    },
    data() {
        //这里存放数据
        return {
            // count:'',
            techang:[]
        };
    },
    //方法集合
    methods: {
        init(){
            let savePost = {
                staff_id: this.$store.state.user.userInfo.staff_id
            }
            this.axios.post('/Wages/one_wages',savePost)
            .then(res=> {
                this.techang = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
		this.init()
		this.title = WAGES_TITLE;
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