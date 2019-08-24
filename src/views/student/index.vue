<template>
  <div class="app-container">

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
      </el-select> -->
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
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
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
        sortable
        prop="name"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        align="center"
        width="160"
        sortable
        prop="phone"
      >
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="110"
        align="center"
        sortable
        prop="sex"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sex==0?"女":"男" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="登记时间"
        align="center"
        width="160"
        sortable
        prop="updateDate"
      >
        <template slot-scope="scope">
          {{ scope.row.updateDate | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
        </template>
      </el-table-column>
      <el-table-column
        label="年级"
        align="center"
        width="320"
        sortable
        prop="grade"
      >
        <template slot-scope="scope">
          {{ scope.row.grade }}
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.mark }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
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
  </div>
</template>

<script>
import { getStudentList } from '@/api/student'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      totalNum: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        name: '',
        sex: '',
        phone: '',
        grade: '',
        // sort: '+id',
        orderKey: 'id',
        orderType: 'desc'
      },
      value: '',
      sortOptions: [
        { label: '默认', key: '-id' },
        { label: '倒序', key: '+id' }
      ],
      downloadLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getStudentList(this.listQuery).then(response => {
        this.list = response.data.list
        this.totalNum = response.total
        this.listLoading = false
      })
    },
    handleCreate() {
      this.$router.push('/student/addStudent')
    },
    handleFilter(val) {
      this.listQuery.pageNum = 1
      console.log('sortVal:' + val)
      //  if(val instanceof String){
      try {
        if (val.startsWith('+')) {
          this.listQuery.orderType = 'asc'
        } else if (val.startsWith('-')) {
          this.listQuery.orderType = 'desc'
        }
        this.listQuery.orderKey = val.substring(1)
      } catch (error) {
        console.log(error)
      }
      this.fetchData()
    },

    sortChange(data) {
      const { prop, order } = data
      console.error('prop:' + prop + ' order:' + order)
      this.handleFilter()
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '登记日期', '性别', '手机号码', '年级', '备注']
        const filterVal = [
          'name',
          'updateDate',
          'sex',
          'phone',
          'grade',
          'mark'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '学员列表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'startDate' || j === 'endDate') {
            return parseTime(v[j], '{y}-{m}-{d}')
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
