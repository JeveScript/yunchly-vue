<template>
  <el-tabs class="container" v-model="activeName">
    <el-tab-pane label="用户管理" name="user">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="nick_name" label="昵称"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.sex === '男' ? 'primary' : 'warning'"
              disable-transitions
              >{{ scope.row.sex }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="scope.row.state === '无' ? 'primary' : 'warning'"
              disable-transitions
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
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
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import userService from "@/global/service/user.js";

export default {
  data() {
    return {
      activeName: "user",
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      },
      tableData: []
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage
      };
      userService.info(params).then(res => {
        res.data.forEach(data => {
          switch (Number(data.sex)) {
            case 1:
              data.sex = "男";
              break;
            case 2:
              data.sex = "女";
              break;
            default:
              data.sex = "未设置";
          }
          switch (Number(data.state)) {
            case 0:
              data.state = "无";
              break;
            case 1:
              data.state = "备孕";
              break;
            case 2:
              data.state = "已孕";
              break;
            case 3:
              data.state = "已育";
              break;
          }
        });
        this.tableData = res.data;
        this.pagination.total = res.total;
      });
    },
    handleClick(row) {
      let id = row.id;
      this.$router.push({ name: "userSingle", params: { id } });
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
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
