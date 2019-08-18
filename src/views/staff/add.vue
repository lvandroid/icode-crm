<template>
    <div class="app-container">
        <el-form :inline="false" ref="form" :rules="rules" :model="form" label-width="120px" >
            <el-row>
              <el-col :span="12">
                 <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" class="formItem" placeholder="输入姓名"></el-input>
                 </el-form-item>
                 <el-form-item label="花名" prop="nickName">
                    <el-input v-model="form.nickName" class="formItem" placeholder="输入花名"></el-input>
                 </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone" class="formItem" show-word-limit  maxlength="11" placeholder="输入手机号码"></el-input>
                </el-form-item>  
                <el-form-item label="身份证号码" prop="idCardNo">
                    <el-input v-model="form.idCardNo" class="formItem" show-word-limit  maxlength="18" placeholder="输入身份证号码"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人一" prop="name">
                    <el-col :span="6">
                        <el-input v-model="form.emergencyOneName" class="formItem" show-word-limit  maxlength="11" placeholder="输入姓名"></el-input>
                    </el-col>
                    <el-col :span="18">
                        <el-input v-model="form.emergencyOnePhone" class="formItem" show-word-limit  maxlength="11" placeholder="输入手机号"></el-input>
                    </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                     <el-form-item label="性别" prop="radio">
                        <el-radio-group v-model="form.sex" @change="handleSexChange">
                            <el-radio label="1" name="1">男</el-radio>
                            <el-radio label="0" name="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item> 
                    <el-form-item label="婚姻" prop="radio">
                        <el-radio-group v-model="form.married" @change="handleMarriedChange">
                            <el-radio label="0" name="0">未婚</el-radio>
                            <el-radio label="1" name="1">已婚</el-radio>
                            <el-radio label="2" name="2">离异</el-radio>
                        </el-radio-group>
                    </el-form-item>
                   <el-form-item label="现居住地址" prop="addressNow">
                        <el-row>
                          <el-col :span="10">
                            <el-cascader :options="options" v-model="selectedNowOptions"></el-cascader>
                          </el-col>
                          <el-col :span="14">
                            <el-input v-model="nowAddrDetail" class="formItem" placeholder="详细地址"></el-input>
                          </el-col>
                        </el-row>
                    </el-form-item> 
                    <el-form-item label="身份证地址" prop="addressId">
                        <el-row>
                          <el-col :span="10">
                            <el-cascader :options="options" v-model="selectedIdOptions"></el-cascader>
                          </el-col>
                          <el-col :span="14">
                            <el-input v-model="idAddrDetail" class="formItem" placeholder="详细地址"></el-input>
                          </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="紧急联系人二" prop="name">
                        <el-col :span="6">
                            <el-input v-model="form.emergencyTwoName" class="formItem" show-word-limit  maxlength="11" placeholder="输入姓名"></el-input>
                        </el-col>
                        <el-col :span="18">
                            <el-input v-model="form.emergencyTwoPhone" class="formItem" show-word-limit  maxlength="11" placeholder="输入手机号"></el-input>
                        </el-col>
                </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    
                </el-col>
                <el-col :span="12">
                    
                </el-col>
            </el-row>
           
           <el-row>
             <el-col :span="12">
                 
             </el-col>
             <el-col :span="12">
                    
                </el-col>
           </el-row>

            <el-collapse class="colSpan">
                 <el-collapse-item accordion=false>
                        <span class="collapse-title" slot="title">更多员工信息</span>
                        <el-row>
                          <el-col :span="12">
                              <el-form-item label="英文名" prop="nameEn">
                                <el-input v-model="form.nameEn" class="formItem" placeholder="输入英文名"></el-input>
                              </el-form-item>
                              <el-form-item label="公司手机号码">
                                <el-input v-model="form.phoneCompany" class="formItem" show-word-limit  maxlength="11" placeholder="输入公司号码"></el-input>
                              </el-form-item>
                              <el-form-item label="邮箱">
                                <el-input v-model="form.email" class="formItem" show-word-limit placeholder="输入邮箱"></el-input>
                              </el-form-item>
                              <el-form-item label="毕业学校">
                                <el-input v-model="form.graduatedSchool" class="formItem" show-word-limit  placeholder="输入毕业学校"></el-input>
                              </el-form-item>
                              <el-form-item label="专业">
                                <el-input v-model="form.profession" class="formItem" show-word-limit  placeholder="输入专业"></el-input>
                              </el-form-item>
                              <el-form-item label="学历">
                                <el-input v-model="form.education" class="formItem" show-word-limit  placeholder="输入学历"></el-input>
                              </el-form-item>
                              <el-form-item label="培训经历">
                                <el-input v-model="form.trainExperience" class="formItem" show-word-limit  placeholder="输入培训经历"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="12">
                              <el-form-item label="入职日期">
                                  <el-date-picker v-model="form.entryDate" type="date" value-format="timestamp" placeholder="选择日期"/>
                              </el-form-item>
                              <el-form-item label="转正日期">
                                  <el-date-picker v-model="form.turnPositiveDate" type="date" value-format="timestamp" placeholder="选择日期"/>
                              </el-form-item>
                               <el-form-item label="生日">
                                  <el-date-picker v-model="form.birthday" type="date" value-format="timestamp" placeholder="选择日期"/>
                              </el-form-item>
                              <el-form-item label="民族">
                                <el-input v-model="form.famousFamily" class="formItem" show-word-limit  placeholder="输入民族"></el-input>
                              </el-form-item>
                              <el-form-item label="父母身份证">
                                  <el-col :span="6">
                                    <el-input v-model="form.parentName" class="formItem" show-word-limit   placeholder="输入姓名"></el-input>
                                  </el-col>
                                  <el-col :span="18">
                                    <el-input v-model="form.parentIdCard" class="formItem" show-word-limit  placeholder="输入身份证号码"></el-input>
                                  </el-col>
                              </el-form-item>
                              <el-form-item label="父母银行卡">
                                  <el-col :span="12">
                                    <el-input v-model="form.parentCardNo" class="formItem" show-word-limit  placeholder="输入银行卡号"></el-input>
                                  </el-col>
                                  <el-col :span="12">
                                    <el-input v-model="form.parentCardBank" class="formItem" show-word-limit   placeholder="输入开户行"></el-input>
                                  </el-col>
                              </el-form-item>
                              <el-form-item label="政治面貌">
                                <el-input v-model="form.politicalStatus" class="formItem" show-word-limit  placeholder="输入政治面貌"></el-input>
                              </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item label="备注">
                            <el-input v-model="form.mark" type="textarea" />
                        </el-form-item>
                 </el-collapse-item>
         </el-collapse>
         <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onCancel">取消</el-button>
         </el-form-item>
       </el-form>
    </div>
</template>

<script>
import { addStaff } from '@/api/staff'
import { parseTime } from '@/utils'
import { regionDataPlus } from 'element-china-area-data'

export default {
    data(){
         var validatePhone = (rule,phone,callback)=>{
             console.log(typeof phone)
             console.log(phone.length)
             if(phone === ''){
                 callback(new Error('请输入手机号码'))
             }else if(phone.length!=11){
                 callback(new Error('请输入11位手机号码'))
             }else{
                 callback()
             }
         }
        return{ 
                options: regionDataPlus,
                selectedIdOptions: [],
                selectedNowOptions: [],
                rules:{
                    name:[
                        {required: true, message:'请输入姓名', trigger: 'blur'}
                    ],
                    nickName:[
                        {required: true, message:'请输入花名', trigger: 'blur'}
                    ],
                    phone:[
                        {required: true, validator: validatePhone, trigger:'blur'}
                    ],
                    idCardNo:[
                        {required: true, message:'请输入身份证号码', trigger: 'blur'}
                    ],
                    // radio:[
                    //     {required: true, message:'请选择一项', trigger: 'change'}
                    // ],
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
                    parentCardBank:'',
                    mark: ''
                },
                idAddrProvince:'',
                nowAddrProvinec:'',
                nowAddrDetail:'',
                idAddrDetail:'',
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
            this.$refs.form.validate((valid)=>{
                if(valid){
                    console.log("验证成功")
                    // this.form.id=this.form.phone
                    // this.form.updateDate = new Date().getTime()
                    addStaff(this.form).then(response=>{
                        console.log(response)
                        this.$router.push("/staff/list")
                    }).catch(error=>{
                        console.error(error)
                    })
                }else{
                    console.error("验证没有通过")
                }
            })
            
        },
        onCancel(){
            this.$message({
                message: 'cancel!',
                type: 'warning'
            })
        },
        handleSexChange(val){
            this.form.sex = val
        },
        handleMarriedChange(val){
            this.form.married= val
        }
    },
}
    
</script>

<style>
.line{
  text-align: center;
}
.colSpan{
    margin-bottom: 20px;
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

