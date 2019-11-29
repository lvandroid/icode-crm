<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        class="filter-item"
        style="width:200px"
        placeholder="用户名"
        @keyup.enter.native="handleFilter"
      />
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
        v-if="false"
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
        <el-table-column
          align="center"
          label="编号"
          width="220"
        >
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="用户名"
          width="320"
        >
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <!-- <el-table-column align="center" label="密码" width="400">
          <template slot-scope="scope">{{ scope.row.password }}</template>
        </el-table-column>-->

        <el-table-column
          align="center"
          label="角色"
          width="400"
        >
          <template slot-scope="scope">{{ scope.row.roleNames}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope)"
            >编辑</el-button>
            <el-button
              type="primary"
              size="small"
              @click="changePassword(scope)"
            >修改密码</el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="totalNum>0"
        :total="totalNum"
        :v-show="totalNum>0"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="getUsers"
      />

      <el-dialog
        :visible.sync="dialogVisible"
        :title="dialogType==='new'?'新建用户':'编辑用户'"
      >
        <el-form
          :model="user"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="用户名">
            <el-input
              v-model="user.username"
              placeholder="输入用户名"
              :disabled="usernameDisable"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="user.password"
              maxlength="10"
              show-password
              placeholder="密码"
              :disabled="!changePwd&&usernameDisable"
            />
          </el-form-item>
          <el-form-item
            label="角色"
            v-if="!changePwd"
          >
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
            <el-select
              ref="select"
              v-model="roleName"
              placeholder="请选择主角色"
              @change="chooseMainRole"
            >
              <el-option
                v-for="item in roles"
                :key="item.id"
                :value="item.id"
                :label="item.name"
                :disabled="item.disabled"
              />
            </el-select>
            <el-select
              ref="otherSelect"
              multiple
              :multiple-limit="2"
              :disabled="otherRoleDisable"
              v-model="otherRoleNames"
              @change="selectRoles"
              placeholder="请选择其他角色"
            >
              <el-option
                v-for="item in otherRoles"
                :key="item.id"
                :value="item.id"
                :disabled="item.disabled"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="分配员工">
            <el-select
              v-model="form.staffId"
              placeholder=""
            >
              <el-option
                v-for="staff in staffs"
                :key="staff.id"
                :label="staff.nickName"
                :value="staff.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button
            type="danger"
            @click="dialogVisible=false"
          >取消</el-button>
          <el-button
            type="primary"
            @click="confirmUser"
          >保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import {
  addUser,
  getUserList,
  deleteUser,
  updateUser,
  updatePwd,
  updateRoles
} from "@/api/user";
import { getAll} from "@/api/staff";
import { getRoles } from "@/api/role";
import { deepClone } from "@/utils";

const defaultUser = {
  id: "",
  username: "",
  password: "",
  rootRoleId: "",
  staffId:"",
  roleIds: []
};

const defaultRole = {
  id: "",
  name: "",
  disabled: ""
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
        username: "",
        orderType: "desc"
      },
      form: {
        id: "",
        username: "",
        password: "",
        rootRoleId: "",
        staffId:"",
        roleIds: []
      },
      staffs: [], //员工
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
      otherRoles: [],
      roleName: "",
      otherRoleNames: "",
      otherRoleDisable: true,
      dialogVisible: false,
      usernameDisable: true,
      changePwd: false,
      dialogType: "new",
      downloadLoading: false
    };
  },

  created() {
    this.getUsers();
    this.getRoles();
    this.getStaffs();
  },
  // watch: {
  //   roleName: function(newValue, oldValue) {
  //     this.otherRoleNames = null;
  //   }
  // },
  methods: {
    async getUsers() {
      const res = await getUserList(this.listQuery);
      this.list = res.data.list;
      this.listLoading = false;
      this.totalNum = res.data.total;
    },
    async getRoles() {
      const res = await getRoles();
      this.roles = res.data;
      this.otherRoles = res.data;
    },
    async getStaffs(){
      const res = await getAll();
      this.staffs =res.data;
    },
    fetchData() {},
    handleCreate() {
      this.user = Object.assign({}, defaultUser);
      this.user.roleIds = [];
      this.roleName = "";
      this.otherRoleNames = [];
      this.user.password = "";
      this.dialogType = "new";
      this.dialogVisible = true;
      this.changePwd = false;
      this.usernameDisable = false;
      // this.$router.push('/staff/addStaff')
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.usernameDisable = true;
      this.changePwd = false;
      this.user = deepClone(scope.row);
      this.roleName = this.user.rootRoleId;
      this.otherRoleDisable = false;
      this.otherRoleNames = this.user.roleIds;
      console.log(this.user);
      this.$nextTick(() => {});
    },
    changePassword(scope) {
      this.dialogType = "changePwd";
      this.changePwd = true;
      this.dialogVisible = true;
      this.usernameDisable = true;
      this.user = deepClone(scope.row);
      this.user.password = "";
      this.$nextTick(() => {});
    },
    handleDelete({ $index, row }) {
      this.$confirm("确定要删除账号吗？", "注意", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const name = await this.$store.getters.name;
          if (row.username === name) {
            this.$message({
              message: "不能删除自己",
              type: "error"
            });
          } else {
            await deleteUser(row.id);
            this.list.splice($index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getUsers();
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    chooseMainRole(chooseId) {
      this.user.rootRoleId = chooseId;
      for (let index = 0; index < this.roles.length; index++) {
        const { id } = this.roles[index];
        if (id === chooseId) {
          this.otherRoles[index].disabled = true;
        } else {
          this.otherRoles[index].disabled = false;
        }
      }
      this.otherRoleNames = [];
      this.otherRoleDisable = false;
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
      this.getUsers();
    },

    sortChange(data) {
      const { prop, order } = data;
      console.error("prop:" + prop + " order:" + order);
      this.handleFilter();
    },

    selectRoles(ids) {
      this.user.roleIds = ids;
    },
    async confirmUser() {
      const isEdit = this.dialogType === "edit";
      this.user.staffId = this.form.staffId
      if (isEdit) {
        await updateRoles(this.user.id, this.user);
        this.dialogVisible = false;
        this.$message({
          type: "success",
          message: "账号修改成功!"
        });
        await this.getUsers();
      } else if (this.dialogType === "new") {
        //新建账号
        await addUser(this.user);
        this.dialogVisible = false;
        this.$message({
          type: "success",
          message: "账号创建成功!"
        });
        await this.getUsers();
      } else if (this.dialogType === "changePwd") {
        //修改密码
        this.listLoading = true;
        await updatePwd(this.user.id, this.user);
        this.listLoading = false;
        this.dialogVisible = false;
        this.$message({
          type: "success",
          message: "密码修改成功!"
        });
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
