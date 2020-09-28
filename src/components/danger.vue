<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>危险详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="time" label="时间" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="bed" label="床位"></el-table-column>
        <el-table-column
          prop="heart_rate"
          label="心率"
          sortable
        ></el-table-column>
        <el-table-column
          prop="situation"
          label="危险等级"
          sortable
        ></el-table-column>
        <el-table-column prop="send_details" label="病因分析"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <router-link :to="{ path: '/bingli', query: { postdataYU } }">
              <el-button size="mini" @click="cheak(scope)">查看详情</el-button>
            </router-link>
            <el-button size="mini" type="success" disabled>发给医生</el-button>
            <el-button size="mini" type="danger" @click="logtable(scope.row)"
              >呼叫家属</el-button
            >
          </div>
        </el-table-column>
      </el-table>
      <el-dialog title="家人联系方式" :visible.sync="dialogTableVisible">
        <el-table :data="tablemsg">
          <el-table-column
            property="location"
            label="地址"
            width="300"
          ></el-table-column>
          <el-table-column
            property="name"
            label="姓名"
            width="200"
          ></el-table-column
          ><el-table-column
            property="phone"
            label="联系电话"
            width="200"
          ></el-table-column
          ><el-table-column
            property="relationship"
            label="关系"
            width="200"
          ></el-table-column>
        </el-table>
      </el-dialog>
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        style="position: absolute; width: 100%; bottom: 50px"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "danger",
  methods: {
    logtable(row) {
      this.dialogTableVisible = true;
      console.log(row);
      this.tablemsg = row.list;
    },
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
          "/危险/" +
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
      console.log(row);
      this.GLOBAL.BL.sendid = row.row.user_id;
      this.GLOBAL.BL.name = row.row.name;
      this.GLOBAL.BL.nub = row.$index;
      this.postdataYU = {
        name: row.row.name,
        address: row.row.address,
        url: row.row.url,
        urljpg: row.row.urljpg,
        level: row.row.level,
      };
    },
  },
  data() {
    return {
      //呼叫家属 表格
      tablemsg: {},
      //呼叫家属 Dialog
      dialogTableVisible: false,
      //当前页码
      page: 1,
      //共多少数据
      total: 0,
      postdataYU: {},
      tableData: [
        {
          date: "2016-05-02 11:12:32",
          name: "王小虎1",
          address: "B区280号",
          condition: 73,
          fix: "房性早搏",
          level: "危险",
          urljpg: "../assets/test.jpg",
          url: "static/xiaohu1.pdf",
        },
      ],
    };
  },
  mounted() {
    this.handleCurrentChange(this.page);
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