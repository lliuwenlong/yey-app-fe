<template>
    <div class="content">
        <Head title="缴费" />
        <div class="content-wrap">
            <div class="content-wrap-main">
                <Fil :times="true" @change="getList"></Fil>
            </div>
            <div class="list-wrapeer">
                <ul class="list">
                    <li>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="12" class="el-bg1">应收托费</el-col>
                            <el-col :span="12" class="el-bg2">{{list.tuo}}</el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="12" class="el-bg1">应收伙食费</el-col>
                            <el-col :span="12" class="el-bg2"></el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="12" class="el-bg1">应收车费</el-col>
                            <el-col :span="12" class="el-bg2"></el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="12" class="el-bg1">应收特长费</el-col>
                            <el-col :span="12" class="el-bg2"></el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="12" class="el-bg1">应收监控费</el-col>
                            <el-col :span="12" class="el-bg2"></el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="12" class="el-bg1">应收书费</el-col>
                            <el-col :span="12" class="el-bg2"></el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="12" class="el-bg1">其他收费</el-col>
                            <el-col :span="12" class="el-bg2">{{list.qi}}</el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="12" class="el-bg1">合计</el-col>
                            <el-col :span="12" class="el-bg2">{{list.num}}</el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Head from '@/components/Header.vue';
import Fil from '@/components/Filter.vue';
export default {
    created() {
        this.getList();
    },
    data() {
        return {
            list: []
        };
    },
    components: {
        Head,
        Fil
    },
    methods: {
        getList(val = {times: []}) {
            this.axios.post('/TeacherApp/familyPrice', {
                admin_id: this.$store.state.user.userInfo.admin_id,
                starttime: val.times[0],
                endtime: val.times[1]
            }).then(res => {
                this.list = res.data.data ? res.data.data : {};
            });
        }
    }
}
</script>
<style lang="less" scoped>
.content {
    position: relative;
    height: 100%;
    .content-wrap {
        position: absolute;
        top: 46px;
        bottom: 0;
        width: 100%;
        overflow: auto;
        .list-wrapeer {
            padding: 10px 10px;
            .list {
                border-top: 1px solid #eee;
                border-left: 1px solid #eee;
                background: #ffffff;
                li {
                    font-size: 14px;
                    text-align: center;
                    border-bottom: 1px solid #eee;
                    border-right: 1px solid #eee;
                    .el-bg1 {
                        border-right: 1px solid #eee;
                        padding: 20px 0px;
                    }
                }
            }
        }
    }
}

</style>
