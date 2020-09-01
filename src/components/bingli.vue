<template>
  <!-- 不应该是修改值而是跳转到新的页面 -->
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>病例详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{postdataYU.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <pdfshow :posturl="postdataYU.url" v-if="!showwhat"></pdfshow>
    <div class="jpgshow" v-if="showwhat"></div>
    <el-switch
      style="display: block"
      v-model="showwhat"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="电子报告"
      inactive-text="医生报告"
      class="showbutt"
      :disabled="havejpg"
    ></el-switch>
    <div style="float:right;width:950px;height:100%;position: relative;">
      <div>
        <div class="msgBL">
          <p>预警等级：{{postdataYU.level}}</p>
          <p>性别：{{ this.peoplemsg.gender }}</p>
          <p>家人电话：{{ this.peoplemsg.contact }}</p>
          <p>预警次数：{{ this.peoplemsg.time }}</p>
          <p>床位：{{ postdataYU.address }}</p>
          <p>病史：{{ this.peoplemsg.medicalHistory }}</p>
          <div class="photoBL"></div>
        </div>
      </div>
      <el-steps
        :active="3"
        align-center
        style="margin-top: 60px"
        v-if="this.peoplemsg.levalYJ=='重度'"
      >
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
        <el-button type="primary" round style="marginTop:50px">流程详情</el-button>
      </router-link>
      <div style="textAlign: left;fontSize:22px;position: absolute;bottom: 360px;">历史病例</div>
      <el-table
        :data="tableData"
        style="width: 100%;height:350px;position: absolute;bottom: 0;"
        max-height="500px"
      >
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="name" label="发病原因"></el-table-column>
        <el-table-column prop="condition" label="心率"></el-table-column>
        <el-table-column prop="level" label="危险等级"></el-table-column>
        <el-table-column prop="fix" label="病因分析"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <router-link :to="{path:'/bingli',query:{postdataYU}}">
              <el-button size="mini" @click="cheak(scope.$index, scope.row)">查看详情</el-button>
            </router-link>
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
      //是否有人工病例
      havejpg: true,
      //后端获取的进度条信息
      progressBar: {
        step1: { timein: "18月10号 12:22:22" },
        step2: {
          idGL: "Ｇ＆Ｄ",
        },
        step3: {
          timein: "18月10号 12:26:22",
          timeout: "18月10号 12:26:44",
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
      tableData: [
        {
          date: "2020-1-2",
          name: "过慢",
          condition: "64",
          level: "危险",
          fix: "加速运动",
          url: "static/doc2331.pdf",
        },
        {
          date: "2020-1-2",
          name: "过快",
          condition: "64",
          level: "危险",
          fix: "饮食不规范",
          url: "static/xiaohu2.pdf",
        },
        {
          date: "2020-1-2",
          name: "过慢",
          condition: "64",
          level: "危险",
          fix: "加速运动",
          url: "static/xiaohu3.pdf",
        },
        {
          date: "2020-1-2",
          name: "过快",
          condition: "64",
          level: "危险",
          fix: "饮食不规范",
          url: "static/xiaohu2.pdf",
        },
      ],
      //后端获取的这一次的病例信息
      peoplemsg: {
        levalYJ: "重度",
        gender: "男",
        time: "3",
        berth: "8区2号",
        contact: "55112315462",
        medicalHistory: "心脏病，高血压",
      },
      //显示pdf病例还是图片病例  true图片病例
      showwhat: true,
    };
  },
  methods: {
    //判断是否有人工病例
    cheakjpg() {
      if (this.postdataYU.urljpg) {
        this.havejpg = false;
      }
    },
    cheak(index, row) {
      this.posturl = row.url;
      this.postdataYU.url = row.url;
      //系统病例
      // console.log(this.posturl);
      // console.log(this.GLOBAL);
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
        console.log(this.postdataLC);
      }
    },
  },
  mounted() {
    this.test();
    this.cheakjpg();
  },
};
</script>

<style >
.showbutt {
  position: absolute;
  top: 13px;
  left: 18%;
}
.jpgshow {
  margin-left: 200px;
  width: 400px;
  height: 800px;
  background-image: url("../assets/test.jpg");
  background-size: cover;
  float: left;
}
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