<template>
    <div class="app-containter">
        <el-form :model="form" ref="form" label-width="120px">
          <el-form-item label="课程名" >
              <el-input v-model="form.name" placeholder="" class="formItem"/>
          </el-form-item>
          <el-form-item label="开课日期">
              <el-date-picker v-model="startDate" type="date" value-format="timestamp"></el-date-picker>
          </el-form-item>
          <el-form-item label="结课日期">
              <el-date-picker v-model="endDate" type="date" value-format="timestamp"></el-date-picker>
          </el-form-item>
          <el-form-item label="课时数">
              <el-input-number v-model="form.courseSum" placeholder=""></el-input-number>
          </el-form-item>
          <el-form-item label="课程总价">
              <el-input-number v-model="form.totalPrice" :precision="2" type="number"/>
          </el-form-item>
          <el-form-item label="课程单价">
              <label class="labelTxt">{{form.unitPrice}}</label>
          </el-form-item>
          <el-form-item label="活动名称">
              <el-input v-model="form.actName" placeholder=""  class="formItem" clearable></el-input>
          </el-form-item>
          <el-form-item label="活动总价">
              <el-input-number v-model="form.actTotalPrice" :precision="2" placeholder="" type="number" clearable/>
          </el-form-item>
          <el-form-item label="活动单价">
              <!-- <el-input v-model="form.actUnitPrice" placeholder="" type="number"  class="formItem" clearable="true"></el-input> -->
              <label class="labelTxt">{{form.actUnitPrice}}</label>
          </el-form-item>
          <el-form-item label="备注">
              <el-input v-model="form.desc" class="txtArea" placeholder="" type="textarea" maxlength="255" show-word-limit="ture"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">新增</el-button>
              <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
    </div>    
</template>

<script>
import { addCourse } from '@/api/course'
export default {
    data() {
        return {
            form:{
                name: '',
                startDate: '',
                endDate: '',
                courseSum: '0',
                totalPrice: '0.00',
                unitPrice: '0.00',
                actName: '',
                actTotalPrice: '0.00',
                actUnitPrice: '0.00',
                desc: '',
            },
            startDate: '',
            endDate: '',
        }
    },
    methods: {
        onSubmit(){
            addCourse(this.form).then(response =>{
                this.$router.push("/course/find")
            }).catch(error=>{
                console.error(error)
            })
        },
        onCancel(){

        }
    },
}
</script>

<style>
    .formItem{
        width: 30%;
    }
    .txtArea{
        width: 80%;
    }
    .labelTxt{
        color: red;
        font-size: 18px;
    }
</style>

