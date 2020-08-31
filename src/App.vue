<template >
  <div id="app">
    <div style="height:100%;width:100%;">
      <div id="titleA">
        <div id="toplogo"></div>
        <el-row class="toprow">
          <el-button type="warning" plain v-if="glnub">当前管理员：{{glnub}}</el-button>
          <el-button type="warning" plain v-if="!glnub">请先登录</el-button>
          <router-link to="/index">
            <el-button type="success" plain>主页</el-button>
          </router-link>
          <el-button type="info" plain>信息</el-button>
          <el-button type="danger" plain @click="changemag()">更换管理员</el-button>
        </el-row>
      </div>
      <div class="Left">
        <router-link to="/index">
          <div>
            <div style="top:32%">主页</div>
          </div>
        </router-link>
        <router-link to="/dangan">
          <div>
            <div style="top:18%">健康档案</div>
          </div>
        </router-link>

        <router-link to="/logoin">
          <div>
            <div style="top:12%">新用户登记</div>
          </div>
        </router-link>
      </div>
      <div class="neirong">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      //中转管理员id
      glnub: "",
    };
  },
  methods: {
    //修改管理员id
    changemag() {
      this.$prompt("请输入管理ID", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.glnub = value;
          this.GLOBAL.mag = value;
          this.$message({
            type: "success",
            message: "你的管理员ID: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    getcook() {
      this.$axios({
        url: "http://localhost:3000/resj",
        method: "post",
        params: {},
      }).then((res) => {
        //存token
        this.GLOBAL.token = res.data.nab;
        console.log(res, this.GLOBAL);
      });
    },
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #2c3e50;
}
/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接，鼠标在元素上按下还没有松开*/
a:active {
  text-decoration: none;
}
/* 获得焦点的时候 鼠标松开时显示的颜色*/
a:focus {
  text-decoration: none;
}
.neirong {
  width: 1820px;
  box-sizing: border-box;
  height: 90%;
  position: absolute;
  top: 10%;
  left: 100px;
  margin-top: 1%;
}
.el-submenu__icon-arrow {
  right: 12px !important;
  margin-top: -12px !important;
}
.el-submenu__title i {
  font-size: 24px !important;
}
.el-submenu__title {
  font-size: 20px !important;
}
.el-menu-item {
  font-size: 18px !important;
}
.el-menu-item-group__title {
  padding: 7px 0 7px 0px !important;
  font-size: 14px !important;
}
.Left {
  height: 90%;
  width: 100px;
}

.Left > a > div {
  width: 100%;
  height: 30%;
  background-color: #409eff;
  margin-top: 10px;
  border-radius: 20px;
  margin-left: -13px;
}

.Left > a > div > div {
  width: 30%;
  font-size: 28px;
  position: relative;
  left: 35%;
  color: white;
}
.leftA {
  height: 100%;
}
.toprow {
  float: right;
  margin-top: 30px;
  margin-right: 30px;
}
#toplogo {
  float: left;
  height: 100%;
  margin-left: 2%;
  background-image: url("./assets/logo.jpg");
  width: 300px;
  background-position-y: -55px;
  background-size: 100%;
}

* {
  margin: 0;
  padding: 0;
}
#titleA {
  width: 100%;
  height: 10%;
  background-color: #409eff;
  margin-top: -1%;
  padding-top: 1%;
  border-radius: 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: relative;
}
html {
  height: 100%;
  overflow: hidden;
}
body {
  height: 100%;
}
</style>
