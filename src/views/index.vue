<template>
  <el-tabs class="container" v-model="tableName">
    <el-tab-pane label="推荐管理" name="first">
      <el-table
        ref="multipleTable"
        :data="recommendSelectedData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionRecommend"
      >
        <el-table-column label="选择">
          <el-button slot="header" size="small" @click="handleRecommendDelete"
            >移除</el-button
          >
          <el-table-column type="selection" width="80"> </el-table-column>
        </el-table-column>
        <el-table-column label="推荐展示">
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
        :data="recommendUnSelectedData"
        tooltip-effect="dark"
        style="width: 100%;margin-top:20px"
        @selection-change="handleUnRecommend"
      >
        <el-table-column label="选择">
          <el-button slot="header" size="small" @click="handleRecommendInsert"
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
    <el-tab-pane label="答题管理" name="second">
      <el-table
        ref="multipleTable"
        :data="answerSelectedData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionAnswer"
      >
        <el-table-column label="选择">
          <el-button slot="header" size="small" @click="handleAnswerDelete"
            >移除</el-button
          >
          <el-table-column type="selection" width="80"> </el-table-column>
        </el-table-column>
        <el-table-column label="答题展示">
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
        :data="answerUnSelectedData"
        tooltip-effect="dark"
        style="width: 100%;margin-top:20px"
        @selection-change="handleUnAnswer"
      >
        <el-table-column label="选择">
          <el-button slot="header" size="small" @click="handleAnswerInsert"
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
        :page-size="paginations.pageSize"
        :pager-count="7"
        :current-page.sync="paginations.nowPage"
        :total="paginations.total"
        @current-change="onload"
      >
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import tableService from "@/global/service/table.js";
// import qiniuService from "@/global/service/qiniu.js";

export default {
  data() {
    return {
      tableName: "first",
      recommendSelectedData: [],
      recommendUnSelectedData: [],
      answerSelectedData: [],
      answerUnSelectedData: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      },
      paginations: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      },
      recommendInsert: [],
      recommendDeleted: [],
      answerInsert: [],
      answerDeleted: []
    };
  },
  created() {
    this.onload();
  },
  methods: {
    onload() {
      let recommend = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage
      };
      tableService.recommendSelected().then(res => {
        this.recommendSelectedData = res.data;
      });
      tableService.recommendUnSelected(recommend).then(res => {
        this.recommendUnSelectedData = res.data;
        this.pagination.total = res.total;
      });
      let answer = {
        pageSize: this.paginations.pageSize,
        nowPage: this.paginations.nowPage
      };
      tableService.answerSelected().then(res => {
        this.answerSelectedData = res.data;
      });
      tableService.answerUnSelected(answer).then(res => {
        this.answerUnSelectedData = res.data;
        this.paginations.total = res.total;
      });
    },
    handleSelectionRecommend(val) {
      let topicId = val.map(data => {
        return data.topic_id;
      });
      this.recommendDeleted = topicId;
    },
    handleUnRecommend(val) {
      let topicId = val.map(data => {
        return data.topic_id;
      });
      this.recommendInsert = topicId;
    },
    handleSelectionAnswer(val) {
      let topicId = val.map(data => {
        return data.topic_id;
      });
      this.answerDeleted = topicId;
    },
    handleUnAnswer(val) {
      let topicId = val.map(data => {
        return data.topic_id;
      });
      this.answerInsert = topicId;
    },
    handleRecommendInsert() {
      if (!this.recommendInsert.length) {
        this.$message.error("没有选择话题喔~");
        return;
      }
      let params = this.recommendInsert.map(arr => {
        return {
          table_id: 1,
          topic_id: arr
        };
      });
      tableService.insert({ params }).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.message);
        }
        this.onload();
      });
    },
    handleRecommendDelete() {
      if (!this.recommendDeleted.length) {
        this.$message.error("没有选择话题喔~");
        return;
      }
      let params = this.recommendDeleted.map(arr => {
        return [1, arr];
      });
      tableService.deleted({ params }).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.message);
        }
        this.onload();
      });
    },
    handleAnswerInsert() {
      if (!this.answerInsert.length) {
        this.$message.error("没有选择话题喔~");
        return;
      }
      let params = this.answerInsert.map(arr => {
        return {
          table_id: 2,
          topic_id: arr
        };
      });
      tableService.insert({ params }).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.message);
        }
        this.onload();
      });
    },
    handleAnswerDelete() {
      if (!this.answerDeleted.length) {
        this.$message.error("没有选择话题喔~");
        return;
      }
      let params = this.answerDeleted.map(arr => {
        return [2, arr];
      });
      tableService.deleted({ params }).then(res => {
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
