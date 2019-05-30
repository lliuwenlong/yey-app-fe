<!-- 学生档案 -->
<template>
    <div class="content">
        <Head
            title="学生档案"
            :right="userInfo.roleStatus !== 5 ? '添加学生' : ''"
            @click-right="onClickRight"
        />
        <Fil :types="['park','class','intoPark', 'reason']" :times="true" @change="change" />
        <div>
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" fixed="left"></el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex == '1' ? '男' : '女'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="tel" label="家长联系方式"></el-table-column>
                <el-table-column prop="garden_name" label="所在园区"></el-table-column>
                <el-table-column prop="class_name" label="所在班级"></el-table-column>
                <el-table-column prop="techang_name" label="特长"></el-table-column>
                <el-table-column prop="money" label="收费情况"></el-table-column>
                <el-table-column prop="statuss" label="学生状态"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Head from "@/components/Header.vue";
import Fil from "@/components/Filter.vue";
import { mapState } from "vuex";

export default {
    components: {
        Head,
        Fil
    },
    data() {
        return {
            count: "",
            techang: [],
            tableData: [],
            tuiArr: []
        };
    },
    methods: {
        change(types) {
            if (types.class.id !== "" && types.park.id !== "") {
                this.init(types);
            }
        },
        init(types) {
            let savePost = {
                parkId: types.park.id,
                classId: types.class.id,
                sourceId: types.intoPark.id,
                start: types.times[0],
                end: types.times[1],
                reasonId: types.reason.id == -1 ?  undefined : types.reason.id
            };
            this.axios
                .post("/Student/record", savePost)
                .then(res => {
                    this.tableData = res.data.data;
                })
                .catch(function(error) {});
        },
        onClickRight() {
            this.$router.push({
                path: "/Addthestudent"
            });
        }
    },
    created() {
        this.init();
    },
    computed: {
        ...mapState("user", ["userInfo"])
    }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
table {
    width: 96%;
    margin: 0.15rem auto;
    border: solid 0.01rem rgb(221, 221, 221);
    font-family: PingFang-SC-Medium;
    font-size: 0.24rem;
    color: rgb(34, 34, 34);
}

td {
    width: 3.45rem;
    height: 0.8rem;
    text-align: center;
    border: solid 0.01rem rgb(221, 221, 221);
}

tr:nth-child(odd) {
    background-color: rgb(250, 255, 238);
}

tr:nth-child(even) {
    background-color: rgb(255, 255, 255);
}
</style>