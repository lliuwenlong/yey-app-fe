<!-- 资源列表 -->
<template>
    <div class='content'>
        <Head
		title="资源管理"
		:back="false"
		/>
        <div v-for='(item,index) in msg' :key="index">
            <van-cell :title="item.restype_name" is-link   @click='msgItem(item.restype_id)'/>
        </div>
		<Menu></Menu>
	</div>
</template>

<script>
	import Menu from '@/components/Menu.vue'
	import Head from '@/components/Header.vue'
export default {
	components: {
		Menu,Head
	},
    data() {
        //这里存放数据
        return {
            active: 1,
            imageList: [
                'https://img.yzcdn.cn/1.jpg',
                'https://img.yzcdn.cn/2.jpg'
            ],
            msg:[],
            show: false,
            showData:{},
        };
    },
    //方法集合
    methods: {
        msgItem(i){
            let saveList = {
                res_id:i
            }
            this.axios.post('/inform/res_show',saveList)
            .then(res=> {
                this.$router.push({
                path:'/Resources',
                query : {
                    msgKey: res.data.data
                }  
            })
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        init(){
            this.axios.post('/inform/restype_show')
            .then(res=> {
                this.msg = res.data.data
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
<style scoped>
</style>