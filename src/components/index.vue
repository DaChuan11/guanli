<template>
  <div>
    <div class="topINDEX">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- 标签 -->
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>

      <div class="cardINDEX">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
          :row-class-name="tableRowClassName"
          max-height="700px"
        >
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="bed" label="床位" width="180"></el-table-column>
          <el-table-column
            prop="heart_condition_now"
            label="心率"
            sortable
            :sort-method="sortChange1"
          ></el-table-column>
          <el-table-column prop="crisis_situation" label="危机情况" sortable width="180"></el-table-column>
          <el-table-column prop="reason_for_early_warning" label="预警原因" width="220">
            <!-- <template slot-scope="scope">
              <div v-if="scope.row.information[0]>10">{{"房性早搏："+ scope.row.num_2 + "/24h"}}</div>
              <div v-if="scope.row.information[1]>20">{{"矩阵房速："+scope.row.num_3+ "/24h"}}</div>
              <div v-if="scope.row.information[2]>20">{{"对成房早："+ scope.row.num_4+ "/24h"}}</div>
              <div
                v-if="scope.row.information[3]>10"
              >{{"多源性室性早搏："+ scope.row.information[3]+ "/24h"}}</div>
            </template>-->
          </el-table-column>
          <el-table-column prop="treatment_plan" label="处理方案" width="180"></el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header" slot-scope="scope" @click="te(scope)">
              <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
            </template>
            <template slot-scope="scope">
              <router-link :to="{path:'/indexxiangqing',query:{postdataYU}}">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-size="10"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
          style="width: 100%;height: 40px;"
        ></el-pagination>
      </div>

      <!-- 今日详情 -->
      <div class="xiangqingINDEX">
        <div style="fontSize:30px;margin: 10px;">今日情况</div>
        <div class="xiangqingcard">
          <router-link to="/yujing">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>预警</span>
              </div>
              <div class="text item">{{todays[0]}}</div>
            </el-card>
          </router-link>
          <router-link to="/danger">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>危险</span>
              </div>
              <div class="text item">{{todays[1]}}</div>
            </el-card>
          </router-link>
          <router-link to="/chuli">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>处理完成</span>
              </div>
              <div class="text item">{{todays[2]}}</div>
            </el-card>
          </router-link>
          <router-link to="/weichuli">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>未处理</span>
              </div>
              <div class="text item">{{todays[3]}}</div>
            </el-card>
          </router-link>
        </div>
      </div>
      <!-- 简介 -->
      <div class="jieshao">
        <div>{{GLOBAL.ylyXX.name}}</div>
        <div>负责人：{{GLOBAL.ylyXX.charge_people}}</div>
        <div>负责人电话：{{GLOBAL.ylyXX.charge_phone}}</div>
        <div>已处理次数：{{GLOBAL.ylyXX.processing_times}} 次</div>
        <div>地址：{{GLOBAL.ylyXX.beadhouse_location}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      //当前页码
      page: 1,
      //共多少数据
      total: 0,
      search: "",
      todays: [],
      tableData: [],
      postdataYU: "",
    };
  },
  methods: {
    sortChange1(a, b) {
      console.log(a.heart_condition_now, b.heart_condition_now);
      return a.heart_condition_now - b.heart_condition_now;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getmsg(val);
    },
    tableRowClassName(row) {
      if (row.row.crisis_situation == "危险") {
        return "jinP";
      } else if (row.row.crisis_situation == "正常") {
        return "tiP";
      } else if (row.row.crisis_situation == "预警") {
        return "weiP";
      }
    },
    handleEdit(a, b) {
      this.postdataYU = b;
      console.log(a, b);
    },
    //更新数据 需要轮训
    getmsg(temp) {
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "pagehome/getpagehome/" +
          this.GLOBAL.yanglaoyuanid +
          "/" +
          temp,
        data: {},
        method: "get",
      }).then((res) => {
        console.log(res);
        this.total = res.data.data.count;
        this.tableData = res.data.data.info.list;
        let todays = [0, 0, 0, 0];
        for (let i = 0; i < this.tableData.length; i++) {
          switch (this.tableData[i].crisis_situation) {
            case "危险":
              todays[1]++;
              break;
            case "预警":
              todays[0]++;
              break;
            default:
              break;
          }
        }
        console.log(this.todays);
        this.$set(this.todays, 0, todays[0]);
        this.$set(this.todays, 1, todays[1]);
      });
    },
  },
  mounted() {
    this.getmsg(this.page);
  },
};
</script>

<style>
.jieshao {
  float: left;
  position: relative;
  width: 400px;
  height: 400px;
  margin-top: 170px;
}
.jieshao > div {
  font-size: 26px;
}
.weiP {
  background-color: rgb(236, 211, 164) !important;
}
.tiP {
  background-color: #eff7eb !important;
}
.jinP {
  background-color: #f56c6ca9 !important;
}
/* .jinP>td>div{
  color:white
} */
.xiangqingcard > a > div {
  width: 180px;
  height: 180px;
  float: left;
  box-sizing: border-box;
  margin: 5px 10px;
}
.xiangqingINDEX {
  width: 400px;
  height: 450px;
  /* background-color: aqua; */
  float: left;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.item {
  font-size: 48px;
}
.cardINDEX > div {
  width: 300px;
  height: 800px;
  float: left;
  box-sizing: border-box;
  margin: 5px 10px;
}
.cardINDEX {
  width: 1300px;
  height: 800px;
  /* background-color: aqua; */
  float: left;
  margin-right: 100px;
}
.el-breadcrumb {
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  margin-left: 20px;
}
.topINDEX {
  height: 40px;
}
</style>