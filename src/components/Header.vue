<template>
  <van-nav-bar
    :title="title"
    :left-arrow="back"
    :left-text="back?left:null"
    :right-text="right"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script>
export default {
  props: {
    title: {
      default: ""
    },
    left: {
      default: "返回"
    },
    right: {
      default: ""
    },
    back: {
      default: true
    }
  },
  methods: {
    onClickLeft() {
      if (this.back) {
        this.$router.go(-1);
      } else {
        this.$emit("click-left");
      }
    },
    onClickRight() {
      this.$emit("click-right");
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: rgb(140, 198, 63);
}

.van-nav-bar__title {
  color: white;
}

.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__text {
  color: white;
  &:active {
    background-color: rgb(140, 198, 63);
  }
}
</style>
