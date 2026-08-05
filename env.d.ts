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
  readonly VITE_COS_SECRET_ID: string;
  readonly VITE_COS_SECRET_KEY: string;
  readonly VITE_COS_BUCKET: string;
  readonly VITE_COS_REGION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
