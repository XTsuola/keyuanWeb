<template>
    <div class="main">
        <div class="box">
            <h1 style="font-weight: 900;">综合管理系统</h1>
            <LoginForm></LoginForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LoginForm from './loginForm.vue';

</script>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
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
}
</style>