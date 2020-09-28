<template>
  <!-- 不应该是修改值而是跳转到新的页面 -->
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>病例详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{GLOBAL.BL.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <pdfshow :havejpg="progressBar.havejpg"></pdfshow>

    <div style="float:right;width:950px;height:100%;position: relative;">
      <div>
        <div class="msgBL">
          <p>年龄：{{this.peoplemsg.bir}}</p>
          <p>性别：{{ this.peoplemsg.sex }}</p>
          <p>家人电话：{{ this.peoplemsg.phone }}</p>
          <p>过敏药物：{{ this.peoplemsg.drug_use }}</p>
          <p>床位：{{ this.peoplemsg.bed }}</p>
          <p>病史：{{ this.peoplemsg.family_history }}</p>
          <div class="photoBL"></div>
        </div>
      </div>
      <el-steps :active="progressBar.state" align-center style="margin-top: 60px">
        <el-step title="预警发送">
          <template slot="description">
            <div v-if="progressBar.step1.timein">{{progressBar.step1.timein}}</div>
          </template>
        </el-step>
        <el-step title="接收预警">
          <template slot="description">
            <div v-if="progressBar.step2.idGL">{{progressBar.step2.idGL}}</div>
          </template>
        </el-step>
        <el-step title="正在处理">
          <template slot="description">
            <div v-if="progressBar.step3.idGL">医生：{{progressBar.step3.idGL}}</div>
          </template>
        </el-step>
        <el-step title="处理完成" :description="progressBar[3]">
          <template slot="description">
            <div v-if="progressBar.step4.timein">{{progressBar.step4.timein}}</div>
          </template>
        </el-step>
      </el-steps>
      <router-link :to="{path:'/liucheng' ,query:this.postdata}">
        <el-button type="primary" round style="marginTop:50px" @click=" setpostdata()">流程详情</el-button>
      </router-link>
      <div style="textAlign: left;fontSize:22px;position: absolute;bottom: 360px;">历史病例</div>
      <el-table :data="tableData" style="width: 100%;height:350px;position: absolute;" height="500">
        <el-table-column label="时间">
          <template slot-scope="scope">{{scope.row.sending_time.substring(0,10)}}</template>
        </el-table-column>
        <el-table-column prop="heart_rate" label="心率"></el-table-column>
        <el-table-column prop="situation" label="危险等级"></el-table-column>
        <el-table-column prop="send_details" label="病因分析"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button size="mini" @click="setprogressBar(true,scope)">查看详情</el-button>
          </div>
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
import pdfshow from "./pdfshow";
export default {
  name: "bingli",
  components: {
    pdfshow,
  },
  data() {
    return {
      //传给流程的数据
      postdata: {},
      //当前页码
      page: 1,
      //共多少数据
      total: 0,

      //后端获取的进度条信息
      progressBar: {
        //是否有人工病例
        havejpg: false,
        //进度条步骤state
        state: 0,
        step1: { timein: "" },
        step2: {
          idGL: "",
        },
        step3: {
          idGL: "",
        },
        step4: { timein: "" },
      },

      //病例信息  后端获取
      tableData: [],
      //后端获取的这一次的病例信息
      peoplemsg: {},
    };
  },
  methods: {
    setpostdata() {
      console.log("病例页面进入postdata" + this.postdata);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.gethistory(val);
    },
    setprogressBar(p, temp) {
      // console.log(temp);
      //点击触发
      if (p) {
        console.log(temp);
        this.postdata = this.peoplemsg.list[temp.$index];
        temp = temp.row;
      }
      //初始化触发
      console.log(this.progressBar, temp);
      this.progressBar.state = temp.state == 0 ? 4 : temp.state;
      this.progressBar.step1.timein = temp.sending_time;
      this.progressBar.step2.idGL = temp.situation == "危险" ? "Ｇ＆Ｄ" : "Ｇ";
      this.progressBar.step3.idGL = temp.handler_id;
      this.progressBar.step4.timein = temp.completion_time;
      if (temp.ecg_report_id != null) {
        this.progressBar.havejpg = true;
        console.log(111, this.progressBar.havejpg);
      } else this.progressBar.havejpg = false;

      //修改给下一页的数据
      this.postdata = temp;
      this.postdata.name = this.GLOBAL.BL.name;
      console.log(this.postdata);
      this.$forceUpdate();
    },
    //获取历史病例
    gethistory(val) {
      this.GLOBAL.dengdai("block");
      console.log(this.GLOBAL.BL.sendid);
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "details/specific/" +
          this.GLOBAL.BL.sendid +
          "/" +
          this.GLOBAL.yanglaoyuanid +
          "/" +
          val,
        method: "get",
      }).then((res) => {
        this.peoplemsg = JSON.parse(JSON.stringify(res.data.data.info));
        let time = new Date().getFullYear();
        this.peoplemsg.bir =
          time - parseInt(res.data.data.info.birthday.substring(0, 4));
        this.tableData = res.data.data.info.list;
        this.total = res.data.data.count;
        console.log("返回", res);
        //写步骤 completion_time
        console.log(res.data.data);
        if (res.data.data.info.list[this.GLOBAL.BL.nub] == undefined)
          this.GLOBAL.BL.nub = 0;
        this.setprogressBar(false, res.data.data.info.list[this.GLOBAL.BL.nub]);
        //默认去往流程页面的是当前的index
        this.postdata = this.peoplemsg.list[this.GLOBAL.BL.nub];
        this.GLOBAL.dengdai("none");
        this.$forceUpdate();
      });
    },
  },
  mounted() {
    this.handleCurrentChange(this.page);
  },
};
</script>

<style >
.headBG {
  height: 180px;
  border: 1px solid;
}
.headBG :nth-child(1) {
  background-image: url("../assets/photo.jpg");
  width: 150px;
  height: 140px;
  background-size: 100%;
  position: absolute;
  border-radius: 50%;
  top: 20px;
  left: 20px;
}
.headBG :nth-child(2) {
  font-size: 30px;
  width: 290px;
  position: absolute;
  right: 0px;
  top: 40px;
  text-align: left;
}
.headBG :nth-child(3) {
  font-size: 24px;
  width: 290px;
  position: absolute;
  right: 0px;
  top: 90px;
  text-align: left;
}
.show {
  width: 500px;
  height: 800px;
  /* background-color: rebeccapurple; */
  float: left;
  margin-left: 169px;
  position: relative;
  border: 1px solid burlywood;
}
.showbutt {
  position: absolute;
  top: 13px;
  left: 18%;
}
/* .jpgshow {
  margin-left: 200px;
  width: 400px;
  height: 800px;
  background-image: url("../assets/test.jpg");
  background-size: cover;
  float: left;
} */
.el-step__title {
  font-size: 20px;
  font-weight: 700;
}
.el-step.is-center .el-step__description {
  padding-left: 0;
  width: 100%;
  padding-right: 0;
}
#upbutBL {
  margin-top: 160px;
}
.photoBL {
  width: 100px;
  height: 140px;
  background-image: url("../assets/photo.jpg");
  background-size: 100%;
  position: absolute;
  right: 33px;
}
.msgBL {
  height: 200px;
}
.msgBL > p {
  width: 435px;
  float: left;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}
.inputBL {
  width: 800px;
  float: left;
  margin-top: 20px;
}
</style>