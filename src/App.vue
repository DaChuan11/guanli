<template >
  <div id="app">
    <div style="height:100%;width:100%;" v-if="havelogin">
      <div id="titleA">
        <div id="toplogo"></div>
        <el-row class="toprow">
          <el-button type="warning" plain v-if="GLOBAL.glnub">当前管理员：{{GLOBAL.glnub}}</el-button>
          <el-button type="warning" plain v-if="!GLOBAL.glnub">请先登录</el-button>
          <router-link to="/index">
            <el-button type="success" plain>主页</el-button>
          </router-link>
          <router-link to="/login">
            <el-button type="info" plain>信息</el-button>
          </router-link>
          <el-button type="danger" plain @click="changemag('1')">更换管理员</el-button>
          <el-dialog title="请输入您的管理员账号和密码" :visible.sync="changeGL" width="20%">
            <el-form :model="GLform">
              <div style="height:200px"></div>
              <el-form-item label="账号" style="position: relative; top: -115px;left: 20px;">
                <el-input v-model="GLform.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" style="position: relative;top: -105px;left: 20px;">
                <el-input v-model="GLform.password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="changemag('2')">取 消</el-button>
              <el-button type="primary" @click="changemag('3')">确 定</el-button>
            </div>
          </el-dialog>
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
    <div style="height:100%;width:100%;backgroundColor:#b4e4e3" v-show="!havelogin">
      <div class="logoimgApp"></div>
      <div class="logindiv" v-if="denglu">
        <h1 style="position: relative;top: -70px;font-size: 50px;">芯跳科技后台管理系统</h1>
        <div class="logdiv">
          养老院名字：
          <input type="text" v-model="postdata2.beadhousename" />
        </div>
        <div class="logdiv">
          密码：
          <input type="text" v-model="postdata2.password" />
        </div>
        <div class="logDH" @click="sendmsgto('DL')">登录</div>
        <div class="logDH" @click="changedenglu()">注册</div>
      </div>
      <div class="logindiv" v-show="!denglu">
        <h1 style="position: relative;top: -70px;font-size: 50px;">芯跳科技后台管理系统</h1>
        <div class="logdiv">
          养老院名字：
          <input type="text" v-model="postdata.name" />
        </div>
        <div class="logdiv">
          养老院登录密码：
          <input type="text" v-model="postdata.password" />
        </div>
        <div class="logdiv">
          管理员账号：
          <input type="text" v-model="postdata.admin_account" />
        </div>
        <div class="logdiv">
          管理员密码：
          <input type="text" v-model="postdata.admin_password" />
        </div>
        <div class="logdiv">
          负责人姓名：
          <input type="text" v-model="postdata.charge_people" />
        </div>
        <div class="logdiv">
          负责人电话号码：
          <input type="text" v-model="postdata.charge_phone" />
        </div>
        <div class="logdiv">
          养老院地址：
          <input type="text" v-model="postdata.beadhouse_locaion" />
        </div>
        <div class="logDH" @click="sendmsgto('ZC')">注册</div>
        <div class="logDH" @click="changedenglu('DL')">返回登录</div>
      </div>
    </div>
    <!-- //网络请求等待模态框 -->
    <div id="motai" style="display:none">
      <div></div>
      <div></div>
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
      //changeGL更改管理员的模态框
      changeGL: false,
      GLform: {
        name: "",
        password: "",
        beadhouse_id: this.GLOBAL.yanglaoyuanid,
      },
      denglu: true,
      postdata: {
        admin_account: "",
        admin_password: "",
        beadhouse_locaion: "",
        charge_people: "",
        charge_phone: "",
        name: "",
        password: "",
      },
      postdata2: {
        beadhousename: "",
        password: "",
      },
      havelogin: false,
    };
  },
  methods: {
    //修改管理员id
    changemag(key) {
      switch (key) {
        case "1":
          this.changeGL = true;
          break;
        case "2":
          this.changeGL = false;
          break;
        case "3":
          console.log(111);
          this.GLOBAL.dengdai("block");
          this.GLform.beadhouse_id = this.GLOBAL.yanglaoyuanid;
          this.$axios({
            url: this.GLOBAL.serverSrc + "admin/login",
            method: "post",
            data: this.GLform,
          }).then((res) => {
            switch (res.data.msg) {
              case "密码错误":
                this.$message.error("请输入正确的密码");
                break;
              case "用户不存在":
                this.$message.error("请输入正确的账号");
                break;
              case "成功":
                this.$message({
                  message: "登录成功：" + this.GLform.name,
                  type: "success",
                });
                this.GLOBAL.glnub = this.GLform.name;
                this.$forceUpdate();
                this.GLform.name = "";
                this.GLform.password = "";
                console.log(this.GLOBAL.glnub);
                break;
              default:
                break;
            }
            console.log(res);
            // this.GLOBAL.glnub = res.console.log(res);
            this.GLOBAL.dengdai("none");
          });
          this.changeGL = false;
          break;
        default:
          break;
      }
    },
    //注册
    // sendmsgto() {
    sendmsgto(temp) {
      // let that = this;
      //模态框出现
      this.GLOBAL.dengdai("block");
      //注册
      if (temp == "ZC") {
        console.log(this.postdata.admin_account);
        //获取属性名判断是否为空
        let sx = Object.keys(this.postdata);
        let jishu = true;
        for (let i = 0; i < sx.length; i++) {
          if (this.postdata[sx[i]] != "") {
            jishu = false;
          }
        }
        //全部都不为空则发送请求
        if (jishu) {
          this.$axios({
            url: this.GLOBAL.serverSrc + "beadhouse/register",
            method: "post",
            data: this.postdata,
          }).then((res) => {
            this.GLOBAL.dengdai("none");
            console.log(res);
          });
        }
        if (!jishu) {
          if (jishu < sx.length) {
            this.$message.error("请输入完整的信息");
          }
          this.GLOBAL.dengdai("none");
        }
      }
      //登录
      else if (temp == "DL") {
        // console.log(this.postdata2);
        let sx = Object.keys(this.postdata2);
        let jishu = true;
        for (let i = 0; i < sx.length; i++) {
          if (this.postdata2[sx[i]] == "") {
            jishu = false;
          }
        }
        //全部都不为空则发送请求
        if (jishu) {
          // console.log("ok");
          this.$axios({
            url: this.GLOBAL.serverSrc + "beadhouse/login",
            method: "post",
            data: this.postdata2,
          }).then((res) => {
            this.GLOBAL.dengdai("none");
            console.log(res);
            switch (res.data.msg) {
              case "成功": {
                this.GLOBAL.yanglaoyuanid = res.data.data.beadhouse_id;
                this.GLOBAL.Adminid = res.data.data.account_name;
                this.$message({
                  message: "登录成功：" + this.postdata2.beadhousename,
                  type: "success",
                });
                //成功之后返回养老院信息和预设管理员id
                console.log(res.data.data);
                this.$axios({
                  url:
                    this.GLOBAL.serverSrc +
                    "beadhouse/getinfo/" +
                    this.GLOBAL.yanglaoyuanid,
                  method: "get",
                  data: {},
                }).then((res) => {
                  console.log("返回参数", res);
                  this.GLOBAL.ylyXX = res.data.data;
                  this.GLOBAL.glnub = res.data.data.admin_account;
                  this.$forceUpdate();
                  // this.$set(this.GLOBAL.ylyXX, "name", res.data.data.name);
                  this.havelogin = true;
                });
                break;
              }
              case "用户不存在": {
                this.$message.error("请输入正确的账号");
                break;
              }
              case "密码错误": {
                this.$message.error("请输入正确的密码");
                break;
              }
              default:
                break;
            }
            // console.log(res, this.GLOBAL.yanglaoyuanid);
          });
        }
        if (!jishu) {
          if (jishu < sx.length) {
            this.$message.error("请输入完整的信息");
          }
          this.GLOBAL.dengdai("none");
        }
      }
    },
    //得到cookies
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
    getcolor() {
      document.querySelector("#app").style.height = window.innerHeight + "px";
      console.log(window.innerHeight);
    },
    changedenglu() {
      this.denglu = !this.denglu;
    },
  },
  mounted() {
    this.getcolor();
  },
};
</script>

<style lang="scss">
#motai {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: rgba(255, 255, 255, 0.5);
}
#motai > div {
  width: 500px;
  height: 500px;
  background-size: cover;
  position: absolute;
  top: 50%;
  margin-top: -250px;
  margin-left: -250px;
}
#motai > :nth-child(1) {
  background-image: url("./assets/motai1.png");
  animation: 3s motai1 linear infinite;
}
#motai > :nth-child(2) {
  background-image: url("./assets/motai2.png");
  animation: 3s motai2 linear infinite;
  animation-delay: 0.5s;
}
@keyframes motai1 {
  0% {
    left: 120%;
  }
  20% {
    left: 70%;
  }
  50% {
    left: 60%;
  }
  80% {
    left: 50%;
  }
  100% {
    left: 0;
  }
}
@keyframes motai2 {
  0% {
    left: 120%;
  }
  20% {
    left: 70%;
  }
  55% {
    left: 55%;
  }
  80% {
    left: 45%;
  }
  100% {
    left: 0;
  }
}
.logoimgApp {
  background-image: url("./assets/logo.jpg");
  width: 620px;
  height: 1500px;
  background-position-y: 1723px;
  background-position-x: -803px;
  position: absolute;
  left: 10%;
}
.logdiv {
  font-size: 18px;
  margin: 10px;
  font-weight: 600;
  text-align: right;
  padding-right: 145px;
}
.logDH {
  width: 230px;
  height: 40px;
  border: 3px solid #303133;
  border-radius: 6px;
  line-height: 40px;
  font-size: 20px;
  font-weight: 600;
  margin-left: 210px;
  margin-top: 10px;
  transition: all 1s;
  cursor: pointer;
}

.logDH:hover {
  background-color: #303133;
  color: whitesmoke;
}
.logindiv {
  position: relative;
  top: 38%;
  height: 400px;
  // margin-top: -200px;
  width: 600px;
  left: 60%;
}
.logindiv input {
  height: 30px;
  padding-left: 10px;
  font-size: 18px;
}
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
