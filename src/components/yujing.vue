<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预警详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table :data="tableData" style="width: 100%">
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
            <el-button
              type="success"
              @click="handleDelete(scope.$index, scope.row)"
              size="mini"
              >发给医生</el-button
            >
            <el-button size="mini" type="danger" @click="logtable(scope.row)"
              >呼叫家属</el-button
            >
          </div>
        </el-table-column>
      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible1"
        width="50%"
        :before-close="handleClose"
      >
        <div style="display: none">
          <img src="../assets/doc1.jpg" />
          <img src="../assets/doc2.jpg" />
          <img src="../assets/doc3.jpg" />
        </div>
        <div class="docm">
          <div v-for="(value, key) in doclist" :key="key">
            <div class="docimg" :style="{ backgroundImage: value.img }"></div>
            <div style="fontsize: 20px">{{ value.docname }}</div>
            <div style="fontsize: 20px">{{ value.title }}</div>
            <div style="fontsize: 20px">{{ value.line }}</div>
            <div style="margin-top: -100px">上一次处理完成的时间：</div>
            <div>{{ value.last }}</div>
            <div style="margin-top: 20px">擅长领域：</div>
            <div>{{ value.merit }}</div>
            <div style="margin-top: 20px">正在处理：{{ value.now }}</div>
            <div>完成处理：{{ value.done }}</div>
            <div class="sendYJ">发送预警</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
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
  name: "yujing",
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
          "/预警/" +
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
      console.log("检查", row);
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleDelete(index, row) {
      this.dialogVisible1 = !this.dialogVisible1;
      console.log(index, row);
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
      doclist: [
        {
          docname: "齐晓勇",
          title: "主任医师",
          line: "在线",
          now: "5",
          done: "182",
          img: "url('static/img/doc1.6138db51.jpg')",
          last: "9月36日 12:23:23",
          merit: "心脏介入手术",
        },
        {
          docname: "张建青",
          title: "副主任医师",
          line: "离线",
          now: "2",
          done: "12",
          img: "url('static/img/doc2.cb817f48.jpg')",
          last: "8月8日 12:23:23",
          merit: "冠心病、心绞痛、心肌梗塞",
        },
        {
          docname: "李树仁",
          title: "副主任医师",
          line: "在线",
          now: "8",
          done: "345",
          img: "url('static/img/doc3.248c1c06.jpg')",
          last: "8月8日 12:23:23",
          merit: "冠状动脉造影、PTCA及支架术",
        },
      ],
      dialogVisible1: false,
      postdataYU: {},
      //后台获取
      tableData: [{}],
    };
  },
  mounted() {
    this.handleCurrentChange(this.page);
  },
};
</script>

<style>
.docimg {
  /* background-image: url("../assets/photo.jpg"); */
  background-size: 100%;
  background-repeat: no-repeat;
}
.docm > div {
  width: 300px;
  height: 400px;
  float: left;
  text-align: center;
}
.docm > div > :nth-child(1) {
  height: 120px;
  width: 100px;
}
.docm > div > :nth-child(2),
.docm > div > :nth-child(3),
.docm > div > :nth-child(4) {
  position: relative;
  top: -120px;
  left: 20px;
}
.docm > div > div {
  margin-top: 10px;
}
.sendYJ {
  height: 40px;
  width: 200px;
  line-height: 40px;
  margin-left: 50px;
  margin-top: 50px;
  border: 2px solid #409eff;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 8px;
  font-size: 20px;
}
.sendYJ:hover {
  background-color: #409eff;
  color: whitesmoke;
}
</style>