<template>
  <div class="sider-section">
    <div class="sider-title">
      <img class="sider-logo" src="@/assets/house-logo.jpg" />
    </div>
    <Menu />
  </div>
</template>

<script>
import Menu from "./BasicLayoutSiderMenu";

export default {
  data() {
    return {};
  },
  components: {
    Menu
  }
};
</script>

<style lang="less" scoped>
.sider-section {
  position: relative;
  background-color: #fff;
  width: 250px;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.1);
  transform: all 0.2s ease;
  .sider-title {
    height: 64px;
    background-color: rgb(43, 84, 104);
    box-shadow: 0 0 2px rgba(90, 88, 88, 0.212);
    margin-bottom: 20px;
    text-align: center;
    .sider-logo {
      width: 120px;
      height: 64px;
    }
  }
}
</style>
