<template>
  <el-tabs class="container" v-model="tableName">
    <el-tab-pane label="合辑编辑" name="first">
      <el-collapse v-model="activeName">
        <el-collapse-item title="合辑名称" name="1">
          <div class="column-text">
            {{ columnData.title }}
            <el-button
              style="float: right; padding-right:20px"
              type="text"
              @click="handleEditName(columnData.id)"
              >编辑</el-button
            >
          </div>
        </el-collapse-item>
        <el-collapse-item title="合辑描述" name="2">
          <div class="column-text">
            {{ columnData.desc }}
            <el-button
              style="float: right; padding-right:20px"
              type="text"
              @click="handleEditDesc(columnData.id)"
              >编辑</el-button
            >
          </div>
        </el-collapse-item>
        <el-collapse-item title="合辑图片" name="3">
          <el-image
            v-if="columnData.image_url"
            :src="columnData.image_url"
            class="image"
            fit="cover"
          >
          </el-image>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="handleEditImage"
            :before-upload="beforeAvatarUpload"
            style="margin-right:10px"
          >
            编辑
          </el-upload>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane label="合辑管理" name="second">
      <el-table
        ref="multipleTable"
        :data="selectionData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="选择">
          <el-button slot="header" size="small" @click="handleDelete"
            >移除</el-button
          >
          <el-table-column type="selection" width="80"> </el-table-column>
        </el-table-column>
        <el-table-column label="展示话题">
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
          <el-table-column prop="answer_num" label="回答"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;margin-top:20px"
        @selection-change="handleDataChange"
      >
        <el-table-column label="选择">
          <el-button slot="header" size="small" @click="handleInsert"
            >添加</el-button
          >
          <el-table-column type="selection" width="80"> </el-table-column>
        </el-table-column>
        <el-table-column label="所有话题">
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
          <el-table-column prop="answer_num" label="回答"></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="pagination.pageSize"
        :pager-count="7"
        :current-page.sync="pagination.nowPage"
        :total="pagination.total"
        @current-change="onload"
      >
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import columnService from "@/global/service/column.js";
import qiniuService from "@/global/service/qiniu.js";

export default {
  data() {
    return {
      activeName: ["1", "2", "3"],
      tableName: "first",
      columnData: {},
      selectionData: [],
      tableData: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      },
      insertParams: [],
      deleteParams: []
    };
  },
  created() {
    let id = this.$route.params.id;
    columnService.single(id).then(res => {
      this.columnData = res.data;
    });
    this.onload();
  },
  methods: {
    onload() {
      let id = this.$route.params.id;
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage
      };
      columnService.columnSelected(id).then(res => {
        this.selectionData = res.data;
      });
      columnService.columnUnSelected(id, params).then(res => {
        this.tableData = res.data;
        this.pagination.total = res.total;
      });
    },
    handleEditName(id) {
      let h = this.$createElement;
      this.$msgbox({
        title: "修改名称",
        message: h("p", null, [h("span", null, "输入合辑名称： ")]),
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
          let title = active.value;
          columnService.update(id, { title }).then(res => {
            if (res.code !== 200) {
              console.log(res.message);
              return;
            }
            this.columnData.title = active.value;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    handleEditDesc(id) {
      let h = this.$createElement;
      this.$msgbox({
        title: "修改描述",
        message: h("p", null, [h("span", null, "输入合辑描述： ")]),
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
          let desc = active.value;
          columnService.update(id, { desc }).then(res => {
            if (res.code !== 200) {
              console.log(res.message);
              return;
            }
            this.columnData.desc = active.value;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    handleEditImage(files) {
      qiniuService.upload(files.file).then(res => {
        const image_url = res;
        let id = this.$route.params.id;
        columnService.update(id, { image_url }).then(res => {
          if (res.code !== 200) {
            console.log(res.message);
            return;
          }
          this.columnData.image_url = image_url;
        });
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleSelectionChange(val) {
      let topicId = val.map(data => {
        return data.topic_id;
      });
      this.deleteParams = topicId;
    },
    handleDataChange(val) {
      let topicId = val.map(data => {
        return data.topic_id;
      });
      this.insertParams = topicId;
    },
    handleInsert() {
      if (!this.insertParams.length) {
        this.$message.error("没有选择话题喔~");
        return;
      }
      let columnId = this.$route.params.id;
      let params = this.insertParams.map(arr => {
        return {
          column_id: columnId,
          topic_id: arr
        };
      });
      columnService.columnSelect({ params }).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.message);
        }
        this.onload();
      });
    },
    handleDelete() {
      if (!this.deleteParams.length) {
        this.$message.error("没有选择话题喔~");
        return;
      }
      let columnId = this.$route.params.id;
      let params = this.deleteParams.map(arr => {
        return [arr, columnId];
      });
      columnService.unColumnSelect({ params }).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.message);
        }
        this.onload();
      });
    }
  }
};
</script>

<style scoped>
.container {
  background: #fff;
  padding: 20px;
}
.column-text {
  font-size: 15px;
  color: #777;
}
.image {
  max-width: 80%;
}
.avatar-uploader {
  float: right;
  padding-right: 10px;
  font-size: 14px;
  color: #1e90ff;
}
.topic-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pagination {
  padding: 20px 0 0 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
