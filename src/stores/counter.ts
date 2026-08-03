import { ref } from "vue";
import { defineStore } from "pinia";

/** 登录过场动画状态 */
export const useCounterStore = defineStore("counter", () => {
    const guochangFlag = ref(false);

    function updateFlag(flag: boolean) {
        guochangFlag.value = flag;
    }

    return {
        guochangFlag,
        updateFlag,
    };
});
