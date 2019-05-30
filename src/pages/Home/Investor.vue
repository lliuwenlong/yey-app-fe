<template>
    <div class="content">
        <van-row>
            <van-col span="6">
                <router-link to="/Nutritionalmeals" style="color:#000;">
                    <dl>
                        <dt>
                            <img src="@/assets/images/shanshi.png">
                        </dt>
                        <dd>膳食营养</dd>
                    </dl>
                </router-link>
            </van-col>
            <van-col span="6">
                <router-link to="/ParkManage" style="color:#000;">
                    <dl>
                        <dt>
                            <img src="@/assets/images/jingying.png">
                        </dt>
                        <dd>园所经营</dd>
                    </dl>
                </router-link>
            </van-col>
            <van-col span="6">
                <router-link to="/Targetmanage" style="color:#000;">
                    <dl>
                        <dt>
                            <img src="@/assets/images/zhibiao.png">
                        </dt>
                        <dd>指标统计</dd>
                    </dl>
                </router-link>
            </van-col>
            <van-col span="6">
                <router-link to="/Assess" style="color:#000;">
                    <dl>
                        <dt>
                            <img src="@/assets/images/kaohe.png">
                        </dt>
                        <dd>考核管理</dd>
                    </dl>
                </router-link>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="6">
                <router-link to="/WorkLog" style="color:#000;" v-if="userInfo.roleStatus !== 4">
                    <dl>
                        <dt>
                            <img src="@/assets/images/kaoqin.png">
                        </dt>
                        <dd>工作日志</dd>
                    </dl>
                </router-link>
                <router-link to="/CheckWork" style="color:#000;" v-if="userInfo.roleStatus === 4">
                    <dl>
                        <dt>
                            <img src="@/assets/images/kaoqin.png">
                        </dt>
                        <dd>考勤</dd>
                    </dl>
                </router-link>
            </van-col>
            <van-col span="6">
                <router-link to="/Admissions" style="color:#000;" v-if="userInfo.roleStatus === 2">
                    <dl>
                        <dt>
                            <img src="@/assets/images/zhaosheng.png">
                        </dt>
                        <dd>招生管理</dd>
                    </dl>
                </router-link>
            </van-col>
            <van-col span="6">
                <router-link to="/Admissions1" style="color:#000;" v-if="userInfo.roleStatus === 4">
                    <dl>
                        <dt>
                            <img src="@/assets/images/zhaosheng.png">
                        </dt>
                        <dd>招生管理</dd>
                    </dl>
                </router-link>
            </van-col>
            <van-col span="6">
                <router-link to="/patrolGarden" style="color:#000;">
                    <dl>
                        <dt>
                            <img src="@/assets/images/dudao.png">
                        </dt>
                        <dd>督导日志</dd>
                    </dl>
                </router-link>
            </van-col>
            <van-col span="6">
                <router-link to="/Teach" style="color:#000;">
                    <dl>
                        <dt>
                            <img src="@/assets/images/manage.png">
                        </dt>
                        <dd>教学管理</dd>
                    </dl>
                </router-link>
            </van-col>
        </van-row>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "Investor",
    computed: {
        ...mapState("user", ["userInfo"])
    }
};
</script>
<style lang="less" scoped>
.content {
    height: 6.1rem;
    width: 100%;
    font-size: 0.26rem;
    font-family: "PingFang-SC-Light";
}
.content dl {
    text-align: center;
}
.content dt {
    /* height: 1rem; */
    width: 1.7rem;
    padding-top: 0.2rem;
    margin-left: 0.4rem;
    margin-bottom: 0.2rem;
}
.content dt img {
    width: 100%;
    height: 100%;
    display: inline-block;
    padding-top: 0.32rem;
}
.content dd {
    padding-bottom: 0.24rem;
}
</style>
