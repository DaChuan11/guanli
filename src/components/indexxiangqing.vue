<template>
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.postdataYU.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="height:100%;width:50%;float: left;">
      <div class="ixqmsg">
        <div>预警信息</div>
        <div>
          <div>
            <p>29/24h</p>
            <p>房性早搏</p>
            <i class="el-icon-check" v-if="!wrong"></i>
            <i class="el-icon-close" v-if="wrong"></i>
          </div>
          <div>
            <p>29/24h</p>
            <p>矩阵房速</p>
            <i class="el-icon-check" v-if="!go"></i>
            <i class="el-icon-close" v-if="go"></i>
          </div>
          <div>
            <p>29/24h</p>
            <p>对成房早</p>
            <i class="el-icon-check" v-if="!go"></i>
            <i class="el-icon-close" v-if="go"></i>
          </div>
          <div>
            <p>29/24h</p>
            <p>多源性室性早搏</p>
            <i class="el-icon-check" v-if="!wrong"></i>
            <i class="el-icon-close" v-if="wrong"></i>
          </div>
        </div>
      </div>
      <div class="ixqmsg">
        <div>当前数据</div>
        <div>
          <div>
            <p>52</p>
            <p>心率</p>
            <i class="el-icon-check" v-if="!wrong"></i>
            <i class="el-icon-close" v-if="wrong"></i>
          </div>
          <div>
            <p>325</p>
            <p>心电</p>
            <i class="el-icon-check" v-if="!go"></i>
            <i class="el-icon-close" v-if="go"></i>
          </div>
          <div>
            <p>29/24h</p>
            <p>对成房早</p>
            <i class="el-icon-check" v-if="!go"></i>
            <i class="el-icon-close" v-if="go"></i>
          </div>
          <div>
            <p>29/24h</p>
            <p>多源性室性早搏</p>
            <i class="el-icon-check" v-if="!wrong"></i>
            <i class="el-icon-close" v-if="wrong"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="references">
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
        <div>&emsp;房性期前收缩是指早于基础心律（多为窦性心律）而提前出现的房性异位搏动，是临床上常见的心律失常，也称为房性早搏（简称房早）</div>
      </div>
      <div>
        <div>病因</div>
        <div>&nbsp;多见于器质性心脏病患者，如心脏瓣膜病、高血压性心脏病、冠心病和肺源性心脏病等，心脏外疾病（如甲状腺功能亢进症）、某些药物的应用或电解质紊乱等也常发生房性期前收缩。部分房性期前收缩见于正常人，易发生在紧张、焦虑或饮酒后。</div>
      </div>
      <div>
        <div>诱发因素</div>
        <div>
          <li>年龄的增加；</li>
          <li>过度劳累、吸烟、饮酒、喝浓茶等；</li>
          <li>情绪激动、精神紧张或焦虑等；</li>
          <li>妊娠；</li>
          <li>高血压；</li>
          <li>脱水。</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexxiangqing",
  data() {
    return {
      wrong: true,
      go: false,
    };
  },
};
</script>

<style>
.references {
  height: 100%;
  width: 40%;
  float: right;
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