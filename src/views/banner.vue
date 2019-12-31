<template>
  <div class="container">
    <el-button @click="handleAdd()">添加 </el-button>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in bannerData" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" class="el-card">
          <el-image :src="item.image_url" class="image" fit="contain">
          </el-image>
          <div class="bottom">
            <el-button
              type="text"
              size="small"
              class="btn"
              @click="handleSee(item.id)"
            >
              更换内容
            </el-button>
            <el-button
              type="text"
              size="small"
              class="btn"
              @click="handleDelete(item.id)"
            >
              删除项目
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bannerService from "@/global/service/banner.js";

export default {
  data() {
    return {
      bannerData: []
    };
  },
  created() {
    this.onload();
  },
  methods: {
    onload() {
      bannerService.list().then(res => {
        this.bannerData = res.data;
      });
    },
    handleAdd() {
      this.$router.push({ name: "bannerCreate" });
    },
    handleSee(id) {
      this.$router.push({ name: "bannerSingle", params: { id } });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          bannerService.delete(id).then(res => {
            if (res.code !== 200) {
              this.$message.error(res.message);
            } else {
              this.$message({
                type: "success",
                message: res.message
              });
              this.onload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-card {
  margin: 20px 0;
  width: 100%;
}
.image {
  height: 20vh;
}
.bottom {
  display: flex;
  padding: 14px;
}
</style>
