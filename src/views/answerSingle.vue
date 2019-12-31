<template>
  <div class="container">
    <div class="cart-container">
      <el-card class="box-card">
        <div class="text item">话题标题：{{ answerData.title }}</div>
        <div class="text item">话题分类：{{ answerData.name }}</div>
        <div class="text item">创建用户：{{ answerData.nick_name }}</div>
        <div class="text item">创建日期：{{ answerData.create_time }}</div>
        <div class="text item">点赞数：{{ answerData.praise }}</div>
        <div class="text item">收藏数：{{ answerData.collect }}</div>
      </el-card>
      <quill-editor
        class="quill-editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        style="height:290px;width:47%"
      >
      </quill-editor>
    </div>
    <div class="btn-container">
      <el-button type="info" plain @click="handlereturn()">返回</el-button>
      <el-button type="danger" plain @click="handleDelete(answerData.id)"
        >删除</el-button
      >
    </div>
  </div>
</template>

<script>
import answerService from "@/global/service/answer.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

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

export default {
  data() {
    return {
      answerData: {},
      content: "",
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        },
        readOnly: true
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    answerService.answerSingle(id).then(res => {
      this.answerData = res.data;
      this.content = res.data.text;
    });
  },
  methods: {
    handlereturn() {
      let params = this.$route.params;
      if (params.topic_id) {
        this.$router.push({ name: "answer", params: { id: params.topic_id } });
      } else {
        this.$router.back();
      }
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该回答, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          answerService.delete(id).then(res => {
            this.$message({
              message: res.message
            });
            if (res.code === 200) {
              this.$router.back();
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
  },
  components: {
    "quill-editor": quillEditor
  }
};
</script>

<style scoped>
.container {
  padding: 15px;
}
.cart-container {
  display: flex;
  justify-content: space-between;
}
.text {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item {
  padding: 10px 0;
}
.box-card {
  width: 47%;
  height: 400px;
  box-shadow: 1px 1px 10px rgba(153, 153, 153, 0.1);
}
.btn-container {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 10px 0;
}
</style>
