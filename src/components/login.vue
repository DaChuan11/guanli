<template>
  <div class="loginAll">
    <el-form
      :inline="true"
      :model="test"
      class="demo-form-inline grda"
      style="paddingTop: 30px;width:820px"
    >
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

            <el-button type="danger" plain size="mini">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
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
    sendXG() {
      //  test: {
      //         admin: [],
      //         beadhouse_location: "",
      //         charge_people: "",
      //         charge_phone: "",
      //         id: 0,
      //         name: "",
      //         password: "",
      //         processing_times: 0,
      //       },
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
        name: this.test.charge_phone,
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
      console.log(send1);

      this.$axios({
        url: this.GLOBAL.serverSrc + "beadhouse/update",
        method: "post",
        data: send1,
      }).then((res) => {
        console.log(res);
      });
    },
    changeJB() {
      if (this.GLOBAL.glnub == this.test.admin[0].admin_name)
        this.changJB = false;
      else {
        this.$message.error("权限不足");
      }
    },
    addGL() {
      this.test.admin.push({
        admin_name: "用户名",
        admin_password: "密码",
        admin_phone: "联系方式",
      });
    },
    getmsg() {
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
  },
};
</script>

<style>
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