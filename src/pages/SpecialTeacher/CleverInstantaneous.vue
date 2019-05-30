<template>
    <div class='content'>
		<Head title="聪明瞬间" />
        <div class="clever-instantaneous">
            <div class="clever-instantaneous-wrap">
                <ul class="student-list">
                    <li v-for="(item, key) in studentList" :key="key" :class="{active: item.id === active}" @click="active = item.id">
                        {{item.name}}
                    </li>
                </ul>
                <div class="title">
                    <van-field v-model="value" placeholder="请输入标题" />
                </div>
                <div class="uplaod-img">
                    <h3>图片上传</h3>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-upload
                            class="upload-demo"
                            name="files"
                            action="/Api/Staff/mu_add"
                            multiple
                            :limit="3"
                            :on-success="onSuccess"
                            :on-remove="handleRemove"
                            accept=".jpeg"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-row>
                </div>
                <div class="uplaod-img">
                    <h3>视频上传</h3>
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-upload
                            class="upload-demo"
                            name="files"
                            action="/Api/Staff/mu_add"
                            multiple
                            :limit="1"
                            :on-success="onVedioSuccess"
                            :on-remove="vedioHandleRemove"
                            accept=".mp4"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-row>
                </div>
            </div>
            <van-button type="default" class="button" @click="submit">保存</van-button>
        </div>
	</div>
</template>
<script>
import Head from '@/components/Header.vue';
import { Message } from 'element-ui';
export default {
    name: 'CleverInstantaneous',
    created() {
        this.smartMoment();
    },
    data() {
        return {
            studentList: [],
            active: '',
            fileList: [],
            value: '',
            veidoList: []
        };
    },
    components: {
        Head
    },
    computed: {
    },
    methods: {
        smartMoment() {
            this.axios.post('/TeacherApp/smartMoment', {
                user_id: this.$store.state.user.userInfo.admin_id
            }).then(res => {
                this.studentList = res.data.data;
            })
        },
        onSuccess(res, files, fileList) {
            this.fileList = fileList.map(item => {
                return {
                    name: item.name,
                    data: item.response.data
                }
            });
        },
        handleRemove(files, fileList) {
            this.fileList = fileList;
        },
        onVedioSuccess(res, files, fileList) {
            this.veidoList = fileList.map(item => {
                return {
                    name: item.name,
                    data: item.response.data
                }
            });
        },
        vedioHandleRemove(files, fileList) {
            this.veidoList = fileList;
        },
        submit(){
            if (this.value === '') {
                Message.warning('请输入标题');
                return
            }
            if (this.active === '') {
                Message.warning('请选择学生');
                return;
            }
            if (this.fileList.length < 3) {
                Message.warning('请上传3张图片');
                return;
            }
            const params = {
                img1: this.fileList[0].data,
                img2: this.fileList[1].data,
                img3: this.fileList[2].data,
                voide: this.veidoList[0] ? this.veidoList[0].data : undefined,
                student_id: this.active,
                title: this.value,
                user_id: this.$store.state.user.userInfo.class_id
            };
            this.axios.post('/TeacherApp/smartMoment_up', params).then(res => {
                if(res.data.state == '1') {
                    Message.warning('保存成功');
                };
            })
        }
    }
}
</script>
<style lang="less" scoped>
.content {
    height: 100%;
    position: relative;
    .clever-instantaneous {
        position: absolute;
        top: 46px;
        bottom: 0;
        width: 100%;
        overflow: auto;
        .clever-instantaneous-wrap {
            padding: 0 10px;
            ul {
                list-style: none;
                overflow: hidden;
                .active {
                    color: #8cc63f;
                }
                li {
                    float: left;
                    width: 25%;
                    height: 30px;
                    padding: 5px 0;
                    font-size: 14px;
                    line-height: 30px;
                    text-align: center;
                }
            }
            .title {
                margin-top: 20px;
            }
            .uplaod-img {
                margin-top: 20px;
                h3 {
                    font-size: 14px;
                    font-weight: 400;
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
    .row-bg {
        margin-top: 20px;
    }
    .el-bg {
        position: relative;
        .uoplaod-wrap {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
        }
        .uoplaod-content {
            width: 100%;
            height: 100%;
            .el-upload{
                width: 100%;
                height: 100%;
            }
        }
    }
    .row-bg {
        background: #ffffff;
        padding: 10px 0;
    }
}
.button {
    width: 100%;
    position: absolute;
    bottom: 0;
}
</style>


