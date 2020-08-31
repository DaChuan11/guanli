<template >
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>健康档案</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.postdata.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="leftGRDA">
      <div style="width:100%;height:500px">
        <el-form :inline="true" :model="formthis" class="demo-form-inline grda">
          <el-form-item label="姓名">
            <el-input v-model="formthis.user" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="formthis.age" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="家人联系方式">
            <el-input v-model="formthis.tel" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="病史">
            <el-input v-model="formthis.mec" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="家族病史">
            <el-input v-model="formthis.mec" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="使用过的药物">
            <el-input v-model="formthis.mec" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="床位">
            <el-input v-model="formthis.bedid" :disabled="disable"></el-input>
          </el-form-item>
          <el-form-item label="护工姓名">
            <el-input v-model="formthis.nursing" :disabled="disable"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="buttonGRDA">
        <el-button type="warning" round v-if="disable" @click="changedis">修改档案</el-button>
        <el-button type="primary" round v-if="!disable" @click="upform">上传修改</el-button>
        <el-button type="danger" round v-if="!disable" @click="changedis  ">取消修改</el-button>
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
      <el-table ref="filterTable" :data="tablethis" style="width: 100%">
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
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "gerendangan",
  components: {},
  data() {
    return {
      postdataYU: {
        date: "2016-05-02 11:12:32",
        name: "张1",
        address: "B区280号",
        condition: 73,
        fix: "房性早搏",
        level: "1级预警",
        url: "static/xiaohu1.pdf",
        urljpg: "../assets/test.jpg",
      },
      value: "",
      disable: true,
      //在线获取的数据
      formInline: {
        user: "张L",
        age: "51",
        tel: "13195556621",
        mec: "心脏病，高血压",
        bedid: "B区201号",
        nursing: "候P",
      },
      //本地修改的数据
      formthis: {},
      //在线获取的列表信息
      tableData: [
        {
          date: "2016-05-01",
          docname: "医生：王大拿 & 护工：谢大脚",
          //房性早搏
          APB: "52/24h",
          //矩阵房速
          MRR: "7/24h",
          //对成房早
          ERC: "2/24h",
          //多源性房性早搏
          PAPB: "4/24h",
          tag: "三级预警",
        },
        {
          date: "2016-05-02",
          docname: "护工：谢大脚",
          APB: "65/24h",
          MRR: "6/24h",
          ERC: "3/24h",
          PAPB: "0/24h",
          tag: "正常",
        },
        {
          date: "2016-05-03",
          docname: "医生：赵四",
          APB: "23/24h",
          MRR: "12/24h",
          ERC: "8/24h",
          PAPB: "5/24h",
          tag: "一级预警",
        },
        {
          date: "2016-05-04",
          docname: "护工：蔡徐坤",
          APB: "63/24h",
          MRR: "2/24h",
          ERC: "6/24h",
          PAPB: "3/24h",
          tag: "二级预警",
        },
      ],
      //本地修改的数据
      tablethis: [],
    };
  },
  methods: {
    changedate() {
      if (this.value != 0) {
        // let newarr = [];
        console.log(this.value);
      }
    },
    settable() {
      this.tablethis = this.tableData;
    },
    detype(temp) {
      switch (temp) {
        case "一级预警":
          return "danger";
        case "二级预警":
          return "warning";
        case "三级预警":
          return "info";
        case "健康":
          return "success";
        default:
          break;
      }
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
          this.disable = true;
        });
      }
    },
    //上传修改信息
    upform() {
      let temp = Object.keys(this.formInline);
      let tempCH = ["姓名", "年龄", "家人联系方式", "病史", "床位", "护工姓名"];
      let arrchange = "";
      for (let i = 0; i < temp.length; i++) {
        if (this.formInline[temp[i]] != this.formthis[temp[i]]) {
          let tempSTR =
            '<div class="arrclass">' +
            tempCH[i] +
            ":" +
            this.formInline[temp[i]] +
            "==>" +
            this.formthis[temp[i]] +
            "</div>";
          arrchange += tempSTR;
        }
      }
      this.$confirm(arrchange, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.disable = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    //深克隆对象
    setform() {
      this.formthis = JSON.parse(JSON.stringify(this.formInline));
    },
  },
  mounted() {
    this.setform();
    this.settable();
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