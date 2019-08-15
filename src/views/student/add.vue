<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px" >
          <el-form-item label="姓名">
              <el-input v-model="form.name" class="formItem" placeholder="输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="选择年级">
            <el-select v-model="form.grade" filterable placeholder="请选择">
                <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>

          <el-form-item label="性别">
              <el-radio-group v-model="form.sex" @change="handleRadioChange">
                 <el-radio label="1" name="1">男</el-radio>
                 <el-radio label="0" name="0">女</el-radio>
              </el-radio-group>
          </el-form-item>

          <el-form-item label="手机号码">
              <el-input v-model="form.phone" class="formItem" show-word-limit  maxlength="11" placeholder="输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="推荐人手机号码">
              <el-input v-model="form.referId" class="formItem" placeholder="输入推荐人手机号码" show-word-limit maxlength="11" ></el-input>
          </el-form-item>
          <!-- <el-form-item label="报名课程">
            <el-checkbox-group v-model="form.course">
                <el-checkbox label="结构搭建" name="type" />
                <el-checkbox label="Scrach" name="type" />
                <el-checkbox label="App Inventor" name="type" />
                <el-checkbox label="Python" name="type" />
                <el-checkbox label="C++" name="type" />
           </el-checkbox-group> -->

         </el-form-item>
         <el-form-item label="备注">
            <el-input v-model="form.mark" type="textarea" />
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="onSubmit">新增</el-button>
            <el-button @click="onCancel">取消</el-button>
         </el-form-item>
       </el-form>
    </div>
</template>

<script>
import { addStudent } from '@/api/student'

export default {
    data(){
        return{
                form:{
                    id:'',
                    name: '',
                    grade: '',
                    sex: '',
                    phone: '',
                    referId: '',
                    mark: '',
                },
                grades:[
                // {
                //     value: '100',
                //     label: '小班',
                // },
                // {
                //     value: '101',
                //     label: '中班',
                // },
                // {
                //     value: '102',
                //     label: '大班',
                // },
                // {
                //     value: '1',
                //     label: '一年级',
                // },
                // {
                //     value: '2',
                //     label: '二年级',
                // },
                // {
                //     value: '3',
                //     label: '三年级',
                // },
                // {
                //     value: '4',
                //     label: '四年级',
                // },
                // {
                //     value: '5',
                //     label: '五年级',
                // },
                // {
                //     value: '6',
                //     label: '六年级',
                // },
                // {
                //     value: '7',
                //     label: '七年级',
                // },
                // {
                //     value: '8',
                //     label: '八年级',
                // },
                // {
                //     value: '9',
                //     label: '九年级',
                // },
                // {
                //     value: '10',
                //     label: '高一',
                // },
                // {
                //     value: '11',
                //     label: '高二',
                // },
                // {
                //     value: '12',
                //     label: '高三',
                // },
                 {
                    value: '小班',
                    label: '小班',
                },
                {
                    value: '中班',
                    label: '中班',
                },
                {
                    value: '大班',
                    label: '大班',
                },
                {
                    value: '一年级',
                    label: '一年级',
                },
                {
                    value: '二年级',
                    label: '二年级',
                },
                {
                    value: '三年级',
                    label: '三年级',
                },
                {
                    value: '四年级',
                    label: '四年级',
                },
                {
                    value: '五年级',
                    label: '五年级',
                },
                {
                    value: '六年级',
                    label: '六年级',
                },
                {
                    value: '七年级',
                    label: '七年级',
                },
                {
                    value: '八年级',
                    label: '八年级',
                },
                {
                    value: '九年级',
                    label: '九年级',
                },
                {
                    value: '高一',
                    label: '高一',
                },
                {
                    value: '高二',
                    label: '高二',
                },
                {
                    value: '高三',
                    label: '高三',
                },
                
            ],
            value: ''
        }
    },
    methods:{
        onSubmit(){
            this.form.id=this.form.phone
            addStudent(this.form).then(response=>{
                console.log(response)
            }).catch(error=>{
                console.error(error)
            })
        },
        onCancel(){
            this.$message({
                 message: 'cancel!',
                type: 'warning'
            })
        },
        handleRadioChange(val){
            this.form.sex = val
        },
    },
}
    
</script>

<style>
.line{
  text-align: center;
}
.formItem{
  width:30%;
}
</style>

