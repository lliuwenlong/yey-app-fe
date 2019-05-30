<template>
    <div class="content">
        <el-row>
            <el-col :span="8">
                <router-link to="/CheckWork" style="color:#000;">
                    <div class="content-main">
                        <div class="content-main-img">
                            <img src="@/assets/images/kaoqin.png">
                        </div>
                        <div class="content-main-text">
                            考勤
                        </div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link to="/SettlementDetails" style="color:#000;">
                    <div class="content-main">
                        <div class="content-main-img">
                            <img src="@/assets/images/jiesuan.png">
                        </div>
                        <div class="content-main-text">
                            结算明细
                        </div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link to="/CleverInstantaneous" style="color:#000;">
                    <div class="content-main">
                        <div class="content-main-img">
                            <img src="@/assets/images/congmingshunjian.png">
                        </div>
                        <div class="content-main-text">
                            聪明瞬间
                        </div>
                    </div>
                </router-link>
            </el-col>
        </el-row>
        </div>
</template>
<script>
export default {
    name: 'SpecialTeacher'
}
</script>
<style lang="less" scoped>
.content {
  height: 3.1rem;
  width: 100%;
  font-size: 0.26rem;
  font-family: "PingFang-SC-Light";
}
.content-main-img {
    width: 1.7rem;
    margin: 0 auto;
    img {
        display: block;
        width: 100%;
        height: 100%;
        padding-top: 0.32rem;
        position: relative;
    }
}
.content-main-text {
    text-align: center;
    margin-top: 0.2rem;
}
</style>
