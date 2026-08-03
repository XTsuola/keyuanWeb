/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "crypto-js/md5" {
  const md5: (message: string | CryptoJS.lib.WordArray) => CryptoJS.lib.WordArray;
  export default md5;
}

declare module "cos-js-sdk-v5";

interface Window {
  BMapGL: unknown;
}
