<!-- 园务 -->
<template>
    <div class='content'>
        <Head title="园务管理" :back="false" />
        <van-cell title="园务考核" is-link to="/ParkserviceAss" />
        <van-cell title="特长管理" is-link to="/Special" />
        <van-cell title="幼儿成长档案" is-link to="/GrowthFile" />
        <van-cell title="工作日志" is-link to="/WorkLog"  v-if="this.$store.state.user.userInfo.roleStatus === 4" />
        <Menu></Menu>
    </div>
</template>

<script>
    import Menu from '@/components/Menu.vue'
    import Head from '@/components/Header.vue'
    export default {
        components: {
            Menu,
            Head
        },
        data() {
            //这里存放数据
            return {
                active: 2,
            };
        },
        //方法集合
        methods: {},
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
    }
</script>
<style scoped>
</style>
