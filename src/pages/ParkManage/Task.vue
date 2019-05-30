<template>
    <div>
        <Head title="任务管理" />
        <div class="task-list-wrap">
            <ul>
                <li v-for="(item, key) in list" :key="key">
                    <span class="name">{{item.name}}</span>
                    <span class="rate">{{item.rate}}%</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Head from "@/components/Header";
import Fil from "@/components/Filter";
export default {
    data() {
        return {
            list: [
                {
                    name: '出勤率',
                    rate: 10
                },
                {
                    name: '招生率',
                    rate: 20
                },
                {
                    name: '特长率',
                    rate: 30
                },
                {
                    name: '安全率',
                    rate: 40
                },
            ]
        };
    },
    components: {
        Head,
        Fil
    }
}
</script>
<style lang="less" scoped>
    .task-list-wrap {
        padding: 0 20px;
        ul {
            list-style: none;
            li {
                height: 60px;
                background: #fff;
                border-radius: 5px;
                margin-top: 10px;
                line-height: 50px;
                .name {
                    float: left;
                    margin-left: 10px;
                    font-size: 14px;
                    vertical-align: middle;
                    margin-top: 5px;
                }
                .rate {
                    float: right;
                    margin-right: 10px;
                    width: 90px;
                    height: 40px;
                    border-radius: 30px;
                    border: 1px solid #8cc63f;
                    position: relative;
                    top: 50%;
                    margin-top: -20px;
                    font-size: 14px;
                    color: #8cc63f;
                    text-align: center;
                    line-height: 40px;
                }
            }
        }
    }
</style>


