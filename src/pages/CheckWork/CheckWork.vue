<template>
    <div class="check-work">
        <Head title="学生出勤"></Head>
        <div class="check-work-content">
            <div>
                <el-row type="flex" class="row-bg" justify="space-around" v-if="userInfo.roleStatus === 4">
                    <el-col :span="5" class="el-bg">
                        <div class="content-main">
                            <ul>
                                <li>{{studentInfo.recruitStudents}}人</li>
                                <li>招生人数</li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="5" class="el-bg">
                        <div class="content-main">
                            <ul>
                                <li>{{studentInfo.specialityStudents}}人</li>
                                <li>特长人数</li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="5" class="el-bg">
                        <div class="content-main">
                            <ul>
                                <li>{{studentInfo.dropOutStudents}}人</li>
                                <li>退园人数</li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="5" class="el-bg">
                        <div class="content-main">
                            <ul>
                                <li>{{studentInfo.clockingStudents}}人</li>
                                <li>出勤人数</li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-around" v-if="userInfo.roleStatus === 7">
                    <el-col :span="24" class="el-bg2">
                        <div class="content-main">
                            <ul>
                                <li>特长人数</li>
                                <li>{{studentList.length}}人</li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
                <div class="student-list-wrapper">
                    <div class="student-list-wrap">
                        <ul class="student-list">
                            <li>
                                <el-row type="flex" justify="space-around">
                                    <el-col :span="7">姓名</el-col>
                                    <el-col :span="7">出勤</el-col>
                                    <el-col :span="7">缺勤</el-col>
                                </el-row>
                            </li>
                            <li v-for="(item, key) in studentList" :key="key">
                                <el-row type="flex" justify="space-around">
                                    <el-col :span="7">{{item.name}}</el-col>
                                    <el-col :span="7">
                                        <div @click="addClockStuendent(key, 1)" class="icon-check">
                                            <i class="el-icon-check" v-if="item.clockStatus === 1"></i>
                                        </div>
                                    </el-col>
                                    <el-col :span="7">
                                        <div @click="addClockStuendent(key, 0)" class="icon-check">
                                            <i class="el-icon-check" v-if="item.clockStatus === 0"></i>
                                        </div>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                        <div class="number">
                            <span>出勤人数：{{attendanceNumer}}人</span>
                            <span>缺勤人数：{{studentList.length - attendanceNumer}}人</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-button type="default" class="button" @click="submit" :disabled="!Object.keys(addStudent).length">提交</van-button>
    </div>
</template>
<script>
import Head from '@/components/Header.vue'
import {mapState} from 'vuex';
import {Message} from 'element-ui'
export default {
    components: {
        Head
    },
    created() {
        this.getStudentInfo();
        this.getStudentList();
    },
    data() {
        return {
            studentInfo: {},
            studentList: [],
            addStudent: {}
        }
    },
    computed: {
        ...mapState('user', ['userInfo']),
        attendanceNumer() {
            return this.studentList.filter(item => item.clockStatus === 1).length;
        }
    },
    methods: {
        getStudentInfo() {
            this.axios.post('/TeacherApp/getStudentInfo', {
                userId: this.userInfo.admin_id
            }).then(res => {
                this.studentInfo = res.data.data;
            });
        },
        getStudentList() {
            const url = this.userInfo.roleStatus === 7 ? 'TeacherApp/getSpecialityAttendance' : '/TeacherApp/getStudentList';
            this.axios.post(url, {
                userId: this.userInfo.admin_id
            }).then(res => {
                this.studentList = res.data.data;
            });
        },
        addClockStuendent(key, status) {
            const {id, isAdd} = this.studentList[key];
            if (!!isAdd) {
                Message.warning('已提交数据不能修改');
                return;
            }
            const studentList = [...this.studentList];
            studentList[key].clockStatus = status;
            this.studentList = [...studentList];
            this.addStudent[id] = {status, id};
        },
        submit() {
            const studentArr = Object.keys(this.addStudent).map((item, key) => ({
                student_id: this.addStudent[item].id,
                status: this.addStudent[item].status
            }));
            const url = this.userInfo.roleStatus === 7 ? 'TeacherApp/addSpecialityAttendance' : '/TeacherApp/addClock';
            this.axios.post(url, {studentArr}).then(res => {
                if (res.data.state === '1') {
                    Message.success('提交成功');
                    this.getStudentInfo();
                    this.getStudentList();
                    this.addStudent();
                };
            });
        }
    }
}
</script>
<style lang="less" scoped>
.check-work {
    height: 100%;
    position: relative;
    .check-work-content {
        position: absolute;
        top: 46px;
        bottom: 44px;
        width: 100%;
        overflow: auto;
    }
    .row-bg {
        margin-top: 10px;
    }
    .el-bg2 {
        background: #fff;
        height: 1.3rem;
        line-height: 1.3rem;
        ul {
            padding: 0 10px;
            li {
                font-size: 14px;
                display: inline-block;
                width: 50%;
                &:last-child {
                    color: #8cc63f;
                    text-align: right;
                }
            }
        }
    }
    .el-bg {
        position: relative;
        border-radius: 5px;
        background: #fff;
        .content-main {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            ul {
                list-style: none;
                li {
                    text-align: center;
                    &:first-child {
                        color: #8cc63f;
                        margin-top: 18%;
                        font-size: 18px;
                    }
                    &:last-child {
                        margin-top: 5%;
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .el-bg::before{
        content: '';
        padding-top: 100%;
        display: block;
        cursor: none;
    }
    .student-list-wrap {
        margin-top: 20px;
        background: #fff;
        padding-bottom: 20px;
        .student-list {
            li {
                text-align: center;
                font-size: 14px;
                line-height: 40px;
                border-bottom: 1px solid #eee;
                .icon-check {
                    width: 100%;
                    height: 100%;
                }
                .el-icon-check {
                    color: #8cc63f;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
        }
        .number {
            text-align: right;
            margin-top: 20px;
            span {
                margin-right: 20px;
                font-size: 14px;
                color: red;
                &:first-child {
                    color: #8cc63f
                }
            }
        }
    }
    .button {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
}

</style>