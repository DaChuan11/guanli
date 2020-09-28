<template>
  <div>
    <!-- 开关 -->
    <el-switch
      style="display: block"
      v-model="showwhat"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="电子报告"
      inactive-text="医生报告"
      class="showbutt"
      :disabled="!havejpg"
    ></el-switch>
    <!-- 表格 -->
    <div
      v-show="!showwhat"
      style="
        width: 700px;
        height: 800px;
        float: left;
        border: 4px solid #515151;
      "
    >
      <el-row style="height: 50px">
        <el-col :span="24" style="height: 50px; backgroundcolor: #bec0bf">
          <div
            class="grid-content bg-purple"
            style="height: 50px; lineheight: 50px"
          >
            <div style="float: left; width: 100px; lineheight: 25px">
              芯跳守护Hsintiao
            </div>
            <div
              style="
                text-align: center;
                width: 500px;
                float: left;
                font-size: 22px;
              "
            >
              芯跳医疗动态心电图报告
            </div>
            <div
              style="
                position: absolute;
                right: 0;
                width: 160px;
                margin: 15px 0 0 -70px;
              "
            >
              ⽇期：{{ msg.date }}
            </div>
            <div
              style="
                position: absolute;
                right: 0;
                width: 160px;
                margin: -10px 0px 0px -98px;
              "
            >
              诊断医生：{{ msg.doc }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="bg-purple-light">
        <el-col :span="8">
          <div class="grid-content">姓名：{{ msg.name }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">性别：{{ msg.sex }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">年龄：{{ msg.age }}</div>
        </el-col>
      </el-row>
      <el-row class="bg-purple-dark">
        <el-col :span="8">
          <div class="grid-content">记录时间：{{ msg.writeTime }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">记录有效时长：{{ msg.validTime }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content" style="text-align: center; font-size: 22px">
            分析统计
          </div>
        </el-col>
      </el-row>
      <el-row class="bg-purple-dark">
        <el-col :span="24">
          <div class="grid-content" style="font-weight: 600"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">总心搏数：{{ msg.cardiacAll }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">RR间期：{{ msg.RR }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">最长RR间期：{{ msg.longRR }}</div>
        </el-col>
      </el-row>
      <el-row class="bg-purple-dark">
        <el-col :span="8">
          <div class="grid-content">平均心率：{{ msg.HRmean }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            最快心室率：{{ msg.fastestVentricularRate }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            最慢心室率：{{ msg.slowVentricularRate }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="padding: 0">
          <div class="grid-content" style="font-weight: 600">窦性心律</div>
        </el-col>
      </el-row>
      <el-row class="bg-purple-dark">
        <el-col :span="6">
          <div class="grid-content">心博总数：{{ msg.totalCardiacOutput }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">平均心率：{{ msg.meanHeartRate }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">最快心率：{{ msg.fastestHeartRate }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">最慢心率：{{ msg.slowestHeartRate }}</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="grid-content" style="font-weight: 600">房性心律</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content">房早总数：{{ msg.roomNumber }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">房速：{{ msg.tachycardia }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">单发：{{ msg.single }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">成对：{{ msg.double }}</div>
        </el-col>
      </el-row>

      <el-row class="bg-purple-dark">
        <el-col :span="24">
          <div class="grid-content" style="font-weight: 600">室性心律</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content">室早总数：{{ msg.roomEarly }}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">室速：{{ msg.VT }}</div>
        </el-col>
      </el-row>
      <el-row class="bg-purple-dark">
        <el-col :span="24">
          <div class="grid-content" style="font-weight: 600">⼼率变异性</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content">SDNN:{{ msg.SDNN }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">SDANN:{{ msg.SDANN }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">SDNNIndex:{{ msg.SDNNIndex }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">rMSSD:{{ msg.rMSSD }}</div>
        </el-col>
      </el-row>
      <el-row class="bg-purple-dark">
        <el-col :span="6">
          <div class="grid-content">pNN50:{{ msg.pNN50 }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">LF/HF:{{ msg.LFHF }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">LF:{{ msg.LF }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">HF:{{ msg.HF }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content">三⾓指数：{{ msg.Trigonometric }}</div>
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
          <div class="grid-content" style="textalign: center; fontsize: 22px">
            诊断结论
          </div>
        </el-col>
      </el-row>
      <div style="height: 104px; textalign: left">{{ msg.jielun }}</div>
      <div
        style="height: 22px; font-size: 14px; text-align: left; margin-top: 4px"
      >
        本报告仅反映受检者受检时的情况。
      </div>
    </div>
    <!-- 折线 -->
    <input
      class="file"
      name="file"
      type="file"
      accept=""
      @change="update($event)"
      style="width: 100px; height: 50px; cursor: pointer"
    />
    <div class="show" v-show="showwhat">
      <div class="headBG">
        <div></div>
        <div>{{ GLOBAL.BL.name }}</div>
        <div>{{ GLOBAL.ylyXX.name }}</div>
      </div>
      <!-- 折线 -->
      <p style="font-size: 24px; font-weight: 600">心率周期</p>
      <p style="float: right; margintop: -20px">(231/43)</p>
      <div
        style="
          width: 500px;
          margin-left: -250px;
          position: relative;
          left: 50%;
          overflow: hidden;
          height: 200px;
        "
      >
        <canvas
          id="sjcanvas"
          height="200"
          width="500"
          @mousedown="move"
          style="
            position: absolute;
            left: 0px;
            z-index: 10;
            transition: all 0.2s ease 0s;
          "
        ></canvas
        ><canvas
          id="BJcanvas"
          height="200"
          width="500"
          style="position: absolute; left: 0"
        ></canvas>
      </div>
      <div
        style="width: 500px; position: relative; left: 50%; margin-left: -250px"
      >
        <el-slider v-model="value3" :show-tooltip="false"></el-slider>
      </div>
      <div class="msgshot">
        <div>
          <div>1/24</div>
          <div>房性早搏</div>
        </div>
        <div>
          <div>1/24</div>
          <div>成对房早</div>
        </div>
        <div>
          <div>1/24</div>
          <div>短阵房速</div>
        </div>
        <div>
          <div>1/24</div>
          <div>室性早搏</div>
        </div>
        <div>
          <div>1/24</div>
          <div>成对室早</div>
        </div>
        <div>
          <div>1/24</div>
          <div>多源性室早</div>
        </div>
      </div>
      <h2 style="text-align: left">小结</h2>
      <div style="position: relative; height: 130px">
        <div v-for="(value, key) in xiaojielist" :key="key" class="boxmsg">
          {{ key }}.{{ value }}
        </div>
        <hr style="position: absolute; width: 100%" />
        <hr style="position: absolute; width: 100%; top: 26px" />
        <hr style="position: absolute; width: 100%; top: 52px" />
        <hr style="position: absolute; width: 100%; top: 78px" />
        <hr style="position: absolute; width: 100%; top: 104px" />
      </div>
      <h5>建议您获取专业报告并尽快咨询医生</h5>
    </div>
  </div>
</template>
 
<script>
// import pdf from "vue-pdf";
export default {
  name: "pdfshow",
  //   components: { pdf },
  props: ["havejpg"],
  data() {
    return {
      value3: 0,
      kuan: 0,
      //显示pdf病例还是图片病例  true图片病例
      showwhat: true,
      // zhexianARR: [
      //   18,
      //   23,
      //   53,
      //   56,
      //   78,
      //   98,
      //   123,
      //   234,
      //   100,
      //   10,
      //   50,
      //   20,
      //   10,
      //   48,
      //   58,
      // ],
      // zhexianARR1: [
      //   18,
      //   23,
      //   53,
      //   56,
      //   78,
      //   98,
      //   123,
      //   234,
      //   100,
      //   10,
      //   50,
      //   20,
      //   10,
      //   48,
      //   58,
      // ],
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
      xiaojielist: [
        "窦性心动过速",
        "窦性心率不齐",
        "心房纤颤",
        "室性早搏三联律",
      ],
    };
  },
  mounted() {
    // this.drewcam();
    this.drewbj();
    console.log(this.havejpg);
  },
  watch: {
    value3: function () {
      let temp = this.kuan / 100;
      let p = document.querySelector("#sjcanvas");
      p.style.left = "-" + temp * this.value3 + "px";
      console.log(this.value3);
    },
  },
  methods: {
    update(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据
      // console.log(param.get("file"));
      //param.append('chunk','0');//添加form表单中其他数据
      //console.log(param.get('tweetPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      }; //添加请求头
      this.$axios({
        url: "http://192.168.31.42:8085/heartData/fileToArray",
        method: "post",
        config: config,
        data: param,
      }).then((res) => {
        console.log(res.data.resultObj);
        let p = [];
        for (let i = 2; i < res.data.resultObj.length; i++) {
          p.push(parseFloat(res.data.resultObj[i]));
        }
        for (let i = 0; i < 1000; i++) {
          p.push(0);
        }
        this.zhexianARR = p;
        // this.drewbj();
        this.dresj();
        // console.log("拼接后", p);
      });
    },
    drewbj() {
      let mcanvas = document.querySelector("#BJcanvas");
      let ctx = mcanvas.getContext("2d");

      for (let i = 0; i <= 200; i++) {
        if (i % 5 != 0) {
          ctx.beginPath();
          ctx.moveTo(i * 8, 0); //左顶点
          ctx.lineTo(i * 8, 200);
          ctx.lineWidth = 1; //设置画笔的粗细
          ctx.strokeStyle = "#bdbaba"; //设置画笔的颜色
          ctx.closePath(); //结束路径
          ctx.stroke(); //描边路径
        } else {
          ctx.beginPath();
          ctx.moveTo(i * 8, 0); //左顶点
          ctx.lineTo(i * 8, 200);
          ctx.lineWidth = 2; //设置画笔的粗细
          ctx.strokeStyle = "#afabab"; //设置画笔的颜色
          ctx.closePath(); //结束路径
          ctx.stroke(); //描边路径
        }
      }
      for (let i = 0; i <= 25; i++) {
        if (i % 5 != 0) {
          ctx.beginPath();
          ctx.moveTo(0, i * 8); //左顶点
          ctx.lineTo(500, i * 8);
          ctx.lineWidth = 1; //设置画笔的粗细
          ctx.strokeStyle = "#bdbaba"; //设置画笔的颜色
          ctx.closePath(); //结束路径
          ctx.stroke(); //描边路径
        } else {
          ctx.beginPath();
          ctx.moveTo(0, i * 8); //左顶点
          ctx.lineTo(500, i * 8);
          ctx.lineWidth = 2; //设置画笔的粗细
          ctx.strokeStyle = "#afabab"; //设置画笔的颜色
          ctx.closePath(); //结束路径
          ctx.stroke(); //描边路径
        }
      }
    },
    dresj() {
      let mcanvas = document.querySelector("#sjcanvas");
      let mcontext = mcanvas.getContext("2d");
      this.kuan = Math.ceil(this.zhexianARR.length / 1500) * 1500;
      console.log(this.zhexianARR.length);
      mcanvas.width = this.kuan;
      //中间值
      let Y = 140;
      mcontext.moveTo(0, Y); //左顶点
      let temp = 1;
      mcontext.strokeStyle = "black"; //设置画笔的颜色

      for (let i = 0; i < this.zhexianARR.length; i++) {
        mcontext.lineTo(i * temp, Y - this.zhexianARR[i] * 250);
      }
      // mcontext.closePath(); //结束路径
      mcontext.stroke(); //描边路径
    },
    move(e) {
      let odiv = e.target;
      let disX = e.clientX - odiv.offsetLeft;
      document.onmousemove = (e) => {
        let left = e.clientX - disX;
        if (left > 0) odiv.style.left = 0;
        else odiv.style.left = left + "px";
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
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
  },
};
</script>
 
<style lang="scss" scoped>
.boxmsg {
  width: 50%;
  float: left;
  font-size: 20px;
  text-align: left;
  padding-left: 45px;
  box-sizing: border-box;
}
.msgshot {
  height: 150px;
}
.msgshot > div {
  width: 150px;
  float: left;
  margin: 8px;
}
.msgshot > div > :nth-child(1) {
  font-size: 24px;
  font-weight: 700;
}
.msgshot > div > :nth-child(2) {
}
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