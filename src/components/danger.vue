<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>危险详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="date" label="时间" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="床位"></el-table-column>
        <el-table-column prop="condition" label="心率" sortable></el-table-column>
        <el-table-column prop="level" label="危险等级" sortable></el-table-column>
        <el-table-column prop="fix" label="病因分析"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <router-link :to="{path:'/bingli',query:{postdataYU}}">
              <el-button size="mini" @click="cheak(scope.row)">查看详情</el-button>
            </router-link>
            <el-button
              size="mini"
              type="success"
              @click="handleDelete(scope.$index, scope.row) "
              disabled
            >发给医生</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">呼叫家属</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "danger",
  methods: {
    tableRowClassName({ row }) {
      // console.log(row);
      if (row.level == "紧急") {
        return "success-row";
      } else if (row.level == "危险") {
        return "warning-row";
      }
      return "";
    },
    cheak(row) {
      this.postdataYU = row;
    },
  },
  data() {
    return {
      postdataYU: {},
      tableData: [
        {
          date: "2016-05-02 11:12:32",
          name: "王小虎1",
          address: "B区280号",
          condition: 73,
          fix: "房性早搏",
          level: "危险",
          url: "static/xiaohu1.pdf",
        },
        {
          date: "2016-05-04  11:12:32",
          name: "王小虎2",
          address: "B区280号",
          condition: 62,
          fix: "房性早搏",
          level: "危险",
          url: "static/xiaohu2.pdf",
        },
        {
          date: "2016-05-01  11:12:32",
          name: "王小虎3",
          address: "B区280号",
          condition: 0,
          fix: "房性早搏",
          level: "紧急",
          url: "static/xiaohu3.pdf",
        },
        {
          date: "2016-05-03  11:12:32",
          name: "王小虎4",
          address: "B区280号",
          condition: 80,
          level: "预警",
          fix: "房性早搏",
          url: "static/xiaohu3.pdf",
        },
      ],
    };
  },
};
</script>

<style>
.el-table .warning-row {
  background: #f79898;
}

.el-table .success-row {
  background: #ebb565;
}
</style>