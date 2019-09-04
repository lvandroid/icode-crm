<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-card type="box-card">
        <div slot="header" class="clearfix">
          <span class="head-span">基本信息</span>
          <el-button
            class="spanBtn"
            type="primary"
            @click="expandChange"
          >{{ moreVisible?'收起更多':'展开更多' }}</el-button>
        </div>
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
          <el-autocomplete
            v-model="form.genearch"
            class="small-form-item"
            placeholder="请输入"
            :fetch-suggestions="queryGeanearchSearchAsync"
          />
          <!-- <el-select v-model="form.genearch" class="small-form-item">
            <el-option
              v-for="item in genearches"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>-->
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
          <!-- <el-select v-model="form.genearchSec" class="small-form-item">
            <el-option
              v-for="item in genearchs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>-->

          <el-autocomplete
            v-model="form.genearchSec"
            class="small-form-item"
            placeholder="请输入"
            :fetch-suggestions="queryGeanearchSearchAsync"
          />
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
          <!-- <el-select v-model="form.genearchOther" class="small-form-item">
            <el-option
              v-for="item in genearchs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>-->
          <el-autocomplete
            v-model="form.genearchOther"
            class="small-form-item"
            placeholder="请输入"
            :fetch-suggestions="queryGeanearchSearchAsync"
          />
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
                  placeholder="请选择或输入学校"
                  :fetch-suggestions="querySchoolSearchAsync"
                  @select="handleSelectSchool"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="选择年级">
                <!-- <el-select v-model="form.grade" class="formItem" filterable placeholder="请选择">
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>-->
                <el-autocomplete
                  v-model="form.grade"
                  class="formItem"
                  placeholder="请选择或输入年级"
                  :fetch-suggestions="queryGradeSearchAsync"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="班级">
                <el-autocomplete
                  v-model="form.className"
                  class="formItem"
                  placeholder="请选择或输入学校班级名称"
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
      </el-card>

      <el-card class="other-card">
        <div slot="header" class="clearfix">
          <span class="head-span">跟进信息</span>
        </div>

        <el-row>
          <el-col :span="8">
            <el-form-item label="咨询方式" prop="conMethod">
              <!-- <el-radio-group v-model="form.consulteMethod">
                <el-radio v-for="method in conMethods" :label="method.label" :key="method.value" />
              </el-radio-group>-->
              <el-autocomplete
                v-model="form.consulteMethod"
                class="formItem"
                placeholder="请选择或输入咨询方式"
                :fetch-suggestions="queryConMethodSearchAsync"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="意向度">
              <!-- <el-select v-model="form.intention" class="small-form-item">
                <el-option
                  v-for="intent in intentions"
                  :label="intent.label"
                  :key="intent.value"
                  :value="intent.label"
                ></el-option>
              </el-select>-->
              <el-autocomplete
                v-model="form.intention"
                class="formItem"
                placeholder="请选择或输入意向度"
                :fetch-suggestions="queryIntentionSearchAsync"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="咨询课程">
              <el-select multiple v-model="form.courses">
                <el-option v-for="course in courses" :label="course.name" :key="course.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="跟进状态">
              <!-- <el-select v-model="form.followStatus">
                <el-option
                  v-for="status in followStatus"
                  :label="status.label"
                  :value="status.label"
                  :key="status.value"
                />
              </el-select>-->
              <el-autocomplete
                v-model="form.followStatuses"
                class="formItem"
                placeholder="请选择或输入跟进状态"
                :fetch-suggestions="queryFollowStatusSearchAsync"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="关键词">
              <!-- <el-input v-model="form.keywork" placeholder></el-input> -->
              <el-autocomplete
                v-model="form.keyword"
                class="formItem"
                placeholder="请选择或输入关键词"
                :fetch-suggestions="queryKeywordSearchAsync"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="回访提醒">
              <el-date-picker
                v-model="form.revisitRemind"
                class="formItem"
                type="datetime"
                value-format="timestamp"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="沟通内容">
          <el-input v-model="form.communicateContent" type="textarea"></el-input>
        </el-form-item>
      </el-card>

      <el-card class="other-card">
        <div slot="header" class="clearfix">
          <span class="head-span">经办信息</span>
        </div>
        <el-row>
          <el-col :span="4">
            <el-form-item label="咨询校区">
              <el-select v-model="form.campus">
                <el-option
                  v-for="campus in campuses"
                  :key="campus.id"
                  :label="campus.name"
                  :value="campus.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="录入时间">
              <el-date-picker
                v-model="form.entryTime"
                class="formItem"
                type="datetime"
                value-format="timestamp"
                placeholder="请选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="渠道">
              <!-- <el-select v-model="form.channel">
                <el-option
                  v-for="channel in channels"
                  :key="channel.id"
                  :label="channel.name"
                  :value="channel.name"
                />
              </el-select>-->
              <el-autocomplete
                v-model="form.channel"
                class="formItem"
                placeholder="请选择或输入渠道"
                :fetch-suggestions="queryChannelSearchAsync"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="采单员">
              <el-select v-model="form.clerk">
                <el-option
                  v-for="staff in staffs"
                  :key="staff.id"
                  :label="staff.name"
                  :value="staff.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="电话销售">
              <el-select v-model="form.telemarketer">
                <el-option
                  v-for="staff in staffs"
                  :key="staff.id"
                  :label="staff.name"
                  :value="staff.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="销售员">
              <el-select v-model="form.salesman">
                <el-option
                  v-for="staff in staffs"
                  :key="staff.id"
                  :label="staff.name"
                  :value="staff.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="other-card">
        <div class="bottom-div">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <!-- <el-button @click="onCancel">取消</el-button> -->
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { addStudent, getStudentSchoolInfos } from "@/api/student";
import { parseTime } from "@/utils";
import {
  genearches,
  grades,
  intention,
  conMethod,
  followStatus
} from "@/constants";
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
        sex: "-1", // 性别
        idCard: "", // 身份证号
        wechat: "", // 微信号
        birthday: "", // 生日
        school: "", // 学校
        grade: "", // 年级
        className: "", // 班级
        homeAddress: "", // 居住地址
        referPhone: "", // 推荐人手机号码
        createTime: "", //录入时间
        mark: "", // 其他信息
        consulteMethod: "来电", //咨询方式
        intention: "?", //意向度
        courses: [], //咨询课程
        followStatus: "待跟进", //跟进状态
        keyword: "", //关键词
        revisitRemind: "", //回访提醒
        communicateContent: "", //沟通内容
        campus: "", //校区
        entryTime: "", //录入时间
        channel: "", //渠道
        clerk: "", //采单员
        salesman: "", //销售员
        telemarketer: "" //电话销售
      },
      campuses: [], //校区
      channels: [], //渠道
      staffs: [], //员工
      genearches: [], //家长
      grades: [], //年级
      conMethods: [], //咨询方式
      intentions: [], //意向度
      keywords: [], //关键词

      state: "",
      followStatuses: [], //跟进状态
      value: "",
      courses: [],
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
    queryGeanearchSearchAsync(queryString, cb) {
      //家长
      for (let i of this.genearchs) {
        i.value = i.name;
      }
      var genearches = this.genearches;
      var results = queryString
        ? genearches.filter(this.createStateFilter(queryString))
        : genearches;
      cb(results);
    },
    querySchoolSearchAsync(queryString, cb) {
      //学校
      for (let i of this.schools) {
        i.value = i.name;
      }
      var schools = this.schools;
      var results = queryString
        ? schools.filter(this.createStateFilter(queryString))
        : schools;
      cb(results);
    },
    queryGradeSearchAsync(queryString, cb) {
      //年级
      for (let i of this.grades) {
        i.value = i.name;
      }
      var grades = this.grades;
      var results = queryString
        ? grades.filter(this.createStateFilter(queryString))
        : grades;
      cb(results);
    },
    queryClassSearchAsync(queryString, cb) {
      //班级
      for (let i of this.classNames) {
        i.value = i.name;
      }
      var classNames = this.classNames;
      var result = queryString
        ? classNames.filter(this.createStateFilter(queryString))
        : classNames;
      cb(result);
    },
    queryConMethodSearchAsync(queryString, cb) {
      //咨询方式
      for (let i of this.conMethods) {
        i.value = i.name;
      }
      var conMethods = this.conMethods;
      var results = queryString
        ? conMethods.filter(this.createStateFilter(queryString))
        : conMethods;
      cb(results);
    },
    queryIntentionSearchAsync(queryString, cb) {
      //意向度
      for (let i of this.intentions) {
        i.value = i.name;
      }
      var intentions = this.intentions;
      var results = queryString
        ? intentions.filter(this.createStateFilter(queryString))
        : intentions;
      cb(results);
    },
    queryFollowStatusSearchAsync(queryString, cb) {
      //跟进状态
      for (let i of this.followStatuses) {
        i.value = i.name;
      }
      var followStatuses = this.followStatuses;
      var results = queryString
        ? followStatuses.filter(this.createStateFilter(queryString))
        : followStatuses;
      cb(results);
    },
    queryKeywordSearchAsync(queryString, cb) {
      //关键词
      for (let i of this.keywords) {
        i.value = i.name;
      }
      var keywords = this.keywords;
      var results = queryString
        ? keywords.filter(this.createStateFilter(queryString))
        : keywords;
      cb(results);
    },
    queryChannelSearchAsync(queryString, cb) {
      //渠道
      for (let i of this.channels) {
        i.value = i.name;
      }
      var channels = this.channels;
      var results = queryString
        ? channels.filter(this.createStateFilter(queryString))
        : channels;
      cb(results);
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
.small-form-item {
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
.head-span {
  font-weight: bolder;
}
.other-card {
  margin: 20px 0;
}
.bottom-div {
  float: right;
  margin-bottom: 20px;
}
</style>

