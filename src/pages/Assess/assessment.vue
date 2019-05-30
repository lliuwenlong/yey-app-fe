<template>
    <div>
        <Head title="员工考核"/>
        <div class="content">
            <van-progress
                :percentage="(index/dataLength*100|0)"
                style="margin:10px 0"
                color="#9bc349"
            />
            <van-swipe
                @change="i=>{
                index=i;
                if(i==dataLength&&dataLength!=0){
                    back()
                }
            }"
                :show-indicators="false"
                :loop="false"
                :autoplay="0"
            >
                <div v-for="(v,i) in data" :key="i">
                    <van-swipe-item v-for="(item,index) in v.list" :key="index">
                        <span style="text-align:left">{{v.name}}{{item.number}}</span>
                        <span>考核频次：{{item.kaoNum}}</span>
                        <span style="text-align:right">成长值奖励值：{{item.fen}}</span>
                        <p>{{item.desc}}</p>
                        <div class="users">
                            <van-cell
                                :title="v.staff_name"
                                :value="item[v.staffId]"
                                v-for="(v,i) in users"
                                :key="i"
                                @click="editF=true;editData={ item,v }"
                            />
                        </div>
                    </van-swipe-item>
                </div>
                <van-swipe-item>
                    <p>打分结束,3秒后退出</p>
                </van-swipe-item>
            </van-swipe>
            <van-dialog
                v-model="editF"
                :title="`为“${editData.v.staff_name}”打分`"
                show-cancel-button
                @confirm="editFn"
            >
                <div style="padding:20px">
                    <van-field
                        v-model="editData.item[editData.v.staffId]"
                        :placeholder="`输入分数（满分${editData.item.fen}）`"
                    />
                </div>
            </van-dialog>
        </div>
    </div>
</template>

<script>
import Head from "@/components/Header.vue";
export default {
    components: {
        Head
    },
    data() {
        return {
            title: "",
            data: {},
            users: [],
            dataLength: 0,
            index: 0,
            editF: false,
            editData: { item: {}, v: {} }
        };
    },
    async created() {
        if (!this.$route.query.msgKey)
            await this.axios
                .post("/Scoring/showstaff", {
                    type: 1,
                    staffId: this.$route.query.staff_id
                })
                .then(res => {
                    let data = [];
                    let users = [];
                    Object.keys(res.data.data.content).map(v => {
                        let o = {};
                        o.name = v;
                        delete res.data.data.content[v].num;
                        o.list = Object.values(res.data.data.content[v]).map(
                            item => {
                                let o = {
                                    kaoNum: item.kao_num,
                                    number: item.sn,
                                    sn: item.sn,
                                    fen: item.number,
                                    desc: item.content,
                                    mid: item.mid,
                                    htype: item.typeId
                                };
                                res.data.data.fen.map(v => {
                                    if (v.number == o.sn) {
                                        o[v.oId] = v.fen;
                                    }
                                });
                                return o;
                            }
                        );
                        data.push(o);
                    });
                    this.users = res.data.data.kindergartenSum.map(v => {
                        return {
                            staff_name: v.name,
                            staffId: v.id
                        };
                    });
                    this.data = [...data];
                    this.dataLength = [].concat.apply(
                        [],
                        [...this.data.map(item => item.list)]
                    ).length;
                });
        else {
            this.data = Object.values(this.$route.query.msgKey);
            this.users = this.$route.query.msg;
            this.dataLength = [].concat.apply(
                [],
                [...this.data.map(item => item.list)]
            ).length;
        }
        // this.$router.back();
    },
    methods: {
        editFn() {
            if (!this.$route.query.msgKey)
                this.axios.post("/Scoring/upstaff", {
                    itype: 1,
                    mid: this.editData.item.mid,
                    staffid: this.$route.query.staff_id,
                    fra: this.editData.item[this.editData.v.staffId],
                    htype: this.editData.item.htype,
                    sn: this.editData.item.sn,
                    yid: this.editData.v.staffId,
                    type: "园长",
                    staffName: this.$route.query.staff_name
                });
            else
                this.axios.post("/Scoring/addStaffScore", {
                    fenId: this.editData.item.scoreId,
                    score: this.editData.item[this.editData.v.staffId],
                    staffId: this.editData.v.staffId,
                    name: this.editData.v.staff_name,
                    sex: this.editData.v.postName
                });
        },
        back() {
            setTimeout(() => {
                this.$router.back();
            }, 3000);
        }
    }
};
</script>

<style lang="less" scoped>
.van-swipe {
    .van-swipe-item {
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        & > span {
            width: 33%;
            display: inline-block;
            text-align: center;
            line-height: 24px;
            color: #999;
        }
        & > p {
            font-size: 16px;
            line-height: 24px;
            margin: 30px 15px;
        }
        .users {
            margin-top: 20px;
            input {
                border: none;
                text-align: right;
            }
        }
    }
}
</style>

