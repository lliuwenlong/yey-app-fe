<template>
    <div class="pay">
        <Head title="缴费" />
        <!-- <div class="content-wrap">
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
        </div> -->
        <div class="content"
            v-show="data.studentname" >
            <span v-html="`
            ${data.studentname}宝宝家长，您好！<br/><br/>
                   咱们宝宝上个月的出勤天数是${data.yes}天，那么宝宝本月应交费用如下：<br/>
                   应交托费${data.childnum-data.ychildcareprice}元，(其中含本月托费${data.childnum}元—上个月的返托费${data.ychildcareprice}元)；<br/>
                   应交餐费${data.foodnum-data.yfoodprice}元，(其中含本月餐费${data.foodnum}元—上个月的返餐费${data.yfoodprice}元)；<br/><br/>`">
            </span>
            <span v-html="`合计${(data.childnum-data.ychildcareprice)+(data.foodnum-data.yfoodprice)}元。`" style="display:block;text-align:right"></span>
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
            list: [],
            data:{}
        };
    },
    components: {
        Head,
        Fil
    },
    methods: {
        getList(val = {times: []}) {
            // this.axios.post('/TeacherApp/familyPrice', {
            //     admin_id: this.$store.state.user.userInfo.admin_id,
            //     starttime: val.times[0],
            //     endtime: val.times[1]
            // }).then(res => {
            //     this.list = res.data.data ? res.data.data : {};
            // });
            this.axios.post("Student/student_fan",{
                user_id: 333,//this.$store.state.user.userInfo.admin_id,
                roleStatus: this.$store.state.user.userInfo.roleStatus
            }).then(res=>{
                this.data=res.data.data[0]
            })
        }
    }
}
</script>
<style lang="less" scoped>
.content{
    background: white;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    font-size: 14px;
    line-height: 24px;
}
// .content {
//     position: relative;
//     height: 100%;
//     .content-wrap {
//         position: absolute;
//         top: 46px;
//         bottom: 0;
//         width: 100%;
//         overflow: auto;
//         .list-wrapeer {
//             padding: 10px 10px;
//             .list {
//                 border-top: 1px solid #eee;
//                 border-left: 1px solid #eee;
//                 background: #ffffff;
//                 li {
//                     font-size: 14px;
//                     text-align: center;
//                     border-bottom: 1px solid #eee;
//                     border-right: 1px solid #eee;
//                     .el-bg1 {
//                         border-right: 1px solid #eee;
//                         padding: 20px 0px;
//                     }
//                 }
//             }
//         }
//     }
// }

</style>
