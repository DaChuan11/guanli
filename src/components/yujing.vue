<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预警详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="时间" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="床位"></el-table-column>
        <el-table-column prop="condition" label="心率" sortable></el-table-column>
        <el-table-column prop="level" label="危险等级" sortable></el-table-column>
        <el-table-column prop="fix" label="病因分析"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <router-link :to="{path:'/bingli',query:{postdataYU}}">
              <el-button size="mini" @click="cheak(scope.row)">查看详情</el-button>
            </router-link>
            <el-button
              type="success"
              @click="handleDelete(scope.$index, scope.row)"
              size="mini"
            >发给医生</el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible1"
              width="50%"
              :before-close="handleClose"
            >
              <div class="docm">
                <div v-for="(value,key) in doclist" :key="key">
                  <div class="docimg docimg1"></div>
                  <div style="fontSize:20px">{{value.docname}}</div>
                  <div style="fontSize:20px">{{value.title}}</div>
                  <div style="fontSize:20px">{{value.line}}</div>
                  <div style="margin-top: -100px;">上一次处理完成的时间：</div>
                  <div>{{value.last}}</div>
                  <div style="margin-top:20px">擅长领域：</div>
                  <div>{{value.merit}}</div>
                  <div style="margin-top:20px">正在处理：{{value.now}}</div>
                  <div>完成处理：{{value.done}}</div>
                  <div class="sendYJ">发送预警</div>
                </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
              </span>
            </el-dialog>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">呼叫家属</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "yujing",
  methods: {
    cheak(row) {
      this.postdataYU = {
        name: row.name,
        address: row.address,
        url: row.url,
        urljpg: row.urljpg,
        level: row.level,
      };
      //后退操作
      sessionStorage.setItem("houtui", JSON.stringify(this.postdataYU));
      // console.log(this.postdataYU.toString);
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
      doclist: [
        {
          docname: "皮卡丘",
          title: "主治医生",
          line: "在线",
          now: "5",
          done: "182",
          img: "",
          last: "8月8日 12:23:23",
          merit: "对房成早",
        },
        {
          docname: "卡布达",
          title: "副主任",
          line: "离线",
          now: "2",
          done: "12",
          img: "",
          last: "8月8日 12:23:23",
          merit: "对房成早",
        },
        {
          docname: "工藤新一",
          title: "住院医生",
          line: "在线",
          now: "1",
          done: "345",
          img: "",
          last: "8月8日 12:23:23",
          merit: "对房成早",
        },
      ],
      dialogVisible1: false,
      postdataYU: {},
      //后台获取
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
          name: "王2",
          address: "B区280号",
          condition: 62,
          fix: "房性早搏",
          level: "2级预警",
          url: "static/xiaohu2.pdf",
          urljpg: "../assets/test.jpg",
        },
        {
          date: "2016-05-01  11:12:32",
          name: "李3",
          address: "B区280号",
          condition: 80,
          fix: "房性早搏",
          level: "3级预警",
          url: "static/xiaohu3.pdf",
        },
        {
          date: "2016-05-03  11:12:32",
          name: "赵4",
          address: "B区280号",
          condition: 80,
          fix: "房性早搏",
          level: "1级预警",
          url: "static/xiaohu3.pdf",
        },
      ],
    };
  },
};
</script>

<style>
.docimg {
  background-image: url("../assets/photo.jpg");
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