<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="课程名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>-->
      <el-select
        v-model="listQuery.value"
        placeholder="排序"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        v-permission="['admin','studentNew']"
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
        v-waves
        v-permission="['admin','studentImport']"
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>-->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
    >
      <!-- <el-table-column align="center" label="ID" width="95"> -->
      <!-- <template slot-scope="scope"> -->
      <!-- {{ scope.row.id}} -->
      <!-- </template> -->
      <!-- </el-table-column> -->
      <el-table-column
        label="姓名"
        width="120"
        prop="name"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.sex==0"
            class="red-font"
          >♀</span>
          <span
            v-if="scope.row.sex==1"
            class="blue-font"
          >♂</span>
          {{scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        label="联系电话"
        align="center"
        width="160"
        prop="phone"
      >
        <template slot-scope="scope">{{ scope.row.phone}}</template>
      </el-table-column>
      <el-table-column
        label="意向度"
        align="center"
        prop="intention"
      >
        <template slot-scope="scope">{{scope.row.intention}}</template>
      </el-table-column>
      <el-table-column
        label="意向课程"
        align="center"
        prop="courseStr"
      >
        <template slot-scope="scope">{{scope.row.courseStr}}</template>
      </el-table-column>
      <el-table-column
        label="沟通记录"
        align="center"
        class="cursor-pointer"
        prop="communicateContent"
      >
        <template slot-scope='{row}'>
          <div
            @click="openAddCommunicateDialog(row)"
            class="cursor-pointer"
          >
            <i
              v-if="row.communicateContent == '' || row.communicateContent==null"
              class="el-icon-circle-plus"
            ></i>
            <p>{{row.communicateContent}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="关键词"
        align="center"
        prop="keyword"
      >
        <template slot-scope="scope">{{scope.row.keyword}}</template>
      </el-table-column>
      <el-table-column
        label="跟进状态"
        align="center"
        prop="followStatus"
      >
        <el-dropdown
          slot-scope="{row}"
          trigger="click"
          class="el-dropdown-status"
          @command="changeStatus"
        >
          <el-tag
            @click="handleChange(row)"
            class="red-font"
            effect="plain"
            type="primary"
          >{{row.followStatus}}
          </el-tag>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="status in followStatuses"
              :key="status.value"
              :command="status.label"
            >
              {{status.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-table-column>
      <el-table-column
        label="类型"
        align="center"
        prop="type"
      >
        <template slot-scope="scope">{{scope.row.type}}</template>
      </el-table-column>
      <el-table-column
        label="渠道"
        align="center"
        prop="channel"
      >
        <template slot-scope="scope">{{scope.row.channel}}</template>
      </el-table-column>
      <el-table-column
        label="最新跟进时间"
        align="center"
        prop="updateTime"
      >
        <template slot-scope="scope">{{scope.row.updateTime}}</template>
      </el-table-column>
      <el-table-column
        label="咨询校区"
        align="center"
        prop="campus"
      >
        <template slot-scope="scope">{{scope.row.campus}}</template>
      </el-table-column>
      <el-table-column
        label="采单员"
        align="center"
        prop="clerk"
      >
        <template slot-scope="scope">{{scope.row.clerk}}</template>
      </el-table-column>
      <el-table-column
        label="销售"
        align="center"
        prop="salesman"
      >
        <template slot-scope="scope">{{scope.row.salesman}}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        prop="operate"
        fixed="right"
      >
        <template slot-scope="scope">{{scope.row.operate}}</template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="totalNum>0"
      :total="totalNum"
      :page-sizes="[5,10,20,50,100]"
      :v-show="totalNum>0"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="fetchData"
    />

    <el-dialog
      title="新增沟通记录"
      :visible.sync="recordVisible"
      :close-on-click-modal="true"
      :center="true"
    >
      <el-form :model="record">

        <el-form-item label="新增沟通记录">
          <el-input
            type="textarea"
            v-model="record.content"
            class="record-content"
            placeholder="请输入沟通内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="新增回访提醒">
          <el-date-picker
            v-model="record.revisitRemind"
            class="record-time"
            placeholder="选择时间"
            type="datetime"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-table
          :data="recordList"
          v-if="recordList!=null"
          class="record-list"
        >
          <el-table-column
            label="历史沟通人"
            prop="staffName"
          >
            <template slot-scope="scope">
              {{scope.row.staffName}}</template>
          </el-table-column>
          <el-table-column
            label="历史沟通记录"
            prop="content"
          >
            <template slot-scope="scope">
              {{scope.row.content}}
            </template>
          </el-table-column>
          <el-table-column
            label="沟通时间"
            prop="createTime"
          >
            <template slot-scope="scope">{{scope.row.createTime| parseTime()}}</template></el-table-column>
        </el-table>
        <el-button
          type="info"
          class="btn-cancel"
          @click="cancelRecord"
        >取消</el-button>
        <el-button
          type="primary"
          @click="saveRecord"
          class="btn-save"
        >保存</el-button>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { getStudentList,updateFollowStatus,addCommunicate,getCommunicatesById } from "@/api/student";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import {followStatus} from "@/constants"
import Pagination from "@/components/Pagination";
import store from '@/store'

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      recordList:null,
      totalNum: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 50,
        name: "",
        sex: "",
        phone: "",
        grade: "",
        // sort: '+id',
        orderKey: "id",
        orderType: "desc"
      },
      recordVisible:false,
      currentRow:"",
      followStatuses:"",
      value: "",
      record:{
        studentId:'',
        revisitRemind:'',
        content:''
      },
      staffId:'',
      sortOptions: [
        { label: "默认", key: "-id" },
        { label: "倒序", key: "+id" }
      ],
      downloadLoading: false
    };
  },
  created() {
    this.followStatuses = followStatus
    this.staffId = store.getters.staffId
    console.log(this.staffId)
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getStudentList(this.listQuery).then(response => {
        this.list = response.data.list;
        this.totalNum = response.total;
        this.listLoading = false;
      });
    },
    handleCreate() {
      this.$router.push("/recruit/addStudent");
    },
    changeStatus(command){
      // console.log('row')
      // console.log(row)
      console.log('command')
      console.log(command)
      updateFollowStatus({'id':this.currentRow.id,'status':command}).then(response =>{
        this.currentRow.followStatus=command
      }).catch(error=>{
        console.error(error)
      })

      // row.followStatus= command
    },
    openAddCommunicateDialog(row){
      this.recordVisible = true;
      this.record.studentId= row.id
      this.record.staffId = this.staffId
      getCommunicatesById(this.record.studentId).then(
        response => {
          console.log(response.data)
          if(response.data==null || response.data.length==0){
          this.recordList = null;
          }else{
          this.recordList = response.data;
          }
        }
      ).catch(error => {
        console.error(error)
      })
    },

    cancelRecord(){
      this.recordVisible= false;
    },
    saveRecord(){
      console.log('保存沟通记录')
      addCommunicate(this.record).then(response=>{
        this.recordVisible=false;
      })
    },
    handleFilter(val) {
      this.listQuery.pageNum = 1;
      console.log("sortVal:" + val);
      //  if(val instanceof String){
      try {
        if (val.startsWith("+")) {
          this.listQuery.orderType = "asc";
        } else if (val.startsWith("-")) {
          this.listQuery.orderType = "desc";
        }
        this.listQuery.orderKey = val.substring(1);
      } catch (error) {
        console.log(error);
      }
      this.fetchData();
    },

    sortChange(data) {
      const { prop, order } = data;
      console.error("prop:" + prop + " order:" + order);
      this.handleFilter();
    },

   handleChange(row){
     console.log(row)
     this.currentRow = row
   },

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "姓名",
          "登记日期",
          "性别",
          "手机号码",
          "年级",
          "备注"
        ];
        const filterVal = [
          "name",
          "updateDate",
          "sex",
          "phone",
          "grade",
          "mark"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "学员列表"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "startDate" || j === "endDate") {
            return parseTime(v[j], "{y}-{m}-{d}");
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
<style>
.red-font {
  color: red;
}
.blue-font {
  color: blue;
}
.el-dropdown-status {
  cursor: pointer;
  color: #409eff;
}
.record-content {
  width: 300px;
}
.record-time {
  width: 300px;
}
.record-list {
}
.btn-cancel {
  margin-top: 20px;
  background-color: white;
  color: black;
}
.btn-save {
  margin-top: 20px;
  float: right;
}
.cursor-pointer {
  cursor: pointer;
}
</style>