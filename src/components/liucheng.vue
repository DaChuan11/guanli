<template>
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>流程详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.postdataLC.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pdfshow">
      <pdfshow :posturl="$route.query.postdataLC.url"></pdfshow>
    </div>
    <!-- <button @click="ifch()">000</button> -->
    <div style="float:right;width:950px;height:100%;position: relative;">
      <el-steps :active="2" align-center direction="vertical">
        <el-step title="预警发送">
          <template slot="description">
            <div v-if="progressLiu.step1.timein">发送时间：{{progressLiu.step1.timein}}</div>
            <p>在--时，老人心率--，电波--，经系统处理，认为老人存在--的风险，属于--风险，将此险情发往--端</p>
          </template>
        </el-step>
        <el-step title="接收预警">
          <template slot="description">
            <div v-if="progressLiu.step1.timeout">回应时间：{{progressLiu.step1.timeout}}</div>
            <p>在--时，--管理端发现了这一预警，在--时及时回应，前往现场进行救治</p>
          </template>
        </el-step>
        <el-step title="正在处理">
          <template slot="description">
            <div v-if="progressLiu.step1.timein">到达时间：{{progressLiu.step1.timein}}</div>
            <p>
              管理人员：--在--时到达现场，进行了--，--，--等操作，
              <span>发现病情没有得到缓解，于--时将此病情发送给医生：--</span>
            </p>
            <p>医生：--在--时到达现场，进行了--，--，--等操作，问题得到解决,病人的心率稳定在--，电波稳定在--，于--时离开</p>
          </template>
        </el-step>
        <el-step title="处理完成">
          <template slot="description">
            <div v-if="progressLiu.step1.timeout">完成时间：{{progressLiu.step1.timeout}}</div>
            <p></p>
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
import pdfshow from './pdfshow'
export default {
  name: "liucheng",
  components: {
    pdfshow,
  },
  data() {
    return {
      progressLiu: {
        step1: { timein: "18月10号 12:22:22", timeout: "18月10号 12:23:44" },
        step2: {
          timein: "18月10号 12:24:22",
          timeout: "18月10号 12:24:44",
          idGL: "章小腿",
        },
        step3: {
          timein: "18月10号 12:26:22",
          timeout: "18月10号 12:26:44",
          idGL: "章大腿",
        },
        step4: { timein: "18月10号 12:28:22" },
      },
      posturl: this.$route.query.postdataLC.url,
    };
  },
  methods: {
    temp() {
      console.log(this.$route.query.postdataLC);
    },
    
  },

  mounted() {
    this.temp();
  },
};
</script>

<style >
.el-step__description.is-finish {
  color: black;
}
.kuaiLC {
  width: 410px;
  float: left;
}
.kuaiLC > :nth-child(2) {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.kuaiLC > :nth-child(3) {
  font-size: 18px;
  text-align: center;
}
.el-step.is-center .el-step__description {
  padding-left: 0;
  width: 100%;
  padding-right: 0;
}
.el-step__description {
  font-size: 16px;
}
</style>