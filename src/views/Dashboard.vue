<template>
  <el-tabs class="container" v-model="activeName">
    <el-tab-pane label="今日回答" name="answer">
      <el-table :data="answerData" stripe style="width: 100%">
        <el-table-column prop="text" label="内容">
          <template slot-scope="scope">
            <span class="answer-text">{{ scope.row.text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建用户" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.nick_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="praise" label="点赞" width="100">
        </el-table-column>
        <el-table-column prop="collect" label="收藏" width="100">
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
    </el-tab-pane>
    <el-tab-pane label="用户统计" name="user">
      <div class="total">
        <div class="total-text">总用户</div>
        <div class="total-num">{{ total }}</div>
      </div>
      <div class="circle">
        <i-circle
          :size="200"
          :trail-width="6"
          :stroke-width="6"
          :percent="(female / total) * 100"
          stroke-linecap="square"
          stroke-color="#FFC0CB"
          trail-color="#FFF0F2"
        >
          <div class="demo-Circle-custom">
            <h1>{{ female }}</h1>
            <p>女性用户</p>
            <span>
              占总人数
              <i>{{ Math.floor((female / total) * 100) }}%</i>
            </span>
          </div>
        </i-circle>
        <i-circle
          :size="200"
          :trail-width="6"
          :stroke-width="6"
          :percent="(pregnant / total) * 100"
          stroke-linecap="square"
          stroke-color="#43a3fb"
        >
          <div class="demo-Circle-custom">
            <h1>{{ pregnant }}</h1>
            <p>怀孕用户</p>
            <span>
              占总人数
              <i>{{ Math.floor((pregnant / total) * 100) }}%</i>
            </span>
          </div>
        </i-circle>
        <i-circle
          :size="200"
          :trail-width="6"
          :stroke-width="6"
          :percent="(bred / total) * 100"
          stroke-linecap="square"
          stroke-color="#FFD700"
          trail-color="#FFFFE0"
        >
          <div class="demo-Circle-custom">
            <h1>{{ bred }}</h1>
            <p>已育用户</p>
            <span>
              占总人数
              <i>{{ Math.floor((bred / total) * 100) }}%</i>
            </span>
          </div>
        </i-circle>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import userService from "@/global/service/user.js";
import answerService from "@/global/service/answer.js";

export default {
  data() {
    return {
      total: 0,
      female: 0,
      pregnant: 0,
      bred: 0,
      activeName: "answer",
      answerData: []
    };
  },
  created() {
    userService.list().then(res => {
      this.total = res.data.total;
      this.female = res.data.female;
      this.pregnant = res.data.pregnant;
      this.bred = res.data.bred;
    });
    answerService.today().then(res => {
      res.data.forEach(data => {
        data.text = data.text.replace(/<\/?.+?>/g, "");
      });
      this.answerData = res.data;
    });
  },
  methods: {
    handleSingle(row) {
      let id = row.id;
      this.$router.push({ name: "answerSingle", params: { id } });
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
  padding: 30px;
  .total {
    margin: 0 auto 40px auto;
    width: 300px;
    height: 100px;
    box-shadow: 2px 2px 6px rgba(153, 153, 153, 0.3);
    .total-text {
      padding-top: 10px;
      font-size: 20px;
      color: #777;
      text-align: center;
    }
    .total-num {
      font-size: 24px;
      color: #000;
      text-align: center;
      line-height: 2;
    }
  }
  .circle {
    display: flex;
    margin: 50px 30px;
    align-items: center;
    justify-content: space-between;
  }
}
.demo-Circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 28px;
    font-weight: normal;
  }
  & p {
    color: #657180;
    font-size: 14px;
    margin: 10px 0 15px;
  }
  & span {
    display: block;
    padding-top: 15px;
    color: #657180;
    font-size: 14px;
    &:before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: -15px;
    }
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
}
.answer-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
