<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>处理流程详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        stripe
      >
        <el-table-column prop="date" label="时间" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="床位"></el-table-column>
        <el-table-column prop="condition" label="心率" sortable></el-table-column>
        <el-table-column prop="level" label="危险等级" sortable></el-table-column>
        <el-table-column prop="fix" label="病因分析"></el-table-column>
        <el-table-column align="center" width="200">
          <template slot="header" slot-scope="scope" @click="te(scope)">
            <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
          </template>
          <template slot-scope="scope">
            <router-link :to="{path:'/liucheng',query:{postdataLC}}">
              <el-button size="mini" @click="cheak(scope.row)">查看详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "weichuli",
  methods: {
    cheak(row) {
      this.postdataLC = row;
    },
  },
  data() {
    return {
      search: "",
      postdataLC: {},
      tableData: [
        {
          date: "2016-05-02 11:12:32",
          name: "张1",
          address: "B区280号",
          condition: 73,
          fix: "房性早搏",
          level: "1级预警",
          url: "static/xiaohu1.pdf",
          urljpg: "../assets/test.jpg",
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
</style>