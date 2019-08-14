<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px" >
          <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="选择年级">
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>

          <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"/>
                <el-radio label="女"/>
              </el-radio-group>
          </el-form-item>

          <el-form-item label="报名课程">
            <el-checkbox-group v-model="form.course">
                <el-checkbox label="结构搭建" name="type" />
                <el-checkbox label="Scrach" name="type" />
                <el-checkbox label="App Inventor" name="type" />
                <el-checkbox label="Python" name="type" />
                <el-checkbox label="C++" name="type" />
           </el-checkbox-group>
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
export default {
    data(){
        return{
                form:{
                    name: '',
                    class: '',
                    sex: '',
                    course: [],
                },
                classes:[
                {
                    value: '100',
                    label: '小班',
                },
                {
                    value: '101',
                    label: '中班',
                },
                {
                    value: '102',
                    label: '大班',
                },
                {
                    value: '1',
                    label: '一年级',
                },
                {
                    value: '2',
                    label: '二年级',
                },
                {
                    value: '3',
                    label: '三年级',
                },
                {
                    value: '4',
                    label: '四年级',
                },
                {
                    value: '5',
                    label: '五年级',
                },
                {
                    value: '6',
                    label: '六年级',
                },
                {
                    value: '7',
                    label: '七年级',
                },
                {
                    value: '8',
                    label: '八年级',
                },
                {
                    value: '9',
                    label: '九年级',
                },
                {
                    value: '10',
                    label: '高一',
                },
                {
                    value: '11',
                    label: '高二',
                },
                {
                    value: '12',
                    label: '高三',
                },
                
            ],
            value: ''
        }
    },
    methods:{
        onSubmit(){

        },
        onCancel(){

        }
    }
}
    
</script>

<style>
.line{
  text-align: center;
}
</style>

