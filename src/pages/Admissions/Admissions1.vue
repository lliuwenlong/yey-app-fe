<!-- 招生管理 -->
<template>
    <div class='content'>
        <Head title="招生管理" right="入院登记" @click-right="add"/>
        <Fil :types="['park']" @change="getList"/>
        <van-cell :title="v.sName" is-link v-for="(v,i) in message" @click="showFn(v)" :key="i"/>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Head from '@/components/Header.vue';
import Fil from '@/components/Filter.vue';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {
        Head,Fil
    },
    data() {
        // 这里存放数据
        return {
            message: [],
        };
    },
    // 方法集合
    methods: {
        getList(data) {
            this.axios.post('/student/student_source', {
                ji_id: this.$store.state.user.userInfo.jiId,
                parkId:data.park.id
            })
            .then((res) => {
                this.message = res.data.data.student;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        showFn(o) {
            this.$router.push({
                path: '/AdmissionsShow',
                query: {
                    o
                }
            });
        },
        add(){
            this.$router.push({
                path: '/AdmissionsAdd'
            });
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
    },
};
</script>
<style lang="less" scoped>
    .content {
        ul {
            padding: 10px 2%;

            li {
                width: 44%;
                margin: 3%;
                box-sizing: border-box;
                background: white;
                padding: 10px 15px;
                font-weight: bold;
                display: inline-block;

                p {
                    font-size: 16px;
                    line-height: 40px;
                }

                span {
                    line-height: 25px;
                    display: block;
                    color: #777;
                }
            }
        }
    }
</style>
