import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { addTeacher,getTeachers } from '@/api/teacher'
import { getRoutes } from '@/api/role'
import router, { resetRouter,constantRoutes} from '@/router'
import {replaceComponent} from '@/utils/common'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
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
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state,dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data)


        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { username, avatar, rootRoleId} = data
        
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        // resetRouter()
          getRoutes(rootRoleId).then(response=>{
            const accessRoutes =[]
             // reset visited views and cached views
              response.data.forEach(router =>{
               console.log(router)
               replaceComponent(router,accessRoutes)
             })
             console.log(accessRoutes)
            commit('SET_ROUTES', accessRoutes)
            resetRouter()
            router.addRoutes(accessRoutes)
            // debugger
            // console.log(router)
          //  dispatch('tagsView/delAllViews', null, { root: true })
          console.log(router)
        }).catch(error=>{console.error(error)})
        // getRouters(rootRoleId)
        resolve(data)
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
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  addTeacher({ commit },teacher){
    const { name, sex, date, course, desc } = teacher
    return new Promise((resolve, reject) => {
      addTeacher({ name: name, sex: sex=="男"?1:0, date:date, course:course, desc:desc }).then(response => {
        console.debug(response)
        resolve()
      }).catch(error => {
        console.error("添加老师错误:"+error)
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
  resetToken({ commit }) {
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

