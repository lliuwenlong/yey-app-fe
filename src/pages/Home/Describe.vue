<!-- 通告栏 -->
<template>
    <div class="content">
        <Head title="通告栏"/>
        <div v-if="tableData">
            <van-cell
                :title="item.inform_desc"
                v-for="(item,index) in tableData"
                :key="index"
                @click="showF=true;showData=item"
            />
        </div>
        <van-dialog v-model="showF" :title="showData.inform_title" show-cancel-button>
            <img :src="`/public/img/${showData.inform_photo}`" alt srcset>
            {{showData.inform_desc}}
            <p style="text-align:right">通知人员：{{showData.j_name}}{{showData.g_name | name}}</p>
            <p style="text-align:right">{{moment(showData.addtime*1000).format("Y-M-DD HH:mm")}}</p>
        </van-dialog>
    </div>
</template>

<script>
import Head from "@/components/Header.vue";
import moment from "moment"
export default {
    components: {
        Head
    },
    data() {
        return {
            moment,
            tableData: [],
            showF: false,
            showData: {}
        };
    },
    methods: {
        init() {
            let savePost = {
                garden_id: this.$store.state.user.userInfo.garden_id,
                ji_id: this.$store.state.user.userInfo.jiId
            };
            this.axios
                .post("/Inform/show", savePost)
                .then(res => {
                    this.tableData = res.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created() {
        this.init();
    },
    filters: {
        name(val) {
            return val ? `-${val}` : "";
        }
    }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
& /deep/ .van-dialog__content {
    padding: 20px;
    line-height: 24px;
    img{
        display: block;
        width: 80%;
        margin:10px 10%;
    }
}

</style>