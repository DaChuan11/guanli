<template>
  <div style="width:100%;height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 标签 -->
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>接待管理</el-breadcrumb-item>
      <el-breadcrumb-item>老人登记</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tableLO">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="老人姓名">
          <el-input v-model="form.name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="老人姓名">
          <el-input v-model="form.name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="老人性别">
          <el-select v-model="form.region" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <div>
          上传头像
          <!-- <el-upload
            name="file"
            v-if="optype==0"
            :action="'/upload'"
            accept=".jpg, .png"
            list-type="picture-card"
            :file-list="fileLists"
            :on-preview="handlePictureCardPreview"
            :on-success="success"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>-->
          <input
            class="file"
            name="file"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            @change="update($event)"
          />
        </div>

        <el-form-item label="入院时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="病史">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="心脏病" name="type"></el-checkbox>
            <el-checkbox label="高血压" name="type"></el-checkbox>
            <el-checkbox label="高血糖" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>清空</el-button>
        </el-form-item>
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
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      imageUrl: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },

    update(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("userpic", file, file.name); //通过append向form对象添加数据
      //param.append('chunk','0');//添加form表单中其他数据
      //console.log(param.get('tweetPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      }; //添加请求头
      this.$axios
        .post(this.GLOBAL.serverSrc + "/UploadImg", param, config)
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>

<style>
.el-form > :nth-child(1) {
  width: 300px;
}
.el-form > :nth-child(2) {
  width: 300px;
}
.el-form > :nth-child(3) {
  float: left;
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
  width: 900px;
  height: 100%;
}
.el-form-item {
  width: 500px;
  float: left;
}
.tableLO {
  width: 900px;
  height: 100%;
}
</style>