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
          max-height="800px"
        >
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="床位"></el-table-column>
          <el-table-column prop="heartRate" label="心率" sortable width="180"></el-table-column>
          <el-table-column prop="condition" label="危机情况" sortable width="180"></el-table-column>
          <el-table-column prop="reason" label="预警原因" width="180"></el-table-column>
          <el-table-column prop="scheme" label="处理方案" width="180"></el-table-column>
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
              <div class="text item">{{yujingnub}}</div>
            </el-card>
          </router-link>
          <router-link to="/danger">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>危险</span>
              </div>
              <div class="text item">{{weixiannub}}</div>
            </el-card>
          </router-link>
          <router-link to="/chuli">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>处理</span>
              </div>
              <div class="text item">{{chulinub}}</div>
            </el-card>
          </router-link>
          <router-link to="/logoin">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>未处理</span>
              </div>
              <div class="text item">{{weichulinub}}</div>
            </el-card>
          </router-link>
        </div>
      </div>
      <!-- 简介 -->
      <div class="jieshao">
        <div>成都XXX养老院</div>
        <div>负责人：孙翼谋</div>
        <div>负责人电话：1111222333</div>
        <div>已处理次数：200次</div>
        <div>地址：成都市磨子桥东段</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      search: "",
      yujingnub: 0,
      weixiannub: 0,
      chulinub: 0,
      weichulinub: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "周晓婉",
          address: "3区208房1号床",
          condition: "危险",
          heartRate: 63,
          reason: "房性早搏：65/24h",
          scheme: "已转交给医生",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          heartRate: 53,
          reason: "矩阵房速：12/24h",
          scheme: "已转交给护工",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          heartRate: 83,
          reason: "对成房早：65/24h",
          scheme: "已转交给医生",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-02",
          name: "周峯",
          address: "3区208房1号床",
          condition: "危险",
        },
        {
          date: "2016-05-04",
          name: "孙儒",
          address: "3区208房1号床",
          condition: "警告",
        },
        {
          date: "2016-05-01",
          name: "李辉",
          address: "3区208房1号床",
          condition: "提醒",
        },
        {
          date: "2016-05-03",
          name: "吴赐",
          address: "3区208房1号床",
          condition: "危险",
        },
      ],
      postdataYU: "",
    };
  },
  methods: {
    tableRowClassName(row) {
      if (row.row.condition == "危险") {
        return "jinP";
      } else if (row.row.condition == "提醒") {
        return "tiP";
      } else if (row.row.condition == "警告") {
        return "weiP";
      }
    },
    handleEdit(a, b) {
      this.postdataYU = b;
      console.log(a, b);
    },
    gettimeINDEX() {
      // let that = this;
      // setInterval(() => {
      //   that
      //     .$axios({
      //       url: this.GLOBAL.serverSrc + "/alldanger",
      //       method: "post",
      //       params: {},
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //       // that.weixiannub = res.data.nab;
      //       that.yujingnub=res.data.yujing;
      //       that.weixiannub=res.data.weixian;
      //       that.chulinub=res.data.chuli;
      //       that.weichulinub=res.data.weichuli;
      //     });
      // }, 1000);
    },
  },
  mounted() {
    this.gettimeINDEX();
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
  background-color: oldlace !important;
}
.tiP {
  background-color: #f0f9eb !important;
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