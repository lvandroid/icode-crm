<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!-- <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column> -->
      <el-table-column label="课程名" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="开课日期" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startDate | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结课日期" width="200" align="center">
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
       <el-table-column label="课程总价" width="120" align="center">
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

    <el-pagination :total="totalNum" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,20,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="sizes,prev,pager,next,jumper,total"></el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { getCourse } from '@/api/course'

export default {
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
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCourse(this.listQuery).then(response => {
        this.list = response.data
        this.totalNum = response.total
        this.listLoading = false
      })
    },
    handleCurrentChange(val){
      console.log(`当前第${val}页`)
      this.listQuery.pageNum=val
      this.fetchData()
    },
    handleSizeChange(val){
      console.log(`每页${val}条`)
      this.listQuery.pageSize=val
      this.fetchData()
    }
  },
}
</script>
