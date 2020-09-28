<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>健康档案</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="marginTop:20px">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="590"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="bed" label="床位"></el-table-column>
        <el-table-column prop="danger_times" label="危险次数" sortable></el-table-column>
        <el-table-column
          prop="DAlevel"
          label="健康评级"
          :filters="[{ text: '健康', value: '健康' }, { text: '较健康', value: '较健康' }, { text: '较危险', value: '较危险' }]"
          :filter-method="filterTag"
        ></el-table-column>
        <el-table-column prop="last_time" label="上次危险时间"></el-table-column>
        <el-table-column align="center" width="200">
          <template slot="header" slot-scope="scope" @click="te(scope)">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入姓名搜索"
              style="float: right;z-index: 1;"
            />
            <el-button
              type="success"
              round
              size="mini"
              style="z-index: 2;position: absolute;right: 0;"
              @click="check(1)"
            >查询</el-button>
          </template>
          <template slot-scope="scope">
            <router-link :to="{path:'/gerendangan'}">
              <el-button size="mini" @click="cheak(scope.row)">查看详情</el-button>
            </router-link>
            <el-button size="mini" type="danger" style="marginLeft:10px" @click="del(scope)">出院</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        style="marginTop:120px"
      ></el-pagination>
      <el-dialog fullscreen title="查询结果" :visible.sync="dialogTableVisible ">
        <el-table :data="gridData">
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="bed" label="床位"></el-table-column>
          <el-table-column prop="danger_times" label="危险次数" sortable></el-table-column>
          <el-table-column
            prop="DAlevel"
            label="健康评级"
            :filters="[{ text: '健康', value: '健康' }, { text: '较健康', value: '较健康' }, { text: '较危险', value: '较危险' }]"
            :filter-method="filterTag"
          ></el-table-column>
          <el-table-column prop="last_dangerous_time" label="上次危险时间"></el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header" slot-scope="scope" @click="te(scope)">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入姓名搜索"
                style="float: right;z-index: 1;"
              />
              <el-button
                type="success"
                round
                size="mini"
                style="z-index: 2;position: absolute;right: 0;"
                @click="check(1)"
              >查询</el-button>
            </template>
            <template slot-scope="scope">
              <router-link :to="{path:'/gerendangan'}">
                <el-button size="mini" @click="cheak(scope.row)">查看详情</el-button>
              </router-link>
              <el-button size="mini" type="danger" style="marginLeft:10px" @click="del(scope)">出院</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :page-size="10"
          layout="prev, pager, next"
          :total="nametotal"
          @current-change="nameChange"
          style="width: 100%;height: 40px;"
        ></el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "dangan",
  methods: {
    nameChange(val) {
      this.namepage = val;
      this.check(val);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getmsg(val);
    },
    del(scope) {
      this.GLOBAL.dengdai("block");
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "beadhousepeople/delete/" +
          this.GLOBAL.yanglaoyuanid +
          "/" +
          scope.row.id,
        data: {},
        method: "get",
      }).then(() => {
        this.getmsg(this.page);
        this.GLOBAL.dengdai("none");
      });
    },
    cheak(row) {
      console.log("档案传值", this.GLOBAL.BL.sendid, this.GLOBAL.BL.name);
      this.GLOBAL.BL.sendid = row.id;
      this.GLOBAL.BL.name = row.name;
      // this.postdata = row;
    },
    //查询框
    filterTag(value, row) {
      return row.DAlevel === value;
    },
    //查询从入院到最后一次发病的时间
    gettimep(time1, timeSB) {
      //上一次生病时间  生病次数
      let time = new Date().toLocaleDateString();
      let year = time.slice(0, 4);
      let time1year = time1.slice(0, 4);
      //年
      let mon = time.slice(5, 6);
      let time1mon = time1.slice(5, 6);
      let temp =
        timeSB / (parseInt((year - time1year) * 12) + parseInt(mon - time1mon));
      if (temp == Infinity) return "时间过短,无法判断";
      else if (temp < 1 / 6) return "健康";
      else if (temp < 1 / 3 && temp >= 1 / 6) return "较健康";
      else if (temp < 1 && temp >= 1 / 3) return "较危险";
      else if (temp > 1) return "危险";
    },
    getmsg(temp) {
      this.GLOBAL.dengdai("block");
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "beadhousepeople/selectarchives/" +
          this.GLOBAL.yanglaoyuanid +
          "/" +
          temp,
        data: {},
        method: "get",
      }).then((res) => {
        console.log(res);
        this.total = res.data.data.count;
        this.tableData = JSON.parse(JSON.stringify(res.data.data.info.list));
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].DAlevel = this.gettimep(
            this.tableData[i].time_start,
            this.tableData[i].danger_times
          );
        }
        this.GLOBAL.dengdai("none");
      });
    },
    //名字模糊查询
    check(pg) {
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "beadhousepeople/getHealthbyname/" +
          this.GLOBAL.yanglaoyuanid +
          "/" +
          this.search +
          "/" +
          pg,
      }).then((res) => {
        this.gridData = JSON.parse(JSON.stringify(res.data.data.info.list));
        for (let i = 0; i < this.gridData.length; i++) {
          this.gridData[i].DAlevel = this.gettimep(
            this.gridData[i].time_start,
            this.gridData[i].danger_times
          );
        }
        this.dialogTableVisible = true;
        this.nametotal = res.data.data.count;
        console.log(res);
      });

      console.log(this.search);
    },
  },
  data() {
    return {
      //当前页码
      page: 1,
      //共多少数据
      total: 0,
      search: "",
      postdata: {},
      tableData: [],
      //查询名字后的数据存放
      gridData: [],
      //模糊查询的分页
      namepage: 1,
      nametotal: 0,
      dialogTableVisible: false,
    };
  },
  mounted() {
    this.getmsg(this.page);
  },
};
</script>

<style>
</style>