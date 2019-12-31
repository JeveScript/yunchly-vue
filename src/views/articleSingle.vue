<template>
  <div class="container">
    <el-button class="btn" type="text" @click="handleEditContent"
      >确认修改</el-button
    >
    <div style="height:500px;">
      <quill-editor
        class="quill-editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        style="height:400px;"
      >
      </quill-editor>
    </div>
  </div>
</template>

<script>
import articleService from "@/global/service/article.js";
import qiniuService from "@/global/service/qiniu.js";

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
      content: "",
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
  created() {
    this.onload();
  },
  methods: {
    onload() {
      let id = this.$route.params.id;
      articleService.single(id).then(res => {
        this.content = res.data.content;
      });
    },
    handleEditContent() {
      let content = this.content;
      let id = this.$route.params.id;
      articleService.update(id, { content }).then(res => {
        if (res.code !== 200) {
          console.log(res.message);
          return;
        }
        this.content = content;
      });
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
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px;
}
.editor {
  width: 600px;
  height: 300px;
}
</style>
