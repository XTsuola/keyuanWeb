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

import 'js-md5'

declare module 'js-md5' {
  interface md5 {

  }
}

declare global {
  interface Window {
    BMap: T
  }
}