<template>
    <div class="main">
        <div class="box">
            <h1 style="font-weight: 900;">综合管理系统</h1>
            <LoginForm></LoginForm>
        </div>
        <div class="beian"><a style="color: #888;" href="https://beian.miit.gov.cn/">备案号：苏ICP备2022024858号-1</a></div>
    </div>
</template>

<script lang="ts" setup>
import LoginForm from "./loginForm.vue";

</script>

<style lang="less" scoped>
.main {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #fff;
    display: flex;
    justify-content: center;

    .box {
        width: 500px;
        height: 100%;
        padding: 15px;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .beian {
        position: absolute;
        bottom: 15px;
    }
}
</style>