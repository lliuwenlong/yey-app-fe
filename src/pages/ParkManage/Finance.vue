<template>
  <div>
    <Head title="财务报表"/>
    <Fil
      :types="['park','class']"
      :times="true"
      :timesData="[moment().subtract(1, 'month').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')]"
      @change="getList"
      all
    />
    <van-row class="fang">
      <van-col span="8" v-for="(v,i) in fang" :key="i">
        <div>
          <span class="zhanbi">
            <span v-if="v.zhanbi">占比：{{v.zhanbi}}</span>
          </span>
          <h2>{{v.value}}</h2>
          <p>{{v.name}}</p>
        </div>
      </van-col>
    </van-row>
    <van-cell-group>
      <div class="header">
        <span class="title">应收</span>
        <span class="company">金额/(元)</span>
        <!-- <span class="net-amount">应收净额：{{}}元</span> -->
        <span class="sum">应收额：{{incomeData.sum}}元</span>
      </div>
      <Echarts :ecStyle="{width: '100%', height: '300px'}" :options="incomeOption"></Echarts>
    </van-cell-group>
    <van-cell-group>
      <div class="header">
        <span class="title">返费</span>
        <span class="company">金额/(元)</span>
        <!-- <span class="net-amount">返费净额：{{}}元</span> -->
        <span class="sum">返费额：{{returnData.sum}}元</span>
      </div>
      <Echarts :ecStyle="{width: '100%', height: '300px'}" :options="returnOption"></Echarts>
    </van-cell-group>
    <van-cell-group>
      <div class="header">
        <span class="title">变动费</span>
        <span class="company">金额/(元)</span>
        <span class="proportion">占比：{{variableFeeData.zb}}</span>
        <span class="sum">合计：{{variableFeeData.sum}}元</span>
      </div>
      <Echarts :ecStyle="{width: '100%', height: '300px'}" :options="variableFeeOption"></Echarts>
    </van-cell-group>
    <van-cell-group>
      <div class="header">
        <span class="title">固定费</span>
        <span class="company">金额/(元)</span>
        <span class="proportion">占比：{{fixedCostData.zb}}</span>
        <span class="sum">合计：{{fixedCostData.sum}}元</span>
      </div>
      <Echarts :ecStyle="{width: '100%', height: '300px'}" :options="fixedCostOption"></Echarts>
    </van-cell-group>
  </div>
</template>

<script>
import Echarts from "@/components/Echarts";
import Head from "@/components/Header";
import Fil from "@/components/Filter";
export default {
  components: {
    Head,
    Echarts,
    Fil
  },
  async beforeMount() {
    this.itemStyle = {
      normal: {
        color: "#9bc349",
        label: {
          show: true,
          position: "top",
          color: "black"
        }
      }
    };
  },
  data() {
    return {
      fang: {},
      variableFeeData: {},
      variableFeeOption: {},
      fixedCostData: {},
      fixedCostOption: {},
      returnData: {},
      returnOption: {},
      incomeData: {},
      incomeOption: {},
      class_id: null,
      garden_id: null,
      start: null,
      end: null
    };
  },
  methods: {
    getParams() {
      return {
        class_id: this.class_id,
        garden_id: this.garden_id,
        start: this.start,
        end: this.end
      };
    },
    getList(data) {
      this.class_id = data.class.id;
      this.garden_id = data.park.id;
      this.start = data.times[0];
      this.end = data.times[1];
      // 应收
      this.getIncome();
      // 返费柱
      this.getReturndata();
      // 固定费
      this.getFixedCost();
      // 变动费
      this.getVariableFee();
      this.axios
        .post("/FinancialStatement/get_Border_Interests", this.getParams())
        .then(res => {
          if (res.data.state == -1) return;
          for (const key in res.data) {
            if (key.indexOf("占比") != -1) {
              this.fang[key.split("占比")[0]] = this.fang[key.split("占比")[0]]
                ? this.fang[key.split("占比")[0]]
                : {};
              this.fang[key.split("占比")[0]].zhanbi = res.data[key];
            } else {
              this.fang[key] = this.fang[key] ? this.fang[key] : {};
              this.fang[key].name = key;
              this.fang[key].value = res.data[key];
            }
          }
          this.fang = { ...this.fang };
        });
    },
    getIncome() {
      this.axios
        .post("/FinancialStatement/income", { ...this.getParams() })
        .then(res => {
          this.incomeData = res.data.data ? res.data.data : {};
          console.log(res.data.data);
          const money = this.incomeData.money;
          const keys = Object.keys(money);
          this.incomeOption = {
            xAxis: {
              type: "category",
              data: keys
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: keys.map(item => money[item]),
                type: "bar",
                itemStyle: this.itemStyle,
                barWidth: 20
              }
            ]
          };
        });
    },
    getReturndata() {
      this.axios
        .post("/FinancialStatement/returndata", { ...this.getParams() })
        .then(res => {
          this.returnData = res.data.data ? res.data.data : {};
          const money = this.returnData.money;
          const keys = Object.keys(money);
          this.returnOption = {
            xAxis: {
              type: "category",
              data: keys
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: keys.map(item => money[item]),
                type: "bar",
                itemStyle: this.itemStyle,
                barWidth: 20
              }
            ]
          };
        });
    },
    getFixedCost() {
      this.axios
        .post("/FinancialStatement/fixedCost", { ...this.getParams() })
        .then(res => {
          this.fixedCostData = res.data.data ? res.data.data : {};
          const money = this.fixedCostData.money;
          const keys = Object.keys(money);
          console.log(keys);
          this.fixedCostOption = {
            xAxis: {
              type: "category",
              data: keys,
              axisLabel: {
                interval: 0
              }
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: keys.map(item => money[item]),
                type: "bar",
                itemStyle: this.itemStyle,
                barWidth: 20
              }
            ]
          };
        });
    },
    getVariableFee() {
      this.axios
        .post("/FinancialStatement/variableFee", { ...this.getParams() })
        .then(res => {
          this.variableFeeData = res.data.data ? res.data.data : {};
          const money = this.variableFeeData.money;
          const keys = Object.keys(money);
          this.variableFeeOption = {
            xAxis: {
              type: "category",
              data: keys
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: keys.map(item => money[item]),
                type: "bar",
                itemStyle: this.itemStyle,
                barWidth: 20
              }
            ]
          };
        });
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell-group {
  padding: 0 15px;
  .header {
    border-bottom: 1px #eee solid;
    height: 50px;
    line-height: 50px;
    .title {
      font-size: 16px;
      margin-right: 10px;
    }
    .company {
      font-size: 12px;
    }
    .proportion {
      float: right;
      font-size: 14px;
    }
    .sum {
      float: right;
      margin-right: 10px;
      font-size: 14px;
    }
    .net-amount {
      float: right;
      font-size: 14px;
    }
  }
}
.fang {
  overflow: hidden;
  .van-col {
    padding: 10px;
    div {
      background: white;
      padding: 10px 0;
      list-style: none;
      box-shadow: 10px 8px 10px #eee;
      -webkit-box-shadow: 0px 0px 30px #cdcdcd;
      border-radius: 15px;
      span.zhanbi {
        text-align: center;
        display: block;
        color: #c00;
        // padding: 15px 20px;
        height: 30px;
        line-height: 30px;
      }
      h2 {
        text-align: center;
        color: #9bc349;
        line-height: 40px;
        font-size: 16px;
        overflow: hidden;
      }
      p {
        text-align: center;
        // font-weight: bold;
        font-size: 14px;
      }
    }
  }
}
</style>