<template>
  <div class="container">
    <div class="container-topic">
      <el-table :data="tableData" border>
        <el-table-column prop="title" width="220" label="话题标题">
          <template slot-scope="scope">
            <span class="topic-title">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="话题分类"> </el-table-column>
        <el-table-column prop="pv" label="PV"> </el-table-column>
        <el-table-column prop="follow" label="关注"> </el-table-column>
        <el-table-column prop="answer_num" label="回答"> </el-table-column>
      </el-table>
    </div>
    <el-input
      type="textarea"
      :rows="6"
      class="container-textarea"
      disabled
      v-model="tableData[0].text"
    >
    </el-input>
    <div class="show-answer">
      <el-table :data="showAnswer" style="width: 100%" class="answer-table">
        <el-table-column label="精选" width="55">
          <template>
            <i class="el-icon-view" style="padding-left:10px"></i>
          </template>
        </el-table-column>
        <el-table-column prop="nick_name" label="用户名" width="100">
          <template slot-scope="scope">
            <span style="padding-left:10px">{{ scope.row.nick_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="praise" label="点赞" width="100">
          <template slot-scope="scope">
            <span style="padding-left:10px">{{ scope.row.praise }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="collect" label="收藏" width="100">
          <template slot-scope="scope">
            <span style="padding-left:10px">{{ scope.row.collect }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="内容">
          <template slot-scope="scope">
            <span class="answer-text">{{ scope.row.text }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="110">
        </el-table-column>
      </el-table>
    </div>
    <div class="container-answer">
      <el-button size="mini" type="success" @click="handleShow">精选</el-button>
      <el-table
        :data="answerData"
        tooltip-effect="dark"
        show-overflow-tooltip
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="用户名" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.nick_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="praise" label="点赞" width="100">
        </el-table-column>
        <el-table-column prop="collect" label="收藏" width="100">
        </el-table-column>
        <el-table-column prop="text" label="内容">
          <template slot-scope="scope">
            <span class="answer-text">{{ scope.row.text }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="110">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleSingle(scope.row)"
              >详情</el-button
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
  </div>
</template>

<script>
import topicService from "@/global/service/topic.js";
import answerService from "@/global/service/answer.js";

export default {
  data() {
    return {
      tableData: [{ text: "" }],
      answerData: [],
      showAnswer: [],
      arrayAnswer: []
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let id = this.$route.params.id;
      topicService.single(id).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.tableData.splice(0, 1, res.data);
        if (res.answer) {
          res.answer.text = res.answer.text.replace(/<\/?.+?>/g, "");
          this.showAnswer.splice(0, 1, res.answer);
        }
      });
      answerService.single(id).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        res.data.forEach(data => {
          data.text = data.text.replace(/<\/?.+?>/g, "");
        });
        this.answerData = res.data;
      });
    },
    handleSelectionChange(val) {
      this.arrayAnswer = val;
    },
    handleShow() {
      let id = this.$route.params.id;
      if (this.arrayAnswer.length !== 1) {
        this.$message.error("只能选择一条精选喔");
        return;
      }
      let params = { answer_id: this.arrayAnswer[0].id };
      topicService.show(id, params).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.message);
        }
        this.onLoad();
      });
    },
    handleSingle(row) {
      let id = row.id;
      let topic_id = this.tableData[0].id;
      this.$router.push({ name: "answerSingle", params: { id, topic_id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该回答, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          answerService.delete(id).then(res => {
            this.$message({
              message: res.message
            });
            if (res.code === 200) {
              this.answerData.splice(index, 1);
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
  }
};
</script>

<style scoped>
.container-topic {
  box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.349);
}
.container-answer {
  margin-top: 30px;
  box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.349);
  background-color: #fff;
  padding: 15px;
}
.container-textarea {
  box-shadow: 2px 2px 10px rgba(153, 153, 153, 0.349);
}
.show-answer {
  box-shadow: 2px 2px 10px rgba(153, 153, 153, 0.349);
}
.topic-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.answer-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
