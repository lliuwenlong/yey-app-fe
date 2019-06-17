<template>
    <div>
        <Head title="档案详情"/>
        <div v-for="(v,i) in list" :key="i">
            <van-panel title="学生姓名" :desc="v.studentname"></van-panel>
            <van-panel :title="v.desc">
                <ul>
                    <li v-for="(vv,ii) in v.img" :key="ii">
                        <img :src="'/public/img/'+vv">
                    </li>
                </ul>
            </van-panel>
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
            list: [],
            data: this.$route.query.data
        };
    },
    created() {
        this.axios
            .post("/staff/recordXQ", {
                student_id: this.data?this.data.id:null,
                user_id: this.$store.state.user.userInfo.admin_id,
                roleStatus: this.$store.state.user.userInfo.roleStatus
            })
            .then(res => {
                this.list = res.data.data;
                // this.list = this.list.concat(this.list);
            });
    }
};
</script>

<style lang="less" scoped>
.van-panel {
    margin-bottom: 10px;
}
.van-panel__content {
    overflow: hidden;
    padding-bottom: 5px;
    ul {
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        padding: 0 15px;

        li {
            display: inline-block;
            width: 80px;
            margin-right: 10px;
            text-align: center;
            img {
                width: 100%;
                height: 80px;
            }
        }
    }
}
</style>
