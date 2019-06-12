<template>
    <div class="patrolGarden">
        <Head title="添加日志" right="保存" @click-right="add"/>
        <van-tabs v-model="active">
            <van-tab v-for="(v,i) in types" :key="i" :title="v.type">
                <van-cell-group>
                    <van-cell title="图片">
                        <template>
                            <van-uploader
                                :after-read="file=>onRead(file,i)"
                                style="dicplay:inline-block"
                            >
                                <img
                                    v-if="data[i].img"
                                    :src="'/public/img/'+data[i].img"
                                    width="50%"
                                >
                                <span v-else>点击上传</span>
                            </van-uploader>
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-cell-group>
                    <van-field
                        v-model="data[i].desc"
                        label="说明"
                        placeholder="键入内容"
                        type="textarea"
                        rows="2"
                        autosize
                    />
                </van-cell-group>
                <van-cell-group>
                    <van-field
                        v-model="data[i].sug"
                        label="建议"
                        placeholder="键入内容"
                        type="textarea"
                        rows="2"
                        autosize
                    />
                </van-cell-group>
                <van-cell-group>
                    <van-field
                        v-model="data[i].genjin"
                        label="专项跟进"
                        placeholder="键入内容"
                        type="textarea"
                        rows="2"
                        autosize
                    />
                </van-cell-group>
                <van-cell-group>
                    <van-field
                        v-model="data[i].jx_zhu"
                        label="教学助理"
                        placeholder="键入内容"
                        type="textarea"
                        rows="2"
                        autosize
                    />
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Fil from "@/components/Filter.vue";
import Head from "@/components/Header.vue";
export default {
    components: {
        Head,
        Fil
    },
    data() {
        return {
            active: 0,
            types: [],
            data: []
        };
    },
    methods: {
        onRead(file, i) {
            let data = new FormData();
            data.append("files", file.file);
            this.axios.post("/Staff/mu_add", data).then(res => {
                this.data[i].img = res.data.data;
                this.data = [...this.data];
            });
        },
        add() {
            if (this.data.filter(v => v.img == null).length) {
                this.$message.warning("请填写全部内容");
                return;
            }
            let arr = [];
            for (let v of this.data) {
                arr.push(this.axios.post("/staff/addpatrolData", v));
            }
            Promise.all(arr).then(res => {
                this.$message.success(res[0].data.msg);
                this.$router.go(-1);
            });
        }
    },
    created() {
        this.axios.post("/Staff/xun_type").then(res => {
            this.types = res.data.data;
            this.data = [];
            for (const v of this.types) {
                this.data.push({
                    garden_id: this.$route.query.garden_id,
                    ji_id: this.$store.state.user.userInfo.jiId,
                    staff_id: this.$store.state.user.userInfo.staff_id,
                    type_id: v.id
                });
            }
        });
    }
};
</script>

<style lang="less" scoped>
/deep/ .van-cell__title {
    max-width: 90px;
}
/deep/ .van-cell__value {
    text-align: left;
}
</style>

