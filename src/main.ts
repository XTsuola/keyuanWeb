import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import i18n from "./lang";

const app = createApp(App);
app.directive("hash", (el) => {
  el.style.background = "purple";
});
app.use(createPinia());
app.use(Antd);
app.use(i18n);
app.use(router);
app.mount("#app");