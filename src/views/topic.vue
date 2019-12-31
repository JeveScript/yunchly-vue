<template>
  <div class="container">
    <el-select
      v-model="value"
      placeholder="请选择分类"
      class="topic-select"
      clearable
      @change="onLoad()"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-button
      class="insert-btn"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="handleInsert()"
      >添加
    </el-button>
    <el-table style="width:100%;padding:30px" :data="tableData" class="topic">
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span class="topic-title">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pv" label="PV"> </el-table-column>
      <el-table-column prop="follow" label="关注"> </el-table-column>
      <el-table-column prop="answer_num" label="回答"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleSingle(scope.row)"
            >管理</el-button
          >
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
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :page-size="pagination.pageSize"
      :pager-count="7"
      :current-page.sync="pagination.nowPage"
      :total="pagination.total"
      @current-change="onLoad"
    >
    </el-pagination>
  </div>
</template>

<script>
import topicService from "@/global/service/topic.js";
import category from "@/global/service/category.js";

export default {
  data() {
    return {
      tableData: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      },
      value: "",
      options: []
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage,
        filter: this.value
      };
      topicService.list(params).then(res => {
        this.tableData = res.data;
        this.pagination.total = res.total;
      });
      category.list().then(res => {
        this.options = res.data;
      });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ name: "topicEdit", params: { id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该话题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          topicService.delete(id).then(res => {
            this.$message({
              type: "success",
              message: res.message
            });
          });
          this.tableData.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSingle(row) {
      let id = row.id;
      this.$router.push({ name: "answer", params: { id } });
    },
    handleInsert() {
      this.$router.push({ name: "topicCreate" });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.349);
  background-color: #fff;
  position: relative;
}
.topic-select {
  margin: 20px 0 0 40px;
}
.topic-btn {
  margin-left: 10px;
}
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
.topic-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.insert-btn {
  position: absolute;
  top: 20px;
  right: 50px;
}
</style>
