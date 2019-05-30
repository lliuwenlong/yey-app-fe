<template>
  <div>
    <Head title="目标幼儿"/>
    <Fil :times="true" @change="getList"/>
    <van-cell-group v-for="(v,i) in list" :key="i">
      <van-row>
        <van-col span="8" class="Tl">{{ v.name }}</van-col>
        <van-col span="8" class="Tc">{{ v.idea }}</van-col>
        <van-col span="8" class="Tr">{{ v.user_name }}</van-col>
      </van-row>
    </van-cell-group>
  </div>
</template>

<script>
import Head from "@/components/Header.vue";
import Fil from "@/components/Filter.vue";
export default {
  components: {
    Head,
    Fil
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    getList(data) {
      this.axios
        .post("/TeacherApp//RecruitStudentsshow", {
          garden_id: this.$route.query.data.garden_id,
          starttime: data.times[0],
          endtime: data.times[1]
        })
        .then(res => {
          this.list = res.data.data;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell-group {
  line-height: 30px;

  .van-row {
    padding: 5px 15px;
  }
}
</style>
