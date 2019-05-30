<template>
    <div class="content">
        <el-row>
            <el-col :span="8">
                <router-link to="/Homeproduced" style="color:#000;">
                    <div class="content-main">
                        <div class="content-main-img">
                            <img src="@/assets/images/jiayugongyu.png">
                        </div>
                        <div class="content-main-text">
                            家园共育
                        </div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link to="/Nutritionalmeals" style="color:#000;">
                    <div class="content-main">
                        <div class="content-main-img food">
                            <img src="@/assets/images/food.png" />
                        </div>
                        <div class="content-main-text">
                            营养膳食
                        </div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link to="/Studentfile" style="color:#000;">
                    <div class="content-main">
                        <div class="content-main-img">
                            <img src="@/assets/images/study.png">
                        </div>
                        <div class="content-main-text">
                            学生档案
                        </div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="8">
                <router-link to="/Smartmoment" style="color:#000;">
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
            <el-col :span="8">
                <router-link to="/GrowthFileShow" style="color:#000;">
                    <div class="content-main">
                        <div class="content-main-img">
                            <img src="@/assets/images/dudao.png">
                        </div>
                        <div class="content-main-text">
                            成长档案
                        </div>
                    </div>
                </router-link>
            </el-col>
            <van-col :span="8">
                <router-link to="/Teach" style="color:#000;">
                    <div class="content-main">
                        <div class="content-main-img">
                            <img src="@/assets/images/manage.png">
                        </div>
                        <div class="content-main-text">
                            教学管理
                        </div>
                    </div>
                </router-link>
            </van-col>
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
//   height: 3.1rem;
  width: 100%;
  font-size: 0.26rem;
  font-family: "PingFang-SC-Light";
}
.content-main-img {
    width: 1.7rem;
    margin: 0 auto;
    &.food {
        width: 1.6rem;
    }
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
