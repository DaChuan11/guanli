<template >
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>健康档案</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.GLOBAL.BL.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="leftGRDA">
      <div style="width:100%">
        <el-form :inline="true" :model="form" class="demo-form-inline grda" style="width:820px">
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" style="width:200px" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input v-model="form.home_location" style="width:200px" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="床位号">
            <el-input v-model="form.bed" style="width:200px" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="自理能力">
            <el-select v-model="form.self_care_ability" placeholder="请选择自理能力" :disabled="disable">
              <el-option label="能够自理" value="能够自理"></el-option>
              <el-option label="不能自理" value="不能自理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="护理级别">
            <el-select v-model="form.level_of_care" placeholder="请选择护理级别" :disabled="disable">
              <el-option label="贴身护理" value="贴身护理"></el-option>
              <el-option label="需要护理" value="需要护理"></el-option>
              <el-option label="不需要护理" value="不需要护理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="责任医生">
            <el-input v-model="form.responsible_doctor" style="width:200px" :disabled="disable"></el-input>
          </el-form-item>

          <el-form-item label="血压情况">
            <el-select v-model="form.blood_pressure" placeholder="请选择" :disabled="disable">
              <el-option label="高血压" value="高血压"></el-option>
              <el-option label="低血压" value="低血压"></el-option>
              <el-option label="无血压疾病" value="无血压疾病"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="血糖情况">
            <el-select v-model="form.blood_glucose" placeholder="请选择" :disabled="disable">
              <el-option label="高血糖" value="高血糖"></el-option>
              <el-option label="低血糖" value="低血糖"></el-option>
              <el-option label="无血糖疾病" value="无血糖疾病"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="血型">
            <el-select v-model="form.blood_type" placeholder="血型选择" :disabled="disable">
              <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="O" value="O"></el-option>
              <el-option label="AB" value="AB"></el-option>
              <el-option label="未知" value="unknow"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="体重(kg)">
            <el-input v-model="form.weight" style="width:200px" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="心脏情况">
            <el-button @click="dialogVisible1 = true" :disabled="disable">点击展开</el-button>
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
                <el-button @click="changethis(true)">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-form-item>
          <el-form-item label="家族病史">
            <el-input v-model="form.family_history" style="width:200px" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="过敏药物">
            <el-input v-model="form.drug_use" style="width:200px" :disabled="disable"></el-input>
          </el-form-item>

          <el-form-item label="护工姓名">
            <el-input v-model="form.nursing_workers" :disabled="disable" placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人一" style="width: 800px;">
            <div class="poLO2">
              <p style="display: inline;">姓名：</p>
              <el-input
                v-model="form.emergency_contact_1_name"
                style="width:200px"
                :disabled="disable"
              ></el-input>
            </div>
            <div class="poLO2">
              <p style="display: inline;">关系：</p>
              <el-select
                v-model="form.emergency_contact_1_relationship"
                placeholder="与用户关系"
                :disabled="disable"
              >
                <el-option label="儿女" value="儿女"></el-option>
                <el-option label="夫妻" value="夫妻"></el-option>
              </el-select>
            </div>
            <div class="poLO2">
              <p style="display: inline;">联系电话：</p>
              <el-input
                v-model="form.emergency_contact_1_phone"
                style="width:200px"
                :disabled="disable"
              ></el-input>
            </div>
            <div class="poLO2">
              <p style="display: inline;">住址：</p>
              <el-input
                v-model="form.emergency_contact_1_location"
                style="width:200px"
                :disabled="disable"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="紧急联系人二" style="width: 800px;">
            <div class="poLO2">
              <p style="display: inline;">姓名：</p>
              <el-input
                v-model="form.emergency_contact_2_name"
                style="width:200px"
                :disabled="disable"
              ></el-input>
            </div>
            <div class="poLO2">
              <p style="display: inline;">关系：</p>
              <el-select
                v-model="form.emergency_contact_2_relationship"
                placeholder="与用户关系"
                :disabled="disable"
              >
                <el-option label="儿女" value="儿女"></el-option>
                <el-option label="夫妻" value="夫妻"></el-option>
              </el-select>
            </div>
            <div class="poLO2">
              <p style="display: inline;">联系电话：</p>
              <el-input
                v-model="form.emergency_contact_2_phone"
                style="width:200px"
                :disabled="disable"
              ></el-input>
            </div>
            <div class="poLO2">
              <p style="display: inline;">住址：</p>
              <el-input
                v-model="form.emergency_contact_2_location"
                style="width:200px"
                :disabled="disable"
              ></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="buttonGRDA">
        <el-button
          type="warning"
          style="margin-top: -10px;"
          round
          v-if="disable"
          @click="changedis"
        >修改档案</el-button>
        <el-button
          type="primary"
          style="margin-top: -10px;"
          round
          v-if="!disable"
          @click="upform"
        >上传修改</el-button>
        <el-button
          type="danger"
          style="margin-top: -10px;"
          round
          v-if="!disable"
          @click="changedis  "
        >取消修改</el-button>
      </div>
    </div>
    <div class="tableGRDA">
      <div class="block">
        <el-date-picker
          v-model="value"
          type="month"
          placeholder="选择月份"
          :change="changedate()"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%" height="650">
        <el-table-column prop="sending_time" label="日期" width="200px"></el-table-column>
        <el-table-column prop="heart_rate" label="当时心率" width="200px"></el-table-column>
        <el-table-column prop="send_details" label="病因分析" width="300px"></el-table-column>
        <el-table-column
          prop="situation"
          label="标签"
          width="100"
          :filters="[{ text: '预警', value: '预警' }, { text: '危险', value: '危险' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag :type="detype(scope.row.situation)" disable-transitions>{{scope.row.situation}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{path:'/bingli',query:{postdataYU}}">
              <el-button size="mini" @click="changenub(scope)">查看详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        style="marginTop:120px"
      ></el-pagination>
      <!-- <el-table ref="filterTable" :data="tablethis" style="width: 100%">
        <el-table-column prop="date" label="日期" sortable width="200px"></el-table-column>
        <el-table-column prop="docname" label="处理人姓名" width="130px"></el-table-column>
        <el-table-column prop="APB" label="房性早搏"></el-table-column>
        <el-table-column prop="MRR" label="矩阵房速"></el-table-column>
        <el-table-column prop="ERC" label="对成房早"></el-table-column>
        <el-table-column prop="PAPB" label="多源性房性早搏" width="150px"></el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '一级预警', value: '一级预警' }, { text: '二级预警', value: '二级预警' },{ text: '三级预警', value: '三级预警' },{ text: '正常', value: '正常' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag :type="detype(scope.row.tag)" disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope>
            <router-link :to="{path:'/bingli',query:{postdataYU}}">
              <el-button size="mini">查看详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "gerendangan",
  components: {},
  data() {
    return {
      //当前页码
      page: 1,
      //共多少数据
      total: 0,
      dialogVisible1: false,
      //formthis是传过来的对象  form是克隆对象
      formthis: {},
      form: {},
      //传给下一页名字  需要修改
      postdataYU: {
        name: this.GLOBAL.BL.name,
        sendid: this.GLOBAL.BL.id,
        nub: this.GLOBAL.BL.nub,
      },
      value: "",
      disable: true,
      //在线获取的数据
      //老人ID用来发送接收老人信息
      sendid: this.GLOBAL.id,
      //本地修改的数据

      //在线获取的列表信息
      tableData: [
        // beadhouse_id: 49722914
        // ecg_report_id: null
        // heart_rate: "45"
        // id: 1563516
        // send_details: "发送危险情况"
        // sending_time: "2020-09-19 11:57:00"
        // situation: "危险"
        // username_id: 12528315
      ],
      //本地修改的数据
    };
  },
  methods: {
    changenub(temp) {
      this.GLOBAL.BL.nub = temp.$index;
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.changetablethis(val);
    },
    //查询历史病例
    changetablethis(val) {
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "details/rhc/" +
          this.GLOBAL.BL.sendid +
          "/" +
          this.GLOBAL.yanglaoyuanid +
          "/" +
          val,
        method: "get",
      }).then((res) => {
        console.log(res);

        this.tableData = res.data.data.info.list;
        this.total = res.data.data.count;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].sending_time = this.tableData[
            i
          ].sending_time.substring(0, 10);
        }
        this.$forceUpdate();
      });
    },
    changethis(temp) {
      if (temp) this.form.heart_condition = this.formthis.heart_condition;

      this.dialogVisible1 = false;
    },
    getmsg() {
      this.GLOBAL.dengdai("block");
      this.$axios({
        url:
          this.GLOBAL.serverSrc +
          "beadhousepeople/selectAll/" +
          this.GLOBAL.yanglaoyuanid +
          "/" +
          this.GLOBAL.BL.sendid,
        method: "get",
        data: {},
      }).then((res) => {
        this.formthis = res.data.data;
        this.formthis.heart_condition = res.data.data.heart_condition
          .substr(0, res.data.data.heart_condition.length - 1)
          .split(" ");
        this.form = JSON.parse(JSON.stringify(this.formthis));
        console.log(res.data.data);
        this.GLOBAL.dengdai("none");
        this.$forceUpdate();
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.form.heart_condition = this.formthis.heart_condition;
          done();
        })
        .catch(() => {});
    },
    changedate() {
      if (this.value != 0) {
        // let newarr = [];
        console.log(this.value);
      }
    },

    detype(temp) {
      if (temp == "危险") return "danger";
      else return "warning";
    },

    filterTag(value, row) {
      return row.tag === value;
    },

    //修改和取消修改
    changedis() {
      if (this.disable == true) {
        this.$confirm("此操作将修改老人信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请修改!",
            });
            this.disable = false;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消修改",
            });
          });
      } else if (this.disable == false) {
        this.$confirm("是否取消本次修改?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$message({
            type: "success",
            message: "已取消修改!",
          });
          this.form = JSON.parse(JSON.stringify(this.formthis));
          this.disable = true;
        });
      }
    },
    swichCH(temp) {
      switch (temp) {
        case "phone":
          return "联系电话";
        case "bed":
          return "床位号";
        case "blood_type":
          return "血型";
        case "home_location":
          return "家庭住址";
        case "nursing_workers":
          return "护工姓名";
        case "emergency_contact_1_name":
          return "紧急联系人一：姓名";
        case "emergency_contact_1_relationship":
          return "紧急联系人一：关系";
        case "emergency_contact_1_phone":
          return "紧急联系人一：电话";
        case "emergency_contact_1_location":
          return "紧急联系人一：地址";
        case "emergency_contact_2_name":
          return "紧急联系人二：姓名";
        case "emergency_contact_2_relationship":
          return "紧急联系人二：关系";
        case "emergency_contact_2_phone":
          return "紧急联系人二：电话";
        case "emergency_contact_2_location":
          return "紧急联系人二：地址";
        case "self_care_ability":
          return "自理能力";
        case "level_of_care":
          return "护理等级";
        case "responsible_doctor":
          return "责任医生";
        case "blood_pressure":
          return "血压情况";
        case "blood_glucose":
          return "血糖情况";
        case "weight":
          return "体重(kg)";
        case "heart_condition":
          return "心脏情况";
        case "family_history":
          return "家族病史";
        case "drug_use":
          return "使用过的药物";

        default:
          break;
      }
    },
    //上传修改信息
    upform() {
      let temp = Object.keys(this.form);
      // console.log(temp);
      let arrchange = "";
      for (let i = 0; i < temp.length; i++) {
        // console.log(this.form[temp[i]], this.formthis[temp[i]]);
        if (
          this.form[temp[i]] != null &&
          temp[i] != "heart_condition" &&
          this.form[temp[i]] != this.formthis[temp[i]]
        ) {
          // console.log(temp[i]);
          let tempSTR =
            '<div class="arrclass">' +
            this.swichCH(temp[i]) +
            ":" +
            this.formthis[temp[i]] +
            "==>" +
            this.form[temp[i]] +
            "</div>";
          arrchange += tempSTR;
          // console.log(this.form[temp[i]], this.formthis[temp[i]]);
        }
      }
      if (
        this.form.heart_condition.toString() !=
        this.formthis.heart_condition.toString()
      ) {
        let tempSTR = "<div class='arrclass'> 心脏情况改变了==></div>";
        arrchange += tempSTR;
      }
      this.$confirm(arrchange, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
      })
        .then(() => {
          this.GLOBAL.dengdai("block");
          // console.log(this.form.heart_condition);
          let str = "";
          for (let i = 0; i < this.form.heart_condition.length; i++) {
            str += this.form.heart_condition[i] + " ";
          }
          this.form.heart_condition = str;
          // console.log(this.form);
          this.$axios({
            url: this.GLOBAL.serverSrc + "beadhousepeople/update",
            method: "post",
            data: this.form,
          }).then((res) => {
            this.GLOBAL.dengdai("none");
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.disable = true;
            console.log(res);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
          this.form = JSON.parse(JSON.stringify(this.formthis));
        });
    },
  },
  mounted() {
    this.getmsg(this.sendid);
    this.handleCurrentChange(this.page);
  },
  watch: {},
};
</script>

<style >
.el-input--suffix .el-input__inner {
  padding-right: 0;
}
.block {
  position: absolute;
  z-index: 2;
  left: 60px;
  top: 14px;
}
.block > div {
  width: 115px !important;
}
.tableGRDA {
  position: absolute;
  right: 0;
  top: 20px;
  width: 1000px;
}
.buttonGRDA {
  width: 800px;
}

.el-input.is-disabled .el-input__inner {
  color: black;
}
/* .grda>:nth-child(1){
    width: 300px;
} */
.grda > div {
  width: 400px !important;
}
</style>