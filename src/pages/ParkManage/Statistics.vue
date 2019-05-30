<template>
  <div class="Statistics">
    <Head title="资产明细"/>
    <Fil :types="['park','class']" @change="getList"/>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="资产"></el-table-column>
      <el-table-column prop="addtime" label="购置时间" width="100"></el-table-column>
      <el-table-column prop="number" label="数量" width="50"></el-table-column>
      <el-table-column prop="price" label="单价" width="50"></el-table-column>
      <el-table-column label="核销数量" width="80">
        <template slot-scope="scope">
          <van-field v-model="scope.row.real_quantity" placeholder="核销数量"/>
        </template>
      </el-table-column>
    </el-table>
    <van-button class="Fb" plain type="primary" size="large" @click="edit">保存</van-button>
  </div>
</template>

<script>
import Fil from "@/components/Filter.vue";
import Head from "@/components/Header.vue";
export default {
  components: {
    Head,
    Fil
  },
  data() {
    return {
      list: [],
      data: {}
    };
  },
  methods: {
    getList(data) {
      if (data)
        this.data = {
          garden_id: data.park.id,
          class_id: data.class.id
        };
      this.axios.post("/money/getProperty", this.data).then(res => {
        this.list = res.data.data;
        for (const key in this.list) {
          this.list[key].realQuantity_o = this.list[key].real_quantity;
        }
      });
    },
    edit() {
      let arr = [];
      for (const v of this.list) {
        if (v.realQuantity_o != v.real_quantity) {
          arr.push(
            this.axios.post("/money/real_quantity_add", {
              id: v.id,
              real_quantity: v.real_quantity
            })
          );
        }
      }
      Promise.all(arr).then(res => {
        console.log(res)
        this.$message.success(res[0].data.msg);
        this.getList();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.van-field {
  padding: 0;
}
</style>

