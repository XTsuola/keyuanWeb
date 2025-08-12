import 'vue-router'
import Breadcrumb from 'echarts/types/src/chart/treemap/Breadcrumb.js'
import { HTMLAttributes } from 'vue'

type AsldeMenuType = "group" | "folder" | "menu";

declare module 'vue-router' {
  interface RouteMeta {
    menuType?: AsldeMenuType,
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