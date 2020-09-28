<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>处理完成详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        stripe
      >
        <el-table-column prop="time" label="时间" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="bed" label="床位"></el-table-column>
        <el-table-column prop="heart_rate" label="心率" sortable></el-table-column>
        <el-table-column prop="situation" label="危险等级" sortable></el-table-column>
        <el-table-column prop="send_details" label="病因分析"></el-table-column>
        <el-table-column align="center" width="200">
          <template slot="header" slot-scope="scope" @click="te(scope)">
            <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="cheak(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        style="position: absolute;width: 100%;bottom: 50px;"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "chuli",
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.gethistory(val);
    },
    gethistory(val) {
      this.GLOBAL.dengdai("block");
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "pagehome/selectwarn/" +
          this.GLOBAL.yanglaoyuanid +
          "/已完成/" +
          val,
        method: "get",
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data.info.list;
        this.total = res.data.data.count;
        this.GLOBAL.dengdai("none");
        this.$forceUpdate();
      });
    },
    cheak(row) {
      console.log(row);
      this.GLOBAL.BL.sendid = row.user_id;
      this.GLOBAL.BL.name = row.name;
      this.postdata = JSON.parse(JSON.stringify(row.details));
      this.$router.push({ path: "/liucheng", query: this.postdata });
      console.log("处理页面进入postdata" + this.postdata);
    },
  },
  data() {
    return {
      //当前页码
      page: 1,
      //共多少数据
      total: 0,
      postdata: { name: "ppp" },
      //后台获取
      tableData: [],
      search: "",
      // tableData: [
      //   {
      //     date: "2016-05-02 11:12:32",
      //     name: "张1",
      //     address: "B区280号",
      //     condition: 73,
      //     fix: "房性早搏",
      //     level: "1级预警",
      //     url: "static/xiaohu1.pdf",
      //     urljpg: "../assets/test.jpg",
      //   },
      //   {
      //     date: "2016-05-04  11:12:32",
      //     name: "王小虎2",
      //     address: "B区280号",
      //     condition: 62,
      //     fix: "房性早搏",
      //     level: "危险",
      //     url: "static/xiaohu2.pdf",
      //   },
      //   {
      //     date: "2016-05-01  11:12:32",
      //     name: "王小虎3",
      //     address: "B区280号",
      //     condition: 0,
      //     fix: "房性早搏",
      //     level: "紧急",
      //     url: "static/xiaohu3.pdf",
      //   },
      //   {
      //     date: "2016-05-03  11:12:32",
      //     name: "王小虎4",
      //     address: "B区280号",
      //     condition: 80,
      //     level: "预警",
      //     fix: "房性早搏",
      //     url: "static/xiaohu3.pdf",
      //   },
      // ],
    };
  },
  mounted() {
    this.handleCurrentChange(this.page);
  },
};
</script>

<style>
</style>