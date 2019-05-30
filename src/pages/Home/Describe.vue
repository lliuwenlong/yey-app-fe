<!-- 通告栏 -->
<template>
    <div class='content'>
        <Head title="通告栏" />
        <div v-if='tableData'>
            <van-notice-bar style='margin-bottom:10px;' wrapable v-for='(item,index) in tableData' :key='index' :scrollable="false">
                {{item.inform_desc}}
            </van-notice-bar>
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
            tableData:[]
        };
    },
    //方法集合
    methods: {
        init(){
            let savePost = {
                garden_id: this.$store.state.user.userInfo.garden_id,
                ji_id: this.$store.state.user.userInfo.jiId,
            }
            this.axios.post('/Inform/show',savePost)
            .then(res=> {
                this.tableData = res.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
        }
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

</style>