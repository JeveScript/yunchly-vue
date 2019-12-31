<template>
  <div class="container">
    <h3 class="title">增加一个轮播图</h3>
    <div class="image-title">封面图：</div>
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :http-request="handleCover"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="image-title">页面内容：</div>
    <el-select v-model="value" class="option" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-button class="btn" type="primary" @click="handleCreate">添加</el-button>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import bannerService from "@/global/service/banner.js";
import articleService from "@/global/service/article.js";

export default {
  data() {
    return {
      imageUrl: "",
      value: "",
      options: []
    };
  },
  created() {
    articleService.list().then(res => {
      this.options = res.data;
    });
  },
  methods: {
    handleCreate() {
      console.log(this.imageUrl, this.value);
      if (this.imageUrl && this.value) {
        let params = {
          image_url: this.imageUrl,
          pages: this.value
        };
        bannerService.insert(params).then(res => {
          if (res.code !== 200) {
            this.$message({
              message: res.message,
              type: "warning"
            });
            return;
          }
          this.$router.push({ name: "banner" });
        });
      } else {
        this.$message({
          message: "缺少必要参数",
          type: "warning"
        });
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleCover(files) {
      qiniuService.upload(files.file).then(res => {
        this.imageUrl = res;
      });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}
.title {
  padding: 20px;
}
.image-title {
  padding: 20px 0 0 20px;
}
.btn {
  display: block;
  margin: 50px 0 20px 100px;
}
.avatar-uploader,
.el-upload {
  width: 178px;
  height: 178px;
  border: 1px dashed #4169e1;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 0 30px 100px;
}
.avatar-uploader:hover {
  border-color: #000080;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.option {
  margin-left: 100px;
}
</style>
