<!-- 资源 -->
<template>
    <div class='content'>
        <Head
		title="资源详情"
		@click-left="onClickLeft"
		/>
        <van-row>
            <van-col span="12" v-for='(item,index) in msg' :key='index'>
                <dl @click='showData=item,show=true'>
                    <dt><img :src="'/public/img/'+item.res_pic" > </dt>
                    <dd>{{item.res_name}}</dd>
                </dl>
            </van-col>
        </van-row>
        <van-dialog
        v-model="show"
        :title="showData.res_name">
            <img :src="'/public/img/'+showData.res_pic" width='100%'>
        </van-dialog>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Head from '@/components/Header';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
		Head
	},
    data() {
        //这里存放数据
        return {
            active: 1,
            msg:[],
            show: false,
            showData:{},
        };
    },
    //方法集合
    methods: {
        onClickLeft() {
			history.go(-1)
		},
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.msg = this.$route.query.msgKey
    },
}
</script>
<style lang="less" scoped>
.van-col dl{
    width:90%;
    background-color:white;
    text-align:center;
    margin:3% 5% 3% 5%;
}
.van-col dl dt{
    padding:5%;
}
.van-col dl dd{
    padding:0% 0% 5% 0%;
    font-size:14px;
}
.van-col dl dt img{
    width:100%;
    display:inline-block;
}
.van-dialog{
	img{
		margin-top: 20px;
	}
}
</style>