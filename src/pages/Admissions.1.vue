<!-- 招生管理 -->
<template>
    <div class='content'>
		<Head title="招生管理" right="入园登记" @click-right="onClickRight" />
        <div class="title">
            <span>学生姓名</span>
            <span class="rydj"></span>
        </div>
        <div class="name">
            <div class="zsName" v-for='(item,index) in message' :key="index">
                <span>{{item.name}}</span>
                <span class="ryxq">详情</span>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from '@/components/Header.vue'
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
		Head
	},
    data() {
    //这里存放数据
        return {
            message:[],
        };
    },
    //方法集合
    methods: {
        init(){
            this.axios.post('/TeacherApp/Recruit_students')
            .then(res=> {
                this.message = res.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        historyGo(){
            history.go(-1)
		},
		onClickRight() {
			this.$router.push({
				path: '/Purcreport'
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
}
</script>
<style lang='less' scoped>
.header{
	width:100%;
	height:1.28rem;
	background:rgb(140,198,63);
	line-height: 1.28rem;
	position: fixed;
	top: 0rem;
    left: 0rem;
    display:fixed;
    justify-content:space-between;
}
.header img{
	width:0.34rem;
	height:0.34rem;
	margin-left:0.3rem;
	vertical-align: middle;
}
.header h2{
    height:1.28rem;
	color:rgb(255,255,255);
	font-size:0.34rem;
	display: inline-block;
	font-family: PingFang-SC-Medium;
	margin:0 0 0 130px;
}
.title{
	width: 100%;
	font-size:0.24rem;
	color:rgb(51,51,51) ;
	font-family: PingFang-SC-Medium;
	padding-left:0.28rem;
}
.title .tit{
	font-size:0.28rem;
	color:rgb(102,102,102) ;
	height:0.88rem;
	line-height: 0.88rem;
	font-family: PingFang-SC-Medium;
}
.title ul{
	height:1.4rem;
}
.title li{
	float: left;
	width: 2.1rem;
	height: 1.4rem;
	list-style: none;
	margin-right:0.3rem;
}
.title li img{
	width: 2.1rem;
	height: 1.4rem;
}
.header span{
	font-family: PingFang-SC-Medium;
	font-size:0.3rem;
	color:rgb(255,255,255);
	float: right;
	margin-right:0.3rem;
}
.title{
	height:1rem;
	line-height: 1rem;
	padding-left:0.31rem;
	font-weight: 700;
	border-bottom:1px solid rgba(0,0,0,0.1);
}
.teacherTop{
	width: 100%;
	height: 2rem;
	background-color: white;
	margin-top: 1.28rem;
}
.teacherTop .teacherName{
	width:100% ;
	height: 1rem;
	line-height: 1rem;
	text-indent: 1em;
	font-size: 14px;
	border-bottom:1px solid rgba(0,0,0,0.1); 
}
.teacherTop .teacherStatus{
	width: 100%;
	height: 1rem;
	font-size: 14px;
	border-bottom: 1px solid rgba(0,0,0,0.1);
}
.teacherTop .teacherStatus .teacherRadio{
	width: 100%;
	height: 100%;
	justify-content: space-between;
	display: flex;
}
.teacherCenter {
	height: 3.5rem;
	width: 100%;
	background-color: white;
	margin-top: 0.3rem; 
}
.teacherCenter .teacherName {
	width:100% ;
	height: 1rem;
	line-height: 1rem;
	text-indent: 1em;
	font-size: 14px;
}
.teacherCenter .teacherGroup {
	width:100% ;
	height: 2.5rem;
	text-indent: 1em;
	font-size: 14px;
}
.teacherStudents{
	height: 3.5rem;
	width: 100%;
	background-color: white;
	margin-top:0.3rem;
}
.teacherStudents .teacherName {
	width:100% ;
	height: 1rem;
	line-height: 1rem;
	text-indent: 1em;
	font-size: 14px;
}
.teacherButtom{
	width: 100%;
	margin-top:0.3rem;
	height: 1rem;
	text-align: center;
}
.mui-checkbox.mui-left label, .mui-radio.mui-left label {
    padding-right: 15px;
    padding-left: 43px;
}
.mui-checkbox input[type=checkbox]:before, .mui-radio input[type=radio]:before {
    font-family: Muiicons;
    font-size: 22px;
    font-weight: 400;
    line-height: 0.87rem;
    text-decoration: none;
    color: #aaa;
    border-radius: 0;
    background: 0 0;
    -webkit-font-smoothing: antialiased;
}
.teacherStatus .teacherRadio .mui-input-row{
	width: 28%;
}
.teacherStatus .teacherRadio .status{
	width: 15%;
    height: 1rem;
    text-align: right;
    line-height: 1rem;
    text-indent: .1em;
}
.title span:first-of-type{
	font-family: PingFang-SC-Medium;
	font-size:0.32rem;
	color:rgb(71,71,71);
	float: left;
	font-weight: 100;
}
.mui-input-row label {
    line-height: 2;
}
.title span:last-of-type{
	font-family: PingFang-SC-Medium;
	font-size:0.3rem;
	color:rgb(153,153,153);
	float: right;
	margin-right:0.32rem;
	font-weight: 100;
}
.name{
	border-bottom:1px solid rgba(0,0,0,0.1);
}
.zsName{
	height:1rem;
	line-height: 1rem;
	padding-left:0.31rem;
}
.zsName span:first-of-type{
	font-family: PingFang-SC-Medium;
	font-size:0.32rem;
	color:rgb(71,71,71);
	float: left;
}
.zsName span:last-of-type{
	font-family: PingFang-SC-Medium;
	font-size:0.3rem;
	color:rgb(153,153,153);
	float: right;
	margin-right:0.32rem;
}
</style>