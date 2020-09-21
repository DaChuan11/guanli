<template>
  <!-- <div class="pdf" style="width:35%;float:left;marginTop:-10px;margin-left: 115px;">
    <pdf :src="pdfUrl"></pdf>
  </div>-->
  <div style="width:700px;height:800px;float:left;border: 4px solid #515151;">
    <el-row style="height:50px">
      <el-col :span="24" style="height:50px;backgroundColor:#bec0bf">
        <div class="grid-content bg-purple" style="height:50px;lineHeight:50px;">
          <div style="float: left; width: 100px;lineHeight: 25px;">芯跳守护Hsintiao</div>
          <div style="text-align: center;width: 500px;float: left;font-size: 22px;">芯跳医疗动态心电图报告</div>
          <div
            style="position: absolute;right: 0; width: 160px;margin: 15px 0 0 -70px;"
          >⽇期：{{ msg.date}}</div>
          <div
            style="position: absolute;right: 0; width: 160px;margin: -10px 0px 0px -98px;"
          >诊断医生：{{ msg.doc}}</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="bg-purple-light">
      <el-col :span="8">
        <div class="grid-content">姓名：{{ msg.name}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">性别：{{ msg.sex}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">年龄：{{ msg.age}}</div>
      </el-col>
    </el-row>
    <el-row class="bg-purple-dark">
      <el-col :span="8">
        <div class="grid-content">记录时间：{{ msg.writeTime}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">记录有效时长：{{ msg.validTime}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content" style="text-align: center;font-size: 22px;">分析统计</div>
      </el-col>
    </el-row>
    <el-row class="bg-purple-dark">
      <el-col :span="24">
        <div class="grid-content" style="font-weight: 600;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content">总心搏数：{{ msg.cardiacAll}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">RR间期：{{ msg.RR}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">最长RR间期：{{ msg.longRR}}</div>
      </el-col>
    </el-row>
    <el-row class="bg-purple-dark">
      <el-col :span="8">
        <div class="grid-content">平均心率：{{ msg.HRmean}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">最快心室率：{{ msg.fastestVentricularRate}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">最慢心室率：{{ msg.slowVentricularRate}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="padding:0">
        <div class="grid-content" style="font-weight: 600;">窦性心律</div>
      </el-col>
    </el-row>
    <el-row class="bg-purple-dark">
      <el-col :span="6">
        <div class="grid-content">心博总数：{{ msg.totalCardiacOutput}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">平均心率：{{ msg.meanHeartRate}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">最快心率：{{ msg.fastestHeartRate}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">最慢心率：{{ msg.slowestHeartRate}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="grid-content" style="font-weight: 600;">房性心律</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content">房早总数：{{ msg.roomNumber}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">房速：{{ msg.tachycardia}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">单发：{{ msg.single}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">成对：{{ msg.double}}</div>
      </el-col>
    </el-row>

    <el-row class="bg-purple-dark">
      <el-col :span="24">
        <div class="grid-content" style="font-weight: 600;">室性心律</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content">室早总数：{{ msg.roomEarly}}</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">室速：{{ msg.VT}}</div>
      </el-col>
    </el-row>
    <el-row class="bg-purple-dark">
      <el-col :span="24">
        <div class="grid-content" style="font-weight: 600;">⼼率变异性</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content">SDNN:{{ msg.SDNN}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">SDANN:{{ msg.SDANN}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">SDNNIndex:{{ msg.SDNNIndex}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">rMSSD:{{ msg.rMSSD}}</div>
      </el-col>
    </el-row>
    <el-row class="bg-purple-dark">
      <el-col :span="6">
        <div class="grid-content">pNN50:{{ msg.pNN50}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">LF/HF:{{ msg.LFHF}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">LF:{{ msg.LF}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">HF:{{ msg.HF}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content">三⾓指数：{{ msg.Trigonometric}}</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content" style="textAlign: center;fontSize: 22px;">诊断结论</div>
      </el-col>
    </el-row>
    <div style="height: 104px;textAlign:left">{{ msg.jielun }}</div>
    <div style="height: 22px;font-size: 14px;text-align: left;margin-top: 4px;">本报告仅反映受检者受检时的情况。</div>
  </div>
</template>
 
<script>
// import pdf from "vue-pdf";
export default {
  name: "pdfshow",
  //   components: { pdf },
  props: ["posturl"],
  data() {
    return {
      pdfUrl: "",
      src: "",
      numPages: 0,
      tempwenzi: "",
      msg: {
        doc: "刺猬",
        date: "2020-9-14",
        name: "小狐狸",
        sex: "男",
        age: "28",
        writeTime: "2020-9-13", //记录时间：
        validTime: "02:02:13", //记录有效时⻓：
        cardiacAll: "21", //总心搏数
        RR: "29", //RR间期：
        longRR: "92", //最⻓RR间期：
        HRmean: "72", //平均心率
        fastestVentricularRate: "80", //最快心室率
        slowVentricularRate: "30", //最慢心室率
        totalCardiacOutput: "84", //心博总数：
        meanHeartRate: "90", //平均⼼率：
        fastestHeartRate: "23", //最快心率
        slowestHeartRate: "1", //最慢⼼率
        roomNumber: "23/24", //房早总数：
        tachycardia: "23", //房速：
        single: "22", //单发：
        double: "21", //成对
        roomEarly: "54", //室早总数
        VT: "72", //室速
        SDNN: "21",
        SDANN: "24",
        SDNNIndex: "53",
        rMSSD: "42",
        pNN50: "21",
        LFHF: "72",
        LF: "54",
        HF: "45",
        Trigonometric: "63",
        jielun: "不错不错",
      },
    };
  },
  mounted() {
    this.save1();
    this.loadPdf();
    this.temp();
  },
  methods: {
    loadPdf() {
      //src为你存放pdf的路径
      //   this.pdfUrl = pdf.createLoadingTask(this.src);
    },
    temp() {
      console.log(this.posturl);
    },
    save1() {
      this.src = this.posturl;
    },
  },
  watch: {
    posturl: {
      handler() {
        console.log(11);
        this.src = this.posturl;
        // this.pdfUrl = pdf.createLoadingTask(this.src);
      },
    },
  },
};
</script>
 
<style lang="scss" scoped>
.grid-content {
  line-height: 36px;
  text-align: left;
  padding-left: 5px;
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  padding: 0;
}
.bg-purple-dark {
  background: #efefef;
}

.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  min-height: 36px;
  border: solid #c4c4c4 1px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>