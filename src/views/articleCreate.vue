<template>
  <div class="container">
    <h3 class="title">增加一个文章</h3>
    <form class="article-form">
      <span class="text-title">标题</span>
      <el-input class="text-input" v-model="title" placeholder="请输入名称" />
    </form>
    <div class="image-title">内容：</div>
    <div style="height:500px;">
      <quill-editor
        class="quill-editor"
        v-model="contentUrl"
        ref="myQuillEditor"
        :options="editorOption"
        style="height:400px;"
      >
      </quill-editor>
    </div>
    <el-button class="btn" type="primary" @click="handleCreate">添加</el-button>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import articleService from "@/global/service/article.js";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

const uploadConfig = {
  name: "image_url",
  size: 500, // 图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg", // 可选 可上传的图片格式
  QINIU_API: "http://upload-z2.qiniup.com"
};
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"]
];
const handlers = {
  image: function() {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", uploadConfig.accept);
    fileInput.classList.add("ql-image");
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (uploadConfig.size && file.size >= uploadConfig.size * 1024) {
        fileInput.value = "";
        return;
      }
      qiniuService.upload(file).then(res => {
        let length = this.quill.getSelection(true).index;
        this.quill.insertEmbed(length, "image", res);
        this.quill.setSelection(length + 1);
      });
    });
    fileInput.click();
  }
};

export default {
  data() {
    return {
      contentUrl: "",
      title: "",
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: handlers
          }
        }
      }
    };
  },
  methods: {
    handleCreate() {
      if (this.contentUrl && this.title) {
        let params = {
          content: this.contentUrl,
          title: this.title
        };
        articleService.insert(params).then(res => {
          if (res.code !== 200) {
            this.$message({
              message: res.message,
              type: "warning"
            });
            return;
          }
          this.$router.push({ name: "article" });
        });
      } else {
        this.$message({
          message: "缺少必要参数",
          type: "warning"
        });
      }
    }
  },
  components: {
    "quill-editor": quillEditor
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 20px 100px 20px;
  position: relative;
}
.title {
  padding: 20px;
}
.image-title,
.text-title {
  padding: 20px 0 0 20px;
}
.btn {
  position: absolute;
  left: 100px;
  bottom: 50px;
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
.text-input {
  margin: 20px 0 0 50px;
  width: 240px;
}
.article-form {
  display: flex;
}
.quill-editor {
  width: 600px;
  height: 300px;
  margin-left: 90px;
}
</style>
