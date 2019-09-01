<template>
  <div class="app-container">
    <el-tabs ref="tab" v-model="activeName" type="border-card">
      <el-tab-pane label="我的咨询本" name="myConsult">
        <keep-alive>
          <student-list />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="咨询记录" name="consultHistory">咨询记录</el-tab-pane>
      <el-tab-pane label="沟通管理" name="communicateManager">沟通管理</el-tab-pane>
      <el-tab-pane label="试听管理" name="auditionManager">试听管理</el-tab-pane>
      <el-tab-pane label="渠道管理" name="channelManager">渠道管理</el-tab-pane>
    </el-tabs>
    <div ref="new" />
  </div>
</template>

<script>
import studentList from './components/StudentList';
export default {
  components: { studentList },
  data() {
    return {
      activeName: 'myConsult'
    }
  }
}
</script>

<style>
</style>
