
<!-- 园务 -->
<template>
    <div class='content'>
        <Head title="园所经营" />
        <van-cell title="收入数据" is-link to="/incomeDate" />
        <van-cell title="支出数据" is-link to="/expenditureData" />
        <van-cell title="财务报表" is-link to="/finance" />
        <van-cell title="园所备用金" is-link to="/ReserveFund" />
        <van-cell title="资产明细" is-link to="/statistics" />
        <van-cell title="财务收支" is-link to="/financial" />
        <!-- <van-cell title="任务管理" is-link to="/taskManagement" /> -->
    </div>
</template>

<script>
    import Head from '@/components/Header.vue'
    export default {
        components: {
            Head
        },
    }
</script>
<style scoped>
</style>
