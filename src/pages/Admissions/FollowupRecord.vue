<template>
    <div>
        <Head title="目标幼儿-查看"/>
        <div class="app-container">
            <div style="margin-bottom:15px" v-for="(v,i) in showList" :key="i">
                <h4>负责人：{{v.fuzeren}}</h4>
                <span style="line-height:30px;">意向：{{v.status}}</span>
                <span class="fr" style="float: right;margin-top:5px;">
                    <a :href="`/public/img/${v.img}`" style="color:blue;cursor:pointer;text-decoration:underline;">附件</a>
                    时间：{{v.time}}
                </span>
                <div
                    style="border:1px #333 solid;padding:10px;height:80px;overflow-y:auto"
                >{{v.desc}}</div>
            </div>
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
            showList: []
        }
    },
    created() {
        this.axios
            .post("/student/student_txshow", {
                studentid: this.$route.query.id
            })
            .then(res => {
                this.showList = res.data.data;
            });
    }
};
</script>
<style lang="less">
.app-container {
    padding: 15px;
}
</style>