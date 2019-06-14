<template>
    <div>
        <Head title="目标幼儿" right="入园登记" @click-right="onClickRight"  />
        <Fil :times="true" @change="getList" />
        <van-cell-group v-for="(v,i) in list" :key="i">
            <van-row>
                <van-col span="4" class="Tl">{{ v.name }}</van-col>
                <van-col span="4" class="Tc">{{ v.idea }}</van-col>
                <van-col span="4" class="Tr">{{ v.user_name }}</van-col>
                <van-col span="4" class="Tc">
                    <van-button type="default" size="mini" @click="into(v)">入园</van-button>
                </van-col>
                <van-col span="4" class="Tc">
                    <van-button type="default" size="mini" @click="addList(v)">填写</van-button>
                </van-col>
                <van-col span="4" class="Tc">
                    <van-button type="default" size="mini" @click="lookDeic(v)">查看</van-button>
                </van-col>
            </van-row>
        </van-cell-group>
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
            list: []
        };
    },
    methods: {
        getList(data) {
            this.axios
                .post("/TeacherApp//RecruitStudentsshow", {
                    garden_id: this.$route.query.garden_id,
                    ji_id: this.$route.query.ji_id,
                    starttime: data.times[0],
                    endtime: data.times[1]
                })
                .then(res => {
                    this.list = res.data.data;
                });
        },
        addList(v) {
            this.$router.push({path: '/AddAdmissions', query: {id: v.id}});
        },
        lookDeic(v) {
            this.$router.push({path: '/FollowupRecord', query: {id: v.id}});
        },
        onClickRight() {
			this.$router.push({
				path: '/AdmissionsAdd'
			})
        },
        into(o) {
            this.axios
                .post("Student/yruyuan", {
                    student_id: o.id
                })
                .then(res => {
                    this.$router.push({
                        path: '/gardenManage_student_add',
                        query: {data: JSON.stringify(res.data.data)}
                    });
                });
        }
    }
};
</script>

<style lang="less" scoped>
.van-cell-group {
    line-height: 30px;

    .van-row {
        padding: 5px 15px;
    }
}
</style>
