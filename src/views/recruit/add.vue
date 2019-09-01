<template>
  <div class="app-container">
    <el-card type="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <el-button
          class="spanBtn"
          type="primary"
          @click="expandChange"
        >{{ moreVisible?'收起更多':'展开更多' }}</el-button>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="学员姓名" prop="name">
          <el-input v-model="form.name" class="formItem" placeholder="请输入姓名" />
        </el-form-item>

        <el-form-item label="联系电话" prop="phone">
          <el-input
            v-model="form.phone"
            class="formItem"
            show-word-limit
            maxlength="11"
            placeholder="请输入联系电话"
          />
          <el-select v-model="form.genearch" class="smallFormItem">
            <el-option
              v-for="item in genearchs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
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
          />
          <el-select v-model="form.genearchSec" class="smallFormItem">
            <el-option
              v-for="item in genearchs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
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
          />
          <el-select v-model="form.genearchOther" class="smallFormItem">
            <el-option
              v-for="item in genearchs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <i class="icon-wrap el-icon-remove" @click="removeSecOther" />
        </el-form-item>

        <el-form-item label="性别" prop="sex">
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
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="微信号">
                <el-input v-model="form.wechat" class="formItem" placeholder="请输入微信号" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="生日">
                <el-date-picker
                  v-model="form.birthday"
                  class="formItem"
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
                <el-autocomplete
                  v-model="form.school"
                  class="formItem"
                  placeholder="请输入学校"
                  :fetch-suggestions="querySchoolSearchAsync"
                  @select="handleSelectSchool"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
                <el-autocomplete
                  v-model="form.className"
                  class="formItem"
                  placeholder="请输入学校班级名称"
                  :fetch-suggestions="queryClassSearchAsync"
                  @select="handleSelectClass"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="现居住地址" prop="addressNow">
                <el-cascader
                  ref="address"
                  v-model="selectedNowOption"
                  class="formItem"
                  :options="cityOptions"
                />
                <el-input v-model="nowAddrDetail" class="address-select" placeholder="详细地址" />
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
            />
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="form.mark" type="textarea" />
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="bottom-card">
      <div class="bottom-div">
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addStudent, getStudentSchoolInfos } from "@/api/student";
import { parseTime } from "@/utils";
import { genearches, grades } from "@/constants";
import { regionDataPlus, CodeToText } from "element-china-area-data";

export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
      },
      cityOptions: regionDataPlus, // 城市
      selectedNowOption: "", // 居住地址
      genSecVisible: false, // 次要联系人是否可见
      genOtherVisible: false, // 其他联系人是否可见
      moreVisible: false, // 更多信息是否可见
      schools: [],
      classNames: [],
      timeout: "",
      form: {
        id: "",
        name: "", // 姓名
        genearch: "母亲", // 主要联系人关系
        genearchSec: "", // 次要联系人关系
        genearchOther: "", // 其他联系人关系
        phone: "", // 主要电话
        phoneSec: "", // 次要电话
        phoneOther: "", // 其他电话
        sex: "", // 性别
        idCard: "", // 身份证号
        wechat: "", // 微信号
        birthday: "", // 生日
        school: "", // 学校
        grade: "", // 年级
        className: "", // 班级
        homeAddress: "", // 居住地址
        referPhone: "", // 推荐人手机号码
        createTime: "", //录入时间
        mark: "" // 其他信息
      },
      state: "",
      genearchs: genearches,
      grades: grades,
      value: "",
      nowAddrDetail: ""
    };
  },
  mounted() {
    this.getStudentSchoolInfos();
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.createTime = new Date().getTime();
          var city = "";
          debugger;
          for (let item of this.selectedNowOption) {
            city = city + CodeToText[item] + " ";
          }
          this.form.homeAddress = city + " " + this.nowAddrDetail;
          addStudent(this.form)
            .then(response => {
              console.log(response);
              this.$router.push("/recruit/consultation");
            })
            .catch(error => {
              console.error(error);
            });
        }
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
      this.schools = schools;
      this.classNames = classNames;
      console.log(this.schools);
    },
    addGenearch() {
      // 添加联系人布局
      if (!this.genSecVisible) {
        this.genSecVisible = true;
      } else if (!this.genOtherVisible) {
        this.genOtherVisible = true;
      }
    },
    removeSecGen() {
      // 去掉次要联系人布局
      this.genSecVisible = false;
    },
    removeSecOther() {
      // 去掉其他联系人布局
      this.genOtherVisible = false;
    },
    expandChange() {
      // 展开更多按钮点击事件
      this.moreVisible = !this.moreVisible;
    },
    handleRadioChange(val) {
      this.form.sex = val;
    },
    createStateFilter(queryString) {
      return state => {
        console.log(state);
        state.value = state.name;
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1
        );
      };
    },
    querySchoolSearchAsync(queryString, cb) {
      for (let i of this.schools) {
        i.value = i.name;
      }
      var schools = this.schools;
      var results = queryString
        ? schools.filter(this.createStateFilter(queryString))
        : schools;
      console.log("result");
      console.log(results);
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      cb(results);
      // });
    },
    queryClassSearchAsync(queryString, cb) {
      var classNames = this.classNames;
      var result = queryString
        ? classNames.filter(this.createStateFilter(queryString))
        : classNames;
      // clearTimeout(this.timeout)
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
  width: 220px;
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
.address-select {
  width: 380px;
}
.bottom-card {
  margin: 20px 0;
}
.bottom-div {
  float: right;
  margin-bottom: 20px;
}
</style>

