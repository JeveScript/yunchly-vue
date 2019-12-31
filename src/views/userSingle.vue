<template>
  <div class="container">
    <el-row :gutter="30">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-image
              style="width: 60px; height: 60px"
              v-if="userInfo.avatar"
              :src="userInfo.avatar"
              fit="fit"
            ></el-image>
          </div>
          <div class="text item">昵称：{{ userInfo.nick_name }}</div>
          <div class="text item">性别：{{ userInfo.sex }}</div>
          <div class="text item">状态：{{ userInfo.state }}</div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <span class="tips">tips:点击文字可查看内容</span>
        <el-table
          :data="answerData"
          class="answer"
          max-height="400"
          height="400"
        >
          <el-table-column label="发布的回答">
            <el-table-column label="话题标题">
              <template slot-scope="scope">
                <span
                  class="topic-title"
                  @click="handleText(scope.row.title)"
                  >{{ scope.row.title }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="回答内容">
              <template slot-scope="scope">
                <span class="topic-title" @click="handleText(scope.row.text)">{{
                  scope.row.text
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="praise" label="点赞"> </el-table-column>
            <el-table-column prop="collect" label="收藏"> </el-table-column>
            <el-table-column prop="create_time" label="创建日期">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-table
          :data="collectData"
          class="answer"
          max-height="400"
          height="400"
        >
          <el-table-column label="收藏的回答">
            <el-table-column label="话题标题">
              <template slot-scope="scope">
                <span
                  class="topic-title"
                  @click="handleText(scope.row.title)"
                  >{{ scope.row.title }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="回答内容">
              <template slot-scope="scope">
                <span class="topic-title" @click="handleText(scope.row.text)">{{
                  scope.row.text
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="praise" label="点赞"> </el-table-column>
            <el-table-column prop="collect" label="收藏"> </el-table-column>
            <el-table-column prop="create_time" label="创建日期">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="topicData"
          class="answer"
          max-height="400"
          height="400"
        >
          <el-table-column label="关注的话题">
            <el-table-column label="话题标题">
              <template slot-scope="scope">
                <span
                  class="topic-title"
                  @click="handleText(scope.row.title)"
                  >{{ scope.row.title }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="话题内容">
              <template slot-scope="scope">
                <span class="topic-title" @click="handleText(scope.row.text)">{{
                  scope.row.text
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="category_name" label="话题分类">
            </el-table-column>
            <el-table-column prop="follow" label="关注"> </el-table-column>
            <el-table-column prop="pv" label="pv"> </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="内容" :visible.sync="dialogVisible" width="30%">
      <span>{{ dialog }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogVisible = false"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userService from "@/global/service/user.js";
import answerService from "@/global/service/answer.js";

export default {
  data() {
    return {
      userInfo: {},
      answerData: [],
      collectData: [],
      topicData: [],
      dialog: "",
      dialogVisible: false
    };
  },
  created() {
    let id = this.$route.params.id;
    userService.more(id).then(res => {
      res.data.answer.forEach(arr => {
        arr.text = arr.text.replace(/<\/?.+?>/g, "");
      });
      res.data.collect.forEach(arr => {
        arr.text = arr.text.replace(/<\/?.+?>/g, "");
      });
      this.answerData = res.data.answer;
      this.collectData = res.data.collect;
      this.topicData = res.data.topic;
    });
    userService.single(id).then(res => {
      switch (Number(res.data.sex)) {
        case 1:
          res.data.sex = "男";
          break;
        case 2:
          res.data.sex = "女";
          break;
      }
      switch (Number(res.data.state)) {
        case 0:
          res.data.state = "无";
          break;
        case 1:
          res.data.state = "备孕";
          break;
        case 2:
          res.data.state = "已孕";
          break;
        case 3:
          res.data.state = "已育";
          break;
      }
      this.userInfo = res.data;
    });
  },
  methods: {
    handleText(text) {
      this.dialog = text;
      this.dialogVisible = true;
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

<style lang="less">
.container {
  background-color: #fff;
  padding: 15px;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.userInfo-name {
  line-height: 60px;
  font-size: 16px;
}
.box-card {
  width: auto;
  margin-top: 18px;
}
.el-row {
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
}
.answer {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.topic-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tips {
  font-size: 13px;
  color: #888;
  float: right;
}
</style>
