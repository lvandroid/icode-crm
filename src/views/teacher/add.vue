<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="form.name"
          class="formItem"
        />
      </el-form-item>
      <el-form-item label="入职日期">
        <!-- <el-col :span="11"> -->
        <el-date-picker
          v-model="form.entryDate"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        />
        <!-- </el-col> -->
      </el-form-item>
      <el-form-item label="课程">
        <!-- <el-checkbox label="全选" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" ></el-checkbox> -->
        <!-- <div style="margin: 15px 0;"></div> -->
        <el-checkbox-group
          v-model="form.courseTypeIds"
          @change="handleCheckedCourseChange"
        >
          <el-checkbox
            v-for="course in courseType"
            :key="course.id"
            :label="course.id"
          >{{ course.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input
          v-model="form.phone"
          placeholder=""
          class="formItem"
          maxlength="11"
          show-word-limit
          type="number"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio
            label="1"
            name="1"
          >男</el-radio>
          <el-radio
            label="0"
            name="0"
          >女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.desc"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >新增</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTeacher } from '@/api/teacher'
import { getAllCourseType } from '@/api/course'
export default {
  data() {
    return {
      form: {
        name: '',
        entryDate: '',
        courseTypeIds: [],
        sex: '',
        desc: ''
      },
      //  isIndeterminate:true,
      checkedCourses: [],
      courseType: []
      //  checkAll: false,
    }
  },
  created() {
    this.getCourseTypeList()
  },
  methods: {
    onSubmit() {
      // this.$refs.form.validate(valid => {
      //     if (valid) {
      //         this.$store.dispatch('user/addTeacher',this.form).then(() => {
      //           this.$router.push("/teacher/select")
      //         }).catch((error) => {
      //             console.error(error)
      //         })
      //     }
      // })
      addTeacher(this.form).then(response=>{
          this.$router.push("/teacher/list")
          console.log(response)
      }).catch(error=>{
          console.error(error)
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    // handleCheckAllChange(val){
      // this.checkedCourses = val? this.courseType:[]
      // this.isIndeterminate= false
      // console.log(this.checkedCourses)
    // },
    handleCheckedCourseChange(val){
      // this.form.courseTypeIds=val
      // debugger
      console.log("typeof:"+typeof(val)+":"+this.form.courseTypeIds)
    },
    handleRadioChange(val){
      this.form.sex = val
    },
    getCourseTypeList(){
            getAllCourseType().then(response => {
                var datas = response.data
                this.courseType = datas
                // datas.forEach(element => {
                //     this.typeMap[element.name] = element.id
                // });
                // console.log(this.courseType)
                // console.log(this.typeMap)
            }).catch(error=>{
                console.error(error)
            })
    },
  },
}
</script>

<style scoped>
.line {
  text-align: center;
}
.formItem {
  width: 30%;
}
</style>

