<template>
    <div>
        <Head title="收入数据"/>
        <Fil
            :types="['park','class']"
            :times="true"
            :month="false"
            :timesData="[moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]"
            @change="filterChange"
            all
        />
        <!-- <el-table :data="list" border style="margin-top: 20px;">
            <el-table-column label="班级" align="center" prop="className"></el-table-column>
            <el-table-column label="缴费学生" align="center" prop="studentName"></el-table-column>
            <el-table-column label="定金" align="center" prop="djprice"></el-table-column>
            <el-table-column
                v-for="(item, key) in listTitle"
                :key="key"
                :label="item.name"
                width="300px"
                align="center"
                @click="addFlag=true;"
            >
                <el-table-column
                    v-if="item.status === 1"
                    label="常规"
                    align="center"
                    :prop="`routineMoney${item.id}`"
                ></el-table-column>
                <el-table-column label="均摊" align="center" v-if="item.status === 1">
                    <el-table-column label="总额" align="center" :prop="`averageMoney${item.id}`"></el-table-column>
                    <el-table-column label="月均总额" align="center" :prop="`jtMoney${item.id}`"></el-table-column>
                </el-table-column>
                <el-table-column
                    label="实退"
                    align="center"
                    :prop="`tprice${item.id}`"
                    v-if="item.status === 2"
                ></el-table-column>
                <el-table-column
                    label="底费"
                    align="center"
                    :prop="`dprice${item.id}`"
                    v-if="item.status === 2"
                ></el-table-column>
            </el-table-column>
            <el-table-column width="300px" align="center" label="合计">
                <el-table-column label="实支" align="center" prop="sjMoney"></el-table-column>
                <el-table-column label="进表实支" align="center" prop="yjMoney"></el-table-column>
            </el-table-column>
        </el-table>-->
        <el-table :data="list" border>
            <el-table-column label="班级" align="center" prop="className"></el-table-column>
            <el-table-column label="缴费学生" align="center" fixed prop="studentName"></el-table-column>
            <el-table-column label="定金" align="center" prop="djprice"></el-table-column>
            <el-table-column
                v-for="(item, key) in listTitle"
                :key="key"
                :label="item.name"
                width="300px"
                align="center"
                @click="addFlag=true;"
            >
                <el-table-column v-if="item.status === 1" label="常规" align="center">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                时间：{{scope.row[`addtime${item.id}`]}}
                                <br>
                                类型：{{scope.row[`channel${item.id}`]}}
                            </div>
                            <span>{{scope.row[`routineMoney${item.id}`]}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="均摊" align="center" v-if="item.status === 1">
                    <el-table-column label="总额" align="center">
                        <template slot-scope="scope">
                            <el-tooltip placement="top" effect="light">
                                <div slot="content">
                                    时间：{{scope.row[`addtime${item.id}`]}}
                                    <br>
                                    类型：{{scope.row[`channel${item.id}`]}}
                                </div>
                                <span>{{scope.row[`averageMoney${item.id}`]}}</span>
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
                                <span>{{scope.row[`jtMoney${item.id}`]}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    label="实退"
                    align="center"
                    :prop="`tprice${item.id}`"
                    v-if="item.status === 3"
                >
                    <template slot-scope="scope">
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                时间：{{scope.row[`addtime${item.id}`]}}
                                <br>
                                类型：{{scope.row[`channel${item.id}`]}}
                            </div>
                            <span>{{scope.row[`tprice${item.id}`]}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    label="抵费"
                    align="center"
                    :prop="`dprice${item.id}`"
                    v-if="item.status === 3"
                >
                    <template slot-scope="scope">
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                时间：{{scope.row[`addtime${item.id}`]}}
                                <br>
                                类型：{{scope.row[`channel${item.id}`]}}
                            </div>
                            <span>{{scope.row[`dprice${item.id}`]}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column width="160px" align="center" label="合计" fixed="right">
                <el-table-column width="80px" label="实入" align="center" prop="s"></el-table-column>
                <el-table-column width="80px" label="进表实入" align="center" prop="j"></el-table-column>
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
            classId: "",
            parkId: "",
            startTime: "",
            endTime: "",
            listTitle: "",
            list: []
        };
    },
    components: {
        Head,
        Fil
    },
    methods: {
        getTableType() {},
        getParams() {
            return {
                class_id: this.classId === "" ? undefined : this.classId,
                garden_id: this.parkId === "" ? undefined : this.parkId,
                start: this.startTime === "" ? undefined : this.startTime,
                end: this.endTime === "" ? undefined : this.endTime
            };
        },
        getCauseList() {
            this.axios.post("/Money/getCost").then(res => {
                const response = res.data.data ? res.data.data : [];
                this.listTitle = response;
            });
        },
        filterChange(value) {
            const [startTime, endTime] = value.times;
            this.classId = value.class.id;
            this.parkId = value.park.id;
            this.startTime = startTime;
            this.endTime = endTime;
            this.getList();
        },
        getList() {
            this.axios
                .post("Money/getIncomeList", { ...this.getParams() })
                .then(res => {
                    const response = res.data.data ? res.data.data : [];
                    response.forEach(v => {
                        v.s = 0;
                        v.j = 0;
                        this.listTitle.forEach(vv => {
                            v.s += v[`routineMoney${vv.id}`]
                                ? +v[`routineMoney${vv.id}`]
                                : 0;
                            v.s -= v[`dprice${vv.id}`]
                                ? +v[`dprice${vv.id}`]
                                : 0;
                            v.j += v[`jtMoney${vv.id}`]
                                ? v[`jtMoney${vv.id}`]
                                    ? +v[`jtMoney${vv.id}`]
                                    : 0
                                : v[`routineMoney${vv.id}`]
                                ? +v[`routineMoney${vv.id}`]
                                : 0;
                            v.j -= v[`tprice${vv.id}`]
                                ? +v[`tprice${vv.id}`]
                                : 0;
                            v.j -= v[`dprice${vv.id}`]
                                ? +v[`dprice${vv.id}`]
                                : 0;
                        });
                    });
                    this.list = response;
                });
        }
    }
};
</script>

<style lang='less' scoped>
.table-wraper {
    margin-top: 20px;
    padding: 0 10px;
}
</style>
