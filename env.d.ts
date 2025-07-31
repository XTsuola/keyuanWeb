/// <reference types="vite/client" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    menuType?: AsldeMenuType,
    icon: string,
    key?: string,
    icon?: keyof typeof import("@ant-design/icons-vue")
    iconType?: "file" | "iconfont"
    label?: string
    hidden?: boolean,
    extendsRoute?: string,
    breadcrumbs?: Breadcrumb[],
    style?: any | HTMLAttributes["style"]
    isLevel?: number[]
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
}

declare global {
  interface Window {
    BMap: T
    init: any
    BMapGL: T
    config: any
  }
}