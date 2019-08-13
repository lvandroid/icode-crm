<template>
    <div class="app-containter">
        <el-form :model="form" ref="form" label-width="120px">
          <el-form-item label="课程名" >
              <el-input v-model="form.name" placeholder="" class="formItem"/>
          </el-form-item>
          <el-form-item label="课程类型">
              <el-radio-group v-model="type" v-for="(item, index) in courseType" :key="index" change="typeChange">
                <el-radio-button :label="item.name"></el-radio-button>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="开课日期">
              <el-date-picker v-model="form.startDate" type="date" value-format="timestamp"></el-date-picker>
          </el-form-item>
          <el-form-item label="结课日期">
              <el-date-picker v-model="form.endDate" type="date" value-format="timestamp"></el-date-picker>
          </el-form-item>
          <el-form-item label="课时数">
              <el-input-number v-model="form.courseSum" @change="priceChange" placeholder=""></el-input-number>
          </el-form-item>
          <el-form-item label="课程总价">
              <el-input-number v-model="form.totalPrice" @change="priceChange" :precision="2" type="number"/>
          </el-form-item>
          <el-form-item label="课程单价">
              <label class="labelTxt">￥{{form.unitPrice}}</label>
          </el-form-item>
          <el-form-item label="活动名称">
              <el-input v-model="form.actName" placeholder=""  class="formItem" clearable></el-input>
          </el-form-item>
           <el-form-item label="活动课时数">
              <el-input-number v-model="form.actCourseSum" @change="priceChange" placeholder=""></el-input-number>
          </el-form-item>
          <el-form-item label="活动总价">
              <el-input-number v-model="form.actTotalPrice" @change="priceChange" :precision="2" placeholder="" type="number" clearable/>
          </el-form-item>
          <el-form-item label="活动单价">
              <!-- <el-input v-model="form.actUnitPrice" placeholder="" type="number"  class="formItem" clearable="true"></el-input> -->
              <label class="labelTxt">￥{{form.actUnitPrice}}</label>
          </el-form-item>
           <el-form-item label="推荐年级">
            <el-select v-model="form.classRef" filterable placeholder="请选择">
                <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
              <el-input v-model="form.mark" class="txtArea" placeholder="" type="textarea" maxlength="255" show-word-limit="ture"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">新增</el-button>
              <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
    </div>    
</template>

<script>
import { addCourse, getAllCourseType } from '@/api/course'
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
                actCourseSum: '0',
                actTotalPrice: '0.00',
                actUnitPrice: '0.00',
                classRef: '',
                courseTypeId:'',
                mark: '',
            },
             courseType:[],
             type:'',
             courseId:'',
             classes:[
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
            classRef: '',
            startDate: '',
            endDate: '',
        }
    },
    methods: {
        onSubmit(){
            addCourse(this.form).then(response =>{
                this.$router.push("/course/list")
            }).catch(error=>{
                console.error(error)
            })
        },
        getCourseTypeList(){
            getAllCourseType().then(response => {
                this.courseType = response.data
                console.log(this.courseType)
            }).catch(error=>{
                console.error(error)
            })
        },
        priceChange(){
            var totalP = this.form.totalPrice
            var courseS = this.form.courseSum
            var actTotalP = this.form.actTotalPrice
            var actCourseS = this.form.actCourseSum
            if(totalP>0&&courseS>0){
                this.form.unitPrice = parseFloat(totalP/courseS).toFixed(2)
            }else{
                this.form.unitPrice = parseFloat(0.00).toFixed(2)
            }
            if(actTotalP>0&&actCourseS>0){
                this.form.actUnitPrice= parseFloat(actTotalP/actCourseS).toFixed(2)
            }else{
                this.form.actUnitPrice = parseFloat(0.00).toFixed(2)
            }
        },
        typeChange(val){

        },
        
        onCancel(){

        }
    },
    created() {
        this.getCourseTypeList()
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

