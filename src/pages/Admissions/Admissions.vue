<!-- 招生管理 -->
<template>
    <div class='content'>
        <Head title="招生管理" />
        <ul>
            <li v-for='(item,index) in message' :key="index" @click="showFn(item)">
                <p>{{item.name}}</p>
                <span>{{item.idea1}}（{{item.count1}}）</span>
                <span>{{item.idea2}}（{{item.count2}}）</span>
                <span>{{item.idea3}}（{{item.count3}}）</span>
                <!-- <span class="ryxq">详情</span> -->
            </li>
        </ul>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Head from '@/components/Header.vue';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {
        Head,
    },
    data() {
        // 这里存放数据
        return {
            message: [],
        };
    },
    // 方法集合
    methods: {
        getList() {
            this.axios.post('/TeacherApp/RecruitStudents', {
                ji_id: this.$store.state.user.userInfo.jiId,
            })
                .then((res) => {
                    this.message = res.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        showFn(o) {
            console.log(o);
            this.$router.push({
                path: '/AdmissionsList',
                query: {
                    garden_id: o.garden_id,
                    ji_id: o.ji_id
                }
            });
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getList();
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
