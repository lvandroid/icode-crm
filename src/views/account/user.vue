<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" class="filter-item" style="width:200px" placeholder="用户名" />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>

      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="width: 100%;margin-top:30px;"
        @sort-change="sortChange"
      >
        <el-table-column align="center" label="编号" width="220">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column align="center" label="用户名" width="320">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column align="center" label="密码" width="400">
          <template slot-scope="scope">{{ scope.row.password }}</template>
        </el-table-column>

        <el-table-column align="center" label="角色" width="400">
          <template slot-scope="scope">{{ scope.row.roleNames}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          </template>
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

      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑用户':'新建用户'">
        <el-form :model="user" label-width="80px" label-position="left">
          <el-form-item label="用户名">
            <el-input v-model="user.username" placeholder="输入用户名" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user.password" maxlength="10" show-password placeholder="密码" />
          </el-form-item>
          <el-form-item label="角色">
            <!-- <el-tree
              ref="tree"
              include-half-checked="true"
              :check-strictly="checkStrictly"
              :data="routesData"
              :props="defaultProps"
              show-checkbox
              node-key="id"
              class="permission-tree"
              @check-change="getCheckedRoute"
            />-->
            <el-select ref="select" v-model="roleName" placeholder="请选择">
              <el-option v-for="item in roles" :key="item.id" :value="item.id" :label="item.name" />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirmUser">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import { addUser, getUserList, deleteUser, updateUser } from "@/api/user";
import { getRoles } from "@/api/role";

const defaultUser = {
  id: "",
  username: "",
  password: "",
  // routes: [],
  roleIds: []
};

const defaultRole = {
  id: "",
  name: ""
};

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      totalNum: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        orderKey: "id",
        orderType: "desc"
      },
      form: {
        username: "",
        password: "",
        roleIds: []
      },
      user: Object.assign({}, defaultUser),
      role: Object.assign({}, defaultRole),
      value: "",
      sortOptions: [
        { label: "默认", key: "-id" },
        { label: "倒序", key: "+id" }
      ],
      // user: {
      //   name: '',
      //   password: ''
      // },
      roles: [],
      roleName: "",
      dialogVisible: false,
      dialogType: "new",
      downloadLoading: false
    };
  },

  created() {
    this.getUsers();
    this.getRoles();
  },
  methods: {
    async getUsers() {
      const res = await getUserList(this.listQuery);
      this.list = res.data.list;
      this.listLoading = false;
    },
    async getRoles() {
      const res = await getRoles();
      this.roles = res.data;
      this.listLoading = false;
    },
    fetchData() {},
    handleCreate() {
      this.user = Object.assign({}, defaultUser);
      this.dialogType = "new";
      this.dialogVisible = true;
      // this.$router.push('/staff/addStaff')
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

    async confirmUser() {
      const isEdit = this.dialogType === "edit";
      const checkedRoleId = this.$refs.select.value;

      if (isEdit) {
      } else {
        this.user.roleIds = [];
        this.user.roleIds.push(this.$refs.select.value);
        await addUser(this.user);
        this.dialogVisible = false;
        this.getUsers();
      }
    },

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["姓名", "入职日期", "性别", "手机号码", "备注"];
        const filterVal = ["name", "entryDate", "sex", "phone", "mark"];
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
</style>
