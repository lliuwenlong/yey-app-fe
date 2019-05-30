<template>
	<div class='content'>
		<Head title="结算明细" />
        <div class="settlement-details">
            <div class="settlement-details-wrap">
                <el-table border style="margin-top: 20px" :data="list">
                    <el-table-column v-for="(item, key) in title" :key="key" :label="item.label" :prop="item.data" align="center">
                    </el-table-column>
                </el-table>
            </div>
        </div>
	</div>
</template>
<script>
import Head from '@/components/Header.vue';
import {SETTLEMENT_DETAILS_TITLE} from './common/config.js';
export default {
    components: {
        Head
    },
    data() {
        return {
            list: []
        }
    },
    created() {
        this.title = SETTLEMENT_DETAILS_TITLE;
        this.getList();
    },
    methods: {
        getList() {
            this.axios.post('/TeacherApp/SettlementRatio', {
                admin_id: this.$store.state.user.userInfo.admin_id
            }).then(res => {
                this.list = res.data.data;
            })
        }
    }
}
</script>
<style lang="less" scoped>
.content {
    height: 100%;
    position: relative;
    .settlement-details {
        position: absolute;
        top: 46px;
        bottom: 0;
        width: 100%;
        overflow: auto;
    }
}
</style>

