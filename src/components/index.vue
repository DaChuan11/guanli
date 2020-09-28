<template>
  <div>
    <div class="topINDEX">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- 标签 -->
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
      <!-- :default-sort="{prop: 'crisis_situation'}" -->
      <div class="cardINDEX">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          max-height="700px"
        >
          <el-table-column
            prop="name"
            label="姓名"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="bed"
            label="床位"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="heart_condition_now"
            label="心率"
            sortable
            :sort-method="sortChange1"
          ></el-table-column>
          <el-table-column
            prop="crisis_situation"
            label="危机情况"
            sortable
            width="180"
          ></el-table-column>
          <el-table-column
            prop="reason_for_early_warning"
            label="预警原因"
            width="220"
          ></el-table-column>
          <el-table-column
            prop="treatment_plan"
            label="处理方案"
            width="180"
          ></el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header" slot-scope="scope" @click="te(scope)">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入姓名搜索"
                style="float: right; z-index: 1"
              />
              <el-button
                type="success"
                round
                size="mini"
                style="z-index: 2; position: absolute; right: 0"
                @click="check"
                >查询</el-button
              >
            </template>
            <template slot-scope="scope">
              <router-link
                :to="{ path: '/indexxiangqing', query: { postdataYU } }"
              >
                <el-button size="mini" @click="handleEdit(scope)"
                  >查看详情</el-button
                >
              </router-link>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :page-size="10"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
          style="width: 100%; height: 40px"
        ></el-pagination>
      </div>
      <el-dialog fullscreen title="查询结果" :visible.sync="dialogTableVisible">
        <el-table :data="gridData" :row-class-name="tableRowClassName">
          <el-table-column
            prop="name"
            label="姓名"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="bed"
            label="床位"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="heart_condition_now"
            label="心率"
            sortable
            :sort-method="sortChange1"
          ></el-table-column>
          <el-table-column
            prop="crisis_situation"
            label="危机情况"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="reason_for_early_warning"
            label="预警原因"
            width="400"
          ></el-table-column>
          <el-table-column
            prop="treatment_plan"
            label="处理方案"
            width="200"
          ></el-table-column>
          <el-table-column align="center" width="200">
            <template slot="header" slot-scope="scope" @click="te(scope)">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入姓名搜索"
                style="float: right; z-index: 1"
              />
              <el-button
                type="success"
                round
                size="mini"
                style="z-index: 2; position: absolute; right: 0"
                @click="check"
                >查询</el-button
              >
            </template>

            <template slot-scope="scope">
              <router-link
                :to="{ path: '/indexxiangqing', query: { postdataYU } }"
              >
                <el-button size="mini" @click="handleEdit(scope)"
                  >查看详情</el-button
                >
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 今日详情 -->
      <div class="xiangqingINDEX">
        <div style="fontsize: 30px; margin: 10px">今日情况</div>
        <div class="xiangqingcard">
          <router-link to="/yujing">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>预警</span>
              </div>
              <div class="text item">{{ todays[0] }}</div>
            </el-card>
          </router-link>
          <router-link to="/danger">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>危险</span>
              </div>
              <div class="text item">{{ todays[1] }}</div>
            </el-card>
          </router-link>
          <router-link to="/chuli">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>处理完成</span>
              </div>
              <div class="text item">{{ todays[2] }}</div>
            </el-card>
          </router-link>
          <router-link to="/weichuli">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>未处理</span>
              </div>
              <div class="text item">{{ todays[3] }}</div>
            </el-card>
          </router-link>
        </div>
      </div>
      <!-- 简介 -->
      <div class="jieshao">
        <div>{{ GLOBAL.ylyXX.name }}</div>
        <div>负责人：{{ GLOBAL.ylyXX.charge_people }}</div>
        <div>负责人电话：{{ GLOBAL.ylyXX.charge_phone }}</div>
        <div>已处理次数：{{ GLOBAL.ylyXX.processing_times }} 次</div>
        <div>地址：{{ GLOBAL.ylyXX.beadhouse_location }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      dialogTableVisible: false,
      //首页的定时器
      timer: "",
      //当前页码
      page: 1,
      //共多少数据
      total: 0,
      search: "",
      todays: [],
      tableData: [],

      // tableData1,删除

      tableData1: [],
      postdataYU: {},
      tempdanger: 0,
      //查询名字后的数据存放
      gridData: [],
      //今日数据定时器
      todaytimer: "",
    };
  },
  methods: {
    check() {
      this.$axios({
        url: this.GLOBAL.serverSrc + "beadhousepeople/selectname/",
        data: {
          beadhouse_id: this.GLOBAL.yanglaoyuanid,
          name: this.search,
        },
        method: "post",
      }).then((res) => {
        this.gridData = this.sortt(res.data.data);
        this.dialogTableVisible = true;
        // console.log(res);
      });

      // console.log(this.search);
    },
    sortChange1(a, b) {
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
    handleEdit(scope) {
      console.log(scope);
      this.postdataYU = {
        heart_condition_now: scope.row.heart_condition_now,
        crisis_situation: scope.row.crisis_situation,
        name: scope.row.name,
      };
      // console.log(a, b);
    },
    //今日情况get
    gettoday(lo) {
      if (lo) this.GLOBAL.dengdai("block");
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "beadhouse/situation/" +
          this.GLOBAL.yanglaoyuanid,
      }).then((res) => {
        this.GLOBAL.BWLtime = res.data.data.mem_no_read;
        // console.log(res.data);
        this.$set(this.todays, 0, res.data.data.early_warning_times);
        this.$set(this.todays, 1, res.data.data.danger_times);
        this.$set(this.todays, 2, res.data.data.complete_times);
        this.$set(this.todays, 3, res.data.data.no_complete_times);
        if (res.data.data.danger_times > this.GLOBAL.bianhua) {
          let temp = document.querySelectorAll(".flowchange");
          for (let i = 0; i < temp.length; i++) {
            temp[i].style.backgroundColor = "red";
            setTimeout(() => {
              temp[i].style.backgroundColor = "#409eff";
            }, 500);
            setTimeout(() => {
              temp[i].style.backgroundColor = "red";
            }, 1000);
            setTimeout(() => {
              temp[i].style.backgroundColor = "#409eff";
            }, 1500);
            setTimeout(() => {
              temp[i].style.backgroundColor = "red";
            }, 2000);
            setTimeout(() => {
              temp[i].style.backgroundColor = "#409eff";
            }, 2500);
          }
        }
        this.GLOBAL.bianhua = res.data.data.danger_times;
        if (lo) this.GLOBAL.dengdai("none");
      });
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
        this.total = res.data.data.count;
        this.tableData = this.sortt(res.data.data.info.list);
        // console.log(this.tableData);
        this.alertmsg(this.tableData);
        // this.tableData = res.data.data.info.list;
      });
    },
    //异步弹出危险消息
    alertmsg: async function (list) {
      let that = this;
      for (let i = 0; i < list.length; i++) {
        if (list[i].crisis_situation == "危险")
          await this.$notify.error({
            dangerouslyUseHTMLString: true,
            duration: 5000,
            message:
              "<strong><p style='width:70px;display:inline-block';>" +
              list[i].bed +
              "</p><p style='width:160px;text-align:right;display:inline-block';>" +
              list[i].name +
              "</p><p style='width:90px;display:inline-block'>心率：" +
              list[i].heart_condition_now +
              "</p><p style='width:140px;text-align:right;display:inline-block'>" +
              list[i].reason_for_early_warning +
              "<strong>",
            onClick() {
              let postdataYU = {
                heart_condition_now: list[i].heart_condition_now,
                crisis_situation: list[i].crisis_situation,
                name: list[i].name,
              };
              console.log(postdataYU);
              that.$router.push({
                path: "/indexxiangqing",
                query: { postdataYU },
              });
              console.log(111);
            },
          });
      }
    },
    sortt(list) {
      let WXlist = [];
      let YJlist = [];
      let ZClist = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].crisis_situation == "危险") WXlist.push(list[i]);
        else if (list[i].crisis_situation == "预警") YJlist.push(list[i]);
        else ZClist.push(list[i]);
      }
      let newlist = WXlist.concat(YJlist).concat(ZClist);
      return newlist;
    },
  },

  mounted() {
    this.getmsg(this.page);
    this.gettoday(true);
    //获取第几页情况 会清除  现在无法清除 因为需要前段请求这个借口更新危险的人数
    if (!this.GLOBAL.timer) {
      this.GLOBAL.timer = setInterval(() => {
        this.getmsg(this.page);
      }, 5000);
    }
    if (!this.GLOBAL.todaytimer) {
      this.GLOBAL.todaytimer = setInterval(() => {
        this.gettoday();
      }, 3000);
    }
    //获取今日数据 不会清除
  },
  // beforeDestroy() {
  //   if (this.timer) {
  //     clearInterval(this.timer); //关闭
  //   } //利用vue的生命周期函数
  // },
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
  transition: all 1s;
}
.tiP {
  background-color: #eff7eb !important;
  transition: all 1s;
}
.jinP {
  background-color: #f56c6ca9 !important;
  transition: all 1s;
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