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
import { useLoginTransitionStore } from "@/stores/loginTransition";
import sidebarVue from "./Sidebar.vue";
import mainVue from "./Main.vue";

const sider = ref<InstanceType<typeof sidebarVue>>();
const loginTransition = useLoginTransitionStore();
const flag = ref(loginTransition.showWelcome);
const timer = setTimeout(() => {
    flag.value = false;
    loginTransition.hide();
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
    min-height: 0;
    overflow: hidden;
    background: #f5f6f8;
}

.main-area {
    flex: 1;
    min-width: 0;
    min-height: 0;
    height: 100%;
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
