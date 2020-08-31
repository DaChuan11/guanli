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
      <div>参考病因</div>
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
  width: 50%;
  float: right;
}

.references > :nth-child(1) {
  font-size: 24px;
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