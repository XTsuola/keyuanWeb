import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter', {
    state: () => ({
        guochangFlag: false,
    }),
    actions: {
        updateFlag(flag: boolean) {
            this.guochangFlag = flag;
        },
    }
})
