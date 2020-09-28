<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>未处理详情</el-breadcrumb-item>
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
          "/未处理/" +
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
    };
  },
  mounted() {
    this.handleCurrentChange(this.page);
  },
};
</script>

<style>
</style>