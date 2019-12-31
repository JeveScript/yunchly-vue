<template>
  <div class="container">
    <el-button
      class="insert-btn"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="handleInsert()"
      >添加
    </el-button>
    <el-table style="width:100%;padding:30px" :data="tableData" class="manager">
      <el-table-column label="账户" width="180">
        <template slot-scope="scope">
          <i class="el-icon-s-custom"></i>
          <span style="margin-left:10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import managerService from "@/global/service/manager.js";
import DataStore from "@/global/storage/index";

export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    managerService.list().then(res => {
      this.tableData = res.data;
    });
  },
  methods: {
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ name: "managerEdit", params: { id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          let id = row.id;
          managerService.delete(id);
          DataStore.clear();
          this.$router.replace({ name: "login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleInsert() {
      this.$router.push({ name: "managerCreate" });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  position: relative;
  padding-top: 60px;
}
.insert-btn {
  position: absolute;
  right: 30px;
  top: 20px;
}
</style>
