import "vue-router";
import type { HTMLAttributes } from "vue";
import type { AsldeMenuType, Breadcrumb } from "./src/utils/global";

declare module "vue-router" {
  interface RouteMeta {
    menuType?: AsldeMenuType;
    key?: string;
    icon?: keyof typeof import("@ant-design/icons-vue");
    iconType?: "file" | "iconfont";
    label?: string;
    hidden?: boolean;
    extendsRoute?: string;
    breadcrumbs?: Breadcrumb[];
    style?: any | HTMLAttributes["style"];
    isLevel?: number[];
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
