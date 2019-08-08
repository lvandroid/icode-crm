<template>
    <div class="app-containter">
        <el-form :model="form" ref="form" label-width="120px">
          <el-form-item label="课程名">
              <el-input v-model="form.name" placeholder=""/>
          </el-form-item>
          <el-form-item label="开课日期">
              <el-date-picker v-model="datevalue" type="daterange" range-separator="至" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">新增</el-button>
              <el-button >取消</el-button>
          </el-form-item>
        </el-form>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            form:{
                name: '',
                datevalue: '',
            },
            datevalue: '',
        }
    },
    methods: {
        
    },
}
</script>

<style>

</style>

