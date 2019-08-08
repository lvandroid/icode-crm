<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="入职日期">
        <el-col :span="11">
          <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <!-- <el-col :span="2" class="line">-</el-col> -->
        <!-- <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col> -->
      </el-form-item>
      <!-- <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item> -->
      <el-form-item label="课程">
        <el-checkbox-group v-model="form.course">
          <el-checkbox label="结构搭建" name="type" />
          <el-checkbox label="Scrach" name="type" />
          <el-checkbox label="App Inventor" name="type" />
          <el-checkbox label="Python" name="type" />
          <el-checkbox label="C++" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTeacher } from '@/api/teacher'

export default {
  data() {
    return {
      form: {
        name: '',
        date: '',
        course : [],
        sex: 0,
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
          if (valid) {
              this.$store.dispatch('user/addTeacher',this.form).then(() => {
                this.$router.push("/teacher/select")
              }).catch((error) => {
                  console.error(error)
              })
          }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

