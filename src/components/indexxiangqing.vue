<template>
  <div style="height: 100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        this.$route.query.postdataYU.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <input
      class="file"
      name="file"
      type="file"
      accept=""
      @change="update($event)"
      style="width: 100px; height: 50px; cursor: pointer"
    />
    <div style="height: 60%; width: 50%">
      <div class="ixqmsg">
        <div>本次信息</div>
        <div>
          <div>
            <p>{{ getifom[0] }}</p>
            <p>房性早搏</p>
          </div>
          <div>
            <p>{{ getifom[1] }}/24h</p>
            <p>成对房早</p>
          </div>
          <div>
            <p>{{ getifom[2] }}/24h</p>
            <p>短阵房速</p>
          </div>
          <div>
            <p>{{ getifom[3] }}/24h</p>
            <p>室性早搏</p>
          </div>
          <div>
            <p>{{ getifom[3] }}/24h</p>
            <p>成对室早</p>
          </div>
          <div>
            <p>{{ getifom[3] }}/24h</p>
            <p>多源性室早</p>
          </div>
        </div>
      </div>
    </div>

    <div
      style="
        width: 1500px;
        margin-left: -750px;
        position: relative;
        left: 50%;
        overflow: hidden;
        height: 200px;
      "
    >
      <canvas
        id="sjcanvas"
        height="200"
        width="1500"
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
        width="1500"
        style="position: absolute; left: 0"
      ></canvas>
    </div>
    <div
      style="width: 1000px; position: relative; left: 50%; margin-left: -500px"
    >
      <el-slider v-model="value3" :show-tooltip="false"></el-slider>
    </div>
    <!-- 危险 成对房早 -->
    <div
      class="references"
      v-if="this.$route.query.postdataYU.crisis_situation == '危险'"
    >
      <div>
        <div>成对房早概述</div>
        <div>
          <li>成对的房性早搏就是指房性早搏连续出现2次</li>
          <li>由于心房的异位起搏点发放冲动而引起的心脏激动</li>
          <li>成对的房早属于频繁性早搏，可以使用抗心律失常的药物来治疗</li>
        </div>
      </div>
      <div>
        <div>疾病定义</div>
        <div>
          &emsp;房性期前收缩是指早于基础心律（多为窦性心律）而提前出现的房性异位搏动，是临床上常见的心律失常，也称为房性早搏（简称房早）
        </div>
      </div>
      <div>
        <div>病因</div>
        <div>
          &nbsp;多见于器质性心脏病患者，如心脏瓣膜病、高血压性心脏病、冠心病和肺源性心脏病等，心脏外疾病（如甲状腺功能亢进症）、某些药物的应用或电解质紊乱等也常发生房性期前收缩。部分房性期前收缩见于正常人，易发生在紧张、焦虑或饮酒后。
        </div>
      </div>
    </div>
    <!-- 预警房速 -->
    <div
      class="references"
      v-else-if="this.$route.query.postdataYU.crisis_situation == '预警'"
    >
      <div>
        <div>矩阵房速概述</div>
        <div>
          <li>房性心动过速简称房速。</li>
          <li>
            根据发生机制与心电图表现的不同，可分为自律性房性心动过速、折返性房性心动过速与混乱性房性心动过速三种。
          </li>
          <li>可使用心电图进行检查，并根据检查结果进行诊断和药物治疗。</li>
        </div>
      </div>

      <div>
        <div>检查</div>
        <div>
          <li>P波形态与窦性者不同，在Ⅱ、Ⅲ、aVF导联通常直立。</li>
          <li>
            常出现二度I型或Ⅱ型房室传导阻滞，呈现2：1房室传导者亦属常见，但心动过速不受影响。
          </li>
          <li>P波之间的等电线仍存在（与心房扑动时等电线消失不同）。</li>
          <li>刺激迷走神经不能终止心动过速，仅加重房室传导阻滞。</li>
        </div>
      </div>
    </div>
    <!-- 正常 -->
    <div class="references" v-else>
      <div>
        <div>房性早搏概述</div>
        <div>
          <li>正常人和器质性心脏病患者均可发生</li>
          <li>临床上常见的一种心律失常</li>
          <li>心悸为主要表现，部分患者可无任何不适</li>
          <li>良性心律失常，预后取决于原发病</li>
        </div>
      </div>
      <div>
        <div>疾病定义</div>
        <div>
          &emsp;房性期前收缩是指早于基础心律（多为窦性心律）而提前出现的房性异位搏动，是临床上常见的心律失常，也称为房性早搏（简称房早）
        </div>
      </div>
      <div>
        <div>病因</div>
        <div>
          &nbsp;多见于器质性心脏病患者，如心脏瓣膜病、高血压性心脏病、冠心病和肺源性心脏病等，心脏外疾病（如甲状腺功能亢进症）、某些药物的应用或电解质紊乱等也常发生房性期前收缩。部分房性期前收缩见于正常人，易发生在紧张、焦虑或饮酒后。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<script>
export default {
  name: "indexxiangqing",
  data() {
    return {
      wrong: true,
      go: false,
      getifom: [0, 6, 4, 1],
      zhexianARR: [],
      value3: 0,
      kuan: 0,
    };
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
    //背景纸移动
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
    setnub(temp) {
      console.log(this.$route.query.postdataYU);
      this.$set(
        this.getifom,
        0,
        this.$route.query.postdataYU.heart_condition_now
      );
      this.$set(this.getifom, 1, Math.floor(Math.random() * 10 + 5));
      if (temp == "预警") this.getifom[2] = Math.floor(Math.random() * 20 + 10);
      if (temp == "危险") this.getifom[3] = Math.floor(Math.random() * 10 + 5);
      this.$forceUpdate();
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
          ctx.lineTo(1500, i * 8);
          ctx.lineWidth = 1; //设置画笔的粗细
          ctx.strokeStyle = "#bdbaba"; //设置画笔的颜色
          ctx.closePath(); //结束路径
          ctx.stroke(); //描边路径
        } else {
          ctx.beginPath();
          ctx.moveTo(0, i * 8); //左顶点
          ctx.lineTo(1500, i * 8);
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
  },
  mounted() {
    this.setnub(this.$route.query.postdataYU.crisis_situation);
    this.drewbj();
  },
  watch: {
    $route: function () {
      //执行数据更新查询
      this.setnub(this.$route.query.postdataYU.crisis_situation);
      this.drewcam();
    },
    value3: function () {
      let temp = this.kuan / 100;
      let p = document.querySelector("#sjcanvas");
      p.style.left = "-" + temp * this.value3 + "px";
      console.log(this.value3);
    },
  },
};
</script>

<style>
.references {
  height: 100%;
  width: 40%;
  margin-top: -60px;
  position: absolute;
  top: 50px;
  right: 0;
}

.references > div > :nth-child(1) {
  font-size: 24px;
  text-align: left;
  margin: 30px;
}
.references > div > :nth-child(2) {
  font-size: 20px;
  text-align: left;
  margin: 10px;
}
.ixqmsg {
  height: 50%;
  width: 100%;
  float: left;
}
.ixqmsg > :nth-child(2) > div {
  width: 50%;
  height: 140px;
  float: left;
}
.ixqmsg > :nth-child(2) > div > :nth-child(1) {
  margin: 10px 0;
  font-size: 28px;
}
.ixqmsg > :nth-child(2) > div > :nth-child(3) {
  font-size: 28px;
  margin-top: 20px;
}
.ixqmsg > :nth-child(1) {
  font-size: 24px;
}
.el-icon-check {
  color: #67c23a;
}
.el-icon-close {
  color: #f56c6c;
}
</style>