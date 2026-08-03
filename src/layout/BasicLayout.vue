<template>
    <div class="donghua" v-show="flag">
        <div>欢迎登录本系统</div>
    </div>
    <div class="BasicLayout" v-show="!flag">
        <sidebarVue ref="sider" />
        <mainVue class="main-area" @showMenu="showMenu" />
    </div>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { useCounterStore } from "@/stores/counter";
import sidebarVue from "./Sidebar.vue";
import mainVue from "./Main.vue";

const sider = ref<InstanceType<typeof sidebarVue>>();
const counterStore = useCounterStore();
const flag = ref(!!counterStore.guochangFlag);
const timer = setTimeout(() => {
    flag.value = false;
    counterStore.updateFlag(false);
}, 1000);

function showMenu() {
    sider.value?.showMenu();
}

onBeforeUnmount(() => {
    clearTimeout(timer);
});
</script>
<style lang="less" scoped>
.BasicLayout {
    flex: 1;
    display: flex;
    height: 100%;
    overflow-y: hidden;
}

.main-area {
    width: 100%;
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
