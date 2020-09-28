<template>
  <div class="loginAll">
    <el-form :inline="true" :model="test" style="paddingTop: 30px;width:820px;float:left">
      <el-form-item label="机构名称：">
        <el-input v-model="test.name" style="width:200px" :disabled="changJB"></el-input>
      </el-form-item>
      <el-form-item label="负责人姓名：">
        <el-input v-model="test.charge_people" style="width:200px" :disabled="changJB"></el-input>
      </el-form-item>
      <el-form-item label="负责人电话：">
        <el-input v-model="test.charge_phone" style="width:200px" :disabled="changJB"></el-input>
      </el-form-item>
      <el-form-item label="机构地址：">
        <el-input v-model="test.beadhouse_location" style="width:200px" :disabled="changJB"></el-input>
      </el-form-item>
      <el-form-item label="机构登录密码：">
        <el-input v-model="test.password" style="width:200px" :disabled="changJB"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 150px;position: relative;left: 30px;top: 5px;z-index: 2;"
        size="medium"
        @click="changeJB()"
      >修改基本信息</el-button>
      <div
        style="position: relative;width: 820px !important; height: 50px;clear: both;font-size: 24px;line-height: 50px;"
      >管理员信息：</div>
      <el-button
        type="primary"
        style="width: 80px;position: relative;left: 335px;top: 38px;z-index: 2;"
        size="mini"
        @click="addGL()"
      >新增</el-button>
      <el-table :data="test.admin" border style="width: 800px !important" height="500">
        <el-table-column label="权限" width="150">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.admin_name==GLOBAL.Adminid"
              type="danger"
              disable-transitions
            >超级管理</el-tag>
            <el-tag v-else type="primary" disable-transitions>普通管理</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="admin_name" label="账号" width="150">
          <template slot-scope="scope">
            <div v-if="!scope1[scope.$index]">{{scope.row.admin_name}}</div>
            <el-input v-else v-model="scope.row.admin_name" placeholder="修改账号"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="密码" width="150">
          <template slot-scope="scope">
            <div v-if="!scope1[scope.$index]">{{scope.row.admin_password}}</div>
            <el-input v-else v-model="scope.row.admin_password" placeholder="重设密码"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="200">
          <template slot-scope="scope">
            <div v-if="!scope1[scope.$index]">{{scope.row.admin_phone}}</div>
            <el-input v-else v-model="scope.row.admin_phone" placeholder="修改号码"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="149">
          <template slot-scope="scope">
            <el-button type="success" plain size="mini" @click="xiugaiGL(scope)">编辑</el-button>

            <el-button type="danger" plain size="mini" @click="delGL(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="width: 150px;position: relative;left: 30px;top: 5px;z-index: 2;"
        size="medium"
        @click="sendXG()"
      >提交修改</el-button>
    </el-form>
    <div style="float:right;width:900px;height:800px;margin-right: 10px;">
      <h1>备忘录</h1>
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        @click="dialogFormVisible = true"
        style="float: right;margin-top: -34px; margin-right: 20px;"
      ></el-button>
      <el-dialog title="书写备忘录" :visible.sync="dialogFormVisible">
        <el-input type="textarea" v-model="memorandum" rows="10"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="memorandumup(0)">取 消</el-button>
          <el-button type="primary" @click="memorandumup(1)">确 定</el-button>
        </div>
      </el-dialog>
      <div style="height: 790px;overflow: auto;overflow-x: hidden;width: 909px;">
        <div
          style="marginTop:20px;padding: 10px;border: 1px solid rgba(0,0,0,.1);boxShadow:0 5px 12px 0 rgba(0,0,0,.1)"
          v-for="(value,key) in beiwltestr"
          :key="key"
        >
          <div style="float:left;fontSize:22px;fontWeight:600">{{value.name}}</div>
          <div style="float:right;">{{value.data}}</div>
          <div style="clear:both;paddingTop:10px;textAlign:left">{{value.content}}</div>
          <el-button
            type="primary"
            size="medium"
            style="position: relative;left: 380px;width:100px;"
            @click="updatamemorandum(value)"
            v-if="value.state=='未读'"
          >确认查看</el-button>
          <el-button
            type="success"
            size="medium"
            style="position: relative;left: 380px;width:100px;"
            @click="updatamemorandum(value)"
            v-if="value.state!='未读'"
            disabled
          >已查看</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      memorandum: "",
      dialogFormVisible: false,
      beiwltestr: [
        {
          name: "芯跳",
          content: "各单位注意啦，各单位注意啦，中华人民共和国，成立啦",
          data: "2020-29-12",
        },
      ],

      // disable: true,
      changJB: true,
      glnubZZ: "",
      scope1: [],
      test: {
        admin: [],
        beadhouse_location: "",
        charge_people: "",
        charge_phone: "",
        id: 0,
        name: "",
        password: "",
        processing_times: 0,
      },
    };
  },
  methods: {
    //更新备忘录
    updatamemorandum(temp) {
      this.GLOBAL.dengdai("block");
      console.log(temp);
      this.$axios({
        url: this.GLOBAL.serverSrc + "memorandum/update/" + temp.id,
      }).then((res) => {
        this.$message({
          message: "你已阅读" + temp.name + "于" + temp.data + "发送的备忘录",
          type: "success",
        });
        this.GLOBAL.dengdai("none");
        this.getmemorandum();
        console.log(res);
      });
    },
    //获取备忘录
    getmemorandum() {
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "memorandum/selectall/" +
          this.GLOBAL.yanglaoyuanid,
        method: "get",
      }).then((res) => {
        //赋值备忘录
        this.beiwltestr = res.data.data;
        console.log("备忘录", res);
      });
    },
    //上传新的备忘录
    memorandumup(temp) {
      this.GLOBAL.dengdai("block");
      if (temp == 0) {
        this.memorandum = "";
        this.dialogFormVisible = false;
      } else {
        // console.log(new Date().toLocaleString());
        this.$axios({
          url: this.GLOBAL.serverSrc + "memorandum/insertnew",
          data: {
            beadhouse_id: this.GLOBAL.yanglaoyuanid,
            content: this.memorandum,
            data: new Date().toLocaleString(),
            name: this.GLOBAL.glnub,
          },
          method: "post",
        }).then(() => {
          this.getmemorandum();
          this.dialogFormVisible = false;
          this.GLOBAL.dengdai("none");
        });
      }
    },
    sendXG() {
      let p = true;
      for (let i = 0; i < this.scope1.length; i++) {
        if (this.scope1[i] == true) {
          p = false;
          // console.log('错误');
        }
      }
      if (p == false) {
        this.$message.error("请先保存");
      } else {
        this.GLOBAL.dengdai("block");
        let send1 = {
          admin_account: this.test.admin[0].admin_name,
          admin_password:
            this.test.admin[0].admin_password == "XXXXXX"
              ? null
              : this.test.admin[0].admin_password,
          admin_phone: this.test.admin[0].admin_phone,
          beadhouseAdminList: [],
          beadhouse_location: this.test.beadhouse_location,
          charge_people: this.test.charge_people,
          charge_phone: this.test.charge_phone,
          id: this.GLOBAL.yanglaoyuanid,
          name: this.test.name,
          password: this.test.password == "XXXXXX" ? null : this.test.password,
        };
        for (let i = 0; i < this.test.admin.length - 1; i++) {
          let te = {
            admin_name: this.test.admin[i + 1].admin_name,
            admin_password:
              this.test.admin[i + 1].admin_password == "XXXXXX"
                ? null
                : this.test.admin[i + 1].admin_password,
            admin_phone: this.test.admin[i + 1].admin_phone,
            beadhouse_id: this.GLOBAL.yanglaoyuanid,
            id: this.test.admin[i + 1].id,
          };
          send1.beadhouseAdminList.push(te);
        }

        this.$axios({
          url: this.GLOBAL.serverSrc + "beadhouse/update",
          method: "post",
          data: send1,
        }).then((res) => {
          this.GLOBAL.dengdai("none");
          this.$message({
            message: "修改成功",
            type: "success",
          });
          console.log(res);
        });
      }
    },
    changeJB() {
      if (this.GLOBAL.glnub == this.test.admin[0].admin_name)
        this.changJB = false;
      else {
        this.$message.error("权限不足");
      }
    },
    //添加管理员
    addGL() {
      this.test.admin.push({
        admin_name: "",
        admin_password: "",
        admin_phone: "",
      });
    },
    //获取页面信息
    getmsg() {
      this.test.admin = [];
      this.GLOBAL.dengdai("block");
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "beadhouse/updateinfo/" +
          this.GLOBAL.yanglaoyuanid,
        method: "get",
        data: {},
      }).then((res) => {
        console.log("信息返回", res.data.data);
        this.test.beadhouse_location = res.data.data.beadhouse_location;
        this.test.charge_people = res.data.data.charge_people;
        this.test.charge_phone = res.data.data.charge_phone;
        this.test.name = res.data.data.name;
        this.test.password = "XXXXXX";
        for (let i = 0; i < res.data.data.beadhouseAdminList.length; i++) {
          this.test.admin.push(res.data.data.beadhouseAdminList[i]);
        }
        // this.test.admin = res.data.data.beadhouseAdminList;
        this.test.admin.unshift({
          admin_name: res.data.data.admin_account,
          admin_password: res.data.data.admin_password,
          admin_phone: res.data.data.admin_phone,
        });
        console.log("cekk", this.test.admin, this.GLOBAL.glnub);
        //设置密码为xxxxxx
        for (let i = 0; i < this.test.admin.length; i++) {
          this.test.admin[i].admin_password = "XXXXXX";
        }
        this.setscope();
        this.GLOBAL.dengdai("none");
      });
    },
    //删除管理员
    delGL(temp) {
      if (!temp.row.id) {
        this.test.admin.splice(temp.$index, 1);
        this.$message({
          message: "已删除刚新增的管理员",
          type: "success",
        });
      } else {
        if (this.GLOBAL.glnub != this.test.admin[0].admin_name) {
          this.$message.error("删除管理员操作需要超级管理员进行操作");
        } else {
          this.$axios({
            url:
              this.GLOBAL.serverSrc +
              "admin/delete/" +
              this.GLOBAL.yanglaoyuanid +
              "/" +
              temp.row.id,
          }).then((res) => {
            this.$message({
              message: "已删除 " + temp.row.admin_name + " 管理员",
              type: "success",
            });
            this.getmsg();
            console.log(res);
          });
        }
      }
    },
    xiugaiGL(temp) {
      if (this.scope1[temp.$index] == false) {
        console.log(1);
        if (this.test.admin[0].admin_name == this.GLOBAL.glnub) {
          this.$set(this.scope1, temp.$index, true);
        } else if (temp.row.admin_name == this.GLOBAL.glnub) {
          console.log(3);
          this.$set(this.scope1, temp.$index, true);
        } else {
          this.$message.error("权限不足");
        }
        // this.$set(this.scope1, temp.$index, true);
      } else {
        let cheak = true;
        for (let i = 0; i < this.test.admin.length; i++) {
          if (i != temp.$index) {
            if (temp.row.admin_name == this.test.admin[i].admin_name) {
              this.$message.error("管理员ID重复");
              cheak = false;
            }
          }
        }
        if (cheak) {
          this.$set(this.scope1, temp.$index, !this.scope1[temp.$index]);
        }
      }

      // console.log("秀秀秀", this.test.admin, this.scope1);
    },
    setscope() {
      for (let i = 0; i < this.test.admin.length; i++) {
        this.scope1.push(false);
      }
      console.log(this.scope1);
    },
  },
  mounted() {
    this.getmsg();
    this.getmemorandum();
  },
};
</script>

<style>
.el-form-item {
  width: 320px;
}
.loginAll {
  width: 100%;
  height: 100%;
}
.GLdiv {
  margin-top: 20px;
}
.GLdiv > span {
  margin-left: 20px;
}
.GLdiv input {
  /* width: 80px; */
}
</style>