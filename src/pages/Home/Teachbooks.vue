<!-- 教材书籍 -->
<template>
    <div class='content'>
        <Head title="教材书籍" :back="false" />
        <div class='contentMsg'>
            正在开发，敬请期待！
        </div>
        <Menu></Menu>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Menu from '@/components/Menu.vue'
import Head from '@/components/Header.vue'
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
        Menu,
        Head
    },
    data() {
        //这里存放数据
        return {
            active: 1,
        };
    },
    //方法集合
    methods: {

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
.contentMsg{
    width:98%;
    height:200px;
    text-align:center;
    line-height:200px;
    margin:0 1%;
    background-color:#fff;
    font-size:18px;
}
</style>