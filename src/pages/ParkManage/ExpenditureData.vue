<template>
    <div class="expenditure-data">
        <Head title="支出数据" />
        <Fil
            :types="['park','class']"
            :month="true"
            :timesData="[moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]"
            @change="filterChange"
        /> 
        <el-table :data="list" border>
                <el-table-column
                    v-for="(item, key) in listTitle"
                    :key="key"
                    :label="item.name"
                    width="300px"
                    align="center"
                    @click="addFlag=true;"
                >
                    <el-table-column label="常规" align="center">
                        <template slot-scope="scope">
                            <el-tooltip placement="top" effect="light">
                                <div slot="content">
                                    时间：{{scope.row[`addtime${item.id}`]}}
                                    <br>
                                    类型：{{scope.row[`channel${item.id}`]}}
                                </div>
                                <span
                                    @click="if(addData.type==2) getDown(scope.row['id'+item.id])"
                                    style="display:block;cursor: pointer;"
                                >{{scope.row['routineMoney'+item.id]}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="均摊" align="center">
                        <el-table-column label="总额" align="center">
                            <template slot-scope="scope">
                                <el-tooltip placement="top" effect="light">
                                    <div slot="content">
                                        时间：{{scope.row[`addtime${item.id}`]}}
                                        <br>
                                        类型：{{scope.row[`channel${item.id}`]}}
                                    </div>
                                    <span
                                        @click="if(addData.type==2&&!classId) getDown(scope.row['id'+item.id])"
                                        style="display:block;cursor: pointer;"
                                    >{{scope.row['averageMoney'+item.id]}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="月均总额" align="center">
                            <template slot-scope="scope">
                                <el-tooltip placement="top" effect="light">
                                    <div slot="content">
                                        时间：{{scope.row[`addtime${item.id}`]}}
                                        <br>
                                        类型：{{scope.row[`channel${item.id}`]}}
                                    </div>
                                    <span
                                        @click="if(addData.type==2&&!classId) getDown(scope.row['id'+item.id])"
                                        style="display:block;cursor: pointer;"
                                    >{{scope.row['jtMoney'+item.id]}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column width="160px" align="center" label="合计">
                    <el-table-column width="80px" label="实支" align="center" prop="sjMoney"></el-table-column>
                    <el-table-column width="80px" label="进表实支" align="center" prop="yjMoney"></el-table-column>
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
                // end: this.endTime === '' ? undefined : this.endTime
            }
        },
        getCauseList() {
            this.axios.post('/Money/cost').then(res => {
                const response = res.data.data ? res.data.data : [];
                this.listTitle = response;
            });
        },
        filterChange(value) {
            // const [startTime, endTime] = value.times;
            this.classId = value.class.id;
            this.parkId = value.park.id;
            this.startTime = value.month;
            // this.endTime = endTime;
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
