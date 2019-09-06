import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},

{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '工作台',
      icon: 'dashboard'
    }
  }

  ]
},

{
  path: '/recruit',
  component: Layout,
  redirect: '/consultation',
  name: 'recruit',
  meta: {
    title: '招生中心',
    icon: 'example'
  },
  children: [{
    path: 'consultation',
    name: 'consultation',
    component: () => import('@/views/recruit/consultation'),
    meta: {
      title: '咨询本'
    }
  },
  {
    path: 'addStudent',
    name: 'addStudent',
    hidden: true,
    component: () => import('@/views/recruit/add'),
    meta: {
      title: '新增咨询'
    }
  }
  ]
}
]

export const asyncRoutes = [{
  path: '/recruit',
  component: Layout,
  name: 'recruit',
  meta: {
    title: '招生中心',
    icon: 'example'
  },
  children: [{
    path: 'consultation',
    name: 'consultation',
    component: () => import('@/views/recruit/consultation'),
    meta: {
      title: '咨询本'
    }
  }]
},
{
  path: '/student',
  component: Layout,
  redirect: '/student/list',
  name: 'Student',
  meta: {
    title: '学员',
    icon: 'example'
  },
  children: [{
    path: 'list',
    name: 'StudentList',
    component: () => import('@/views/student/index'),
    meta: {
      title: '学员列表',
      icon: 'table'
    }
  },
  {
    path: 'add',
    name: 'AddStudent',
    component: () => import('@/views/student/add'),
    meta: {
      title: '新增学员',
      icon: 'form'
    }
  }
  ]
},

{
  path: '/staff',
  component: Layout,
  redirect: '/staff/list',
  name: 'Staff',
  meta: {
    title: '员工',
    icon: 'example'
  },
  children: [{
    path: 'list',
    name: 'StaffList',
    component: () => import('@/views/staff/index'),
    meta: {
      title: '员工列表',
      icon: 'table'
    }
  },
  {
    path: 'add',
    name: 'AddStaff',
    component: () => import('@/views/staff/add'),
    meta: {
      title: '新增员工',
      icon: 'form'
    }
  }
  ]
},

{
  path: '/teacher',
  component: Layout,
  redirect: '/teacher/list',
  name: 'Teacher',
  meta: {
    title: '教师',
    icon: 'form'
  },
  children: [{
    path: 'list',
    name: 'TeacherList',
    component: () => import('@/views/teacher/index'),
    meta: {
      title: '教师列表',
      icon: 'table'
    }
  },
  {
    path: 'add',
    name: 'AddTeacher',
    component: () => import('@/views/teacher/add'),
    meta: {
      title: '创建教师',
      icon: 'form'
    }
  }
  ]
},

{
  path: '/course',
  component: Layout,
  rediredt: '/course/list',
  name: 'Course',
  meta: {
    title: '班级',
    icon: 'table'
  },
  children: [{
    path: 'list',
    name: 'CourseList',
    component: () => import('@/views/course/index'),
    meta: {
      title: '班级列表',
      icon: 'list'
    }
  },
  {
    path: 'add',
    name: 'AddCourse',
    component: () => import('@/views/course/add'),
    meta: {
      title: '创建班级',
      icon: 'edit'
    }
  }
  ]
},
{
  path: '/account',
  component: Layout,
  rediredt: '/account/role',
  name: 'Account',
  meta: {
    title: '账号',
    icon: 'table'
  },
  children: [{
    path: 'list',
    name: 'AccountList',
    component: () => import('@/views/account/role'),
    meta: {
      title: '角色管理',
      icon: 'form'
    }
  },
  {
    path: 'userList',
    name: 'UserList',
    component: () => import('@/views/account/user'),
    meta: {
      title: '用户管理',
      icon: 'form'
    }
  }
  ]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export const componentMap = {
  layout: () => import('@/layout'),
  staffList: () => import('@/views/staff/index'),
  staffAdd: () => import('@/views/staff/add'),
  studentList: () => import('@/views/student/index'),
  // studentAdd: () => import('@/views/student/add'),
  studentAdd: () => import('@/views/recruit/add'),
  teacherList: () => import('@/views/teacher/index'),
  teacherAdd: () => import('@/views/teacher/add'),
  courseList: () => import('@/views/course/index'),
  courseAdd: () => import('@/views/course/add'),
  accountList: () => import('@/views/account/role'),
  userList: () => import('@/views/account/user')
}

export const metaMap = {
  student: {
    title: '学员',
    icon: 'example'
  },
  studentList: {
    title: '学员列表',
    icon: 'table'
  },
  studentAdd: {
    title: '新增咨询',
    icon: 'form'
  },
  staff: {
    title: '员工',
    icon: 'example'
  },
  staffList: {
    title: '员工列表',
    icon: 'table'
  },
  staffAdd: {
    title: '新增员工',
    icon: 'form'
  },
  teacher: {
    title: '教师',
    icon: 'form'
  },
  teacherList: {
    title: '教师列表',
    icon: 'table'
  },
  teacherAdd: {
    title: '创建教师',
    icon: 'form'
  },
  course: {
    title: '班级',
    icon: 'table'
  },
  courseList: {
    title: '班级列表',
    icon: 'list'
  },
  courseAdd: {
    title: '创建班级',
    icon: 'edit'
  },
  account: {
    title: '账号',
    icon: 'table'
  },
  accountList: {
    title: '角色管理',
    icon: 'form'
  },
  userList: {
    title: '用户管理',
    icon: 'form'
  }
}

// const getComponent = ()=> componentMap

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
