<template>
  <div class="container">
    <el-button
      class="insert-btn"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="handleInsert()"
      >添加
    </el-button>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in columnData" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" class="el-card">
          <el-image :src="item.image_url" class="image" fit="cover"> </el-image>
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
            <div class="bottom">
              <p class="desc">{{ item.desc }}</p>
              <el-button type="text" size="small" @click="handleSee(item.id)"
                >查看</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import columnService from "@/global/service/column.js";

export default {
  data() {
    return {
      columnData: []
    };
  },
  created() {
    columnService.all().then(res => {
      this.columnData = res.data;
    });
  },
  methods: {
    handleSee(id) {
      this.$router.push({ name: "columnSingle", params: { id } });
    },
    handleInsert() {
      this.$router.push({ name: "columnCreate" });
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  padding-top: 60px;
}
.insert-btn {
  position: absolute;
  top: 15px;
  right: 20px;
}
.el-card {
  margin: 20px 0;
  width: 100%;
}
.image {
  height: 20vh;
}
.bottom {
  margin-top: 13px;
  line-height: 28px;
  display: flex;
  justify-content: space-between;
}
.desc {
  font-size: 12px;
  color: #999;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.button {
  width: 100%;
  padding: 0;
}
</style>
