<template>
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>流程详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{GLOBAL.BL.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pdfshow">
      <pdfshow></pdfshow>
    </div>
    <!-- <button @click="ifch()">000</button> -->
    <div style="float:right;width:950px;height:100%;position: relative;">
      <el-steps
        :active="$route.query.state==0?4:$route.query.state"
        align-center
        direction="vertical"
      >
        <el-step title="预警发送">
          <template slot="description">
            <div v-if="$route.query.sending_time">发送时间：{{$route.query.sending_time}}</div>
            <p>{{$route.query.send_details}}</p>
          </template>
        </el-step>
        <el-step title="接收预警">
          <template slot="description">
            <div
              v-if="$route.query.receive_early_warning_time"
            >回应时间：{{$route.query.receive_early_warning_time}}</div>
            <p>{{$route.query.receive_warning_details}}</p>
          </template>
        </el-step>
        <el-step title="正在处理">
          <template slot="description">
            <div v-if="$route.query.handler_time">到达时间：{{$route.query.handler_time}}</div>

            <p>{{$route.query.handler_details}}</p>
          </template>
        </el-step>
        <el-step title="处理完成">
          <template slot="description">
            <div v-if="$route.query.completion_time">完成时间：{{$route.query.completion_time}}</div>
            <p>{{$route.query.completion_details}}</p>
            <p></p>
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
import pdfshow from "./pdfshow";
export default {
  name: "liucheng",
  components: {
    pdfshow,
  },
  data() {
    return {};
  },
  methods: {
    temp() {
      console.log(this.$route);
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