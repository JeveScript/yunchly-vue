<template>
  <div class="page-container">
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="userForm"
        label-position="left"
        label-width="160px"
      >
        <h3 class="title">管理员修改</h3>
        <el-form-item
          class="warpper"
          label="姓名"
          prop="name"
          style="width:460px;"
        >
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item
          class="warpper"
          label="手机号"
          prop="phone"
          style="width:460px;"
        >
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item
          class="warpper"
          label="密码"
          prop="password"
          style="width:460px;"
        >
          <el-input v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item class="warpper">
          <el-button type="primary" @click="handleEditManager">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import managerService from "@/global/service/manager";
import DataStore from "@/global/storage/index";

export default {
  data() {
    return {
      loading: false,
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /\d{6}$/,
            message: "不能少于6位数",
            trigger: "blur"
          }
        ]
      },
      formData: {
        name: "",
        phone: "",
        password: ""
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    managerService.single(id).then(res => {
      this.formData.name = res.data.name;
      this.formData.phone = res.data.phone;
    });
  },
  methods: {
    handleEditManager() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.formData.name,
            phone: this.formData.phone,
            password: this.formData.password
          };
          let id = this.$route.params.id;
          managerService.update(id, params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              DataStore.clear();
              this.$router.replace({ name: "login" });
            }
          });
        } else {
          this.$message({
            message: "输入有误",
            type: "warning"
          });
        }
      });
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
