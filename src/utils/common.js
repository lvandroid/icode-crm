import {componentMap} from '@/router'

export function replaceComponent(routerData,routers){
    var component = routerData.component
    if(component){
      routerData.component=componentMap[component]
      routers.push(routerData)
    } 
    if(routerData.children){
      routerData.children.forEach(child=>{
        replaceComponent(child,routers)
      })
    }
  }