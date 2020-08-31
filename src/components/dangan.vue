<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>健康档案</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="DAnub" label="编号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="床位"></el-table-column>
        <el-table-column prop="DAtime" label="危险次数" sortable></el-table-column>
        <el-table-column
          prop="DAlevel"
          label="健康评级"
          :filters="[{ text: '十分安全', value: '十分安全' }, { text: '较为安全', value: '较为安全' }, { text: '较危险', value: '较危险' }]"
          :filter-method="filterTag"
        ></el-table-column>
        <el-table-column prop="DAshang" label="上次危险时间"></el-table-column>
        <el-table-column align="center" width="200">
          <template slot="header" slot-scope="scope" @click="te(scope)">
            <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
          </template>
          <template slot-scope="scope">
            <router-link :to="{path:'/gerendangan',query:{postdata}}">
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
  name: "dangan",
  methods: {
    cheak(row) {
      this.postdata = row;
    },
    //查询框
    filterTag(value, row) {
      return row.DAlevel === value;
    },
  },
  data() {
    return {
      search: "",
      postdata: {},
      tableData: [
        {
          DAnub: 221144,
          name: "张1",
          address: "B区280号",
          DAtime: 0,
          DAlevel: "十分安全",
          url: "static/xiaohu1.pdf",
          DAshang: "无",
        },
        {
          DAnub: 221146,
          name: "王2",
          address: "B区308号",
          DAtime: 3,
          DAlevel: "较为安全",
          DAshang: "2020年1月1日",
          url: "static/xiaohu2.pdf",
        },
        {
          DAnub: 221144,
          name: "傅3",
          address: "C区280号",
          DAtime: 5,
          DAlevel: "较危险",
          DAshang: "2020年3月1日",
          url: "static/xiaohu3.pdf",
        },
        {
          DAnub: 221144,
          name: "张1",
          address: "B区280号",
          DAtime: 0,
          DAlevel: "十分安全",
          url: "static/xiaohu1.pdf",
          DAshang: "无",
        },
        {
          DAnub: 221146,
          name: "王2",
          address: "B区308号",
          DAtime: 3,
          DAlevel: "较为安全",
          DAshang: "2020年1月1日",
          url: "static/xiaohu2.pdf",
        },
        {
          DAnub: 221144,
          name: "傅3",
          address: "C区280号",
          DAtime: 5,
          DAlevel: "较危险",
          DAshang: "2020年3月1日",
          url: "static/xiaohu3.pdf",
        },
        {
          DAnub: 221144,
          name: "张1",
          address: "B区280号",
          DAtime: 0,
          DAlevel: "十分安全",
          url: "static/xiaohu1.pdf",
          DAshang: "无",
        },
        {
          DAnub: 221146,
          name: "王2",
          address: "B区308号",
          DAtime: 3,
          DAlevel: "较为安全",
          DAshang: "2020年1月1日",
          url: "static/xiaohu2.pdf",
        },
        {
          DAnub: 221144,
          name: "傅3",
          address: "C区280号",
          DAtime: 5,
          DAlevel: "较危险",
          DAshang: "2020年3月1日",
          url: "static/xiaohu3.pdf",
        },
      ],
    };
  },
};
</script>

<style>
</style>