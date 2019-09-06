import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const {
      value
    } = binding
    // const roles = store.getters && store.getters.roles
    const userPermission = store.getters && store.getters.permissions

    if (value && value instanceof Array && value.length > 0) {
      const bindPermission = value

      const hasPermission = bindPermission.some(perm => {
        return userPermission.includes(perm)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      // throw new Error(`need roles! Like v-permission="['admin','editor']"`)
      throw new Error(`need roles!`)
    }
  }
}
