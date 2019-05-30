<template>
    <div class="expenditure-data">
        <Head title="收入数据" />
        <Fil
            :types="['park','class']"
            :times="true"
            :timesData="[moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]"
            @change="filterChange"
        />
        <el-table :data="list" border style="margin-top: 20px">
            <el-table-column
            v-for="(item, key) in listTitle"
            :key="key"
            :label="item.name"
            width="300px"
            align="center"
            @click="addFlag=true;"
            >
            <el-table-column label="常规" align="center" :prop="`routineMoney${item.id}`"></el-table-column>
            <el-table-column label="均摊" align="center">
                <el-table-column label="总额" align="center" :prop="`averageMoney${item.id}`"></el-table-column>
                <el-table-column label="月均总额" align="center" :prop="`jtMoney${item.id}`"></el-table-column>
            </el-table-column>
            </el-table-column>
            <el-table-column width="300px" align="center" label="合计">
            <el-table-column label="实支" align="center" prop="sjMoney"></el-table-column>
            <el-table-column label="进表实支" align="center" prop="yjMoney"></el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Head from "@/components/Header";
import Fil from "@/components/Filter";
export default {
    created() {
        this.getCauseList();
        this.getList();
    },
    data() {
        return {
            classId: '',
            parkId: '',
            startTime: '',
            endTime: '',
            listTitle: '',
            list: []
        };
    },
    components: {
        Head,
        Fil
    },
    methods: {
        getTableType() {

        },
        getParams() {
            return {
                class_id: this.classId === '' ? undefined : this.classId,
                garden_id: this.parkId === '' ? undefined : this.parkId,
                start: this.startTime === '' ? undefined : this.startTime,
                end: this.endTime === '' ? undefined : this.endTime
            }
        },
        getCauseList() {
            this.axios.post('/Money/cost').then(res => {
                const response = res.data.data ? res.data.data : [];
                this.listTitle = response;
            });
        },
        filterChange(value) {
            const [startTime, endTime] = value.times;
            this.classId = value.class.id;
            this.park = value.park.id;
            this.startTime = startTime;
            this.endTime = endTime;
            this.getList();
        },
        getList() {
            this.axios.post("Money/expenditure", { ...this.getParams() })
                .then(res => {
                const response = res.data.data ? res.data.data : [];
                this.list = response;
            });
        }
    }
}
</script>

<style lang='less' scoped>
    .table-wraper {
        margin-top: 20px;
        padding: 0 10px;
    }
</style>
