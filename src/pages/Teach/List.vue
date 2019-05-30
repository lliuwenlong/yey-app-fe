<template>
    <div class="list">
        <Head title="教学管理"></Head>
        <Fil
            :types="['park','class']"
            :week="true"
            :weekData="moment().add(1-moment().weekday(),'days')"
            @change="getList"
        />
        <van-panel
            style="margin-top:10px"
            :title="'周'+num[i]"
            :desc="moment(week).add(i-1,'days').format('YYYY-MM-DD')"
            v-for="i in 5"
            :key="i"
        >
            <el-table :data="list" style="width: 100%">
                <el-table-column :label="vv.name_time" v-for="(vv,ii) in times" :key="ii">
                    <template slot-scope="scope">
                        <span v-if="scope.row[vv.id]&&scope.row[vv.id][i]" @click="showF=true;showData=scope.row[vv.id][i]">
                            <p
                                v-if="scope.row[vv.id][i].wen||scope.row[vv.id][i].img||scope.row[vv.id][i].shipin"
                            >{{scope.row[vv.id][i].tec_name}}</p>
                            <p v-else style="color:red">无备课</p>
                        </span>
                        <span v-else>
                            <span
                                v-if="$store.state.user.userInfo.roleStatus==5"
                                style="color:#bbb"
                            >暂无课程</span>
                            <van-button
                                v-else
                                size="small"
                                type="primary"
                                @click="upload(vv.id,i,moment(week).add(i-1,'days').format('YYYY-MM-DD'))"
                            >点击上传</van-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </van-panel>
        <van-dialog v-model="addF" title="标题" show-cancel-button @confirm="addFn">
            <van-cell-group>
                <van-field placeholder="键入内容" label="课程名称" v-model="addData.tec_name"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="封面">
                    <template>
                        <van-uploader
                            :after-read="file=>onRead(file,'mian')"
                            style="dicplay:inline-block"
                            class="Tc"
                        >{{addData.file_mian?addData.file_mian:'点击上传'}}</van-uploader>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="文档">
                    <template>
                        <van-uploader
                            :after-read="file=>onRead(file,'wen')"
                            style="dicplay:inline-block"
                        >{{addData.file_wen?addData.file_wen:'点击上传'}}</van-uploader>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="图片">
                    <template>
                        <van-uploader
                            :after-read="file=>onRead(file,'img')"
                            style="dicplay:inline-block"
                        >{{addData.file_img?addData.file_img:'点击上传'}}</van-uploader>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="视频">
                    <template>
                        <van-uploader
                            :after-read="file=>onRead(file,'shipin')"
                            style="dicplay:inline-block"
                        >{{addData.file_shipin?addData.file_shipin:'点击上传'}}</van-uploader>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-dialog>
        <van-dialog v-model="showF" title="标题" show-cancel-button @confirm="showFn">
            <van-cell-group>
                <van-cell title="封面">
                    <template>
                        <span>{{showData.tec_name}}</span>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="封面">
                    <template>
                        <img :src="'/public/image/'+showData.mian" alt="" srcset="">
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="文档">
                    <template>
                        <a :href="'/public/image/'+showData.wen">{{showData.wen}}</a>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="图片">
                    <template>
                        <img :src="'/public/image/'+showData.img" alt="" srcset="">
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="视频">
                    <template>
                        <a :href="'/public/image/'+showData.shipin">{{showData.shipin}}</a>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
import Head from "@/components/Header.vue";
import Fil from "@/components/Filter.vue";
export default {
    components: {
        Head,
        Fil
    },
    data() {
        return {
            times: [],
            list: [],
            num: {
                1: "一",
                2: "二",
                3: "三",
                4: "四",
                5: "五"
            },
            week: "123",
            addF: false,
            addData: {
                staff_id: this.$store.state.user.userInfo.admin_id,
                ji_id: this.$store.state.user.userInfo.jiId
            },
            showF:false,
            showData:{

            },
            data: {}
        };
    },
    created() {
        this.axios.post("/staff/teaching_time").then(res => {
            this.times = res.data.data;
        });
    },
    methods: {
        onRead(file, key) {
            console.log(file);
            let data = new FormData();
            data.append("files", file.file);
            this.axios.post("/Staff/mu_add", data).then(res => {
                this.addData["file_" + key] = file.file.name;
                this.addData[key] = res.data.data;
                this.addData = { ...this.addData };
            });
        },
        getList(data) {
            if (data) {
                this.week = data.week[0];
                this.addData = {
                    garden_id: data.park.id,
                    class_id: data.class.id,
                    ji_id: this.$store.state.user.userInfo.jiId,
                    staff_id: this.$store.state.user.userInfo.admin_id
                };
                this.data = {
                    garden_id: data.park.id,
                    class_id: data.class.id,
                    ji_id: this.$store.state.user.userInfo.jiId,
                    start_time: data.week[0],
                    end_time: data.week[1]
                };
            }
            this.axios.post("/staff/teaching", this.data).then(res => {
                this.list = [res.data.data];
            });
        },
        upload(keshi_id, week, time) {
            this.addData.keshi_id = keshi_id;
            this.addData.week = week;
            this.addData.time = time;
            this.addF = true;
        },
        addFn() {
            this.axios.post("/staff/addteaching", this.addData).then(res => {
                this.$message({
                    message: res.data.msg,
                    type: "success"
                });
                this.getList();
            });
        },
        showFn(){

        }
    }
};
</script>

<style lang="less" scoped>
.el-table {
    /deep/ .cell {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /deep/ .el-table__header-wrapper {
        /deep/ .cell {
            font-size: 12px;
        }
    }
}
.van-cell__title {
    max-width: 90px;
}
.van-cell__value {
    text-align: left;
}
</style>

