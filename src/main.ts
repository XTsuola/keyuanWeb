import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "ant-design-vue/dist/reset.css";;
import Antd from "ant-design-vue";

createApp(App).use(createPinia()).use(Antd).use(router).mount("#app");