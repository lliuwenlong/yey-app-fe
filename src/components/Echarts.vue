<template>
    <div>
        <div ref="myChart" :style="ecStyle"></div>
    </div>  
</template>
<script>
export default {
    props: {
        ecStyle: {
            default: () => ({width: '300px', height: '300px'})
        },
        options: {
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            myChart: {}
        };
    },
    mounted(){
        this.drawLine();
    },
    methods: {
        drawLine(){
            let myChart = this.$echarts.init(this.$refs.myChart);
            // 绘制图表
            myChart.setOption(this.options);
            this.myChart = myChart;
        }
    },
    watch: {
        options(newVal, oldVal) {
            this.myChart.setOption(newVal)
        }
    }
}
</script>

<style lang="less" scoped>

</style>