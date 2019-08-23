<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新建角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="编号" width="220">
        <template slot-scope="scope">{{ scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="角色名" width="220">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="说明">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新建角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名">
          <el-input v-model="role.name" placeholder="输入角色名" />
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="角色说明"
          />
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            includeHalfChecked="true"
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            class="permission-tree"
            @check-change="getCheckedRoute"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole
} from "@/api/role";

const defaultRole = {
  id: "",
  name: "",
  description: "",
  // routes: [],
  routerIds: []
};

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: "new",
      checkStrictly: false,
      form: {
        role: {
          id: "",
          name: "",
          description: ""
        },
        routerIds: []
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    routesData() {
      return this.routes;
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRouters();
    this.getRoles();
  },
  methods: {
    async getRouters() {
      const res = await getRoutes(this.$store.getters.rootRoleId);
      this.serviceRoutes = res.data;
      this.routes = this.generateRoutes(res.data);
    },
    async getRoles() {
      const res = await getRoles();
      this.rolesList = res.data;
    },

    getCheckedRoute() {
      // console.log(
      //   this.$refs.tree
      //     .getCheckedKeys()
      //     .concat(this.$refs.tree.getHalfCheckedKeys())
      // );
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = "/") {
      console.log(routes);
      const res = [];

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue;
        }

        const onlyOneShowingChild = this.onlyOneShowingChild(
          route.children,
          route
        );

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild;
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
          label: route.label,
          id: route.id
        };

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path);
        }
        res.push(data);
      }
      return res;
    },
    generateArr(routes) {
      let data = [];
      routes.forEach(route => {
        data.push(route);
        if (route.children) {
          const temp = this.generateArr(route.children);
          if (temp.length > 0) {
            data = [...data, ...temp];
          }
        }
      });
      return data;
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = "new";
      this.dialogVisible = true;
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.checkStrictly = true;
      this.role = deepClone(scope.row);
      this.$nextTick(() => {
        // const routes = this.generateRoutes(this.role.routes);
        // this.$refs.tree.setCheckedNodes(this.generateArr(routes));
        if (this.role.routerIds) {
          this.$refs.tree.setCheckedKeys(this.role.routerIds);
        } else {
          this.$refs.tree.setCheckedKeys([]);
        }
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false;
      });
    },
    handleDelete({ $index, row }) {
      this.$confirm("确定删除角色吗?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteRole(row.id);
          this.rolesList.splice($index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    generateTree(routes, basePath = "/", checkedKeys) {
      const res = [];

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path);

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(
            route.children,
            routePath,
            checkedKeys
          );
        }

        if (
          checkedKeys.includes(routePath) ||
          (route.children && route.children.length >= 1)
        ) {
          res.push(route);
        }
      }
      return res;
    },
    async confirmRole() {
      const isEdit = this.dialogType === "edit";

      const checkedKeys = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      // this.role.routes = this.generateTree(
      // deepClone(this.serviceRoutes),
      // "/",
      // checkedKeys
      // );

      if (isEdit) {
        this.form.role.name = this.role.name;
        this.form.role.description = this.role.description;
        this.form.role.id = this.role.id;
        this.form.routerIds = checkedKeys;
        await updateRole(this.role.id, this.form);
        // for (let index = 0; index < this.rolesList.length; index++) {
        //   if (this.rolesList[index].id === this.role.id) {
        //     this.rolesList.splice(index, 1, Object.assign({}, this.role));
        //     break;
        //   }
        // }
        this.getRoles();
      } else {
        this.form.routeIds = this.$refs.tree
          .getCheckedKeys()
          .concat(this.$refs.tree.getHalfCheckedKeys());
        const { data } = await addRole(this.form);
        this.role.id = this.form.role.id;
        this.role.name = this.form.role.name;
        this.role.description = this.form.role.description;
        // this.role.id = data.role.id;
        // this.rolesList.push(this.form.role);
        this.getRoles();
      }

      const { description, key, name, id } = this.role;
      this.dialogVisible = false;
      this.$notify({
        title: "成功",
        dangerouslyUseHTMLString: true,
        message: `
            <div>角色名: ${name}</div>
            <div>说明: ${description}</div>
          `,
        type: "success"
      });
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null;
      const showingChildren = children.filter(item => !item.hidden);

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0];
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path);
        return onlyOneChild;
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return onlyOneChild;
      }

      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
