import { createI18n } from "vue-i18n";
import EN from "./en.json";
import ZH from "./zh.json";

const messages = {
  zh: {
    ...ZH,
  },
  en: {
    ...EN,
  },
};

const i18n = createI18n({
  locale: "zh", // 设置当前语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages,
});

export default i18n;
