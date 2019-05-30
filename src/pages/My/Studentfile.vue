<!-- 学生档案 -->
<template>
    <div class='content'>
        <Head title="学生档案"  :right="userInfo.roleStatus !== 5 ? '添加学生' : ''" @click-right="onClickRight" />
        <Fil :types="['park','class','intoPark']" :times="true" @change="change"/>
        <div>
			<el-table
                :data="tableData"
                border
                stripe
                style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="sourceName"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="count"
                label="出勤记录">
                <template  slot-scope="scope">
                    <span>{{scope.row.count}} 次</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="montyCount"
                label="缴费记录">
                <template  slot-scope="scope">
                    <span>{{scope.row.montyCount}} 次</span>
                </template>
            </el-table-column>
        </el-table>
		</div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from '@/components/Header.vue';
import Fil from '@/components/Filter.vue';
import {mapState} from 'vuex'; 

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
            tableData: []
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
                parkId:types.park.id,
                classId:types.class.id,
                sourceId:types.intoPark.id,
                start:types.times[0],
                end:types.times[1],
            }
            this.axios.post('/TeacherApp/studentFiles',savePost)
            .then(res=> {
                console.log(res.data.data)
                this.tableData = res.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        onClickRight() {
			this.$router.push({
				path: '/Addthestudent'
			})
		},
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.init()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    computed: {
        ...mapState('user', ['userInfo'])
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