import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  addTeacher,
  getTeachers
} from '@/api/teacher'
import {
  getRoutes
} from '@/api/role'
import router, {
  resetRouter,
  constantRoutes,
  componentMap,
  metaMap
} from '@/router'
import store from '..'
import {
  asyncRoutes
} from '../../router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  rootRoleId: '',
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ROOT_ROLE_ID: (state, rootId) => {
    state.rootRoleId = rootId
  }
}

function replaceComponent(routerData, result) {
  var component = routerData.component
  var meta = routerData.meta
  if (component) {
    routerData.component = componentMap[component]
  }
  if (meta) {
    routerData.meta = metaMap[meta]
  }
  result.push(routerData)
  if (routerData.children) {
    routerData.children.forEach(child => {
      replaceComponent(child, [])
    })
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          username,
          avatar,
          rootRoleId
        } = data

        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_ROOT_ROLE_ID', rootRoleId)
        // resetRouter()
        getRoutes(rootRoleId).then(response => {
          resetRouter()
          var accessRouters = []
          response.data.forEach(item => {
            replaceComponent(item, accessRouters)
          })
          accessRouters.forEach(r => {
            router.options.routes.push(r)
          })
          router.options.routes.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })
          commit('SET_ROUTES', router.options.routes)
          // localStorage.setItem('servericeRoutes', router.options.routes)
          console.log(router.options.routes)
          // router.addRoutes(router.options.routes)
          accessRouters.concat({
            path: '*',
            redirect: '/404',
            hidden: true
          })
          router.addRoutes(accessRouters)
          console.log(router)
          // dispatch('tagsView/delAllViews', null, {
          //   root: true
          // })
          resolve()
        })
        // const accessRoutes =[]
        //  // reset visited views and cached views
        //   response.data.forEach(router =>{
        //   //  console.log(router)
        //    replaceComponent(router,accessRoutes)
        //  })
        // // commit('SET_ROUTES', accessRoutes)
        // // resetRouter()
        //  console.log(accessRoutes)
        //  console.log("添加前router")
        //  console.log(router)

        // }).catch(error=>{console.error(error)})
        // getRouters(rootRoleId)
        // const accessRoutes = await dispatch('permission/generateRoutes',{root:true})
        // generate accessible routes map based on roles
        // const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // replaceComponent(routerData,routers){
  //   var component = routerData.component
  //   if(component){
  //     routerData.component=componentMap[component]
  //     routers.push(routerData)
  //   }
  //   if(routerData.children){
  //     routerData.children.forEach(child=>{
  //       replaceComponent(child,routers)
  //     })
  //   }
  // },
  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
      // }).catch(error => {
      // reject(error)
      // })
    })
  },

  addTeacher({
    commit
  }, teacher) {
    const {
      name,
      sex,
      date,
      course,
      desc
    } = teacher
    return new Promise((resolve, reject) => {
      addTeacher({
        name: name,
        sex: sex == '男' ? 1 : 0,
        date: date,
        course: course,
        desc: desc
      }).then(response => {
        console.debug(response)
        resolve()
      }).catch(error => {
        console.error('添加老师错误:' + error)
        reject(error)
      })
    })
  },

  // allTeachers({ commit, state }){
  //   return new Promise((resolve, reject) => {
  //     getTeachers().then(response => {
  //       console.debug(response)
  //       resolve(response)
  //     }).catch(error => {
  //       console.error(error)
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
