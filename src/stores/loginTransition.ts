import { ref } from "vue";
import { defineStore } from "pinia";

/** 登录成功后的欢迎过场 */
export const useLoginTransitionStore = defineStore("loginTransition", () => {
    const showWelcome = ref(false);

    function show() {
        showWelcome.value = true;
    }

    function hide() {
        showWelcome.value = false;
    }

    return {
        showWelcome,
        show,
        hide,
    };
});
