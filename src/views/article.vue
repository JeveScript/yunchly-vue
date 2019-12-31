<template>
  <div class="container">
    <el-button @click="handleAdd()">添加 </el-button>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in articleData" :key="item.id">
        <el-card :body-style="{ padding: '20px 0 0 0' }" class="el-card">
          <div class="article-title">{{ item.title }}</div>
          <div class="bottom">
            <el-button
              type="text"
              size="small"
              class="btn"
              @click="handleTitle(item.id)"
            >
              修改标题
            </el-button>
            <el-button
              type="text"
              size="small"
              class="btn"
              @click="handleSee(item.id)"
            >
              修改内容
            </el-button>
            <el-button
              type="text"
              size="small"
              class="btn"
              @click="handleDelete(item.id)"
            >
              删除文章
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import articleService from "@/global/service/article.js";

export default {
  data() {
    return {
      articleData: []
    };
  },
  created() {
    this.onload();
  },
  methods: {
    onload() {
      articleService.list().then(res => {
        this.articleData = res.data;
      });
    },
    handleAdd() {
      this.$router.push({ name: "articleCreate" });
    },
    handleSee(id) {
      this.$router.push({ name: "articleSingle", params: { id } });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          articleService.delete(id).then(res => {
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
    },
    handleTitle(id) {
      let h = this.$createElement;
      this.$msgbox({
        title: "修改标题",
        message: h("p", null, [h("span", null, "输入文章名称： ")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showInput: true
      })
        .then(active => {
          if (!active.value) {
            this.$message.error("值不能为空");
            return;
          }
          articleService.update(id, { title: active.value }).then(res => {
            if (res.code !== 200) {
              console.log(res.message);
              return;
            }
            this.onload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
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
.article-title {
  padding: 0 14px;
  font-size: 16px;
  color: #555;
}
</style>
