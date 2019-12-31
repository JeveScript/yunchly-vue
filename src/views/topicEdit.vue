<template>
  <div class="page-container">
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-position="left"
        label-width="100px"
      >
        <h3 class="title">话题详情</h3>
        <el-form-item
          class="warpper"
          label="话题标题："
          prop="title"
          style="width:600px;"
        >
          <el-input v-model="formData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item
          class="warpper"
          label="话题分类："
          prop="sort_id"
          style="width:600px;"
        >
          <el-select v-model="formData.category_id" placeholder="请选择分类">
            <el-option
              v-for="item in sort_value"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="warpper"
          label="内容："
          prop="text"
          style="width:600px"
        >
          <el-input type="textarea" :rows="6" v-model="formData.text" />
        </el-form-item>
        <el-form-item class="warpper">
          <el-button type="success" @click="handleEditTopic">修改</el-button>
          <el-button type="info" @click="hanleReturn">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import categoryService from "@/global/service/category.js";
import topicService from "@/global/service/topic.js";

export default {
  data() {
    return {
      loading: false,
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category_id: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        text: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      formData: {
        title: "",
        category_id: "",
        text: ""
      },
      sort_value: []
    };
  },
  created() {
    let id = this.$route.params.id;
    categoryService.list().then(res => {
      this.sort_value = res.data;
    });
    topicService.single(id).then(res => {
      if (res.code !== 200) {
        this.$message.error(res.message);
      }
      res.data.category_id = Number(res.data.category_id);
      this.formData = res.data;
    });
  },
  methods: {
    handleEditTopic() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          let params = {
            title: this.formData.title,
            category_id: this.formData.category_id,
            text: this.formData.text
          };
          let id = this.$route.params.id;
          topicService.update(id, params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$router.push({ name: "topic" });
            } else {
              console.log(res.message);
            }
          });
        } else {
          this.$message({
            message: "输入有误",
            type: "warning"
          });
        }
      });
    },
    hanleReturn() {
      this.$router.push({ name: "topic" });
    }
  }
};
</script>

<style scoped>
.warpper {
  padding-left: 30px;
}
.title {
  margin: 30px;
}
</style>
