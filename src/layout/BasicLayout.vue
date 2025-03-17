<template>
    <div class="donghua" v-show="flag">
        <div>欢迎登录本系统</div>
    </div>
    <div class="BasicLayout" v-show="!flag">
        <sidebarVue ref="sider" />
        <mainVue style="width: 100%;" @showMenu="showMenu" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import sidebarVue from "./Sidebar.vue";
import mainVue from "./Main.vue";

const sider = ref();
const counterStore = useCounterStore();
const flag = ref(false);

if (counterStore.guochangFlag) {
    flag.value = counterStore.guochangFlag;
}
setTimeout(() => {
    flag.value = false;
    counterStore.updateFlag(false);
}, 1000);

function showMenu() {
    sider.value.showMenu();
}

</script>
<style lang="less" scoped>
.BasicLayout {
    flex: 1;
    display: flex;
    height: 100%;
    overflow-y: hidden;
}

.donghua {
    flex: 1;
    display: flex;
    height: 100%;
    background: #000;
    color: #fff;
    font-size: 50px;
    justify-content: center;
    align-items: center;
    animation: fall 1s;
}

@keyframes fall {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>