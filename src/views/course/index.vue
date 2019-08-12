<template>
  <div class="app-container">

     <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="课程名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select> -->
      <el-select v-model="listQuery.orderKey" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
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
      sort-change="sortChange"
    >
      <!-- <el-table-column align="center" prop="id" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column> -->
      <el-table-column label="课程名" prop="name" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="开课日期" width="200" prop="startDate" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startDate | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结课日期" width="200" align="center" prop="endDate">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="课时数" width="80" align="center">
          <template slot-scope="scope">
              <span>
                  {{ scope.row.courseSum }}
              </span>
          </template>
      </el-table-column>
       <el-table-column label="课程总价" width="120" prop="totalPrice" align="center">
          <template slot-scope="scope">
              <span>
                  ￥{{ scope.row.totalPrice }}
              </span>
          </template>
      </el-table-column>
       <el-table-column label="课程单价" width="80" align="center">
          <template slot-scope="scope">
              <span>
                  ￥{{ scope.row.unitPrice }}
              </span>
          </template>
      </el-table-column>
       <el-table-column label="活动名称" width="180" align="center">
          <template slot-scope="scope">
              <span>
                  {{ scope.row.actName}}
              </span>
          </template>
      </el-table-column>
       <el-table-column label="活动课时数" width="100" align="center">
          <template slot-scope="scope">
              <span>
                  {{ scope.row.actCourseSum }}
              </span>
          </template>
      </el-table-column>
       <el-table-column label="活动总价" width="120" align="center">
          <template slot-scope="scope">
              <span>
                  ￥{{ scope.row.actTotalPrice }}
              </span>
          </template>
      </el-table-column>

       <el-table-column label="活动单价" width="80" align="center">
          <template slot-scope="scope">
              <span>
                 ￥{{ scope.row.actUnitPrice }}
              </span>
          </template>
      </el-table-column> 
      <el-table-column label="推荐年级" width="80" align="center">
          <template slot-scope="scope">
              <span>
                  {{ scope.row.classRef }}
              </span>
          </template>
      </el-table-column>

       <el-table-column label="备注" align="center">
          <template slot-scope="scope">
              <span>
                  {{ scope.row.mark }}
              </span>
          </template>
      </el-table-column>
    </el-table>

    <!-- <el-pagination :total="totalNum" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,20,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="sizes,prev,pager,next,jumper,total"></el-pagination> -->

    <pagination v-show="totalNum>0" :total="totalNum" :page-sizes="[5,10,20,50,100]" :v-show="totalNum>0" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="fetchData" />

  </div>
</template>

<script>
import { getList } from '@/api/table'
import { getCourse } from '@/api/course'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
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
      totalNum:0,
      list: null,
      listLoading: true,
      listQuery:{
        pageNum: 1,
        pageSize: 5,
        name: '',
        startDate: '',
        endDate: '',
        courseSum :'',
        totalPrice: '',
        unitPrice: '',
        actName: '',
        actTotalPrice: '',
        actUnitPrice: '',
        classRef: '',
        mark: '', 
        // sort: '+id',
        orderKey: 'id',
        orderType: 'desc'
      },
      sortOptions: [
        {label: '默认', key: '+id' }, { label: '倒序', key: '-id' },
        {label:'开课时间升序', key:'+start_date'},{label:'开课时间降序', key:'-start_date'},
        {label:'结课时间升序', key:'+end_date'},{label:'结课时间降序', key:'-end_date'},
        {label:'总价升序', key:'+total_price'},{label:'总价降序', key:'-total_price'},
      ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCourse(this.listQuery).then(response => {
        this.list = response.data.list
        this.totalNum = response.total
        this.listLoading = false
      })
    },
    handleCreate(){
      this.$router.push("/course/add")
    },
    handleFilter(val){
      this.listQuery.pageNum=1
      console.debug("sortVal:"+val)
     if(val.startsWith('+')){
        this.listQuery.orderType = 'asc'
      }else if(order.startsWith('-')){
        this.listQuery.orderType = 'desc'
      }
      this.listQuery.orderKey = val.substring(1)
      this.fetchData()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['课程名称','开课日期', '结课日期', '课时数','课程总价','课程单价','活动名称','活动课时数','活动总价','活动单价','推荐年级','备注']
        const filterVal = ['name','startDate', 'endDate', 'courseSum', 'totalPrice', 'unitPrice','actName','actCourseSum','actTotalPrice','actUnitPrice','classRef','mark']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '课程列表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'startDate' || j === 'endDate') {
          return parseTime(v[j],'{y}-{m}-{d}')
        } else {
          return v[j]
        }
      }))
    },
    sortChange(data){
      const { prop, order } = data
      console.debug("prop:"+prop+" order:"+ order)
      if(order.startsWith('+')){
        this.listQuery.orderType = 'asc'
      }else if(order.startsWith('-')){
        this.listQuery.orderType = 'desc'
      }
      this.listQuery.orderKey = prop
      this.handleFilter()
    }
    // handleCurrentChange(val){
    //   console.log(`当前第${val}页`)
    //   this.listQuery.pageNum=val
    //   this.fetchData()
    // },
    // handleSizeChange(val){
    //   console.log(`每页${val}条`)
    //   this.listQuery.pageSize=val
    //   this.fetchData()
    // }
  },
}
</script>
