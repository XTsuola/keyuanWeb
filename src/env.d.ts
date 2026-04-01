/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "crypto-js/md5" {
  const md5: any;
  export default md5;
}

declare var document: any;
declare module "ant-design-vue";
declare module "cos-js-sdk-v5";
declare var FileReader: any;
declare var location: any;
declare var window: any;
declare var history: any;
declare var Window: any;

interface Window {
  BMapGL: any
}