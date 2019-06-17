<template>
    <div class="app-container">
        <Head title="详情" />
        <div class="app-deic">
            <h2 class="title">{{item.title}}</h2>
            <div class="time">{{item.addtime}}</div>
            <div class="content">{{item.content}}</div>
        </div>
    </div>    
</template>
<script>
import Head from '@/components/Header.vue'
export default {
    components: {
        Head
    },
    data() {
        return {
            item: JSON.parse(this.$route.query.data)
        };
    }
}
</script>
<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

.app-deic {
    position: absolute;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    .time {
        margin: 10px 0;
        text-align: center;
        font-size: 14px;
    }
    .title {
        margin: 0 auto;
        margin-top: 10px;
        text-align: center;
    }
    .content {
        padding: 0 20px;
        font-size: 14px;
    }
}

</style>

