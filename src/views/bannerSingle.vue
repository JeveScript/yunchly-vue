<template>
  <div class="container">
    <el-upload
      class="editImage"
      action=""
      :show-file-list="false"
      :http-request="handleEditImage"
      :before-upload="beforeAvatarUpload"
    >
      编辑封面
    </el-upload>
    <div class="content">
      <div class="title">内容:</div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div class="btn" @click="handleChange">确定更改</div>
    </div>
  </div>
</template>

<script>
import bannerService from "@/global/service/banner.js";
import articleService from "@/global/service/article.js";
import qiniuService from "@/global/service/qiniu.js";

export default {
  data() {
    return {
      contentData: {},
      value: "",
      options: []
    };
  },
  created() {
    this.onload();
  },
  methods: {
    onload() {
      let id = this.$route.params.id;
      bannerService.single(id).then(res => {
        this.contentData = res.data;
        this.value = Number(res.data.pages);
      });
      articleService.list().then(res => {
        this.options = res.data;
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleEditImage(files) {
      qiniuService.upload(files.file).then(res => {
        const image_url = res;
        let id = this.$route.params.id;
        bannerService.update(id, { image_url }).then(res => {
          if (res.code !== 200) {
            console.log(res.message);
            return;
          }
          this.$message({
            message: res.message,
            type: "success"
          });
        });
      });
    },
    handleChange() {
      let id = this.$route.params.id;
      let value = this.value;
      if (value) {
        bannerService.update(id, { pages: value }).then(res => {
          if (res.code !== 200) {
            console.log(res.message);
            return;
          }
          this.$message({
            message: res.message,
            type: "success"
          });
          this.onload();
        });
      } else {
        this.$error({
          message: "不能为空"
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.image {
  max-width: 100%;
  margin: 100px 0;
}
.editImage {
  position: absolute;
  top: 40px;
  left: 40px;
  color: #66b1ff;
}
.editContent {
  position: absolute;
  top: 40px;
  right: 40px;
  color: #66b1ff;
}
.content {
  display: flex;
  font-size: 14px;
  line-height: 40px;
  padding: 100px 0;
}
.title {
  margin-right: 30px;
  color: #444;
}
.btn {
  margin-left: 30px;
  color: #66b1ff;
}
</style>
