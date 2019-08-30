<template>
  <div class="app-container">
    <el-card type="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <el-button
          class="spanBtn"
          type="primary"
          @click="expandChange"
        >{{moreVisible?'收起更多':'展开更多'}}</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="学员姓名">
          <el-input v-model="form.name" class="formItem" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input
            v-model="form.phone"
            class="formItem"
            show-word-limit
            maxlength="11"
            placeholder="请输入联系电话"
          ></el-input>
          <el-select v-model="form.genearch" class="smallFormItem">
            <el-option
              v-for="item in genearchs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <i class="icon-wrap el-icon-circle-plus" @click="addGenearch" />
        </el-form-item>
        <el-form-item v-if="genSecVisible" label="次要电话">
          <el-input
            v-model="form.phoneSec"
            class="formItem"
            show-word-limit
            maxlength="11"
            placeholder="请输入次要电话"
          ></el-input>
          <el-select v-model="form.genearchSec" class="smallFormItem">
            <el-option
              v-for="item in genearchs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <i class="icon-wrap el-icon-remove" @click="removeSecGen" />
        </el-form-item>

        <el-form-item v-if="genOtherVisible" label="其他电话">
          <el-input
            v-model="form.phoneOther"
            class="formItem"
            show-word-limit
            maxlength="11"
            placeholder="请输入其他电话"
          ></el-input>
          <el-select v-model="form.genearchOther" class="smallFormItem">
            <el-option
              v-for="item in genearchs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <i class="icon-wrap el-icon-remove" @click="removeSecOther" />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" @change="handleRadioChange">
            <el-radio label="1" name="1">男</el-radio>
            <el-radio label="0" name="0">女</el-radio>
            <el-radio label="-1" name="-1">未知</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-if="moreVisible">
          <el-divider />
          <el-row>
            <el-col :span="6">
              <el-form-item label="身份证号">
                <el-input
                  v-model="form.idCard"
                  class="formItem"
                  placeholder="请输入身份证号"
                  maxlength="18"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="微信号">
                <el-input v-model="form.wechat" class="formItem" placeholder="请输入微信号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="生日">
                <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  value-format="timestamp"
                  placeholder="请选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="学校">
                <el-input
                  v-model="form.school"
                  class="formItem"
                  placeholder="请输入学校"
                  @select="handleSelectSchool"
                  :fetch-suggestions="querySchoolSearchAsync"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="选择年级">
                <el-select v-model="form.grade" class="formItem" filterable placeholder="请选择">
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="班级">
                <el-input
                  v-model="form.className"
                  class="formItem"
                  placeholder="请输入学校"
                  @select="handleSelectClass"
                  :fetch-suggestions="queryClassSearchAsync"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="推荐人手机号码">
            <el-input
              v-model="form.referId"
              class="formItem"
              placeholder="输入推荐人手机号码"
              show-word-limit
              maxlength="11"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="form.mark" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">新增</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addStudent, getStudentSchoolInfos } from "@/api/student";
import { parseTime } from "@/utils";
import { genearches, grades } from "@/constants";

export default {
  data() {
    return {
      genSecVisible: false, //次要联系人是否可见
      genOtherVisible: false, //其他联系人是否可见
      moreVisible: false, //更多信息是否可见
      schools: [],
      classNames: [],
      timeout: "",
      form: {
        id: "",
        name: "", //姓名
        genearch: "母亲", //主要联系人关系
        genearchSec: "母亲", //次要联系人关系
        genearchOther: "母亲", //其他联系人关系
        phone: "", //主要电话
        phoneSec: "", //次要电话
        phoneOther: "", //其他电话
        sex: "", //性别
        idCard: "", //身份证号
        wechat: "", //微信号
        birthday: "", //生日
        school: "", //学校
        grade: "", //年级
        className: "", //班级
        homeAddress: "", //居住地址
        referPhone: "", //推荐人手机号码
        mark: "" //其他信息
      },
      genearchs: genearches,
      grades: grades,
      value: ""
    };
  },
  created() {
    this.getStudentSchoolInfos();
  },
  methods: {
    onSubmit() {
      this.form.id = this.form.phone;
      this.form.updateDate = new Date().getTime();
      addStudent(this.form)
        .then(response => {
          console.log(response);
          this.$router.push("/student/list");
        })
        .catch(error => {
          console.error(error);
        });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },

    async getStudentSchoolInfos() {
      const res = await getStudentSchoolInfos();
      const { schools, classNames, homeAddresses } = res.data;
    },
    addGenearch() {
      //添加联系人布局
      if (!this.genSecVisible) {
        this.genSecVisible = true;
      } else if (!this.genOtherVisible) {
        this.genOtherVisible = true;
      }
    },
    removeSecGen() {
      //去掉次要联系人布局
      this.genSecVisible = false;
    },
    removeSecOther() {
      //去掉其他联系人布局
      this.genOtherVisible = false;
    },
    expandChange() {
      //展开更多按钮点击事件
      this.moreVisible = !this.moreVisible;
    },
    handleRadioChange(val) {
      this.form.sex = val;
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    querySchoolSearchAsync(queryString, cb) {
      var schools = this.schools;
      var result = queryString
        ? schools.filter(this.createStateFilter(queryString))
        : schools;
      clearTimeout(this.timeout);
    },
    queryClassSearchAsync(queryString, cb) {
      var classNames = this.classNames;
      var result = queryString
        ? classNames.filter(this.createStateFilter(queryString))
        : schools;
      clearTimeout(this.timeout);
    },
    handleSelectSchool(item) {
      console.log(item);
    },
    handleSelectClass(item) {
      console.log(item);
    }
  }
};
</script>

<style>
.line {
  text-align: center;
}
.formItem {
  width: 200px;
}
.smallFormItem {
  width: 100px;
}
.spanBtn {
  float: right;
  padding: 6px 10px;
}
.clearfix {
  width: 100%;
}
.icon-wrap {
  font-size: 20px;
  color: rgb(187, 182, 182);
  margin-left: 10px;
}
</style>

