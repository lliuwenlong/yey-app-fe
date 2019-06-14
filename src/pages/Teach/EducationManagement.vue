<template>
    <div class="app-container">
        <Head title="教学管理" />
        <van-cell-group>
            <van-cell title="教学老师课表" is-link @click="go(4)" />
            <van-cell title="特长老师课表" is-link @click="go(7)" />
        </van-cell-group>
    </div>
</template>
<script>
import Head from "@/components/Header.vue";

export default {
    name: '',
    components: {
        Head
    },
    methods: {
        go(num) {
            this.$router.push({
                path: num == 4 ? '/Teach' : '/TeTeach'
            });
        }
    }
}
</script>
<style lang="less" scoped>
    * {
        padding: 0;
        margin: 0;
    }
</style>
