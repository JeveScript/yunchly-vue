<template>
  <div class="container">
    <h3 class="title">增加一个合辑</h3>
    <el-form
      :model="formData"
      :rules="rules"
      ref="Form"
      label-position="left"
      label-width="100px"
      class="el-form"
    >
      <el-form-item
        class="warpper"
        label="名称："
        prop="title"
        style="width:500px;"
      >
        <el-input v-model="formData.title" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item
        class="warpper"
        label="描述："
        prop="desc"
        style="width:500px;"
      >
        <el-input v-model="formData.desc" placeholder="请输入描述" />
      </el-form-item>
      <div class="image-title">展示图：</div>
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :http-request="handleAvatar"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item class="warpper">
        <el-button type="primary" @click="handleCreate">添加</el-button>
        <el-button type="info" @click="handlereturn">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import columnService from "@/global/service/column.js";

export default {
  data() {
    return {
      imageUrl: "",
      formData: {
        title: "",
        desc: ""
      },
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleCreate() {
      this.$refs.Form.validate(valid => {
        let imageUrl = this.imageUrl;
        if (valid && imageUrl) {
          let params = {
            title: this.formData.title,
            desc: this.formData.desc,
            imageUrl: this.imageUrl
          };
          columnService.insert(params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$router.push({ name: "column" });
            }
          });
        } else {
          this.$message({
            message: "缺少必要参数",
            type: "warning"
          });
        }
      });
    },
    handleAvatar(files) {
      qiniuService.upload(files.file).then(res => {
        this.imageUrl = res;
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handlereturn() {
      this.$router.push({ name: "column" });
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
  padding: 30px;
}
.el-form {
  padding: 10px 0 0 30px;
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
</style>
