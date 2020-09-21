<template>
  <!-- 不应该是修改值而是跳转到新的页面 -->
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>病例详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{GLOBAL.BL.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <pdfshow :posturl="postdataYU.url" v-show="!showwhat"></pdfshow>
    <!-- <div class="jpgshow" v-if="showwhat"></div> -->
    <div class="show" v-show="showwhat">
      <div class="headBG">
        <div></div>
        <div>{{GLOBAL.BL.name}}</div>
        <div>{{GLOBAL.ylyXX.name}}</div>
      </div>
      <!-- 折线 -->
      <p style="fontSize: 24px;fontWeight: 600;">心率周期</p>
      <p style="float: right;margin-top: -20px;">(231/43)</p>

      <canvas id="mycanvas" height="300" width="500">你的浏览器不支持canvas，请升级浏览器</canvas>
    </div>

    <el-switch
      style="display: block"
      v-model="showwhat"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="电子报告"
      inactive-text="医生报告"
      class="showbutt"
      :disabled="!progressBar.havejpg"
    ></el-switch>
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
      <router-link :to="{path:'/liucheng',query:{postdataLC}}">
        <el-button type="primary" round style="marginTop:50px" @click="setsession()">流程详情</el-button>
      </router-link>
      <div style="textAlign: left;fontSize:22px;position: absolute;bottom: 360px;">历史病例</div>
      <el-table
        :data="tableData"
        style="width: 100%;height:350px;position: absolute;bottom: 0;"
        max-height="500px"
      >
        <el-table-column label="时间">
          <template slot-scope="scope">{{scope.row.sending_time.substring(0,10)}}</template>
        </el-table-column>
        <el-table-column prop="heart_rate" label="心率"></el-table-column>
        <el-table-column prop="situation" label="危险等级"></el-table-column>
        <el-table-column prop="send_details" label="病因分析"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <el-button size="mini" @click="setprogressBar(scope.row)">查看详情</el-button>
          </div>
        </el-table-column>
      </el-table>
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
      zhexianARR: [
        5,
        5,
        5,
        12,
        24,
        12,
        5,
        -5,
        -5,
        -10,
        -20,
        -30,
        -20,
        -10,
        120,
        23,
        154,
        12,
        250,
        75,
        0,
        12,
        32,
        65,
        87,
        98,
        146,
      ],
      zhexianARR1: [200, 100, 50],

      //后端获取的进度条信息
      progressBar: {
        //是否有人工病例
        havejpg: "",
        //进度条步骤state
        state: 0,
        step1: { timein: "18月10号 12:22:22" },
        step2: {
          idGL: "Ｇ＆Ｄ",
        },
        step3: {
          idGL: "章大腿",
        },
        step4: { timein: "18月10号 12:28:22" },
      },
      //route传来的pdf地址信息
      posturl: this.$route.query.postdataYU.url,
      //route传来的信息
      postdataLC: {
        url: this.$route.query.postdataYU.url,
        name: this.$route.query.postdataYU.name,
      },
      postdataYU: this.$route.query.postdataYU,
      //病例信息  后端获取
      tableData: [],
      //后端获取的这一次的病例信息
      peoplemsg: {},
      //显示pdf病例还是图片病例  true图片病例
      showwhat: true,
    };
  },
  methods: {
    //存session 返回有数据
    setsession() {},
    setprogressBar(temp) {
      console.log(temp);
      if (temp.state == 0) this.progressBar.state = 4;
      else this.progressBar.state = temp.state;
      this.progressBar.step1.timein = temp.sending_time;
      if (temp.situation == "危险") this.progressBar.step2.idGL = "Ｇ＆Ｄ";
      else this.progressBar.step2.idGL = "Ｇ";
      this.progressBar.step3.idGL = temp.handler_id;
      this.progressBar.step4.timein = temp.completion_time;
      if (temp.ecg_report_id != null) {
        this.progressBar.havejpg = true;
        console.log(111, this.progressBar.havejpg);
      } else this.progressBar.havejpg = false;
      this.$forceUpdate();
    },
    //折线画心电图
    drewcam() {
      let mcanvas = document.querySelector("#mycanvas");
      let mcontext = mcanvas.getContext("2d");
      mcontext.lineWidth = 0.5; //设置画笔的粗细
      mcontext.beginPath(); //开始路径
      for (let i = 0; i < 7; i++) {
        mcontext.strokeStyle = "#ccc5c5"; //设置画笔的颜色
        mcontext.moveTo(0, i * 50); //左顶点
        mcontext.lineTo(500, i * 50);
        // mcontext.closePath(); //结束路径

        mcontext.stroke(); //描边路径
      }
      mcontext.beginPath(); //开始路径
      mcontext.lineWidth = 1.5; //设置画笔的粗细

      //中间值
      let Y = 250;
      mcontext.moveTo(0, Y); //左顶点
      let temp = 500 / this.zhexianARR.length;

      for (let i = 0; i < this.zhexianARR.length; i++) {
        mcontext.lineTo((1 + i) * temp, Y - this.zhexianARR[i]);
      }

      let linear = mcontext.createLinearGradient(350, 350, 350, 0);
      linear.addColorStop(0, "#2fdec6");
      linear.addColorStop(0.5, "#687de2");
      linear.addColorStop(1, "#8696e4");
      mcontext.strokeStyle = linear; //把渐变赋给填充样式
      // mcontext.closePath(); //结束路径
      mcontext.stroke(); //描边路径
    },
    //实心折线
    drewcam2() {
      let mcanvas = document.querySelector("#mycanvas");
      let mcontext = mcanvas.getContext("2d");
      mcontext.lineWidth = 0.5; //设置画笔的粗细
      mcontext.beginPath(); //开始路径
      for (let i = 0; i < 7; i++) {
        mcontext.strokeStyle = "#ccc5c5"; //设置画笔的颜色
        mcontext.moveTo(0, i * 50); //左顶点
        mcontext.lineTo(500, i * 50);
        mcontext.stroke(); //描边路径
      }
      mcontext.beginPath(); //开始路径
      mcontext.lineWidth = 1.5; //设置画笔的粗细

      //中间值
      let Y = 250;
      mcontext.moveTo(0, Y); //左顶点
      let temp = 500 / this.zhexianARR.length;

      for (let i = 0; i < this.zhexianARR.length; i++) {
        //平滑
        // if (i > 1 && i < this.zhexianARR.length - 1) {
        //   let y1 = Math.floor((i + 2) * temp);
        //   let x1 = Y - this.zhexianARR[i + 1]; //ok,
        //   let y2 = Math.floor(Y - this.zhexianARR[i] + temp / 2);
        //   let x2 = (this.zhexianARR[i + 1] - this.zhexianARR[i]) / 2;
        //   console.log(x1, y1, (i + 2) * temp, y2);
        //   mcontext.quadraticCurveTo(x1, y1,  x2, y2);
        // }

        if (i == this.zhexianARR.length - 1) {
          mcontext.lineTo((i + 1) * temp, Y);
        } else mcontext.lineTo((i + 1) * temp, Y - this.zhexianARR[i]);
      }

      let linear = mcontext.createLinearGradient(350, 350, 350, 0);
      linear.addColorStop(0, "#2fdec6");
      linear.addColorStop(0.5, "#687de2");
      linear.addColorStop(1, "#8696e4");
      mcontext.fillStyle = linear; //把渐变赋给填充样式
      mcontext.closePath(); //结束路径
      mcontext.fill(); //描边路径
    },
    drewcam3() {
      let mcanvas = document.querySelector("#mycanvas");
      let mcontext = mcanvas.getContext("2d");
      let temp = 500 / this.zhexianARR.length;
      mcontext.lineWidth = 0.5; //设置画笔的粗细
      mcontext.beginPath(); //开始路径
      for (let i = 0; i < 7; i++) {
        mcontext.strokeStyle = "#ccc5c5"; //设置画笔的颜色
        mcontext.moveTo(0, i * 50); //左顶点
        mcontext.lineTo(500, i * 50);
        mcontext.stroke(); //描边路径
      }
      mcontext.beginPath(); //开始路径
      mcontext.lineWidth = 1.5; //设置画笔的粗细
      let linear = mcontext.createLinearGradient(350, 350, 350, 0);
      linear.addColorStop(0, "#2fdec6");
      linear.addColorStop(0.5, "#687de2");
      linear.addColorStop(1, "#8696e4");
      mcontext.fillStyle = linear; //把渐变赋给填充样式
      for (let i = 0; i < this.zhexianARR.length; i++) {
        mcontext.fillRect(
          Math.floor(i * temp),
          250,
          10,
          -Math.floor(this.zhexianARR[i])
        );
        // console.log(-Math.floor(this.zhexianARR[i]));
        mcontext.stroke();
      }
    },
    gethistory() {
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "details/specific/" +
          this.GLOBAL.BL.sendid +
          "/" +
          this.GLOBAL.yanglaoyuanid,
        method: "get",
      }).then((res) => {
        this.peoplemsg = JSON.parse(JSON.stringify(res.data.data));
        let time = new Date().getFullYear();
        this.peoplemsg.bir =
          time - parseInt(res.data.data.birthday.substring(0, 4));
        this.tableData = res.data.data.list;
        //写步骤 completion_time
        this.setprogressBar(res.data.data.list[0]);
        this.$forceUpdate();

        console.log(res, this.peoplemsg);
      });
    },

    //session取值
    test() {
      if (!this.postdataYU.name) {
        this.postdataYU = JSON.parse(sessionStorage.getItem("houtui"));
        this.postdataLC = {
          url: this.postdataYU.url,
          name: this.postdataYU.name,
          urljpg: this.postdataYU.urljpg,
        };
        // console.log(this.postdataLC);
      }
    },
  },
  mounted() {
    this.test();
    this.drewcam3();
    this.gethistory();
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