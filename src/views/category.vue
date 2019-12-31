<template>
  <div class="sort-container">
    <el-table
      style="width:100%;padding:40px"
      :data="tableData"
      class="manager"
      stripe
    >
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
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
    <el-button
      class="insert-btn"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="handleInsert()"
      >添加
    </el-button>
  </div>
</template>

<script>
import category from "@/global/service/category.js";

export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.onload();
  },
  methods: {
    onload() {
      category.list().then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      let id = row.id;
      let h = this.$createElement;
      this.$msgbox({
        title: "修改分类",
        message: h("p", null, [h("span", null, "输入分类名称： ")]),
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
          category.update(id, { name: active.value }).then(res => {
            if (res.code !== 200) {
              console.log(res.message);
              return;
            }
            this.tableData[index].name = active.value;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
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
          category.delete(id);
          this.tableData.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleInsert() {
      let h = this.$createElement;
      this.$msgbox({
        title: "增加分类",
        message: h("p", null, [h("span", null, "输入分类名称： ")]),
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
          category.insert({ name: active.value }).then(res => {
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
            message: "已取消添加"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.sort-container {
  position: relative;
}
.insert-btn {
  position: absolute;
  top: 15px;
  right: 20px;
}
</style>
