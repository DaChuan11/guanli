<template>
  <div style="width:100%;height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>接待管理</el-breadcrumb-item>
      <el-breadcrumb-item>登记</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tableLO">
      <el-form ref="form" :model="form" label-width="120px">
        <div style="width:1000px;float:left">
          <p style="fontSize:20px;marginBottom:20px">用户基本信息登记</p>
          <el-button
            icon="el-icon-search"
            circle
            style="position: absolute;left: 330px;"
            @click="cheak(0)"
          ></el-button>
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.account_password"
              style="width:200px"
              placeholder="非必填(默认身份证后六位)"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" style="width:200px"></el-input>
          </el-form-item>
          <el-button
            icon="el-icon-search"
            circle
            style="position: absolute;left: 330px;top: 147px;"
            @click="cheak(1)"
          ></el-button>

          <el-form-item label="身份证号">
            <el-input v-model="form.id_number" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birthday"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="床位号">
            <el-input v-model="form.bed" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input v-model="form.home_location" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自理能力">
            <el-select v-model="form.self_care_ability" placeholder="请选择自理能力">
              <el-option label="能够自理" value="能够自理"></el-option>
              <el-option label="不能自理" value="不能自理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="护理级别">
            <el-select v-model="form.level_of_care" placeholder="请选择护理级别">
              <el-option label="贴身护理" value="贴身护理"></el-option>
              <el-option label="需要护理" value="需要护理"></el-option>
              <el-option label="不需要护理" value="不需要护理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="责任医生">
            <el-input v-model="form.responsible_doctor" style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div style="width:800px;float:left" class="poLO">
          <p style="font-size: 20px; margin-bottom: 20px;width: 100%;text-align: center;">家人紧急信息</p>
          <el-form-item label="紧急联系人一" style="width: 800px;">
            <div class="poLO2">
              <p>姓名：</p>
              <el-input v-model="form.emergency_contact_1_name" style="width:200px"></el-input>
            </div>
            <div class="poLO2">
              <p>关系：</p>
              <el-select v-model="form.emergency_contact_1_relationship" placeholder="与用户关系">
                <el-option label="儿女" value="儿女"></el-option>
                <el-option label="夫妻" value="夫妻"></el-option>
              </el-select>
            </div>
            <div class="poLO2">
              <p>联系电话：</p>
              <el-input v-model="form.emergency_contact_1_phone" style="width:200px"></el-input>
            </div>
            <div class="poLO2">
              <p>住址：</p>
              <el-input v-model="form.emergency_contact_1_location" style="width:200px"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="紧急联系人二" style="width: 800px;">
            <div class="poLO2">
              <p>姓名：</p>
              <el-input
                v-model="form.emergency_contact_2_name"
                style="width:200px"
                placeholder="非必填"
              ></el-input>
            </div>
            <div class="poLO2">
              <p>关系：</p>
              <el-select v-model="form.emergency_contact_2_relationship" placeholder="与用户关系">
                <el-option label="儿女" value="儿女"></el-option>
                <el-option label="夫妻" value="夫妻"></el-option>
              </el-select>
            </div>
            <div class="poLO2">
              <p>联系电话：</p>
              <el-input
                v-model="form.emergency_contact_2_phone"
                style="width:200px"
                placeholder="非必填"
              ></el-input>
            </div>
            <div class="poLO2">
              <p>住址：</p>
              <el-input
                v-model="form.emergency_contact_2_location"
                style="width:200px"
                placeholder="非必填"
              ></el-input>
            </div>
          </el-form-item>
        </div>

        <div style="width:1000px;float:left">
          <div style="fontSize:20px;marginBottom:20px;width: 100%;float: left;">健康信息</div>

          <el-form-item label="入院时间" style="width: 365px;">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.time_start"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.time_second" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="血压情况">
            <el-select v-model="form.blood_pressure" placeholder="请选择">
              <el-option label="高血压" value="高血压"></el-option>
              <el-option label="低血压" value="低血压"></el-option>
              <el-option label="无血压疾病" value="无血压疾病"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="血糖情况">
            <el-select v-model="form.blood_glucose" placeholder="请选择">
              <el-option label="高血糖" value="高血糖"></el-option>
              <el-option label="低血糖" value="低血糖"></el-option>
              <el-option label="无血糖疾病" value="无血糖疾病"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="血型">
            <el-select v-model="form.blood_type" placeholder="血型选择">
              <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="O" value="O"></el-option>
              <el-option label="AB" value="AB"></el-option>
              <el-option label="未知" value="unknow"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="体重(kg)">
            <el-input v-model="form.weight" style="width:200px"></el-input>
          </el-form-item>

          <el-form-item label="身高(cm)">
            <el-input v-model="form.height" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="心脏情况">
            <el-button @click="dialogVisible1 = true">点击展开</el-button>
            <el-dialog
              title="心脏情况(多选框)"
              :visible.sync="dialogVisible1"
              width="30%"
              :before-close="handleClose"
            >
              <el-checkbox-group v-model="form.heart_condition">
                <el-checkbox label="窦性心动过缓" name="type"></el-checkbox>
                <el-checkbox label="窦性心动过速" name="type"></el-checkbox>
                <el-checkbox label="窦性心律不齐" name="type"></el-checkbox>
                <el-checkbox label="窦性停搏" name="type"></el-checkbox>
                <el-checkbox label="房室传导阻滞" name="type"></el-checkbox>
                <el-checkbox label="室上性早搏" name="type"></el-checkbox>
                <el-checkbox label="室性早搏" name="type"></el-checkbox>
                <el-checkbox label="阵发性室上性心动过速" name="type"></el-checkbox>
                <el-checkbox label="阵发性室性心动过速" name="type"></el-checkbox>
                <el-checkbox label="心房扑动" name="type"></el-checkbox>
                <el-checkbox label="心房纤颤" name="type"></el-checkbox>
                <el-checkbox label="心室扑动" name="type"></el-checkbox>
                <el-checkbox label="心房颤动伴预激综合征" name="type"></el-checkbox>
                <el-checkbox label="未知" name="type"></el-checkbox>
                <el-checkbox label="健康" name="type"></el-checkbox>
              </el-checkbox-group>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-form-item>
          <el-form-item label="家族病史">
            <el-input v-model="form.family_history" style="width:200px" placeholder="非必填"></el-input>
          </el-form-item>
          <el-form-item label="过敏药物">
            <el-input v-model="form.drug_use" style="width:200px" placeholder="非必填"></el-input>
          </el-form-item>
        </div>
        <div style="float:left;marginTop: 38px;marginLeft: 400px;">
          <div class="imgput"></div>
          <div
            style="position: absolute;backgroundColor:#66b1ff;color:#fff;width:100px;height:50px;lineHeight:50px;borderRadius:10px"
          >上传头像</div>
          <input
            class="file"
            name="file"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            @change="update($event)"
            style="width:100px;height:50px;opacity: 0;cursor: pointer;"
          />
        </div>
        <div style="position: relative;left: -800px;top: 400px;">
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">立即创建</el-button>
            <el-button>清空</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "logoin",
  data() {
    return {
      dialogImageUrl: "",
      imgDialogVisible: false,
      fileLists: [],
      //test1
      form: {
        id: 0,
        account_password: "",
        name: "",
        id_number: "",
        birthday: "",
        phone: "",
        bed: "",
        blood_type: "",
        home_location: "",
        emergency_contact_1_name: "",
        emergency_contact_1_relationship: "",
        emergency_contact_1_phone: "",
        emergency_contact_1_location: "",
        emergency_contact_2_name: "",
        emergency_contact_2_relationship: "",
        emergency_contact_2_phone: "",
        emergency_contact_2_location: "",
        sex: "",
        self_care_ability: "",
        level_of_care: "",
        responsible_doctor: "",
        time_start: "",
        time_second: "",
        blood_pressure: "",
        blood_glucose: "",
        weight: "",
        height: "",
        heart_condition: [],
        family_history: "",
        drug_use: "",
        image: "",
      },
      //测试数据
      datalist: [
        {
          id: 0,
          account_password: "",
          name: "赵刚",
          id_number: "5130216640314483X",
          birthday: "1664:03:14",
          phone: "13197882903",
          bed: "",
          blood_type: "AB",
          home_location: "",
          emergency_contact_1_name: "赵晓梦",
          emergency_contact_1_relationship: "子女",
          emergency_contact_1_phone: "",
          emergency_contact_1_location: "",
          emergency_contact_2_name: "",
          emergency_contact_2_relationship: "",
          emergency_contact_2_phone: "",
          emergency_contact_2_location: "",
          sex: "男",
          self_care_ability: "能够自理",
          level_of_care: "需要护理",
          responsible_doctor: "",
          time_start: "",
          time_second: "",
          blood_pressure: "高血压",
          blood_glucose: "无血糖疾病",
          weight: "64",
          height: "174",
          heart_condition: [],
          family_history: "",
          drug_use: "",
          image: "",
        },
        {
          id: 0,
          account_password: "",
          name: "陈国强",
          id_number: "5130216520604483X",
          birthday: "1652:06:04",
          phone: "15802833746",
          bed: "",
          blood_type: "O",
          home_location: "",
          emergency_contact_1_name: "陈刘芳",
          emergency_contact_1_relationship: "子女",
          emergency_contact_1_phone: "",
          emergency_contact_1_location: "",
          emergency_contact_2_name: "",
          emergency_contact_2_relationship: "",
          emergency_contact_2_phone: "",
          emergency_contact_2_location: "",
          sex: "男",
          self_care_ability: "不能自理",
          level_of_care: "贴身护理",
          responsible_doctor: "",
          time_start: "",
          time_second: "",
          blood_pressure: "高血压",
          blood_glucose: "高血糖",
          weight: "72",
          height: "164",
          heart_condition: ["室性早搏", "心室扑动"],
          family_history: "",
          drug_use: "",
          image: "",
        },
        {
          id: 0,
          account_password: "",
          name: "王小蝶",
          id_number: "5130216480914483X",
          birthday: "1648:09:14",
          phone: "17709887263",
          bed: "",
          blood_type: "A",
          home_location: "",
          emergency_contact_1_name: "孟钱",
          emergency_contact_1_relationship: "子女",
          emergency_contact_1_phone: "",
          emergency_contact_1_location: "",
          emergency_contact_2_name: "",
          emergency_contact_2_relationship: "",
          emergency_contact_2_phone: "",
          emergency_contact_2_location: "",
          sex: "女",
          self_care_ability: "不能自理",
          level_of_care: "贴身护理",
          responsible_doctor: "",
          time_start: "",
          time_second: "",
          blood_pressure: "高血压",
          blood_glucose: "高血糖",
          weight: "45",
          height: "143",
          heart_condition: ["室性早搏", "窦性心律不齐"],
          family_history: "",
          drug_use: "",
          image: "",
        },
        {
          id: 0,
          account_password: "",
          name: "刘洋",
          id_number: "5130216690223483X",
          birthday: "1669:02:23",
          phone: "15802833746",
          bed: "",
          blood_type: "B",
          home_location: "",
          emergency_contact_1_name: "张晓燕",
          emergency_contact_1_relationship: "夫妻",
          emergency_contact_1_phone: "16882736452",
          emergency_contact_1_location: "",
          emergency_contact_2_name: "",
          emergency_contact_2_relationship: "",
          emergency_contact_2_phone: "",
          emergency_contact_2_location: "",
          sex: "男",
          self_care_ability: "不能自理",
          level_of_care: "贴身护理",
          responsible_doctor: "",
          time_start: "",
          time_second: "",
          blood_pressure: "高血压",
          blood_glucose: "高血糖",
          weight: "72",
          height: "168",
          heart_condition: ["室性早搏", "房室传导阻滞"],
          family_history: "",
          drug_use: "",
          image: "",
        },
      ],
      imageUrl: "",
      dialogVisible1: false,
    };
  },
  methods: {
    cheak(temp) {
      this.GLOBAL.dengdai("block");
      let p = true;
      if (temp == "0") {
        for (let i = 0; i < this.datalist.length; i++) {
          if (this.form.phone == this.datalist[i].phone) {
            p = false;
            this.form = JSON.parse(JSON.stringify(this.datalist[i]));
            this.$message("查询完成");
          }
        }
        if (p) {
          this.$message.error("无效手机号");
          this.form = {};
        }
      } else {
        for (let i = 0; i < this.datalist.length; i++) {
          if (this.form.id_number == this.datalist[i].id_number) {
            p = false;
            this.form = JSON.parse(JSON.stringify(this.datalist[i]));
            this.$message("查询完成");
          }
        }
        if (p) {
          this.$message.error("无效身份证号");
          this.form = {};
        }
      }
      setTimeout(() => {
        this.GLOBAL.dengdai("none");
      }, 500);
    },
    onSubmit() {
      this.GLOBAL.dengdai("block");
      let send = JSON.parse(JSON.stringify(this.form));
      send.time_start = send.time_start.slice(0, 10);
      send.time_second = send.time_second.slice(11, 19);
      send.birthday = send.birthday.slice(0, 10);
      let l = "";
      for (let i = 0; i < this.form.heart_condition.length; i++) {
        l += this.form.heart_condition[i] + " ";
      }
      send.heart_condition = l;
      send.beadhouse_id = this.GLOBAL.yanglaoyuanid;
      // send.
      console.log(send);
      //  console.log(send.time_start.toLocaleDateString());
      this.$axios({
        url: this.GLOBAL.serverSrc + "beadhousepeople/register",
        method: "post",
        data: send,
      }).then((res) => {
        this.GLOBAL.dengdai("none");
        console.log(res.data.data);
      });
      // console.log(this.form);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    update(e) {
      this.GLOBAL.dengdai("block");
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
        url: this.GLOBAL.serverSrc + "beadhousepeople/loadImage",
        data: param,
        config: config,
        method: "post",
      }).then((res) => {
        let img = document.querySelector(".imgput");
        img.style.backgroundImage = "url(" + res.data.data + ")";
        console.log("url(" + res.data.data + ")", res.data.data);
        this.form.image = res.data.data;
        this.GLOBAL.dengdai("none");
      });
    },
  },
};
</script>

<style>
.imgput {
  width: 100px;
  height: 140px;
  background-size: 100%;
  background-repeat: no-repeat;
}
.el-checkbox {
  text-align: left;
  width: 148px;
}
.poLO2 {
  display: inline-block;
  width: 290px;
  margin-bottom: 20px;
}
.poLO p {
  width: 80px;
  text-align: right;
  display: inline-block;
}
.el-form > :nth-child(7) {
  width: 1000px;
}
.el-form > :nth-child(7) > div > div {
  margin-right: 10px;
}
.el-form > :nth-child(8) {
  width: 1000px;
}
.el-form > :nth-child(8) > div > div {
  margin-right: 10px;
}
.el-form > :nth-child(13) {
  width: 600px;
}
.el-form > :nth-child(19) {
  width: 1000px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.ppLO > label {
  width: 120px !important;
}
.el-form {
  /* width: 1000px; */
  height: 100%;
}
.el-form-item {
  width: 300px;
  float: left;
}
.tableLO {
  /* width: 1000px; */
  height: 100%;
}
</style>