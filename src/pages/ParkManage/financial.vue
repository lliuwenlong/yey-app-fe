<template>
    <div>
        <Head title="财务收支"/>
        <Fil
            :types="['park','class']"
            :times="true"
            :timesData="[moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]"
            @change="filterChange"
        />
        <el-table :data="list" border style="margin-top: 20px;">
            <el-table-column
                :label="v.label"
                :prop="v.data"
                :width="v.width"
                v-for="(v,i) in title"
                :key="i"
            >
                <template slot-scope="scope">
                    <div>
                        <span v-if="v.content" v-html="v.content(scope.row)"></span>
                        <span v-else v-html="scope.row[v.data]"></span>
                    </div>
                </template>
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
            list: [],
            title: [
                {
                    label: "凭证号",
                    data: "id",
                    content(o) {
                        return "".padStart(8 - (o.id + "").length, 0) + o.id; //Array.from(Array(8-(o.id+'').length)).map(v=>0).join('')
                    },
                    width: 100
                },
                {
                    label: "时间",
                    data: "addtime",
                    width: "100px"
                },
                // {
                //     label: "园所",
                //     data: "gardenName"
                // },
                {
                    label: "操作人",
                    data: "principal"
                },
                // {
                //     label: "班级",
                //     data: "className",
                //     width: 80
                // },
                {
                    label: "姓名",
                    data: "studentName"
                },
                {
                    label: "收入",
                    data: "inprice"
                },
                {
                    label: "支出",
                    data: "eprice"
                },
                {
                    label: "状态",
                    data: "del"
                },
                {
                    label: "摘要",
                    data: "causeName"
                },
                {
                    label: "现金渠道",
                    data: "channel"
                }
            ]
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
            console.log(value)
            const [startTime, endTime] = value.times;
            this.classId = value.class.id;
            this.parkId = value.park.id;
            this.startTime = startTime;
            this.endTime = endTime;
            this.getList();
        },
        getList() {
            this.axios.post('/Money/Whole', {...this.getParams()}).then(res => {
                const data = res.data.data;
                this.list = data;
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
