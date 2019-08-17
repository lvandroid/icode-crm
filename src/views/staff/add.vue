<template>
    <div class="app-container">
        <el-form :inline="false" ref="form" :rules="rules" :model="form" label-width="120px" >
            <el-row>
              <el-col :span="6">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" class="formItem" placeholder="输入姓名"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="花名" prop="nickName">
                    <el-input v-model="form.nickName" class="formItem" placeholder="输入花名"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="英文名" prop="nameEn">
                    <el-input v-model="form.nameEn" class="formItem" placeholder="输入英文名"></el-input>
                  </el-form-item>
              </el-col>
               <el-col :span="6">
                    <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone" class="formItem" show-word-limit  maxlength="11" placeholder="输入手机号码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone" class="formItem" show-word-limit  maxlength="11" placeholder="输入手机号码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
           

            <el-collapse>
                 <el-collapse-item accordion=false>
                        <span class="collapse-title" slot="title">更多员工信息</span>
                        <el-form-item label="年级">
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
                 </el-collapse-item>
               </el-collapse>
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
import { parseTime } from '@/utils'

export default {
    data(){
         var validatePhone = (rule,phone,callback)=>{
             console.log(typeof phone)
             console.log(phone.length)
             if(phone === ''){
                 callback(new Error('请输入手机号码'))
             }else if(phone.length!=11){
                 callback(new Error('请输入11位手机号码'))
             }
         }
        return{ 
                rules:{
                    name:[
                        {required: true, message:'请输入姓名', trigger: 'blur'}
                    ],
                    nickName:[
                        {required: true, message:'请输入花名', trigger: 'blur'}
                    ],
                    phone:[
                        {required: true, validator: validatePhone, trigger:'blur'}
                    ]
                },
                form:{
                    name: '',
                    nickName: '',
                    nameEn: '',
                    phone: '',
                    phoneCompany: '',
                    sex: '',
                    departmentId: '',
                    post: '',
                    idCardNo: '',
                    idCardAddress: '',
                    birthday: '',
                    email: '',
                    addressNow: '',
                    famousFamily: '',
                    politicalStatus: '',
                    married: false,
                    graduatedSchool: '',
                    profession: '',
                    education: '',
                    trainExperience: '',
                    entryDate: '',
                    turnPositiveDate: '',
                    payrollCard: '',
                    payRollCardBank: '',
                    emergencyOneName: '',
                    emergencyOnePhone: '',
                    emergencyTwoName: '',
                    emergencyTwoPhone: '',
                    parentName: '',
                    parentIdCard: '',
                    parentCardNo: '',
                    parentCardBlank:'' 
                },
                grades:[
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
            value: '',

           
        }
    },
    methods:{
        onSubmit(){
            this.$refs[form].validate((valid)=>{
                if(valid){
                    this.form.id=this.form.phone
                    this.form.updateDate = new Date().getTime()
                    addStudent(this.form).then(response=>{
                        console.log(response)
                        this.$router.push("/student/list")
                    }).catch(error=>{
                        console.error(error)
                    })
                }
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
.colSpan{
    color:blue;
    font-size: 26pt
}
.collapse-title {
        text-align: center;
        flex: 10;
        order: -1;
        color:#000077;
        font-size: 16px
}
.formItem{
  /* width:120px; */
}
</style>

